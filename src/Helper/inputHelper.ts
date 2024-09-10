import React from 'react'


// this function is used to assign the value of an input field to the corresponding instance object.
function inputHelper(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, data: any) {
  const tempData: any = {...data};
  tempData[e.target.name] = e.target.value;
  return tempData;
}

export default inputHelper;