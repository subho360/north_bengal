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


var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	// minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

var Thunderforest_TransportDark = L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	// apikey: '<your apikey>',
	maxZoom: 22
});

var Thunderforest_SpinalMap = L.tileLayer('https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	// apikey: '<your apikey>',
	maxZoom: 22
});

// Base Maps
var baseMaps = {
    "Google Streets": googleStreets,
    "OpenStreetMap": osm,
    "Google Satellite": googleSat,
    "Dark Map":Stadia_AlidadeSmoothDark,
    "Thunderforest_TransportDark":Thunderforest_TransportDark,
    "Thunderforest_SpinalMap":Thunderforest_SpinalMap
};

// Layer Control
L.control.layers(baseMaps).addTo(map);

// Icons for categories
const icons = {
    tourist_spot: L.icon({ iconUrl: 'attractions.png', iconSize: [35, 35] }),
    hotels: L.icon({ iconUrl: 'hotel (1).png', iconSize: [35, 35] }),
    hospitals: L.icon({ iconUrl: 'hospital.png', iconSize: [35, 35] }),
    medical_shop: L.icon({ iconUrl: 'healthcare.png', iconSize: [35, 35] }),
    atms: L.icon({ iconUrl: 'atm-location.png', iconSize: [35, 35] }),
    banks: L.icon({ iconUrl: 'icons/bank.png', iconSize: [35, 35] }),
    restaurants: L.icon({ iconUrl: 'restaurant.png', iconSize: [35, 35] }),
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
        hospitals: createGeoJSONLayer(alipurduar_hospitals, icons.hospitals),
        medical_shop: createGeoJSONLayer(alipurduar_medicalcenter, icons.medical_shop),
        atms: createGeoJSONLayer(alipurduar_atm, icons.atms),
        restaurants: createGeoJSONLayer(alipurduar_resturent, icons.restaurants),
    },
    cooch_bihar: {
        tourist_spot: createGeoJSONLayer(coochbihar_tourist, icons.tourist_spot),
        hotels: createGeoJSONLayer(coochbihar_hotels, icons.hotels),
        hospitals: createGeoJSONLayer(coochbihar_hospitals, icons.hospitals),
        medical_shop: createGeoJSONLayer(coochbihar_medicalcenter, icons.medical_shop),
        atms: createGeoJSONLayer(coochbihar_atm, icons.atms),
        restaurants: createGeoJSONLayer(coochbihar_resturent, icons.restaurants),
    },
    darjeeling: {
        tourist_spot: createGeoJSONLayer(darjiling_tourist, icons.tourist_spot),
        hotels: createGeoJSONLayer(darjiling_hotels , icons.hotels),
        hospitals: createGeoJSONLayer(darjiling_hospitals, icons.hospitals),
        medical_shop: createGeoJSONLayer(darjiling_medicalcenter, icons.medical_shop),
        atms: createGeoJSONLayer(darjiling_atm, icons.atms),
        restaurants: createGeoJSONLayer(darjiling_resturent, icons.restaurants),
    },
    kalimpong: {
        tourist_spot: createGeoJSONLayer(kalingpong_tourist , icons.tourist_spot),
        hotels: createGeoJSONLayer(kalingpong_hotels, icons.hotels),
        hospitals: createGeoJSONLayer(kalingpong_hospitals, icons.hospitals),
        medical_shop: createGeoJSONLayer(kalingpong_medicalcenter, icons.medical_shop),
        atms: createGeoJSONLayer(kalingpong_atm, icons.atms),
        restaurants: createGeoJSONLayer(kalingpong_resturent, icons.restaurants),
    },
    jalpaiguri: {
        tourist_spot: createGeoJSONLayer(jalpaiguri_tourist, icons.tourist_spot),
        hotels: createGeoJSONLayer(jalpaiguri_hotels, icons.hotels),
        hospitals: createGeoJSONLayer(jalpaiguri_hospitals, icons.hospitals),
        medical_shop: createGeoJSONLayer(jalpaiguri_medicalcenter, icons.medical_shop),
        atms: createGeoJSONLayer(jalpaiguri_atm, icons.atms),
        restaurants: createGeoJSONLayer(jalpaiguri_resturent, icons.restaurants),
    },
    kurseong: {
        tourist_spot: createGeoJSONLayer(kurseong_tourist, icons.tourist_spot),
        hotels: createGeoJSONLayer(kurseong_hotels, icons.hotels),
        hospitals: createGeoJSONLayer(kurseong_hospitals, icons.hospitals),
        medical_shop: createGeoJSONLayer(kurseong_medicalcenter, icons.medical_shop),
        atms: createGeoJSONLayer(kurseong_atm, icons.atms),
        restaurants: createGeoJSONLayer(kurseong_resturent, icons.restaurants),
        
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
// Category Selection
// Category Selection
categorySelect.addEventListener('change', () => {
    const selectedState = stateSelect.value;
    const selectedCategory = categorySelect.value;

    // Remove the current layer if it exists
    if (currentLayer) {
        map.removeLayer(currentLayer);
        currentLayer = null;
    }

    if (geojsonData[selectedState] && geojsonData[selectedState][selectedCategory]) {
        currentLayer = geojsonData[selectedState][selectedCategory];
        currentLayer.addTo(map);

        const features = currentLayer.toGeoJSON().features;

        // Adjust map to fit bounds of the features with smooth animation
        if (features.length > 0) {
            const bounds = L.geoJSON(currentLayer.toGeoJSON()).getBounds();
            map.flyToBounds(bounds, { padding: [20, 20], duration: 1.5 });
        }

        // Populate the list and show sidebar
        populatePointListAndMarkers(features, selectedCategory);
        toggleLeftSidebar(true);
    } else {
        // Hide sidebar and reset zoom with animation
        toggleLeftSidebar(false);
        map.flyTo([26.4436, 88.5147], 8, { duration: 1.5 }); // Reset to default view
    }
});

// Updated populatePointListAndMarkers function for smooth animations
function populatePointListAndMarkers(features, selectedCategory) {
    pointList.innerHTML = '';

    // Clear previous markers
    if (dynamicLayerGroup) {
        dynamicLayerGroup.clearLayers();
    }

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
            map.flyTo([lat, lng], 13, { duration: 1.2 });
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
                map.flyTo(marker.getLatLng(), 14, { duration: 1.2 });
                marker.openPopup();
                document.querySelectorAll('#point-list li').forEach((li) => li.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    dynamicLayerGroup.addTo(map); // Add the new layer group to the map.
}
