/* From Checkout.js */
function applyDiscount (state, totalPrice) {
  // const { totalPrice } = this.props.cartTotals;
  if (state.couponCode === "20OFF" && !state.twentyoffDiscount) {
    state.twentyoffDiscount = true;
    state.coupSuccess = true;
    totalPrice = totalPrice*0.80;
    return "Coupon Successful";
  } else if  (state.couponCode === "20OFF" && state.twentyoffDiscount) {
    return "Code has already been entered!";
    //Alert.error("Code has already been entered!", {effect: 'jelly', position: 'top'});
  } else {
    //Alert.error("Invalid code!", {effect: 'jelly', position: 'top'});
    return "Invalid Code!";
  }
}

module.exports = applyDiscount;
