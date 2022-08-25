import React, { useCallback, useEffect, useState } from "react";

import IssueItem from "./IssueItem";

const IssueTable = ({ issues }) => {
  return (
    <table>
      <tr>
        <th>Type</th>
        <th>Key</th>
        <th>Sumamry</th>
        <th>Assignee</th>
        <th>Reporter</th>
        <th>Status</th>
      </tr>
      {issues?.map((issue) => (
        <IssueItem issue={issue} />
      ))}
    </table>
  );
};

export default IssueTable;
