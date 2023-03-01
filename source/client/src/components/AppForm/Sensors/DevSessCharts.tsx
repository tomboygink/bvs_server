import * as React from "react";
import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface IProps {}


@observer
export class DevSessCharts extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }



  render(): React.ReactNode {
    var data: any[] = []; ////// отображаем сенсоры

    var b: JSX.Element[]= []
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
                              {
                                name: String(uniqueChars[i].depth) +'м',
                                pv: uniqueChars[i].data
                              });
                     }   
          } 
          {data.length && 
              b.push(
                <LineChart
                layout="vertical"
                width={500}
                height={600}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="pv"  axisLine={false}  tickCount={19}  domain={[-6, 20]} />
                <YAxis dataKey="name" type="category"  tickCount={60}  />
                <Tooltip />
                
                <Line dataKey="pv" stroke="#8884d8" />
                <Line dataKey="uv" stroke="#fff" />
              </LineChart>
              )}}

  
    return (
      <>
    

{b}


  
      </>
    );
  }
}
