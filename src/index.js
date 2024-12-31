import { fillInfo, getData, getForecast, setDate, setURL } from "./handleData";
import "./style.css";

//getData();
//console.log(getForecast());
const degreeSymbol = '\u00b0'
const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById ('search-bar');
searchIcon.addEventListener ("click", () => {searchLocation(searchBar.value)});

const card = document.getElementById('card');

async function searchLocation (location) {
    if (!searchBar.value || searchBar.value === ""){return alert ("No location Entered")};
    setURL(location);
    await getData();
    card.classList.remove('hidden');
    changeData(getForecast());
}

// Interface
function initializeInterface () {
    setDate();
    let forecast = getForecast();
    if (!forecast.description || forecast.description === "") {
        card.classList.add('hidden');
    }
}

function createResultsInterface() {

}

function changeData(forecast) {
    const location = document.getElementById('location');
    location.textContent = forecast.address;

    const description = document.getElementById('description');
    description.textContent = forecast.description;

    const tempDisplay = document.getElementById('c-temp-disp');
    const tempInfo = document.getElementById('c-temp-info');
    tempDisplay.textContent = `${forecast.currTemp}${degreeSymbol}`;
    tempInfo.textContent = `Feels like ${forecast.feelsLike}${degreeSymbol}`;

    const minTempDisplay = document.getElementById('min-temp-disp');
    const minTempInfo = document.getElementById('min-temp-info');
    minTempDisplay.textContent = `${forecast.tempMin}${degreeSymbol}`;
    minTempInfo.textContent = `Today's lowest`;

    const maxTempDisplay = document.getElementById('max-temp-disp');
    const maxTempInfo = document.getElementById('max-temp-info');
    maxTempDisplay.textContent = `${forecast.tempMax}${degreeSymbol}`;
    maxTempInfo.textContent = `Today's highest`;

    const humidityDisplay = document.getElementById('humidity-disp');
    const humidityInfo = document.getElementById('humidity-info');
    humidityDisplay.textContent = `${forecast.humidity}`;
    humidityInfo.textContent = `The dew point is ${forecast.dewPoint}`;

    const precipChanceDisplay = document.getElementById('precip-chance-disp');
    const precipChacneInfo = document.getElementById('precip-chance-info');
    precipChanceDisplay.textContent = `${forecast.precipChance}%`;
    precipChacneInfo.textContent = `Chance of rain`;
}

initializeInterface();
