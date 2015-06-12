describe('VendingMachine', function() {
	var vendingMachine = new VendingMachine();

    it('should accept coins', function() {
    	vendingMachine.acceptCoin(Coin.Nickel);

        expect(vendingMachiine.currentAmount()).toEqual(5);
    });    
});