export const SetDataToLocal = (key,value)=>
    localStorage.setItem(key,JSON.stringify(value));

export const GetDataFromLocal = (key) =>
 key && JSON.parse(localStorage.getItem(key));