import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { alpha, styled, lighten, darken } from "@mui/material/styles";
import TreeItem, {
  TreeItemProps,
  // treeItemClasses
} from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import { useSpring, animated } from "@react-spring/web";
import { TransitionProps } from "@mui/material/transitions";

import { APP_STORAGE } from "../../../storage/AppStorage";
import { Box } from "@mui/material";
import { Cross, Rectangle } from "recharts";

export function MinusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

export function PlusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

export function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

export function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(20px,0,0)",
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

// export const StyledMua = styled((props: TreeItemProps) => (
//   <TreeItem {...props} TransitionComponent={TransitionComponent} />
// ))(({ theme }) => ({
//   [`& .${treeItemClasses.iconContainer}`]: {
//     "& .close": {
//       opacity: 0.3
//     }
//   },
//   [`& .${treeItemClasses.group}`]: {
//     marginLeft: 15,
//     paddingLeft: 18,
//     borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
//   }
// }));

export const id_dev_sess = async (event: any, node: any) => {
  APP_STORAGE.sensors.setIdDevSess(node);
};

export const handleChange = async (event: any, node: any) => {
  APP_STORAGE.sensors.setActiveButtonSort("sort");
  APP_STORAGE.sensors.setActiveButtonSortDesc("sort");
  APP_STORAGE.sensors.setdataCharts([]);
  APP_STORAGE.sensors.setDevSession(null);

  if (node.includes("_dev_id_") === false) {
    APP_STORAGE.devs_groups.setParentId(node);
    APP_STORAGE.main.setTitle("Показания устройств");
    APP_STORAGE.devs.setIdDevs(node);
    APP_STORAGE.devs_groups.setMiddleForm(1);
    //APP_STORAGE.importdevs.setSvg("");
  }

  if (node.includes("_dev_id_key_") === true) {
    APP_STORAGE.devs.setIdChild(node);
    APP_STORAGE.sensors.setEmptySession("");
    APP_STORAGE.sensors.setSessFirstLast([]);
    APP_STORAGE.sensors.setSess_first([]);
    APP_STORAGE.sensors.setSess_second([]);
    APP_STORAGE.sensors.setSortDesc("");
    APP_STORAGE.sensors.setAkbSessChose("");
    APP_STORAGE.sensors.setChoseSessTime("");
    APP_STORAGE.sensors.setAkbSessLast("");
    APP_STORAGE.devs_groups.setMiddleForm(2);

    APP_STORAGE.devs.setTopMenuDev("top_menu-1");
  }
};

export const options = async (event: any, node: any) => {
  APP_STORAGE.devs_groups.setParent(node);
  APP_STORAGE.devs.setGroupDevId(String(node));
};

export const customizedGroupTick = (props: any) => {
  const { index, x, y, payload } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        className="map"
        width="4"
        height="8"
        fill="#808080"
        fontFamily="Verdana"
        fontSize="14px"
      />
      <text
        dx={x - 35}
        dy={y + 10}
        fill="blue"
        fontSize="12px"
        textAnchor="middle"
      >
        {payload.value}
      </text>
    </g>
  );
};

export const handleChangePage = (
  event: React.MouseEvent<HTMLButtonElement> | null,
  newPage: number
) => {
  APP_STORAGE.devs.setPage(newPage);
};

export const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  APP_STORAGE.devs.setRowsPerPage(parseInt(event.target.value, 10));
  APP_STORAGE.devs.setPage(0);
};
