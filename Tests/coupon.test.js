const coup = require("./coupon.js");

var state = {
  couponCode: false,
  coupSuccess: false,
  twentyoffDiscount: false,
};

function setState(coupCode, coupSucc, disc) {
  state.couponCode = coupCode;
  state.coupSuccess = coupSucc;
  state.twentyoffDiscount = disc;
}

test("Successful Coupon", () => {
  setState("20OFF", false, false);
  expect(coup(state)).toEqual("Coupon Successful");
});

test("Reusing Coupon", () => {
  setState("20OFF", true, true);
  expect(coup(state)).toEqual("Code has already been entered!");
});

test("Incorrect Coupon", () => {
  setState("aodj", false, false);
  expect(coup(state)).toEqual("Invalid Code!");
});
