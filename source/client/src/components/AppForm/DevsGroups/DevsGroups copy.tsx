import React from "react";
import { observer } from "mobx-react";

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';



import { Box, Alert, Typography  } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { WidthFull } from "@mui/icons-material";

import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import TreeView from '@mui/lab/TreeView';

import EdgesensorHighIcon from '@mui/icons-material/EdgesensorHigh';

interface IProps {}

//Устройства
@observer
export class DevsGroups extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    APP_STORAGE.devs_groups.get_DevsGroups("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
    APP_STORAGE.devs.get_Devs("sess_id", APP_STORAGE.auth_form.getdt());
}


  render(): React.ReactNode {
    let devs = [];
    let dev_form = [];
    let dev_item = [];
    let id = [];
    let parent_id = [];

    let filterB= [];

    let child = [];

    let uniqueChars:any = [];

    if (APP_STORAGE.devs_groups.getDevsGroups()) {
      devs = JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()));
      dev_item = JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()));


  

      for (var key in devs) {
        if (devs.hasOwnProperty(key)) {
          let a = devs[key];
          
          // if (a.parent_id < 1){
          //  dev_form.push(
          //     <TreeItem nodeId="1" label={a.g_name}> </TreeItem>
          //   )
          // }


          
      for (var i in dev_item) {

        if (dev_item.hasOwnProperty(i)) {
          let b = dev_item[i];

           
            if(b.parent_id === a.id  ) {
              filterB.push(b.parent_id);

              filterB.forEach((element) => {
    if (!uniqueChars.includes(element)) {
        uniqueChars.push(element);
    }
});
const filtered = uniqueChars.sort((a:any, b:any) => a !== b);

              console.log('filtered',filtered);
              console.log('b.parent_id', b.parent_id)
             
              if(uniqueChars[0] === a.id){
                id = b.parent_id;
                child.push(
                  <TreeItem nodeId={b.id} label={b.g_name}></TreeItem>
                )
              }
              

              parent_id.push(
                   <TreeItem nodeId="2" label={b.g_name}> </TreeItem>
              )
            }
          
        }
      }

      
      if ( id !== '' && a.id === id){
        console.log('a.id', a.id)
        console.log('1223233', child)

        dev_form.push(
          <TreeItem nodeId="1" label={a.g_name}>
           {child}
          </TreeItem>
        )
         }

        if( a.id !== id && a.parent_id < 1){
          console.log('1111', a.parent_id)
          dev_form.push(
            <TreeItem nodeId="1" label={a.g_name}>
            </TreeItem>
          )
        }
        
        }
      }
    }

    
    if (APP_STORAGE.auth_form.getUser())
      return (
        <React.Fragment>
          <Box className="wrapper-devs" sx={{ mt: '44px', display: 'flex', flexDirection: 'column;', alignItems: 'flex-start;', ml: '1rem', mr: '32px'}}> 
          
          <Box sx = {{width: '290px', minHeight: '168px', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
            <TreeView
      aria-label="customized"
      defaultExpanded={['1']}
      defaultCollapseIcon={<RemoveIcon />}
      defaultExpandIcon={<AddIcon />}
      // defaultEndIcon={<CloseSquare />}
      sx={{  flexGrow: 1, maxWidth: 400,}}
    >
{dev_form}

    </TreeView>
          </Box>

          </Box>


         
        </React.Fragment>
      );
  }
}
