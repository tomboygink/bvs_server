import React from "react";
import { observer } from "mobx-react";

import { Box, Typography, TextField } from "@mui/material";
import { APP_STORAGE } from "../../../../../storage/AppStorage";

interface IProps {}

//Компонент формы приложения
@observer
export class AddNewGroup extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async OpenModal(e: any, org_id: any) {
    APP_STORAGE.devs_groups.setOrg(Number(org_id));
    APP_STORAGE.devs_groups.setParentId(e);
    APP_STORAGE.devs_groups.setOpenModal(true);
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
                  {APP_STORAGE.getRoleWrite() === 2 && APP_STORAGE.getRoleRead() === 1 &&
            <Box
              sx={{
                borderRadius: "4px",
                width: '100%',
                background:'#E3EDFF',
                p:2,
                border: '1px solid #8F9DCE'
                
              }}
              onClick={() => this.OpenModal("0", 0)}
            >
              <Typography sx={{ display: "flex", color:'#266BF1', justifyContent: 'center' }}>
                {" "}
                Добавить новое расположение
              </Typography>
            </Box>
           
  }
      </React.Fragment>
    );
  }
}
