import React, { useState } from "react";
import ProjectBoard from "../components/dashboard";
import BaseLayout from "../components/shared/BaseLayout";
import data from "../helper-data/project.json";
import { updateArrayItemById } from "../utils/javascript";

function Dashboard() {
  const [project, setProject] = useState(data.project);

  const updateLocalProjectIssues = (issueId, updatedFields) => {
    let projectClone = {
      ...project,
      issues: updateArrayItemById(project.issues, issueId, updatedFields),
    };
    setProject(projectClone);
  };
  const handleProjectIssueCreate = (issue) => {
    let updateIssues = [...project.issues, issue];

    let projectClone = {
      ...project,
      issues: updateIssues,
    };
    setProject(projectClone);
  };

  return (
    <BaseLayout>
      <ProjectBoard
        project={project}
        updateLocalProjectIssues={updateLocalProjectIssues}
        handleProjectIssueCreate={handleProjectIssueCreate}
      />
    </BaseLayout>
  );
}

export default Dashboard;
