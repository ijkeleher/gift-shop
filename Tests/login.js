/* From src/components/AdminLogin.js */
function logIn (username, password) {

  /* var username = document.getElementById("username").value;
   * var password = document.getElementById("password").value;
   */

  if( (username.localeCompare("admin") === 0) && (password.localeCompare("admin") === 0)){
  //  localStorage.setItem("isLoggedIn", true);
    return true;
  }
  else{
  //  localStorage.clear();
    return false;
  }
}
module.exports = logIn;
