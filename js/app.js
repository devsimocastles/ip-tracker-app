

// 192.212.174.101

//============= HTML NODES =================
const ip_value = document.getElementById("ip");
const location_value = document.getElementById("location");
const timezone_value = document.getElementById("timezone");
const isp_value = document.getElementById("isp");

//************* SEARCH BAR *****************
const search_bar = document.getElementById("search-bar");

//$$$$$$$$$$$$$ SEARCH FORM $$$$$$$$$$$$$$$$
const search_form = document.getElementById("search-form");






//;;;;;;;;;;;;;;; ADDING EVENTS ;;;;;;;;;;;;;;;;;;;;;;;;

/// GET USER IP ON PAGE LOAD
const apiOnLoadRequest = `https://geo.ipify.org/api/v2/country,city?apiKey=at_uTOKVPwFmwCwDjhux0kaw6NFNO5oo`;
window.onload = () => {
    fetch(apiOnLoadRequest)
        .then(result => {
            if (result.ok) return result.json();
        })
        .then(ipData => updateData(ipData));
};

/// IP SEARCH WHEN USER SUBMITS 
search_form.onsubmit = (e) => {
    e.preventDefault();
    let query = search_bar.value;
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_uTOKVPwFmwCwDjhux0kaw6NFNO5oo&ipAddress=${query}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("No IP has been found.");
                return;
            }
        }).then(ipData => {
            // removes the current map
            if (map != undefined) {
                let mapDiv = document.getElementById("map");
                document.body.removeChild(mapDiv);
            }
            // append new map
            let mapDiv = document.createElement("div");
            mapDiv.id = "map";
            document.body.appendChild(mapDiv);
            updateData(ipData);
        });
};



//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

function buildMap(ipData){

    let map = L.map('map').setView([ipData.location.lat, ipData.location.lng], 13);
    
    let blackMarker = L.icon({
        iconUrl: '../images/icon-location.svg',

        iconSize: [50, 65], // size of the icon
        iconAnchor: [25, 32.5], // point of the icon which will correspond to marker's location
    });
    let marker = L.marker([ipData.location.lat, ipData.location.lng], { icon: blackMarker }).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

function updateData(ipData) {
    // UPDATING AND SHOWING VALUES //////////////////////////////
    ip_value.innerText = ipData.ip;
    location_value.innerText = ipData.location.city + ", " + ipData.location.region + ", " + ipData.location.country;
    timezone_value.innerText = ipData.location.timezone;
    isp_value.innerText = ipData.isp;

    // SHOWING THE MAP //////////////////////////////////////////

    buildMap(ipData);
}





// custom search api url https://geo.ipify.org/api/v2/country,city?apiKey=at_uTOKVPwFmwCwDjhux0kaw6NFNO5oo&ipAddress=


















