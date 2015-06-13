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

function getCurrentAmount(){
	var coinType = null;
	var amount = null;

    if(this.successfulPurchase) {
         amount = 'THANK YOU';
    } else {
        for (var coin in this.insertedCoins) {
            coinType = identifyCoin(this.insertedCoins[coin]);
            amount += assignValue(coinType);
        }
    }

	return amount;
}

var VendingMachine = function(initialDeposit) {
	this.successfulPurchase = false;
    this.notEnoughMoney = false;
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
	}
};

VendingMachine.prototype.displayCurrentAmount = function() {
	if(this.insertedCoins.length === 0 && !this.successfulPurchase) {
		return 'INSERT COIN';
	} else if(this.notEnoughMoney) {
        this.notEnoughMoney = false;
        return 'PRICE';
    } else if(this.successfulPurchase) {
        this.successfulPurchase = false;

        return 'THANK YOU';
    } else {
		return getCurrentAmount.call(this);
	}	
};

VendingMachine.prototype.returnCoins = function() {
	return this.coinReturn;
};

VendingMachine.prototype.dispenseCola = function() {
	if(getCurrentAmount.call(this) >= Product.COLA.price) {
		this.insertedCoins = [];
		this.successfulPurchase = true;

		return Product.COLA;	
	} else {
		this.successfulPurchase = false;
        this.notEnoughMoney = true;

        return {};
	}
};