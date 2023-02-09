import * as React from 'react';

import { APP_STORAGE } from '../../../storage/AppStorage';




export default function drawDevLocation(): React.ReactNode {
  let devs_g = [];
  let DevGr = [];

  if (Object.keys(
      JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
    ).length !== 0 &&
    JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
      .constructor === Object
  ) {
    devs_g = JSON.parse(
      JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
    );
  }

  for (var key in devs_g) {
    if (devs_g.hasOwnProperty(key)) {
      let a = devs_g[key];
      let root = JSON.parse(a);

      if (root.childs.length > 0) {
        for (let i = 0; i < root.childs.length; i++) {
          DevGr.push(root.childs[i]);
        }
      }
    }
  }
  return this.drawDevGroup(DevGr);
}