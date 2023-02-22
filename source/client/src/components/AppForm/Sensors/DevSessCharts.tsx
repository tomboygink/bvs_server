import * as React from "react";
import { Box, Alert, Typography, TextField } from "@mui/material";

import SensorsIcon from "@mui/icons-material/Sensors";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {data} from "../Devs/StyledMua";

interface IProps {}

//Компонент формы приложения
@observer
export class DevSessCharts extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }



  render(): React.ReactNode {
    let qqq = []
    var data = []; ////// отображаем сенсоры
   let sess = APP_STORAGE.sensors;
   let sessors;
    if (sess.getDevSession){
         sessors = sess.getDevSession();
          for (var key in  sessors){

                let sess_data = JSON.parse( (sessors[key].sess_data));
                    const uniqueChars = sess_data.s.reduce((o: any, i: any) => {  ////////////////// Редюсом убираем дубликаты
                        if (!o.find((v: { depth: any }) => v.depth == i.depth)) {
                          o.push(i);
                        }
                        return o;
                      }, []);

                      for (var i in uniqueChars) {
                        if(String(APP_STORAGE.sensors.getIdDevSess()) === String(sessors[key].id))
                            data.push(
                              {name:  uniqueChars[i].depth, data : uniqueChars[i].data, pv: 2400, amt: 2400}
                              );
                      }
               
                 
          } 
         
    }

    return (
      <>
      {data.length && 
      <LineChart  width={500} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="data" stroke="#266BF1" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis  />
    <Tooltip />
  </LineChart>
  }
      </>
    );
  }
}
