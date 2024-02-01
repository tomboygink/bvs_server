import React, { useCallback, FC, useRef } from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";

interface IProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const LongInput = React.forwardRef<HTMLInputElement, IProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0[00].0{00000000000000000000000}"
        placeholder={"53.45454464..."}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export default LongInput;
