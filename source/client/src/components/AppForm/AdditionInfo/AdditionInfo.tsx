import * as React from "react";
import { Box, Typography } from "@mui/material";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";


import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CommitIcon from "@mui/icons-material/Commit";

interface IProps { }

@observer
export class AdditionInfo extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    let FirstData = APP_STORAGE.sensors.getTimeDevSessFirst().split("T")[0]; ///////// Перевернуть дату
    const [year_first, month_first, day_first] = FirstData.split("-");
    let FirstSess = `${day_first}.${month_first}.${year_first}`;
    let FirstTimeSess = APP_STORAGE.sensors.getTimeDevSessFirst().split("T")[1];

    let LastData = APP_STORAGE.sensors.getTimeDevSessLast().split("T")[0]; ///////// Перевернуть дату
    const [year_last, month_last, day_last] = LastData.split("-");
    let LastSess = `${day_last}.${month_last}.${year_last}`;
    let LastTimeSess = APP_STORAGE.sensors.getTimeDevSessLast().split("T")[1];

    let ChoseData = APP_STORAGE.sensors.getChoseSessTime().split("T")[0]; ///////// Перевернуть дату
    const [year_chose, month_chose, day_chose] = ChoseData.split("-");
    let ChoseSess = `${day_chose}.${month_chose}.${year_chose}`;
    let ChoseTimeSess = APP_STORAGE.sensors.getChoseSessTime().split("T")[1];

    return (
      <div className="wrapper-sensors">
        {FirstTimeSess && APP_STORAGE.devs_groups.getMiddleForm() === 2 &&
          <>
            <Typography id="addition" sx={{ fontWeight: "500", color: '#0D1C52', mb: '12px', mt: '40px' }}>  Дополнительная информация </Typography>
            <Box
              sx={{
                width: "100%",
                height: '100%',
                background: "#fff",
                borderRadius: "4px",
                display: "flex",
                padding: '16px',
                flexDirection: 'column',
                overflow: "auto",
              }}
            >

              <Box sx={{ fontSize: '15px', color: '#000', display: 'flex', pb: '12px', justifyContent: 'flex-start', alignItems: 'center' }} ><CommitIcon sx={{ color: '#0BF1CA' }} />
                {FirstSess} {''} {FirstTimeSess.replace('T', ' ')}
                <Typography sx={{ color: '#808080', fontSize: '12px' }}> {''} (контрольная сессия)  </Typography> </Box>
              <Box sx={{ fontSize: '15px', color: '#000', display: 'flex', pb: '12px', justifyContent: 'flex-start', alignItems: 'center' }} >
                <CommitIcon sx={{ color: '#A178FB' }} />  {LastSess} {''} {LastTimeSess.replace('T', ' ')}
                <Typography sx={{ color: '#808080', fontSize: '12px' }}> {''} (последняя сессия)  </Typography></Box>
              {APP_STORAGE.sensors.getChoseSessTime() &&
                <Box sx={{ fontSize: '15px', color: '#000', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }} >
                  <CommitIcon sx={{ color: '#FD8A04' }} />  {ChoseSess} {''} {ChoseTimeSess.replace('T', ' ')} <Typography sx={{ color: '#808080', fontSize: '12px' }}> {''} (выбранная сесия)  </Typography></Box>
              }
            </Box>
          </>
        }


      </div>
    );
  }
}
