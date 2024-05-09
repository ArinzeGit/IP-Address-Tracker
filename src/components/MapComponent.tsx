import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../node_modules/leaflet/dist/leaflet.css"; // Ensure Leaflet CSS is imported

interface Props {
  latitude: number;
  longitude: number;
}

function MapComponent({ latitude, longitude }: Props) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          The coordinates of this position are <br /> {"{"}lat:{latitude}, lng:
          {longitude}
          {"}"}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
