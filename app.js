const apiKey = 'at_HvdyNlQ96b2nZWMPsLtzcbIWqlukp';
const btn = document.querySelector('button');
const input = document.querySelector('input');
const ipOut = document.querySelector('#ip-out');
const locOut = document.querySelector('#loc-out');
const zoneOut = document.querySelector('#zone-out');
const ispOut = document.querySelector('#isp-out');


let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let marker = L.marker([51.5, -0.09]);

const fetchAndUpdate = ()=>{
    map.removeLayer(marker);
    // Make a request to the IP Geolocation API
    let ipAddress = input.value;
    const apiEndpoint = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAddress}`;
    fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
    let locationName = data.location.country + " " + data.location.region;
    setMapViewByLocationName(locationName);
    showData(data);  
    })
    .catch(error => alert('Please enter a valid IP adress'));
};
btn.addEventListener('click', fetchAndUpdate);
input.addEventListener("keyup", (event)=> {
    if (event.keyCode === 13) {
        event.preventDefault();
        btn.click();
    }
});
const setMapViewByLocationName= (locationName) =>{
    // Make a request to the Mapbox Geocoding API
    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(locationName) + '.json?access_token=pk.eyJ1Ijoic2hlZmExIiwiYSI6ImNsaHAxa29ocjFtczQzcm9kN2J5NXFyY2kifQ.rIHHwZj6gjA3IFFPuWUqzw')
    .then(response => response.json())
    .then((data)=>{
        let coordinates = data.features[0].center; 
        map.setView([coordinates[1], coordinates[0]], 12);
        marker = L.marker([coordinates[1], coordinates[0]]).addTo(map);
    });
};
const showData = (data)=>{
    ipOut.textContent = data.ip;
    locOut.textContent = data.location.country + ", " + data.location.region;
    zoneOut.textContent = data.location.timezone ;
    ispOut.textContent = data.isp;
};