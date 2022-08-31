import React from "react";

const IssueItem = ({ issue }) => {
  const {
    key,
    fields: {
      assignee,
      issuetype: { name: issueName },
      reporter: { displayName: reporterName },
      summary,
      status: { name: statusName },
    },
  } = issue;

  return (
    <tr className="h-12 border-b border-blue-100">
      <td>{issueName}</td>
      <td>
        <a>{key}</a>
      </td>
      <td>{summary}</td>
      <td>{assignee ? assignee.displayName : "Unassigned"}</td>
      <td>{reporterName}</td>
      <td>{statusName}</td>
    </tr>
  );
};

export default IssueItem;
