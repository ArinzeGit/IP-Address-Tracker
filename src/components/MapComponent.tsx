import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { Icon } from "leaflet";

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
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={[latitude, longitude]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            shadowUrl: markerShadowPng,
            shadowSize: [41, 41],
            shadowAnchor: [12, 41],
          })
        }
      >
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
