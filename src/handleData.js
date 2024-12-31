let url;
let forecast = JSON.parse(localStorage.getItem('forecast'));
let today = new Date();

function setDate () {
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth()).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    // console.log (today);
}


if (!forecast) {
    forecast = {};
}

const setURL = (location) => {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}?unitGroup=metric&key=MAXAK2LZCNLM87S8PFP883Z5Y`;
}

// setURL(location, date);

const getUrl = () => url;

async function getData() {
    let url = getUrl();
    
    try {
        const response = await fetch(url, {mode: 'cors'});
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await response.json();
        console.log(json);
        let todaysData = json.days[0];
        fillInfo(todaysData);
        forecast.address = capitalizeFirstLetter(json.address);
    } catch (error) {
        console.error(error.message);
    }
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase()+String(val).slice(1);
}

const getForecast = () => forecast;

const testData = {
    description: "This is a description of the weather",
    temp: Math.floor(Math.random() * 40),
    tempFeels: Math.floor(Math.random() * 40),
    tempmax: Math.floor(Math.random() * 40),
    tempmin: Math.floor(Math.random() * 40),
    humidity: Math.floor(Math.random() * 100),
    dewPoint: Math.floor(Math.random() * 40),
    precipprob: Math.floor(Math.random() * 100),
}

function fillInfo(data) {
    forecast.description = data.description;
    forecast.currTemp = data.temp;
    forecast.feelsLike = data.feelslike;
    forecast.tempMax = data.tempmax;
    forecast.tempMin = data.tempmin;
    forecast.humidity = data.humidity;
    forecast.dewPoint = data.dew;
    forecast.precipChance = data.precipprob;
    localStorage.setItem('forecast', JSON.stringify(forecast));
}

export {getData, getForecast, setURL, fillInfo, setDate};

