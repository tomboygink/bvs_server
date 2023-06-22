import * as React from "react";

import { toJS } from "mobx";
import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../../storage/AppStorage";

import { TableCell } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

interface IProps {}

//Устройства
@observer
export class ExportTable extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    let depth = [];
    var date = [];

    var ses_depth = [];
    let sess = APP_STORAGE.sensors;
    let dev_sess: {
      [x: string]: {
        sess_data: any;
        time_srv: string;
        time_dev: string;
        dev_number: string;
        id: string;
        level_akb: string;
      };
    };

    if (sess.getDevSession) {
      dev_sess = toJS(sess.getDevSession());

      for (var key in dev_sess) {
        let senso = JSON.parse(dev_sess[key].sess_data);

        ses_depth.push(senso.s);
        date.push(
          <TableRow
            key={"row" + dev_sess[key].id}
            id={"row" + dev_sess[key].id}
            sx={{ p: "4px" }}
          >
            <TableCell sx={{ p: "4px" }}>
              {" "}
              {"" + dev_sess[key].dev_number}{" "}
            </TableCell>
            <TableCell sx={{ p: "4px" }}>
              {" "}
              {"" + dev_sess[key].time_dev.replace("T", "|")}{" "}
            </TableCell>
            <TableCell sx={{ p: "4px" }}>
              {" "}
              {"" + dev_sess[key].time_srv.replace("T", "|")}{" "}
            </TableCell>
            <TableCell sx={{ p: "4px" }}>
              {" "}
              {"" + dev_sess[key].level_akb}{" "}
            </TableCell>

            {senso.s.map((row: any) => (
              <React.Fragment key={"_gr_id_key_sess" + row.depth + row}>
                <TableCell sx={{ p: "4px" }}> {"" + row.data} </TableCell>
              </React.Fragment>
            ))}
          </TableRow>
        );
      }

      for (var key in ses_depth) {
        for (var i in ses_depth[key]) {
          depth.push(ses_depth[key][i].depth);
        }
      }
    }

    const array = depth;

    const makeUniq = (arr: any) => {
      return arr.reduce((acc: any, currentValue: any) => {
        acc.indexOf(currentValue) === -1 && acc.push(currentValue);
        return acc;
      }, []);
    };

    makeUniq(array);

    var dth = makeUniq(array);

    return (
      <>
        {date.length > 0 && (
          <Table key="my-table-id" id="my-table-id" sx={{ display: "none" }}>
            <TableBody key={"dsafsafasfd" + 8888}>
              <TableRow key={"dsafsafasfd" + 1}>
                <TableCell key="121212"> Устройство</TableCell>
                <TableCell key="12121ewe2"> Время устройства</TableCell>
                <TableCell key="121weeew212"> Время сервера</TableCell>
                <TableCell key="12121e2eqe2"> АКБ</TableCell>
                {dth.map((row: any) => (
                  <React.Fragment key={"_gr_id_key_ses324234s" + row}>
                    <TableCell sx={{ p: "4px" }}> {"" + row} </TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
              {date}
            </TableBody>
          </Table>
        )}
      </>
    );
  }
}
