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
	this.successfulPurchase = false;
	this.currentAmount = 0;
	this.totalSales = initialDeposit;
	this.coinReturn = [];
	this.insertedCoins = [];
};

VendingMachine.prototype.acceptCoin = function(coin) {
	var coinType = identifyCoin(coin);

	if(coinType === 'INVALID_COIN') {
		this.coinReturn.push(coin);
	} else {
		this.insertedCoins.push(coin);
		this.currentAmount += assignValue(coinType);
	}
};

VendingMachine.prototype.displayCurrentAmount = function() {
	if(this.insertedCoins.length === 0 && !this.successfulPurchase) {
		return 'INSERT COIN';
	} else {
		this.successfulPurchase = false;
		return this.currentAmount;
	}	
};

VendingMachine.prototype.returnCoins = function() {
	return this.coinReturn;
};

VendingMachine.prototype.dispenseCola = function() {
	if(this.currentAmount >= 100) {
		this.currentAmount = 'THANK YOU';
		this.insertedCoins = [];
		this.successfulPurchase = true;

		return Product.COLA;	
	}
};