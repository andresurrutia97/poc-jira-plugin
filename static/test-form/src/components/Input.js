import React from "react";

import Textfield from "@atlaskit/textfield";

const Input = ({ value, onChange }) => {
  return <Textfield value={value} onChange={onChange} height="10px" />;
};

export default Input;
