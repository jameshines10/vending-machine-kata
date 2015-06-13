describe('VendingMachine', function() {
	var vendingMachine = null;

	beforeEach(function(){
		vendingMachine = new VendingMachine(1000);
	});	

    it('should accept nickels', function() {
    	vendingMachine.acceptCoin(Coin.NICKEL);

        expect(vendingMachine.displayCurrentAmount()).toEqual(5);
    });

    it('should accept dimes', function() {
    	vendingMachine.acceptCoin(Coin.DIME);

        expect(vendingMachine.displayCurrentAmount()).toEqual(10);
    });

    it('should accept quarters', function() {
    	vendingMachine.acceptCoin(Coin.QUARTER);

        expect(vendingMachine.displayCurrentAmount()).toEqual(25);
    });

    it('should not accept pennies', function() {
    	vendingMachine.acceptCoin(Coin.PENNY);

        expect(vendingMachine.displayCurrentAmount()).toEqual('INSERT COIN');    	
    });

    it('should display "INSERT COIN" when there are no coins inserted', function(){
    	expect(vendingMachine.displayCurrentAmount()).toEqual('INSERT COIN');
    });

    it('should accept nickles, dimes and quarters but no pennies', function(){
    	vendingMachine.acceptCoin(Coin.NICKEL);
    	vendingMachine.acceptCoin(Coin.DIME);
    	vendingMachine.acceptCoin(Coin.PENNY);
    	vendingMachine.acceptCoin(Coin.PENNY);
    	vendingMachine.acceptCoin(Coin.QUARTER);

    	expect(vendingMachine.displayCurrentAmount()).toEqual(40);
    });

    it('should return invalid coins', function(){
    	vendingMachine.acceptCoin(Coin.PENNY);
    	vendingMachine.acceptCoin(Coin.PENNY);

    	expect(vendingMachine.returnCoins()).toEqual([Coin.PENNY, Coin.PENNY]);
    });

    it('should not return valid coins', function(){
    	vendingMachine.acceptCoin(Coin.NICKEL);
    	vendingMachine.acceptCoin(Coin.DIME);
    	vendingMachine.acceptCoin(Coin.DIME);
    	vendingMachine.acceptCoin(Coin.PENNY);
    	vendingMachine.acceptCoin(Coin.QUARTER);

    	expect(vendingMachine.returnCoins()).toEqual([Coin.PENNY]);
    	expect(vendingMachine.displayCurrentAmount()).toEqual(50);
    });

    it('should dispense cola if enough coins have been accepted', function(){
    	vendingMachine.acceptCoin(Coin.QUARTER);
    	vendingMachine.acceptCoin(Coin.QUARTER);
    	vendingMachine.acceptCoin(Coin.QUARTER);
    	vendingMachine.acceptCoin(Coin.QUARTER);

    	expect(vendingMachine.dispenseCola()).toEqual(Product.COLA);
    	expect(vendingMachine.displayCurrentAmount()).toEqual('THANK YOU');
    });

    it('should display THANK YOU then INSERT COIN after a successful purchase', function(){
    	vendingMachine.acceptCoin(Coin.QUARTER);
    	vendingMachine.acceptCoin(Coin.QUARTER);
    	vendingMachine.acceptCoin(Coin.QUARTER);
    	vendingMachine.acceptCoin(Coin.QUARTER);

    	expect(vendingMachine.dispenseCola()).toEqual(Product.COLA);
    	expect(vendingMachine.displayCurrentAmount()).toEqual('THANK YOU');
    	expect(vendingMachine.displayCurrentAmount()).toEqual('INSERT COIN');
    });

    it('should display "PRICE" and the price of the product if there is not enough money', function() {
    	vendingMachine.acceptCoin(Coin.QUARTER);
    	vendingMachine.acceptCoin(Coin.QUARTER);
    	vendingMachine.acceptCoin(Coin.QUARTER);

    	expect(vendingMachine.dispenseCola()).toEqual([]);
    	expect(vendingMachine.displayCurrentAmount()).toEqual('PRICE');
    	expect(vendingMachine.displayCurrentAmount()).toEqual(75);
    }
});