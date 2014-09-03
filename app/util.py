from pytz import timezone, utc
from datetime import datetime
from dateutil.parser import parse

rice_time = timezone("US/Central")


def current_rice_time():
    now = utc.localize(datetime.utcnow()).astimezone(rice_time)
    return now


def parse_to_rice_time(text):
    return parse(text).astimezone(rice_time)
