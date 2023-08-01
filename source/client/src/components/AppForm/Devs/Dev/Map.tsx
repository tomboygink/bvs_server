
import React from 'react';
import { observer } from 'mobx-react';


import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { APP_STORAGE } from '../../../../storage/AppStorage';

const myIcon = new Icon({
    
  iconUrl: './Vector4.svg',
  iconSize: [25, 25]
});
const styles = {
  mapRoot: {
    height: '400px'
  }
};

// export default function LeafletMap() {
//      let splArr = APP_STORAGE.devs.getLatitude().replace(/\,/g, '.');
//      let splArr1 = APP_STORAGE.devs.getLongitude().replace(/\,/g, '.');
   
//     // let separ = splArr1[1].split('&');
//     console.log('props1', APP_STORAGE.devs.getLongitude())
//     console.log('props1', APP_STORAGE.devs.getLatitude())

//   return (
// <MapContainer
//       style={styles.mapRoot}
//       center={[Number(splArr), Number(splArr1)]}
//       zoom={12}
//       scrollWheelZoom={false}
//     >
//       <TileLayer
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//    <Marker position={[Number(splArr), Number(splArr1)]} />
//     </MapContainer>
//   );
// }

const MapPlaceholder = () => {
  return (
    <p>
      Map of London.{' '}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

interface IProps {
  longitude: any;
  latitude: any;
}

@observer 
export class LeafletMap extends React.Component<IProps>{
    
    constructor(props:any){
        super(props);
    }
    render(): React.ReactNode {
      let splArr = this.props.latitude.replace(/\,/g, '.');
      let splArr1 = this.props.longitude.replace(/\,/g, '.');
        return ( 
          <MapContainer key={splArr}
          attributionControl={false}
          style={styles.mapRoot}
          center={[Number(splArr), Number(splArr1)]}
          zoom={12}
          scrollWheelZoom={true}
          placeholder={<MapPlaceholder />}
        >
          <TileLayer
             attribution='&copy; <a href="http://osm.org/copyright">ООО Севербуринструмент</a>'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
       <Marker position={[Number(splArr), Number(splArr1)]} >
        
       {/* <Popup>
         Место расположения - Гаспром <br /> Устройстно - 1538
        </Popup> */}
        </Marker>
        </MapContainer>
        );
    }
}

