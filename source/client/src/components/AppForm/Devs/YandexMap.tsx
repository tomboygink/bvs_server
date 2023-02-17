import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export default function map() {
  return (
    <div>
      <YMaps>
        <Map
          defaultState={{
            center: [55.751574, 37.573856],
            zoom: 10
          }}
        >
          <Placemark defaultGeometry={[55.751574, 37.573856]} />
        </Map>
      </YMaps>
    </div>
  );
}
