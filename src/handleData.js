let url;
let forecast = JSON.parse(localStorage.getItem('forecast'));
let today = new Date();

function setDate () {
    let dd = String(today.getDate()).padStart(2, '0');
    let month = today.toLocaleString('default', {month: 'long'});
    let yyyy = today.getFullYear();
    today = `${month} ${dd}, ${yyyy}`;
    return today;
}


if (!forecast) {
    forecast = {};
}

const setURL = (location) => {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=MAXAK2LZCNLM87S8PFP883Z5Y`;
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
        fillInfo(json);
        forecast.address = capitalizeFirstLetter(json.address);
    } catch (error) {
        console.error(error.message);
    }
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase()+String(val).slice(1);
}

const getForecast = () => forecast;

function fillInfo(data) {
    forecast.description = data.description;
    forecast.currTemp = data.currentConditions.temp;
    forecast.feelsLike = data.currentConditions.feelslike;
    forecast.tempMax = data.days[0].tempmax;
    forecast.tempMin = data.days[0].tempmin;
    forecast.humidity = data.currentConditions.humidity;
    forecast.dewPoint = data.currentConditions.dew;
    forecast.precipChance = data.currentConditions.precipprob;
    localStorage.setItem('forecast', JSON.stringify(forecast));
}

export {getData, getForecast, setURL, fillInfo, setDate};

