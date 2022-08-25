import React, { useCallback, useEffect, useState } from "react";
import { invoke } from "@forge/bridge";

import IssueTable from "../components/IssueTable";

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

    return <IssueTable issues={issues} />;
  };

  return (
    <>
      <section className="mb-6">
        <span>
          This page is intended to replicate the issue page from jira using
          custom UI.
        </span>
      </section>
      <section>{renderContent()}</section>
    </>
  );
};

export default Test;
