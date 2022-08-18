import React, { useCallback, useEffect, useStat, useReducer } from "react";

import Input from "./Input";

const TestItem = ({ test, onDelete }) => {
  const { step, data, result, id } = test;

  return (
    <tr style={{ backgroundColor: "#deebff" }}>
      <td>{step}</td>
      <td>{data}</td>
      <td>{result}</td>
      <td>
        <button onClick={() => onDelete(id)}>x</button>
      </td>
    </tr>
  );
};

export default TestItem;
