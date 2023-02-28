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

    return (
      <>
      {data.length && 
    <LineChart  width={500} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="глубина"  stroke="#82ca9d"  />
    <Line   dataKey="температура" stroke="inherit" /> 
    <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
    <XAxis dataKey="температура" />
    <YAxis  dataKey="глубина" />
    <Tooltip    itemStyle ={{color:'#266BF1'}} />  
  </LineChart>
  }
      </>
    );
  }
}
