import React from 'react'
export default function FetchData (){

  async function fetchd() {
    const response = await fetch("../data/dict.json");
    const datarecord = await response.json();
  
    return datarecord;
  }

  let test = [];
  test = fetchd();

  console.log(test);

  return (
    <div>response</div>
  )


}


