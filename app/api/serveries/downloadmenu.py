"""
This is a module for downloading menus from dining.rice.edu.
The main external method to use is "process_servery_menu(servery)"

Servery is one of the following: 
    'east'
    'north'
    'baker'
    'sid'
    'west'
    'south'

The result is a dict of the following structure:

{
    'base_date': The date the menu was released (the Monday it came into effect)
    'lunch': A meal dictionary
    'dinner': A meal dictionary
}

The meal dictionaries have the following structure:

{
    'day': [Meal name strings]
}

'day' is an integer from 0 to 6, 0 for Monday, 1 for Tuesday, etc.
Incidentally, 'day' is the offset in days from the 'base_date' when the menu is active.

The dish names are as you would expect (like "Fish and Chips\n")
Days with no dishes might have junk like "Dinner on Your Own Rice Village is Nice!"
Note that these strings are Unicode strings.

Example usage would be:
    import downloadmenu
    menu = downloadmenu.process_servery_menu("west")
    print menu['lunch'][0]

This would print the foods available for Monday lunch of the current week.
"""

import StringIO
import urllib
from collections import defaultdict, namedtuple
import re
import datetime
import calendar

from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.converter import PDFPageAggregator
from pdfminer.layout import LAParams, LTTextBox


base_address = r"http://dining.rice.edu/uploadedFiles/Dining/Residential_Dining/Dining_Menus/"

servery_names = {"seibel":"East_Menu(1).pdf",
                "north": "North_Menu.pdf",
                "baker": "Baker%20Menu.pdf",
                "sid":"Sid_Menu.pdf",
                "west":"West_Menu.pdf",
                "south":"South_Menu.pdf"
                }

serveries = servery_names.keys()

BoundingBox = namedtuple('BoundingBox',['x','y','width','height'])

def in_bounding_box(box,x,y):
    return (box.x <= x <= box.x+box.width) and (box.y <= y <= box.y + box.height)

#These are the bounding boxes for the one page format's lunch and dinner
lunch_bounding_box = BoundingBox(x=115,y=140,width=600,height=200)
dinner_bounding_box = BoundingBox(x=115,y=140,width=600,height=340)

#These are the bounding boxes for each day in the multi page format.
multi_day_boxes = {
        0: BoundingBox(x=26,y=48,width=230,height=230) ,
        1: BoundingBox(x=264,y=48,width=230,height=230),
        2: BoundingBox(x=502,y=48,width=230,height=230),
        3: BoundingBox(x=25,y=302,width=168,height=238),
        4: BoundingBox(x=200,y=302,width=168,height=238),
        5: BoundingBox(x=375,y=302,width=168,height=238),
        6: BoundingBox(x=550,y=302,width=168,height=238),
        }

numeral_date_regex = re.compile(r'(?P<month>\d+)/(?P<day>\d+)/(?P<year>\d+)')
word_date_regex = re.compile(r'(?P<month>\w+) (?P<day>\d+), (?P<year>\d+)')

def process_servery_menu(servery):
    """Obtains the menu for a servery."""
    file_handle = download_servery_menu(servery)

    pages = list(process_pdf(file_handle))

    if len(pages) == 1:
        return process_one_page_menu(list(pages[0]))
    else:
        return process_multi_page_menu(pages)

def download_servery_menu(servery):
    """ 
    Downloads a servery pdf and returns a StringIO file descriptor of the data.
    Note that the StringIO does not need to be closed like a regular file.
    """
    complete_url = base_address + servery_names[servery]

    data = urllib.urlopen(complete_url).read()
    
    return StringIO.StringIO(data)

def process_pdf(file_handle):
    """
    Processes a PDF in a file_handle and returns a generator of ((x,y),text) tuples for each page.
    The final result is somewhat equivalent to [ [(x,y,text) for text in page] for page in PDF].
    """
    parser = PDFParser(file_handle)
    document = PDFDocument(parser)
    rsrcmgr = PDFResourceManager()
    device = PDFPageAggregator(rsrcmgr,laparams=LAParams(char_margin=1.0))
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    for page in PDFPage.create_pages(document):
        interpreter.process_page(page)
        layout = device.get_result()
        yield get_text_positions(layout)
        
def get_text_positions(layout):
    """Processes a single page in a PDF and returns a generator of ((x,y),text) tuples."""
    for child in layout:
        if isinstance(child,LTTextBox):
            for line in child:
                #coords = (line.x0 + line.x1)/2, layout.height - (line.y0 + line.y1)/2
                coords = (line.x0), layout.height - (line.y0 + line.y1)/2
                yield (coords,line.get_text().strip())

def process_one_page_menu(page):
    """Processes a menu in the single page format""" 
    date = get_date(page)
    lunch = get_meal(single_page_classify(lunch_bounding_box),page)
    dinner = get_meal(single_page_classify(dinner_bounding_box),page)

    return {"dinner":dinner,"lunch":lunch,"base_date":date}


def process_multi_page_menu(pages):
    """Processes a menu in the multi page format""" 
    date = get_date(pages[0])
    lunch = get_meal(multi_page_classify,pages[1])
    dinner = get_meal(multi_page_classify,pages[2])

    return {"dinner":dinner,"lunch":lunch,"base_date":date}

def get_date(page):
    """Finds the date in the page by looking for the string "Week Of" """
    for text_piece in page:
        if "Week of" in text_piece[1]:
            month,day,year =  process_date_string(text_piece[1])
            return datetime.date(year,month,day)

def process_date_string(text):
    """
    Extracts a datetime.date for the date in the text.
    The text can be in two possible formats:
        numeral_date example 3/16/2014
        word_date exmaple March 16,20014
    """
    numeral_date_match = numeral_date_regex.search(text)
    if numeral_date_match:
        return map(int,numeral_date_match.group("month","day","year"))
    else:
        word_date_match = word_date_regex.search(text)
        day,year = map(int,word_date_match.group("day","year"))
        month = list(calendar.month_name).index(word_date_match.group("month"))
        return month,day,year

def get_meal(classify,page):
    """
    Generates a meal dictionary given a page and a classify function.
    Classify must be a function which takes one argument: a text_piece which is a ((x,y),text) tuple.
    Classify should return a tuple of (day,dish_number).
    Day is a number from 0-6 as per the format for the module docstring.
    Dish_number is a number from 0-6 that specifies which dish for the day it is. 
    The dish_number is eventually thrown away, but it is usefull for merging multi-line dishes.
    If the text_piece does not belong to a dish, classify should return (-1,-1).
    """

    meal = defaultdict(lambda : defaultdict(str))
    for text_piece in page:
        day,dish_number = classify(text_piece)
        if day != -1:
            meal[day][dish_number] += text_piece[1] +'\n'
    return {day:[dish for dish in meal[day].values() if dish != ""] for day in meal}


def single_page_classify(bounding_box):
    """A classify function for a single page menu. Look at get_meal for the specification of classify"""
    def classify(text_piece):
        x,y = text_piece[0]
        if in_bounding_box(bounding_box,x,y):
            local_x = x - bounding_box.x
            local_y = y - bounding_box.y
            day = get_single_page_day(local_x,local_y)
            dish_number = get_single_page_dish_number(local_x,local_y)
            return (day,dish_number)
        return (-1,-1)
    return classify

def get_single_page_day(x,y):
    return int(x * 7.0/606)

def get_single_page_dish_number(x,y):
    return int(y * 7.0/207)

def multi_page_classify(text_piece):
    """A classify function for a multi page menu. Look at get_meal for the specification of classify"""
    
    #This rejects junk like the meal information (such as Gluten Free, etc).
    #TODO Process meal information for presentation to users.
    if len(text_piece[1]) <= 3:
        return (-1,-1)

    for day,box in multi_day_boxes.items():
        x,y = text_piece[0]
        if in_bounding_box(box,x,y):
            return (day,get_multi_page_dish_number(box,x,y))
            
    return (-1,-1)


def get_multi_page_dish_number(box,x,y):
    local_y = y - box.y
    return int(local_y * 7.0/box.height)


    














