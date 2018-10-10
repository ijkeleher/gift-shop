import React, { Component } from 'react';
import axios from 'axios';

class AddNewItem extends Component{

  state = {
    description: '',
    selectedFile: '',
    showMenu: false
  };

  generateSKU =(e)=>{
    
    console.log("add item in code");
    var productsLength = this.props.productsLength;
    var SKU = productsLength.toString() + productsLength.toString() + "1";
    var id = productsLength;
    var name = document.getElementById("newProductName").value;
    var price = document.getElementById("newProductPrice").value;
    var freeShipping = document.getElementById("newProductShipping").checked;
    var installments = document.getElementById("newProductInstallments").value;

    const { description, selectedFile } = this.state;
    let formData = new FormData();

    formData.append('description', description);
    formData.append('selectedFile', selectedFile);

    fetch(`http://localhost:8001/api/products/addItem/${id}/${SKU}/${name}/${price}/${installments}/${freeShipping}?`);

    console.log("Selected file is: " + this.state.selectedFile);
    axios.post('http://localhost:8001/api/products/upload', formData)
          .then((result) => {
            // access results...
    });
    

  }

  onChange =(e)=>{

    switch (e.target.name) {
      case 'selectedFile':
        this.setState({ selectedFile: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }

    /*
    this.setState({ 
      selectedFile: e.target.files[0].name
    });
    
    console.log("selected file is: " + this.state.selectedFile);
    */


  }

  showMenu =(e)=>{

    if(this.state.showMenu == true){
      this.setState({
        showMenu: false
      }) 
    }
    else{
      this.setState({
        showMenu: true
      }) 
    }


  }


  render() {
    const showMenu = this.state.showMenu;

    return(
      <div>
        <div className = "add-new-item-title" onClick = {this.showMenu}>Add New Item</div>
        
        {this.state.showMenu && 
          <div className = "add-new-item" onSubmit={this.generateSKU} method="post" encType="multipart/form-data" action="/upload">        
            <form>
              <div>Upload item image</div>
              <input type="file" onChange={this.onChange} name="selectedFile" id="newProductImage" accept="image/png, image/jpeg, image/jpg" required/>
              <div>Name: </div>
              <input type="text" id="newProductName" placeholder="enter new product name" autoComplete="off" required/>
              <div>Price: </div>
              <input type="number" id="newProductPrice" placeholder="enter new product price" step="0.01" min="0" autoComplete="off" required/>          
              <div>Free Shipping?</div>
              <input type="checkbox" id = "newProductShipping" name="freeShipping" value="Yes"/>
              <div>Installments: </div>
              <input type="number" id="newProductInstallments" placeholder="enter installments" autoComplete="off" required/>
              <br/>
              <button>Submit</button>
            </form>
          </div>
        }
      </div>

    );
  }
}

export default AddNewItem;