import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";


const myIcon = new Icon({
  iconUrl: './Vector4.svg',
  iconSize: [25, 25]
});
const styles = {
  mapRoot: {
    height: 400
  }
};

export default function LeafletMap() {
  return (
<MapContainer
      style={styles.mapRoot}
      center={[55.427253, 65.301425]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
   <Marker position={[55.427253, 65.301425]} />
    </MapContainer>
  );
}
