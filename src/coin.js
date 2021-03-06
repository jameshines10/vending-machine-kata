var VMK;

(function(VMK){
	VMK.Coin = (function(){
		return {
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
	})()
})(VMK || (VMK = {}));