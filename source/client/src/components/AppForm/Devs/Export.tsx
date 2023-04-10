import * as React from "react";

import { observer } from "mobx-react";
import { toJS } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { Box, Typography, TextField, Button } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";






interface IProps {}

//Устройства
@observer
export class CustomExport extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }



  render(): React.ReactNode {
    let ar = []
    let b= [];
    let indexarray: any[] = [];
    var date = []; 

    var ses_depth = [];
    var ses_date = [];
    let sess = APP_STORAGE.sensors;
    let dev_sess: { [x: string]: {
      sess_data: any;
      time_srv: string;
      time_dev: string;
      dev_number: string;
      id: string; level_akb: string; 
}; };

    if (sess.getDevSession) {
      dev_sess = toJS(sess.getDevSession());

     for (var key in dev_sess) {  

   
         
          let senso = JSON.parse(dev_sess[key].sess_data)
        
         b.push(senso.s);
         
         ses_depth.push(
            senso.s.map((row : any, i : any) => (
              <TableCell sx = {{p: '4px'}}> {'' + row.depth} </TableCell>
              ))
         )
         ses_date.push(
          senso.s.map((row : any, i : any) => (
            <TableCell sx = {{p: '4px'}}> {'' + row.data} </TableCell>
            ))
         )
    
        date.push( 
         
        <TableRow key={'row' + dev_sess[key].id} id={'row' + dev_sess[key].id} sx = {{p: '4px'}}>
        <TableCell  sx = {{p: '4px'}} > {'' + dev_sess[key].dev_number} </TableCell>
        <TableCell sx = {{p: '4px'}} > {'' + dev_sess[key].time_dev.replace('T', '|')} </TableCell>
        <TableCell  sx = {{p: '4px'}} > {'' + dev_sess[key].time_srv.replace('T', '|')} </TableCell>
        <TableCell  sx = {{p: '4px'}}> {'' + dev_sess[key].level_akb} </TableCell>

        
          {
          senso.s.map((row : any, i : any) => (
            <React.Fragment key={"_gr_id_key_sess" + row.depth}>
            <TableCell sx = {{p: '4px'}}> {'' + row.depth} </TableCell>
            </React.Fragment>
            ))
          }

       </TableRow>
        )    
     }

      var max = -Infinity;
var index = -1;
b.forEach(function(a, i){
  if (a.length>max) {
    max = a.length;
    index = i;
    indexarray.push(a)
  }
});



  
   }


    return (
      <>
        { date.length > 0 && 
    <Table key='my-table-id' id = 'my-table-id' sx={{display:'none'}} >
      <TableBody  key ={'dsafsafasfd' + 8888}>
          <TableRow  key ={'dsafsafasfd' + 1}>
            <TableCell key = '121212'> Устройство</TableCell>
            <TableCell key = '12121ewe2' > Время устройства</TableCell>
            <TableCell key = '121weeew212'> Время сервера</TableCell>
            <TableCell key = '12121e2eqe2'> АКБ</TableCell>
           
          </TableRow>
       {date}
      </TableBody>
    </Table>
        }
      </>
    );
  }
}












