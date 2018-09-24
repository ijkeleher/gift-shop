import React, { Component } from 'react';

class AddNewItem extends Component{

  generateSKU =(e)=>{
    
    console.log("add item in code");
    var productsLength = this.props.productsLength;
    var SKU = productsLength.toString() + productsLength.toString() + "1";
    var id = productsLength;
    var name = document.getElementById("newProductName").value;
    var price = document.getElementById("newProductPrice").value;
    var freeShipping = document.getElementById("newProductShipping").checked;
    var installments = document.getElementById("newProductInstallments").value;
    fetch(`http://localhost:8001/api/products/addItem/${id}/${SKU}/${name}/${price}/${installments}/${freeShipping}?`);   
    

  }


  render() {

    return(

      <div onSubmit={this.generateSKU} method="post" encType="multipart/form-data" action="/upload">        
        <form>
          <div>Upload item image</div>
          <input type="file" nme="file" id="newProductImage" accept="image/png, image/jpeg" required/>
          <div>Name: </div>
          <input type="text" id="newProductName" placeholder="enter new product name" autoComplete="off" required/>
          <div>Price: </div>
          <input type="number" id="newProductPrice" placeholder="enter new product price" step="0.01" min="0" autoComplete="off" required/>          
          <div>Free Shipping?</div>
          <input type="checkbox" id = "newProductShipping" name="freeShipping" value="Yes" required/>
          <div>Installments: </div>
          <input type="number" id="newProductInstallments" placeholder="enter installments" autoComplete="off" required/>
          <br/>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddNewItem;