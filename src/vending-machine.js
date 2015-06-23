var VMK;

(function(VMK){
    'use strict';

    var successfulPurchase;
    var notEnoughMoney;
    var currentAmount;
    var totalSales;
    var coinReturn;

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

        if(successfulPurchase) {
            amount = 'THANK YOU';
        } else {
            for (var i = 0; i < this.insertedCoins.length; i++) {
                coinType = identifyCoin(this.insertedCoins[i]);
                amount += assignValue(coinType);
            }
        }

        return amount;
    }

    VMK.VendingMachine = (function() {
        function VendingMachine(initialDeposit) {
            successfulPurchase = false;
            notEnoughMoney = false;
            currentAmount = 0;
            totalSales = initialDeposit;
            coinReturn = [];

            this.insertedCoins = [];
        }

        VendingMachine.prototype.acceptCoin = function(coin) {
            var coinType = identifyCoin(coin);

            if(coinType === 'INVALID_COIN') {
                coinReturn.push(coin);
            } else {
                this.insertedCoins.push(coin);
            }
        };

        VendingMachine.prototype.displayCurrentAmount = function() {
            if(this.insertedCoins.length === 0 && !successfulPurchase) {
                return 'INSERT COIN';
            } else if(notEnoughMoney) {
                notEnoughMoney = false;
                return 'PRICE';
            } else if(successfulPurchase) {
                successfulPurchase = false;

                return 'THANK YOU';
            } else {
                return getCurrentAmount.call(this);
            }
        };

        VendingMachine.prototype.returnCoins = function() {
            return coinReturn;
        };

        VendingMachine.prototype.dispenseCola = function() {
            if(getCurrentAmount.call(this) >= VMK.Product.COLA.price) {
                this.insertedCoins = [];
                successfulPurchase = true;

                return VMK.Product.COLA;
            } else {
                successfulPurchase = false;
                notEnoughMoney = true;

                return {};
            }
        };

        return VendingMachine;
    })();
})(VMK || (VMK = {}));