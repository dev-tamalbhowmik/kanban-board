import React from "react";
import Box from "@mui/material/Box";

import Board from "./Board";
import BoardHeader from "./BoardHeader";
import useMergeState from "../../hooks/mergeState";

const defaultFilters = {
  searchTerm: "",
  userIds: [],
  epicsSelected: [],
  typesSelected: [],
};

function ProjectBoard({
  project,
  updateLocalProjectIssues,
  handleProjectIssueCreate,
}) {
  const [filters, mergeFilters] = useMergeState(defaultFilters);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <BoardHeader
        projectUsers={project.users}
        epics={project.epics}
        types={project.types}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
        handleIssueCreate={handleProjectIssueCreate}
        project={project}
      />
      <Board
        project={project}
        filters={filters}
        updateLocalProjectIssues={updateLocalProjectIssues}
      />
    </Box>
  );
}

export default ProjectBoard;
