import React, { useCallback, FC, useRef } from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";

interface IProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TelInput = React.forwardRef<HTMLInputElement, IProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+7 000-000-00-00"
        definitions={{
          "#": /[1-9]/,
        }}
        placeholder={"+7 000-000-00-00"}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

// TelInput.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

export default TelInput;
