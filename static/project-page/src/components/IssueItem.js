import React from "react";

const IssueItem = ({ issue }) => {
  const {
    key,
    fields: {
      assignee,
      issuetype: { name: issueName },
      reporter: { displayName },
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
      <td>{assignee || "Unassigned"}</td>
      <td>{displayName}</td>
      <td>{statusName}</td>
    </tr>
  );
};

export default IssueItem;
