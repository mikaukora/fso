import React from 'react';
import { connect } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';


const Filter = (props) => {
  const handleChange = (event) => {
      props.filterChange(event.target.value);
  }

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      <div>
        filter <input onChange={handleChange} />
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  filterChange
}

export default connect(
    null,
    mapDispatchToProps
  )(Filter);