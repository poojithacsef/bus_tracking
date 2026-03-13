// map.js
import { database } from './firebase-config.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Module-level variables to hold state
let map;
let busMarker;
let currentFirebaseListener = null;

/**
 * Initializes the Leaflet map.
 * @param {string} elementId - The HTML ID of the map container.
 * @param {Array<number>} initialCoords - The initial [lat, lng] for the map view.
 * @param {number} initialZoom - The initial zoom level.
 */
export function initMap(elementId, initialCoords = [20, 0], initialZoom = 2) {
    map = L.map(elementId).setView(initialCoords, initialZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

/**
 * Creates or updates the bus marker on the map with smooth panning.
 * @private
 */
function _updateMarker(lat, lng, label) {
    if (!map) return;

    const newLatLng = [lat, lng];

    if (busMarker) {
        busMarker.setLatLng(newLatLng);
        busMarker.getPopup().setContent(label);
        map.panTo(newLatLng); // Smoothly pan to the new location
    } else {
        busMarker = L.marker(newLatLng).addTo(map)
            .bindPopup(label)
            .openPopup();
        map.setView(newLatLng, 15); // Set view only when marker is first created
    }
}

/**
 * Removes the bus marker from the map.
 * @private
 */
function _removeMarker() {
    if (busMarker) {
        busMarker.remove();
        busMarker = null;
    }
}

/**
 * Stops any active Firebase listeners to prevent memory leaks.
 * @private
 */
function _stopListener() {
    if (currentFirebaseListener) {
        currentFirebaseListener(); // This is the unsubscribe function from onValue
        currentFirebaseListener = null;
    }
}

/**
 * Tracks a bus by listening to Firebase for location updates.
 * @param {string} busId - The ID of the bus to track (e.g., 'bus1').
 * @param {string} busLabel - The display name for the bus (e.g., 'Bus 1').
 * @param {function} onStatusUpdate - A callback function to report status changes to the UI.
 */
export function trackBus(busId, busLabel, onStatusUpdate) {
    _stopListener();
    _removeMarker();

    if (!busId) {
        onStatusUpdate('Please select a bus to begin tracking.');
        return;
    }

    const busRef = ref(database, 'buses/' + busId);
    onStatusUpdate('Waiting for driver to start sharing...');

    currentFirebaseListener = onValue(busRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.lat && data.lng) {
            onStatusUpdate(null); // Pass null to indicate success and hide status message
            _updateMarker(data.lat, data.lng, `<b>${busLabel}</b>`);
        } else {
            _removeMarker();
            onStatusUpdate('No location data available for this bus yet.');
        }
    });
}
