import React, { useCallback, useEffect, useState } from "react";
import { invoke } from "@forge/bridge";

const Test = () => {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const handleFetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await invoke("GET events");
      setIssues(res.issues);

      console.log(res.issues);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  useEffect(async () => {
    handleFetch();
  }, [handleFetch]);

  const renderContent = () => {
    if (isLoading) return <div>Loading...</div>;
    if (!issues.length) return <div>There is no issues</div>;

    return issues.map(({ key, fields }) => (
      <div>
        {key}: {fields.summary} - status: {fields.status.name}
      </div>
    ));
  };

  return <>{renderContent()}</>;
};

export default Test;
