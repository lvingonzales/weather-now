let url;
const location = `kingston`;
const date = `2000-12-30`;
const forecast = {};

const setURL = (location, date) => {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?unitGroup=metric&key=MAXAK2LZCNLM87S8PFP883Z5Y`;
}

setURL(location, date);

const getUrl = () => url;

async function getData() {
    let url = getUrl();
    
    try {
        const reponse = await fetch(url, {mode: 'cors'});
        if (!reponse.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await reponse.json();
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

function fillInfo(data) {
    forecast.description = data.description;
    forecast.currTemp = data.temp;
    forecast.tempMax = data.tempmax;
    forecast.tempMin = data.tempmin;
    forecast.humidity = data.humidity;
    forecast.precipChance = data.precipprob;
}

export {getData, getForecast};
