import React, { Component } from 'react';


class EditProduct extends Component {

  state = {
    data: null
  }

  componentDidMount() {
    fetch("http://localhost:8001/api/products")
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  editItem = (e) => {
    //e.preventDefault();
    console.log(this.state.data);
    //var userWord = document.getElementById("word").value;
    var userNum = document.getElementById("number").value;
    var index = 0;
    console.log("title is: " + this.props.title);
    console.log(this.state.data.products[0].title);
    console.log(this.state.data.products.length);

    for (var i=0; i < this.state.data.products.length; i++) {
      console.log(i);
      if (this.state.data.products[i].title.localeCompare(this.props.title)===0) {
        index = i;
        console.log("index is: " + index);
        fetch(`http://localhost:8001/api/products/edit/${index}/${userNum}?`);
 
      }
    }
  }


  render() {

    return(
      <div>
        <form onSubmit = {this.editItem}>
          <input type="number" id="number"/>
          <button>Go</button>
        </form>
      </div>
    );

  }
}

export default EditProduct;