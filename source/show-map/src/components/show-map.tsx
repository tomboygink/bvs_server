import React from 'react';
import { observer } from 'mobx-react';


import { MapContainer, TileLayer, Marker} from "react-leaflet";




const styles = {
  mapRoot: {
    height: '100vh'
  }
};

export default function LeafletMap() {
    let splArr = window.location.search.replace(/%20/g, "");
    let splArr1 = splArr.split('=');
   
    let separ = splArr1[1].split('&');
    console.log('separ', separ[0]);
    console.log('splArr1', splArr1[2]);

  return (
<MapContainer
      style={styles.mapRoot}
      center={[Number(separ[0]), Number(splArr1[2])]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
   <Marker position={[Number(separ[0]), Number(splArr1[2])]} />
    </MapContainer>
  );
}


