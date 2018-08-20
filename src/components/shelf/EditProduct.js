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
    e.preventDefault();
    console.log(this.state.data);
    var userWord = document.getElementById("word").value;
    var userNum = document.getElementById("number").value;

    fetch(`http://localhost:8001/api/products/edit/${userWord}/${userNum}?`);
  }

  gotData = (data) =>{
    console.log(data)
  }


  render() {

    return(
      <div>
        <form onSubmit = {this.editItem}>
          <input type="text" id="word"/>
          <input type="text" id="number"/>
          <button>Go</button>
        </form>
      </div>
    );

  }
}

export default EditProduct;