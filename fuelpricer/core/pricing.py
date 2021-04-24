from .models import FuelQuote, CustomUser
class Pricer:
  def __init__(self, gal_req, ppgal, address, uid, instate = False, past_cust = False): 
    self.quote_price = 1.5 # dummy value
    self.gallons_requested = gal_req #need to check if over 1000, 2% if more, 3% off if less
    self.ppgal = ppgal
    self.address = address
    #NEED TO DO QUERY
    instate = True if" TX" in address or "tx" in address else False
    # Cases:
    # is client, instate, over 1000
    # is client, not instate, over 1000
    # is client, instate, not over 1000
    # is client, not instate, not over 1000
    # is not client, instate, over 1000
    # is not client, not instate, over 1000
    # is not client, instate, not over 1000
    # is not client, not instate, not over 1000
    # entry = FuelQuote.objects.get(REQUESTOR = uid)
    # print(entry)
    queryset = FuelQuote.objects.all()
    queryset = queryset.filter(REQUESTOR=uid)
    if queryset.exists():
      self.past_cust = True
    else:
      self.past_cust = False
    print(self.past_cust)
    if(instate == True and int(gal_req) > 1000 and self.past_cust == True):#if past client
      self.margin = (.02 - 0.01 + .02 +.1) * 1.5
    elif(instate == False and int(gal_req) > 1000 and self.past_cust == True):#if past client
      self.margin = (.04 - 0.01 + .02 +.1) * 1.5
    elif(instate == True and int(gal_req) < 1000 and self.past_cust == True):#if past client
      self.margin = (.02 - 0.01 + .03 + .1) * 1.5
    elif(instate == False and int(gal_req) < 1000 and self.past_cust == True):#if past client
      self.margin = (.04 - 0.01 + .03 +.1) * 1.5
    elif(instate == True and int(gal_req) > 1000 and self.past_cust == False):#if not client
      self.margin = (.02 + .02 +.1) * 1.5
    elif(instate == False and int(gal_req) > 1000 and self.past_cust == False):#if not client
      self.margin = (.04 + .02 +.1) * 1.5
    elif(instate == True and int(gal_req) < 1000 and self.past_cust == False):#if not client
      self.margin = (.02 + .03 +.1) * 1.5
    else:#if not client, < 1000, not instate
      self.margin = (.04 + .03 +.1) * 1.5
    
  def generate(self):
    # do math here
    # Current price per gallon = $1.50 (this is the price what distributor gets from refinery and it varies based upon crude price. But we are keeping it constant for simplicity)
    # Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)

    self.quote_price = (float(self.ppgal) + float(self.margin)) * float(self.gallons_requested)
    return self.quote_price

  def __repr__(self):
    return self.quote_price