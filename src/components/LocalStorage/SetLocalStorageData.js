export const SetDataToLocal = (key,value)=>
    localStorage.setItem(key,JSON.stringify(value));

export const GetDataFromLocal = (key) =>
    key && JSON.parse(localStorage.getItem(key));

export const AddToLocalStorageArray = (key, value)=>{
    let existing = localStorage.getItem(key);
	existing = existing ? existing.split(',') : [];
	existing.push(value);
	localStorage.setItem(key, existing.toString());
}