import React from 'react';

const CurrentCity = ({ cityName }) => {
  return (
    <div>
      <div className='white f1'>
        {`${cityName}:`}
      </div>
    </div>
  );
}

export default CurrentCity;