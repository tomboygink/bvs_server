import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { alpha, styled,  lighten, darken  } from '@mui/material/styles';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import { useSpring, animated } from '@react-spring/web';
import { TransitionProps } from '@mui/material/transitions';






import { APP_STORAGE } from "../../../storage/AppStorage";
import { Box } from '@mui/material';
import { Cross, Rectangle } from 'recharts';





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

export function Charts(){
  return(
    <svg width="51" className="item-1" height="732" viewBox="0 0 51 732" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="31.6091" y1="87.0087" x2="50.2144" y2="63.6882" stroke="#BABBBD"/>
    <line x1="31.6091" y1="80.0087" x2="50.2144" y2="56.6882" stroke="#BABBBD"/>
    <line x1="31.6216" y1="71.6732" x2="50.6216" y2="49.6732" stroke="#BABBBD"/>
    <line x1="31.6216" y1="64.6732" x2="50.6216" y2="42.6732" stroke="#BABBBD"/>
    <line x1="31.6216" y1="57.6732" x2="50.6216" y2="35.6732" stroke="#BABBBD"/>
    <line x1="31.6216" y1="50.6732" x2="50.6216" y2="28.6732" stroke="#BABBBD"/>
    <line x1="31.6204" y1="42.6746" x2="49.6204" y2="21.6746" stroke="#BABBBD"/>
    <line x1="31.6204" y1="35.6746" x2="43.6204" y2="21.6746" stroke="#BABBBD"/>
    <line x1="31.6" y1="29.7" x2="37.6" y2="21.7" stroke="#BABBBD"/>
    <path d="M31.6418 92.7143L50.5449 69.7551" stroke="#BABBBD"/>
    <line x1="31.6216" y1="98.6732" x2="50.6216" y2="76.6732" stroke="#BABBBD"/>
    <line x1="31.6091" y1="106.009" x2="50.2144" y2="82.6882" stroke="#BABBBD"/>
    <line x1="31.6091" y1="113.009" x2="50.2144" y2="89.6882" stroke="#BABBBD"/>
    <line x1="31.6124" y1="119.005" x2="50.6124" y2="95.6842" stroke="#BABBBD"/>
    <line x1="31.606" y1="126.013" x2="50.606" y2="101.692" stroke="#BABBBD"/>
    <line x1="31.606" y1="132.013" x2="50.606" y2="107.692" stroke="#BABBBD"/>
    <line x1="34.6096" y1="133.688" x2="50.6096" y2="113.688" stroke="#BABBBD"/>
    <line x1="11.6464" y1="133.646" x2="19.6464" y2="125.646" stroke="#BABBBD"/>
    <line x1="5.64645" y1="133.646" x2="19.6464" y2="119.646" stroke="#BABBBD"/>
    <line x1="0.656128" y1="131.637" x2="19.6561" y2="113.637" stroke="#BABBBD"/>
    <line x1="0.656128" y1="124.637" x2="19.6561" y2="106.637" stroke="#BABBBD"/>
    <line x1="0.656128" y1="124.637" x2="19.6561" y2="106.637" stroke="#BABBBD"/>
    <path d="M0.5 118L19.5 100" stroke="#BABBBD"/>
    <line x1="0.656128" y1="111.637" x2="19.6561" y2="93.637" stroke="#BABBBD"/>
    <line x1="0.656128" y1="104.637" x2="19.6561" y2="86.637" stroke="#BABBBD"/>
    <line x1="0.656128" y1="96.637" x2="19.6561" y2="78.637" stroke="#BABBBD"/>
    <line x1="0.656128" y1="89.637" x2="19.6561" y2="71.637" stroke="#BABBBD"/>
    <line x1="0.656128" y1="81.637" x2="19.6561" y2="63.637" stroke="#BABBBD"/>
    <line x1="0.656128" y1="74.637" x2="19.6561" y2="56.637" stroke="#BABBBD"/>
    <line x1="0.656128" y1="66.637" x2="19.6561" y2="48.637" stroke="#BABBBD"/>
    <line x1="0.656128" y1="58.637" x2="19.6561" y2="40.637" stroke="#BABBBD"/>
    <line x1="0.656128" y1="50.637" x2="19.6561" y2="32.637" stroke="#BABBBD"/>
    <line x1="0.656128" y1="43.637" x2="19.6561" y2="25.637" stroke="#BABBBD"/>
    <line x1="0.646447" y1="36.6464" x2="15.6464" y2="21.6464" stroke="#BABBBD"/>
    <line x1="0.646447" y1="30.6464" x2="9.64645" y2="21.6464" stroke="#BABBBD"/>
    <line x1="39.5968" y1="133.704" x2="50.5968" y2="118.704" stroke="#BABBBD"/>
    <line x1="43.6053" y1="133.693" x2="50.6053" y2="124.693" stroke="#BABBBD"/>
    <g filter="url(#filter0_b_107_2)">
    <path d="M4 0.5H47C48.933 0.5 50.5 2.067 50.5 4V130C50.5 131.933 48.933 133.5 47 133.5H4C2.067 133.5 0.5 131.933 0.5 130V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#BABBBD"/>
    </g>
    <line x1="25.5" y1="21" x2="25.5" y2="719" stroke="#BABBBD"/>
    <line x1="0.000161029" y1="21.5" x2="50.0001" y2="21.5161" stroke="#BABBBD"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M28 18.9915H23C21.3431 18.9915 20 20.3233 20 21.9662V717.034C20 718.677 21.3431 720.008 23 720.008H28C29.6569 720.008 31 718.677 31 717.034V21.9661C31 20.3233 29.6569 18.9915 28 18.9915ZM23 18C20.7909 18 19 19.7757 19 21.9662V717.034C19 719.224 20.7909 721 23 721H28C30.2091 721 32 719.224 32 717.034V21.9661C32 19.7757 30.2091 18 28 18H23Z" fill="#BABBBD"/>
    <defs>
    <filter id="filter0_b_107_2" x="-4" y="-4" width="59" height="142" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_107_2"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_107_2" result="shape"/>
    </filter>
    </defs>
    </svg>
  )
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
      transform: 'translate3d(20px,0,0)',
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

export const StyledMua = styled((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

export const id_dev_sess = async (event: any, node: any) => { 
 APP_STORAGE.sensors.setIdDevSess(node) 
}

export const handleChange = async (event: any, node: any) => {

  APP_STORAGE.sensors.setActiveButtonSort('sort');
  APP_STORAGE.sensors.setActiveButtonSortDesc('sort');
  APP_STORAGE.sensors.setdataCharts([]);
  APP_STORAGE.sensors.setDevSession(null);
  
   if(node.includes('_dev_id_') === false){
    APP_STORAGE.devs_groups.setParentId(node);
    APP_STORAGE.main.setTitle("Показания устройств");
    APP_STORAGE.devs.setIdDevs(node);
    APP_STORAGE.devs_groups.setMiddleForm(1);
   }
   
   if(node.includes('_dev_id_key_') === true){
    APP_STORAGE.devs.setIdChild(node);
    APP_STORAGE.sensors.setSessFirstLast([]);
    APP_STORAGE.sensors.setSess_first([])
    APP_STORAGE.sensors.setSess_second([])
    APP_STORAGE.sensors.setSortDesc('') ;
    APP_STORAGE.sensors.setChoseSessTime('');
    APP_STORAGE.sensors.setAkbSessLast('');
    APP_STORAGE.devs_groups.setMiddleForm(2);
   }  
}


export const options = async (event: any, node: any) => {
APP_STORAGE.devs_groups.setParent(node);
APP_STORAGE.devs.setGroupDevId(String(node));
}



 export const customizedGroupTick = (props: any) => {
  const { index, x, y, payload } = props;

  return (
   
          <g>
         <rect x={x} y ={y}  className ='map'  width="4" height="8" fill="#808080" fontFamily="Verdana" fontSize="14px" />
        <text dx={x - 35} dy={y + 10} fill="blue" fontSize="12px" textAnchor="middle">
           {payload.value}
        </text>
  </g>
  ); 
};

export const handleChangePage = (
  event: React.MouseEvent<HTMLButtonElement> | null,
  newPage: number,
) => {
  APP_STORAGE.devs.setPage(newPage);
};


export const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  APP_STORAGE.devs.setRowsPerPage(parseInt(event.target.value, 10));
  APP_STORAGE.devs.setPage(0);
};










