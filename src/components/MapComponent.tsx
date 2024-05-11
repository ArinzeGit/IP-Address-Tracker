import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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
            iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png`,
            iconSize: [48, 55],
            iconAnchor: [24, 55],
            shadowUrl: markerShadowPng,
            shadowSize: [70, 55],
            shadowAnchor: [23, 55],
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
