import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Optional: Custom marker icon fix for default
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const dummyNGOs = [
  {
    name: 'Helping Hands',
    position: [23.2599, 77.4126], // Example: Bhopal coords
  },
  {
    name: 'Food Relief Org',
    position: [23.2500, 77.4200],
  },
];

export default function DonationMap() {
  const myLocation = [23.2567, 77.4170]; // Your dummy/current location

  return (
    <MapContainer center={myLocation} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={myLocation}>
        <Popup>You are here</Popup>
      </Marker>

      {dummyNGOs.map((ngo, idx) => (
        <Marker key={idx} position={ngo.position}>
          <Popup>{ngo.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
