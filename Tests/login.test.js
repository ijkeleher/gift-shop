const log = require("./login.js");

test('Successful login', () => {
  expect(log("admin","admin")).toBeTruthy();
});

test('Unsuccessful login - nothing is correct', () =>{
  expect(log("pass","word")).toBeFalsy();
});

test('Unsuccessful login - only username is correct', () =>{
  expect(log("admin","word")).toBeFalsy();
});

test('Unsuccessful login - only password is correct', () =>{
  expect(log("pass","admin")).toBeFalsy();
});
