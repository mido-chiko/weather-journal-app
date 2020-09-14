/* Global Variables */
let d = new Date();
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey =  '&appid=77e7d8cc6b60f30033c7e3ea42c9ed83';

// Create a new date instance dynamically with JS
currentMonth = d.getMonth()+1;
let newDate = currentMonth+'.'+ d.getDate()+'.'+ d.getFullYear();

//Adds an event listener
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  if (document.getElementById('zip').value == 0) {
  alert("you must enter zip code");
  }
  else {
const newZip =  document.getElementById('zip').value;
const newFeelings =  document.getElementById('feelings').value;
getTmp(baseURL,newZip, apiKey)

 .then(function(data){
   console.log(data);
   function roundToTwo(num) {
   return +(Math.round(num + "e+2")  + "e-2");
};
// posting data
postData('/add',{date:newDate,temp:roundToTwo(data.main.temp -273.15),content:newFeelings})
updateUI();
})};
};
//fetching data
const getTmp = async (baseURL, zip, key)=>{

  const res = await fetch(baseURL+zip+key)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// post function

const postData = async ( url = '', data = {})=>{

      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

      try {
        const newData = await response.json();
               return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  };
// updating UI
  const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData);
    for (let i in allData) {
    document.getElementById('date').innerHTML = "date: " + allData[i].date;
    document.getElementById('temp').innerHTML = "Tempreature: " + allData[i].temp + "°C";
    document.getElementById('content').innerHTML = "You feel: " + allData[i].content;
  };
  }catch(error){
    console.log("error", error);
  }
};
