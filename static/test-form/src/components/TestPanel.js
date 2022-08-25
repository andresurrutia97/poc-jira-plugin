import React, { useCallback, useEffect, useState } from "react";
import { invoke } from "@forge/bridge";

import TestItem from "./TestItem";
import TestItemForm from "./TestItemForm";

const TestPanel = () => {
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestLife = useCallback(async (requestType, payload = null) => {
    setIsLoading(true);

    try {
      const res = await invoke(requestType, payload);

      setTests(res);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  useEffect(async () => {
    handleRequestLife("get-all");
  }, [handleRequestLife]);

  const handleAdd = (test) => {
    handleRequestLife("create", test);
  };

  const handleDelete = async (id) => {
    await handleRequestLife("delete", { id });
  };

  const renderTests = () => {
    if (!tests?.length) return;

    return tests.map((test) => (
      <TestItem test={test} onDelete={handleDelete} />
    ));
  };

  return (
    <>
      <table>
        <tr>
          <th>Test Step</th>
          <th>TestData</th>
          <th>Expected Result</th>
          <th></th>
        </tr>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            {renderTests()}
            <TestItemForm onAdd={handleAdd} />
          </>
        )}
      </table>
    </>
  );
};

export default TestPanel;
