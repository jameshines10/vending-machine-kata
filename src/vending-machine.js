function identifyCoin(coin) {	
	if(coin.weight === 5 && coin.diameter === 21.21 && coin.thickness === 1.95) {
		return 'nickel';
	}	 
}

function assignValue(coinType) {
	var coinValue = 0;

	switch(coinType) {
		case 'nickel':
			coinValue = 5;
			break;
	}

	return coinValue;
}

var VendingMachine = function(initialDeposit) {
	this.currentAmount = initialDeposit;
};

VendingMachine.prototype.acceptCoin = function(coin) {
	var coinType = identifyCoin(coin);

	this.currentAmount += assignValue(coinType);
};

VendingMachine.prototype.getCurrentAmount = function() {
	return this.currentAmount;
};