import { getData, getForecast, setURL } from "./handleData";
import "./style.css";

//getData();
console.log(getForecast());

const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById ('search-bar');
searchIcon.addEventListener ("click", () => {searchLocation(searchBar.value)});

function searchLocation (location) {
    if (!searchBar.value || searchBar.value === ""){return alert ("No location Entered")};
    setURL(location, "2024-12-30");
    getData();
}

// Interface
function initializeInterface () {

}

function createSimpleInterface() {

}

function createResultsInterface() {

}

function changeData() {
    
}
