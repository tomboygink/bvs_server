
import React, { FunctionComponent } from "react";



export const CustomizedLabel: FunctionComponent<any> = (props: any) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={'#447FF2'} fontSize={14} color={'red'} textAnchor="middle">
     {value} град.
    </text>
  );
};



