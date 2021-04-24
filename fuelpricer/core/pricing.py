class Pricer:
  def __init__(self, gal_req, ppgal, address, instate = False, past_cust = False): 
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
    if(instate == True and int(gal_req) > 1000):#if past client
      self.margin = (.02 - 0.01 + .02 +.1) * 1.5
      print(self.margin)
    elif(instate == False and int(gal_req) > 1000):#if past client
      self.margin = (.04 - 0.01 + .02 +.1) * 1.5
    elif(instate == True and int(gal_req) < 1000):#if past client
      self.margin = (.02 - 0.01 + .03 + .1) * 1.5
    elif(instate == False and int(gal_req) < 1000):#if past client
      self.margin = (.04 - 0.01 + .03 +.1) * 1.5
    elif(instate == True and int(gal_req) > 1000):#if not client
      self.margin = (.02 + .02 +.1) * 1.5
    elif(instate == False and int(gal_req) > 1000):#if not client
      self.margin = (.04 + .02 +.1) * 1.5
    elif(instate == True and int(gal_req) < 1000):#if not client
      self.margin = (.02 + .03 +.1) * 1.5
    elif(instate == False and int(gal_req) < 1000):#if not client
      self.margin = (.04 + .03 +.1) * 1.5
    else:#Might change later
      self.margin = (0.00)
    
  def generate(self):
    # do math here
    # Current price per gallon = $1.50 (this is the price what distributor gets from refinery and it varies based upon crude price. But we are keeping it constant for simplicity)
    # Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)

    self.quote_price = (float(self.ppgal) + float(self.margin)) * float(self.gallons_requested)
    return self.quote_price

  def __repr__(self):
    return self.quote_price