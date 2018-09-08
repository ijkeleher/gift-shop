const filewrite = require('./filewrite.js');

/* Some dummy varibales */
var prod1 = {
  id: 0,
	sku: "000",
	title: "Blah",
	description: "",
	avaliableSizes: [""],
	avaliableTypes: ["MISC"],
	avaliableGenders: [""],
	style: "",
	price: 1,
	installments: 1,
	currencyID: "USD",
	currencyFormat: "$",
	isFreeShipping: false,
	quantity: 1,
};

var prod2 = {
  id: 1,
	sku: "111",
	title: "Foo",
	description: "",
	avaliableSizes: [
    0:"L",
    1:"XL",
    2:"S",
  ],
	avaliableTypes: ["ClO"],
	avaliableGenders: ["U"],
	style: "",
	price: 5,
	installments: 1,
	currencyID: "USD",
	currencyFormat: "$",
	isFreeShipping: false,
	quantity: 1,
};

/* our dummy cart */
var products = [];

/* The tests */
test('Writing to file one product', () => {
  products[0] = prod1;
  var totalPrice = prod1.price;
  expect(filewrite(products, totalPrice)).toEqual("\nBlah,1\n");
});

test('Writing to file multiple instances of one product', () => {
  prod1.quantity = 2;
  products[0] = prod1;
  var totalPrice = prod1.price * prod1.quantity;
  expect(filewrite(products, totalPrice)).toEqual("\nBlah,2\n");
});

test('Writing to file more than one product', () => {
  prod1.quantity = 1;
  products[0] = prod1;
  products[1] = prod2;
  var totalPrice = prod1.price + prod2.price;
  expect(filewrite(products, totalPrice)).toEqual("\nBlah,Foo,6\n");
});
