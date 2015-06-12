describe('VendingMachine', function() {
	var vendingMachine = new VendingMachine(1000);

    it('should accept coins', function() {
    	vendingMachine.acceptCoin(Coin.NICKEL);

        expect(vendingMachine.getCurrentAmount()).toEqual(1005);
    });    
});