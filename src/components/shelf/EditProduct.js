import React, { Component } from 'react';
import axios from 'axios';

class EditProduct extends Component {

  state = {
    data: null
  }

  componentDidMount() {
    fetch("https://storage.googleapis.com/rmit-giftshop/products.json")
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  editItem = (e) => {

    var userNum = document.getElementById("number").value;
    var userName = document.getElementById("name").value;  

    if(userNum.length>0){
      var index = 0;  
      for (var i=0; i < this.state.data.products.length; i++) {
        if (this.state.data.products[i].title.localeCompare(this.props.title)===0) {
          index = i;          
          axios.get(`http://localhost:8001/api/products/edit/${index}/${userNum}?`).then(res=>{
            if(userName.length>0){
              index = 0;  
              for (i=0; i < this.state.data.products.length; i++) {
                if (this.state.data.products[i].title.localeCompare(this.props.title)===0) {
                  index = i;
                  console.log("new name is: " + userName)
                  fetch(`http://localhost:8001/api/products/edit/name/${index}/${userName}?`);   
                }
              }
            }
          });
        }
      }
    }
    
  }

  render() {

    return(
      <div className="edit-product-menu">
        <form onSubmit = {this.editItem}>
          <div>Price: </div>
          <input type="number" id="number" placeholder="enter new product price" step="0.01" min="0" autoComplete="off"/>
          <div>Name: </div>
          <input type="text" id="name" placeholder="enter new product name" autoComplete="off"/>
          <button>Submit</button>
        </form>
      </div>
    );

  }
}

export default EditProduct;