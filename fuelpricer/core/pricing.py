class Pricer:
  def __init__(self): 
    self.quoteprice = None

  def generate(self, gallons, ppg, margin, instate = False, past_cust = False):
    # do math here
    self.quoteprice = 900
    return self.quoteprice

  def __repr__(self):
    return self.quoteprice