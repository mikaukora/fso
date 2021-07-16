import React from 'react';
import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux'


const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
      dispatch(filterChange(event.target.value));
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

export default Filter;
