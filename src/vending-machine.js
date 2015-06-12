function identifyCoin(coin) {	
	if(coin.weight === 5 && coin.diameter === 21.21 && coin.thickness === 1.95) {
		return 'nickel';
	}

	if(coin.weight === 2.268 && coin.diameter === 17.91 && coin.thickness === 1.35) {
		return 'dime';
	}

	if(coin.weight === 5.670 && coin.diameter === 24.26 && coin.thickness === 1.75) {
		return 'quarter';
	}

	return 'INVALID_COIN';	 
}

function assignValue(coinType) {
	var coinValue = 0;

	switch(coinType) {
		case 'nickel':
			coinValue = 5;
			break;
		case 'dime':
			coinValue = 10;
			break;
		case 'quarter':
			coinValue = 25;
			break;
		case 'INVALID_COIN':
			coinValue = 0;
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