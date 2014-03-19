base_address = r"http://dining.rice.edu/uploadedFiles/Dining/Residential_Dining/Dining_Menus/"

servery_names = {"east":"East_Menu(1).pdf",
                "north": "North_Menu.pdf",
                "baker": "Baker%20Menu.pdf",
                "sid":"Sid_Menu.pdf",
                "west":"West_Menu.pdf",
                "south":"South_Menu.pdf"
                }

serveries = servery_names.keys()

def load_servery_menu(servery_name):
    file_location = download_servery_menu(servery_name)
    
    root = get_xml(file_location)

    lunch,dinner = extract_lunch_and_dinner(root)
    date = extract_date(root)

    return ServeryMenu(servery_name,lunch,dinner,date)

import StringIO
import urllib
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.converter import PDFPageAggregator
from pdfminer.layout import LAParams, LTTextBox
def open_servery_menu(servery):
    complete_url = base_address + servery_names[servery]

    data = urllib.urlopen(complete_url).read()
    
    return StringIO.StringIO(data)


def process_pdf(file_handle):
    parser = PDFParser(file_handle)
    document = PDFDocument(parser)
    rsrcmgr = PDFResourceManager()
    device = PDFPageAggregator(rsrcmgr,laparams=LAParams())
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    for page in PDFPage.create_pages(document):
        interpreter.process_page(page)
        layout = device.get_result()
        yield get_text_positions(layout)
        
def get_text_positions(layout):
    for child in layout:
        if isinstance(child,LTTextBox):
            yield ((child.x0,child.y0),child.get_text())
