import React, { useCallback, useEffect, useState } from "react";
import { invoke } from "@forge/bridge";

import TestItem from "../components/Test/TestItem";
import TestItemForm from "../components/Test/TestItemForm";
import Spinner from "../components/Spinner";

const FullTd = ({ children }) => (
  <tr>
    <td colspan="4">{children}</td>
  </tr>
);

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
    if (isLoading)
      return (
        <FullTd>
          <Spinner />
        </FullTd>
      );
    if (!tests.length)
      return (
        <FullTd>
          Add new test steps, test data and expected results bellow
        </FullTd>
      );

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
        {renderTests()}
        <TestItemForm onAdd={handleAdd} />
      </table>
    </>
  );
};

export default TestPanel;
