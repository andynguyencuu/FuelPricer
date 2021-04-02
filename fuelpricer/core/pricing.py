class Pricer:
  def __init__(self, gal_req, ppgal, instate = True, past_cust = False): 
    self.quote_price = 1.5 # dummy value
    self.gallons_requested = gal_req
    self.ppgal = ppgal
    self.margin = 1.10

  def generate(self):
    # do math here
    self.quote_price = float(self.ppgal) * float(self.gallons_requested)
    return self.quote_price

  def __repr__(self):
    return self.quote_price