from pytz import timezone,utc

rice_time = timezone("US/Central")
def current_rice_time():
    now = utc.localize(datetime.utcnow()).astimezone(rice_time)
    return now

