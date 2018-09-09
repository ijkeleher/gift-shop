/* From src/components/Checkout.js */
function writeToFile(cartProducts, totalPrice) {
  var productDetails = '\n';
  for(var i = 0; i<cartProducts.length; i++){
    productDetails = productDetails + cartProducts[i].title + ',';
  }
  productDetails = productDetails + totalPrice+'\n';
  // fetch(`http://localhost:8001/api/products/write/${productDetails}`);
  return productDetails;
}

module.exports = writeToFile;
