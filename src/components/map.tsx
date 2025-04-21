
import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet/dist/images/marker-icon-2x.png';

interface Location {
  latitude: number;
  longitude: number;
  available: boolean;
}

export const Map = () => {
  const mapId = 'map';

  const locations: Location[] = [
    { latitude: -16.5000, longitude: -68.1500, available: true },   // La Paz
    { latitude: -17.7833, longitude: -63.1833, available: true },   // Santa Cruz
    { latitude: -19.0333, longitude: -65.2627, available: false },  // Sucre
    { latitude: -17.3935, longitude: -66.1570, available: true },   // Cochabamba
    { latitude: -21.5350, longitude: -64.7296, available: false },  // Tarija
    { latitude: -18.5000, longitude: -66.2833, available: true },   // Oruro
    { latitude: -20.4592, longitude: -66.8250, available: false },  // Potosí
    { latitude: -10.9833, longitude: -66.1000, available: false },  // Riberalta
    { latitude: -11.0178, longitude: -68.7500, available: true },   // Cobija
    { latitude: -13.6833, longitude: -63.2333, available: false },  // Trinidad
  ];
  

  useEffect(() => {
    const map = L.map(mapId).setView([-16.2902, -63.5887], 6); // Centro geográfico de Bolivia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    locations.forEach((location) => {
      const icon = L.icon({
        iconUrl: location.available
          ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
          : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        iconSize: [30, 48],
        iconAnchor: [15, 48],
        popupAnchor: [0, -48],
        shadowSize: [41, 41],
      });

      L.marker([location.latitude, location.longitude], { icon })
        .addTo(map)
        .bindPopup(
          location.available
            ? 'Apartments Available Here!'
            : 'No Apartments Available'
        );
    });

    // Ensure the map is resized properly
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => map.remove();
  }, []);

  return (
    <div id={mapId} className="w-full h-[600px] rounded-lg" />
  );
};
