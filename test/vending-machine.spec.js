describe('VendingMachine', function() {
	var vendingMachine = null;

	beforeEach(function(){
		vendingMachine = new VendingMachine(1000);
	});	

    it('should accept nickels', function() {
    	vendingMachine.acceptCoin(Coin.NICKEL);

        expect(vendingMachine.getCurrentAmount()).toEqual(1005);
    });

    it('should accept dimes', function() {
    	vendingMachine.acceptCoin(Coin.DIME);

        expect(vendingMachine.getCurrentAmount()).toEqual(1010);
    });

    it('should accept quarters', function() {
    	vendingMachine.acceptCoin(Coin.QUARTER);

        expect(vendingMachine.getCurrentAmount()).toEqual(1025);
    });

    it('should not accept pennies', function() {
    	vendingMachine.acceptCoin(Coin.PENNY);

        expect(vendingMachine.getCurrentAmount()).toEqual('INSERT COIN');    	
    });

    it('should display "INSERT COIN" when there are no coins inserted', function(){
    	expect(vendingMachine.getCurrentAmount()).toEqual('INSERT COIN');
    });

    it('should accept nickles, dimes and quarters but no pennies', function(){
    	vendingMachine.acceptCoin(Coin.NICKEL);
    	vendingMachine.acceptCoin(Coin.DIME);
    	vendingMachine.acceptCoin(Coin.PENNY);
    	vendingMachine.acceptCoin(Coin.PENNY);
    	vendingMachine.acceptCoin(Coin.QUARTER);

    	expect(vendingMachine.getCurrentAmount()).toEqual(1040);
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
    	expect(vendingMachine.getCurrentAmount()).toEqual(1050);
    });
});