var VendingMachine = function(initialDeposit) {
	this.currentAmount = initialDeposit;
};

VendingMachine.prototype.acceptCoin = function(coin) {
	this.currentAmount += 5;
};

VendingMachine.prototype.getCurrentAmount = function() {
	return this.currentAmount;
};