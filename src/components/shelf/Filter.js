import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { updateFilters } from '../../store/actions/filterActions';

import Checkbox from '../Checkbox';

const availableSizes = [
  'XS',
  'S',
  'M',
  'ML',
  'L',
  'XL',
  'XXL',
  "DM",
];

const availableColours = [
  'Red',
  'Yellow',
  'Blue',
  'Green',
  'Puple',
  'Orange',
  'Black',
  "White",
];

const availableTypes = [
  'T-Shirts',
  'Shorts',
  'Pants',
  'Hoodies',
  'Dresses',
  'Skirts',
  'Jackets',
  "Socks",
];

class Filter extends Component {

  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = (label) => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
  } else {
      this.selectedCheckboxes.add(label);
    }

    this.props.updateFilters(Array.from(this.selectedCheckboxes));
  }

  createCheckbox = (label) => (
    <Checkbox
        classes="filters-available-size"
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={label}
    />
  )

  createSizeCheckbox = () => (
    availableSizes.map(this.createCheckbox)
  )

  createColoursCheckbox = () => (
    availableColours.map(this.createCheckbox)
  )

  createTypeCheckbox = () => (
    availableTypes.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="filters">
        <h4 className="title">Sizes:</h4>
        {this.createSizeCheckbox()}
		  <h4 className="title">Colours:</h4>
        {this.createColoursCheckbox()}
		  <h4 className="title">Types:</h4>
        {this.createTypeCheckbox()}

      </div>
    );
  }
}

Filter.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  filters: PropTypes.array,
}

const mapStateToProps = state => ({
  filters: state.filters.items,
})

export default connect(mapStateToProps, { updateFilters })(Filter);
