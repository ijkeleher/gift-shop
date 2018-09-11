import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Facebook extends Component{
  /*data we retrieve from the facebook login object*/
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  }

  responseFacebook = response => {
    console.log(response);
    sessionStorage.setItem("loginData", response);
    /*test fetching of user name from auth object*/
    console.log("Hello " + response.name + "welcome to the RMIT giftshop");
  }

  componentClicked = () => console.log("clicked");

  render() {
    /*init var for button functionality*/
    let fbContent;

    if(this.state.isLoggedIn){
      fbContent = null;
    } else {
      /*grab the data*/
      fbContent = (<FacebookLogin
        /*this is the appID registed on developers.facebook.com*/
        appId="332073414030996"
        autoLoad="false"
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />)
    }

    return (
      <div>
      {/*the button*/}
      {fbContent}
      </div>
    )
  }
}
