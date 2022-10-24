const state = {
	stock: {
		coffeeBeans: 250,
		water: 1000,
	},
	isCoffeeMachineBusy: false
};

const checkAvailability = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if(!state.isCoffeeMachineBusy){
				resolve("Machine Coffee siap digunakan");
			} 
			else{
				reject("Maaf mesin lagi sibuk");
			}
		}, 1000);
	});
}

const checkStock = () => {
	return new Promise((resolve, reject) => {
		state.isCoffeeMachineBusy = true;
		setTimeout(() => {
			if(state.stock.coffeeBeans>=15 && state.stock.water>=250){
				resolve("Stock coffee cukup");
			}
			else {
				reject("Stock coffee tidak cukup");
			}
		}, 1500);
	});
}

const brewCoffee = () => {
	console.log("Membuatkan Kopi");
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Kopi Sudah Siap");
		}, 1500);
	});
}

const boilingWater = () => {
	return new Promise((resolve, reject) => {
		console.log("Memanaskan air...");
		setTimeout(() => {
			resolve("Air panas sudah siap");
		}, 1500);
	});
}	

const grindCoffeeBeans = () => {
	return new Promise((resolve, reject) => {
		console.log("Menggiling biji kopi");
		setTimeout(() => {
			resolve("Biji kopi sudah selesai");
		}, 1500);
	});
}

function makeEspresso(){
	checkAvailability()
		.then((value) => {
			console.log(value);
			return checkStock();
		})
		.then((value) => {
			console.log(value);
			const promise = [boilingWater(), grindCoffeeBeans()];
			return Promise.all(promise);
		})
		.then((value) => {
			console.log(value);
			return brewCoffee();
		})
		.then((value) => {
			console.log(value);
			state.isCoffeeMachineBusy = false;
		})
		.catch(rejectedReason => {
			console.log(rejectedReason);
			state.isCoffeeMachineBusy = false;
		})
}

makeEspresso();
