from .models import FuelQuote, CustomUser
class Pricer:
  def __init__(self, gal_req, ppgal, address, uid, instate = False, past_cust = False): 
    self.quote_price = 1.5 # base value
    self.gallons_requested = gal_req #need to check if over 1000, 2% if more, 3% off if less
    self.ppgal = ppgal
    self.address = address
    instate = True if" TX" in address or "tx" in address else False
    # entry = FuelQuote.objects.get(REQUESTOR = uid)
    # print(entry)
    queryset = FuelQuote.objects.all()
    queryset = queryset.filter(REQUESTOR=uid)
    if queryset.exists():
      self.past_cust = True
    else:
      self.past_cust = False
    print(self.past_cust)

    # margin calculation
    a = 0.02 if instate else 0.04
    b = 0.01 if self.past_cust else 0
    c = 0.02 if float(self.gallons_requested) > 1000 else 0.03
    d = 0.1
    self.margin = (a - b + c + d) * 1.5 # base price
  

    
  def generate(self):
    # do math here
    # Current price per gallon = $1.50 (this is the price what distributor gets from refinery and it varies based upon crude price. But we are keeping it constant for simplicity)
    # Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)

    self.quote_price = (float(self.ppgal) + float(self.margin)) * float(self.gallons_requested)
    return self.quote_price

  def __repr__(self):
    return self.quote_price