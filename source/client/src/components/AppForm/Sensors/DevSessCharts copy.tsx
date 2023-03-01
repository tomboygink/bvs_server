import * as React from "react";
import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

interface IProps {}


@observer
export class DevSessCharts extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }



  render(): React.ReactNode {
    var data = []; ////// отображаем сенсоры
   let sess = APP_STORAGE.sensors;
   let sessors;
    if (sess.getDevSession){
         sessors = sess.getDevSession();
          for (var key in  sessors){

                let sess_data = JSON.parse( (sessors[key].sess_data));
                    const uniqueChars = sess_data.s.reduce((o: any, i: any) => {  
                        if (!o.find((v: { depth: any }) => v.depth == i.depth)) {
                          o.push(i);
                        }
                        return o;
                      }, []);

                      for (var i in uniqueChars) {
                        if(String(APP_STORAGE.sensors.getIdDevSess()) === String(sessors[key].id))
                            data.push(
                              {'температура':  uniqueChars[i].data, 'глубина' : uniqueChars[i].depth, pv: 2400, amt: 2400}
                              );
                      }   
          } 
         
    }


    const sortedData = data.sort((a,b) => a.температура - b.температура);
    console.log('sortedData', sortedData)
    return (
      <>
      {data.length && 
  //   <LineChart  width={500} height={300} data={sortedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
  //   <Line type="monotone" dataKey="глубина"  stroke="#82ca9d"  />
  //   <Line type="monotone"  dataKey="температура" stroke="#82ca9d" /> 
  //   <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
  //   <XAxis dataKey="температура"  domain={[11, 19]} />
  //   <YAxis  dataKey="глубина"   />
  //   <Tooltip    itemStyle ={{color:'#266BF1'}} />  
  // </LineChart>
  <svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="graph" aria-labelledby="title" role="img">
<polyline
     fill="none"
     stroke="#0074d9"
     stroke-width="2"
     points="
       00,120
       20,60
       40,80
       60,20
       80,80
       100,80
       120,60
       140,100
       160,90
       180,80
       200, 110
       220, 10
       240, 70
       260, 100
       280, 100
       300, 40
       320, 0
       340, 100
       360, 100
       380, 120
       400, 60
       420, 70
       440, 80
     "
   />
<g className="grid x-grid" id="xGrid">
  <line x1="90" x2="90" y1="5" y2="371"></line>
</g>
<g className="grid y-grid" id="yGrid">
  <line x1="90" x2="705" y1="370" y2="370"></line>
</g>
  <g className="labels x-labels">
  <text x="100" y="400">2008</text>
  <text x="246" y="400">2009</text>
  <text x="392" y="400">2010</text>
  <text x="538" y="400">2011</text>
  <text x="684" y="400">2012</text>
  <text x="400" y="440" className="label-title">Температура</text>
</g>
<g className="labels y-labels">
  <text x="80" y="15">15</text>
  <text x="80" y="131">10</text>
  <text x="80" y="248">5</text>
  <text x="80" y="373">0</text>
  <text x="50" y="200" className="label-title">Глубина</text>
</g>
</svg>
  }
      </>
    );
  }
}
