// Initialize map
var map = L.map('map').setView([26.4436, 88.5147], 8);

// OSM Layer
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Google Layers
var googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});


var darkMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})

// Base Maps
var baseMaps = {
    "Google Streets": googleStreets,
    "OpenStreetMap": osm,
    "Google Satellite": googleSat,
    "Dark Map":darkMap
};

// Layer Control
L.control.layers(baseMaps).addTo(map);

// Icons for categories
const icons = {
    tourist_spot: L.icon({ iconUrl: 'attractions.png', iconSize: [35, 35] }),
    hotels: L.icon({ iconUrl: 'hotel (1).png', iconSize: [35, 35] }),
    hospitals: L.icon({ iconUrl: 'icons/hospital.png', iconSize: [35, 35] }),
    atms: L.icon({ iconUrl: 'icons/atm.png', iconSize: [35, 35] }),
    banks: L.icon({ iconUrl: 'icons/bank.png', iconSize: [35, 35] }),
    restaurants: L.icon({ iconUrl: 'icons/restaurant.png', iconSize: [35, 35] }),
    nursing_homes: L.icon({ iconUrl: 'icons/nursing_home.png', iconSize: [35, 35] }),
    bus_depots: L.icon({ iconUrl: 'icons/bus.png', iconSize: [35, 35] }),
    railway_stations: L.icon({ iconUrl: 'icons/train.png', iconSize: [35, 35] }),
    airports: L.icon({ iconUrl: 'icons/airport.png', iconSize: [35, 35] }),
};

// Helper function to create GeoJSON layers dynamically
function createGeoJSONLayer(data, icon) {
    return L.geoJSON(data, {
        pointToLayer: (feature, latlng) => L.marker(latlng, { icon: icon }),
    });
}

// GeoJSON Data
var geojsonData = {
    alipurduar: {
        tourist_spot: createGeoJSONLayer(alipurduar_tourist, icons.tourist_spot),
        hotels: createGeoJSONLayer(alipurduar_hotels, icons.hotels),
        // hospitals: createGeoJSONLayer(tourist_cooch_GeoJSON, icons.hospitals),
    },
    cooch_bihar: {
        tourist_spot: createGeoJSONLayer(coochbihar_tourist, icons.tourist_spot),
        hotels: createGeoJSONLayer(coochbihar_hotels, icons.hotels),
        // hospitals: createGeoJSONLayer(tourist_cooch_GeoJSON, icons.hospitals),
    },
    darjeeling: {
        tourist_spot: createGeoJSONLayer(darjiling_tourist, icons.tourist_spot),
        hotels: createGeoJSONLayer(darjiling_hotels , icons.hotels),
        // hospitals: createGeoJSONLayer(tourist_cooch_GeoJSON, icons.hospitals),
    },
    kalimpong: {
        tourist_spot: createGeoJSONLayer(kalingpong_tourist , icons.tourist_spot),
        hotels: createGeoJSONLayer(kalingpong_hotels, icons.hotels),
        // hospitals: createGeoJSONLayer(tourist_cooch_GeoJSON, icons.hospitals),
    },
    jalpaiguri: {
        tourist_spot: createGeoJSONLayer(jalpaiguri_tourist, icons.tourist_spot),
        hotels: createGeoJSONLayer(jalpaiguri_hotels, icons.hotels),
        // hospitals: createGeoJSONLayer(tourist_cooch_GeoJSON, icons.hospitals),
    },
    kurseong: {
        tourist_spot: createGeoJSONLayer(kurseong_tourist, icons.tourist_spot),
        hotels: createGeoJSONLayer(kurseong_hotels, icons.hotels),
        // hospitals: createGeoJSONLayer(tourist_cooch_GeoJSON, icons.hospitals),
        // hosp: createGeoJSONLayer(tourist_cooch_GeoJSON, icons.hospitals),
    },
    // Add other states as needed...
};

// Populate dropdowns
const stateSelect = document.getElementById('state-select');
const categorySelect = document.getElementById('category-select');
const pointList = document.getElementById('point-list');
const leftSidebar = document.getElementById('left-sidebar');
let currentLayer = null;

// Toggle Sidebar
function toggleLeftSidebar(show) {
    if (show) {
        leftSidebar.classList.add('active');
    } else {
        leftSidebar.classList.remove('active');
    }
}

var dynamicLayerGroup = L.layerGroup().addTo(map);

// Populate the point list and map markers
function populatePointListAndMarkers(features, selectedCategory) {
    pointList.innerHTML = '';

    // Clear previous markers
    if (dynamicLayerGroup) {
        dynamicLayerGroup.clearLayers();
        map.removeLayer(dynamicLayerGroup);
    }

    dynamicLayerGroup.clearLayers(); // Create a new layer group for the selected category.

    const markerMap = new Map(); // To associate markers with their list items

    features.forEach((feature) => {
        const { Name } = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;

        // Create a list item for the sidebar
        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', `${lat}-${lng}`);
        listItem.innerHTML = `
            <div>
                <h2 contenteditable="true" class="editable-name">${Name || 'Unnamed Point'}</h2>
                <p>Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}</p>
            </div>`;
        pointList.appendChild(listItem);

        // Add event listener to update the point name
        listItem.querySelector('.editable-name').addEventListener('blur', (event) => {
            const newName = event.target.innerText.trim();
            if (newName) {
                feature.properties.Name = newName;
                marker.bindPopup(`<h2>${newName}</h2><p>Coordinates: [${lat}, ${lng}]</p>`);
            } else {
                event.target.innerText = Name;
            }
        });

        // Create a marker
        const marker = L.marker([lat, lng], { icon: icons[selectedCategory] || icons.tourist_spot });
        marker.bindPopup(`<h2>${Name || 'Unnamed Point'}</h2><p>Coordinates: [${lat}, ${lng}]</p>`);

        // Add marker click behavior
        marker.on('click', () => {
            map.setView([lat, lng], 13.7);
            document.querySelectorAll('#point-list li').forEach((item) => item.classList.remove('active'));
            listItem.classList.add('active');
            listItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        // Associate marker with list item for reverse interaction
        markerMap.set(listItem, marker);

        // Add marker to the layer group
        dynamicLayerGroup.addLayer(marker);
    });

    // Add click behavior to list items to zoom to marker and open its popup
    pointList.querySelectorAll('li').forEach((item) => {
        item.addEventListener('click', () => {
            const marker = markerMap.get(item);
            if (marker) {
                map.setView(marker.getLatLng(), 14.4);
                marker.openPopup();
                document.querySelectorAll('#point-list li').forEach((li) => li.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    dynamicLayerGroup.addTo(map); // Add the new layer group to the map.
}



// State Selection
stateSelect.addEventListener('change', () => {
    const selectedState = stateSelect.value;
    categorySelect.innerHTML = '<option value="">Select Category</option>';

    if (geojsonData[selectedState]) {
        Object.keys(geojsonData[selectedState]).forEach((category) => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.replace('_', ' ').toUpperCase();
            categorySelect.appendChild(option);
        });
    }
});

// Category Selection
categorySelect.addEventListener('change', () => {
    const selectedState = stateSelect.value;
    const selectedCategory = categorySelect.value;

    if (currentLayer) map.removeLayer(currentLayer); // Remove the currently displayed category.

    if (geojsonData[selectedState] && geojsonData[selectedState][selectedCategory]) {
        currentLayer = geojsonData[selectedState][selectedCategory];
        currentLayer.addTo(map);

        const features = currentLayer.toGeoJSON().features;
        populatePointListAndMarkers(features, selectedCategory);
        toggleLeftSidebar(true);
    } else {
        toggleLeftSidebar(false);
    }
});


