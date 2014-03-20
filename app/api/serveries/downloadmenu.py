import StringIO
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
    'base_date': The date the menu was released (the monday it came into effect)
    'lunch': A meal dictionary
    'dinner': A meal dictionary
}

The meal dictionaries have the following structure:

{
    'day': [Meal name strings]
}

'day' is an integer from 0 to 6, 0 for monday, 1 for tuesday, etc.
Incidently, 'day' is the offset in days from the 'base_date' when the menu is active.

The meal names are as you would expect (like "Fish and Chips\n")
Days with no meal might have junk like "Dinner on Your Own Rice Village is Nice!"
Note that these strings are unicode strings.

Example usage would be:
    import downloadmenu
    menu = downloadmenu.process_servery_menu("west")
    print menu['lunch'][0]

This would print the foods available for monday lunch of the current week.
"""

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

servery_names = {"east":"East_Menu(1).pdf",
                "north": "North_Menu.pdf",
                "baker": "Baker%20Menu.pdf",
                "sid":"Sid_Menu.pdf",
                "west":"West_Menu.pdf",
                "south":"South_Menu.pdf"
                }

serveries = servery_names.keys()

def process_servery_menu(servery):
    file_handle = download_servery_menu(servery)

    pages = list(process_pdf(file_handle))

    if len(pages) == 1:
        return process_one_page_menu(list(pages[0]))
    else:
        return process_multi_page_menu(pages)

def load_servery_menu(servery_name):
    file_location = download_servery_menu(servery_name)
    
    root = get_xml(file_location)

    lunch,dinner = extract_lunch_and_dinner(root)
    date = extract_date(root)

    return ServeryMenu(servery_name,lunch,dinner,date)

def download_servery_menu(servery):
    complete_url = base_address + servery_names[servery]

    data = urllib.urlopen(complete_url).read()
    
    return StringIO.StringIO(data)







BoundingBox = namedtuple('BoundingBox',['x','y','width','height'])

lunch_bounding_box = BoundingBox(x=115,y=140,width=600,height=200)
dinner_bounding_box = BoundingBox(x=115,y=140,width=600,height=340)


multi_day_boxes = {
        0: BoundingBox(x=26,y=48,width=230,height=230) ,
        1: BoundingBox(x=264,y=48,width=230,height=230),
        2: BoundingBox(x=502,y=48,width=230,height=230),
        3: BoundingBox(x=25,y=302,width=168,height=238),
        4: BoundingBox(x=200,y=302,width=168,height=238),
        5: BoundingBox(x=375,y=302,width=168,height=238),
        6: BoundingBox(x=550,y=302,width=168,height=238),
        }

def get_multi_page_meal_number(box,x,y):
    local_y = y - box.y

    return int(local_y * 7.0/box.height)
    

def multi_page_classify(text_piece):
    if len(text_piece[1]) <= 3:
        return (-1,-1)

    for day,box in multi_day_boxes.items():
        x,y = text_piece[0]
        if in_bounding_box(box,x,y):
            return (day,get_multi_page_meal_number(box,x,y))
            
    return (-1,-1)
def in_bounding_box(box,x,y):
    return (box.x <= x <= box.x+box.width) and (box.y <= y <= box.y + box.height)

def get_meal_day(x,y):
    return int(x * 7.0/606)

def get_meal_number(x,y):
    return int(y * 7.0/207)
    


def single_page_classify(bounding_box):
    def classify(text_piece):
        x,y = text_piece[0]
        if in_bounding_box(bounding_box,x,y):
            local_x = x - bounding_box.x
            local_y = y - bounding_box.y
            day = get_meal_day(local_x,local_y)
            meal_number = get_meal_number(local_x,local_y)
            return (day,meal_number)
        return (-1,-1)
    return classify

def get_meal(classify,page):
    meals = defaultdict(lambda : defaultdict(str))
    for text_piece in page:
        day,meal_number = classify(text_piece)
        if day != -1:
            meals[day][meal_number] += text_piece[1] +'\n'
    return {day:[meal for meal in meals[day].values() if meal != ""] for day in meals}


numeral_date_regex = re.compile(r'(?P<month>\d+)/(?P<day>\d+)/(?P<year>\d+)')
word_date_regex = re.compile(r'(?P<month>\w+) (?P<day>\d+), (?P<year>\d+)')



def process_date_string(text):
    numeral_date_match = numeral_date_regex.search(text)
    if numeral_date_match:
        return map(int,numeral_date_match.group("month","day","year"))
    else:
        word_date_match = word_date_regex.search(text)
        day,year = map(int,word_date_match.group("day","year"))
        month = list(calendar.month_name).index(word_date_match.group("month"))
        return month,day,year


def get_date(page):
    for text_piece in page:
        if "Week of" in text_piece[1]:
            month,day,year =  process_date_string(text_piece[1])
            return datetime.date(year,month,day)





def process_one_page_menu(page):
    date = get_date(page)
    lunch = get_meal(single_page_classify(lunch_bounding_box),page)
    dinner = get_meal(single_page_classify(dinner_bounding_box),page)

    return {"dinner":dinner,"lunch":lunch,"base_date":date}


def process_multi_page_menu(pages):
    date = get_date(pages[0])
    lunch = get_meal(multi_page_classify,pages[1])
    dinner = get_meal(multi_page_classify,pages[2])

    return {"dinner":dinner,"lunch":lunch,"base_date":date}

def process_pdf(file_handle):
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
    for child in layout:
        if isinstance(child,LTTextBox):
            for line in child:
                #coords = (line.x0 + line.x1)/2, layout.height - (line.y0 + line.y1)/2
                coords = (line.x0), layout.height - (line.y0 + line.y1)/2
                yield (coords,line.get_text().strip())
