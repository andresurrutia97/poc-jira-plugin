import React from "react";
import Button from "@atlaskit/button";

const TestItem = ({ test, onDelete }) => {
  const { step, data, result, id } = test;

  return (
    <tr className="h-10 border-b border-blue-100">
      <td>{step}</td>
      <td>{data}</td>
      <td>{result}</td>
      <td className="flex justify-center">
        <Button
          onClick={() => onDelete(id)}
          appearance="danger"
          spacing="compact"
        >
          x
        </Button>
      </td>
    </tr>
  );
};

export default TestItem;
