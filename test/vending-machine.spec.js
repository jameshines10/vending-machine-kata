describe('VendingMachine', function() {
	var vendingMachine = null;
	var nickel, dime, quarter = {};

	beforeEach(function(){
		vendingMachine = new VMK.VendingMachine(1000);

		VMK.Coin = {
			NICKEL: {
				weight: 5, // in grams
				diameter: 21.21, // in mm
				thickness: 1.95 // in mm
			},
			DIME: {
				weight: 2.268,
				diameter: 17.91,
				thickness: 1.35
			},
			QUARTER: {
				weight: 5.670,
				diameter: 24.26,
				thickness: 1.75
			},
			PENNY: {
				weight: 2.500,
				diameter: 19.05,
				thickness: 1.52
			}
		}

		nickel = VMK.Coin.NICKEL;
	});

    it('should accept nickels', function() {
    	vendingMachine.acceptCoin(nickel);

        expect(vendingMachine.displayCurrentAmount()).toEqual(5);
    });

    it('should accept dimes', function() {
    	vendingMachine.acceptCoin(VMK.Coin.DIME);

        expect(vendingMachine.displayCurrentAmount()).toEqual(10);
    });

    it('should accept quarters', function() {
    	vendingMachine.acceptCoin(VMK.Coin.QUARTER);

        expect(vendingMachine.displayCurrentAmount()).toEqual(25);
    });

    it('should not accept pennies', function() {
    	vendingMachine.acceptCoin(VMK.Coin.PENNY);

        expect(vendingMachine.displayCurrentAmount()).toEqual('INSERT COIN');    	
    });

    it('should display "INSERT COIN" when there are no coins inserted', function(){
    	expect(vendingMachine.displayCurrentAmount()).toEqual('INSERT COIN');
    });

    it('should accept nickles, dimes and quarters but no pennies', function(){
    	vendingMachine.acceptCoin(VMK.Coin.NICKEL);
    	vendingMachine.acceptCoin(VMK.Coin.DIME);
    	vendingMachine.acceptCoin(VMK.Coin.PENNY);
    	vendingMachine.acceptCoin(VMK.Coin.PENNY);
    	vendingMachine.acceptCoin(VMK.Coin.QUARTER);

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

    	expect(vendingMachine.dispenseCola()).toEqual({});
    	expect(vendingMachine.displayCurrentAmount()).toEqual('PRICE');
    	expect(vendingMachine.displayCurrentAmount()).toEqual(75);
    });
});