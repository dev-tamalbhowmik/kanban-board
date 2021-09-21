import React from "react";
import Box from "@mui/material/Box";
import { Droppable } from "react-beautiful-dnd";
import { intersection } from "lodash";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { IssueStatusCopy } from "../../constants/issues";
import BoardListItem from "./BoardListItem";

const useStyles = makeStyles({
  list: {
    display: "flex",
    flexDirection: "column",
    margin: "0 5px",
    minHeight: 400,
    padding: "0 5px",
    width: "25%",
    borderRadius: 3,
    background: "rgb(244, 245, 247)",
  },
  title: {
    padding: "13px 10px 17px",
    textTransform: "uppercase",
    color: "rgb(94, 108, 132)",
    fontSize: 14,
  },
  titleCount: {
    textTransform: "lowercase",
    fontSize: 13,
  },
  issue: {
    height: "100%",
    padding: "0 5px",
  },
});

const BoardList = ({ status, project, filters, updateLocalProjectIssues }) => {
  const classes = useStyles();
  const filteredIssues = filterIssues(project.issues, filters);
  const filteredListIssues = getSortedListIssues(filteredIssues, status);
  const allListIssues = getSortedListIssues(project.issues, status);

  return (
    <Droppable key={status} droppableId={status}>
      {(provided) => (
        <Box className={classes.list}>
          <Typography className={classes.title}>
            {`${IssueStatusCopy[status]} `}
            <span className={classes.titleCount}>
              {formatIssuesCount(allListIssues, filteredListIssues)}
            </span>
          </Typography>
          <Box
            component="div"
            className={classes.issues}
            {...provided.droppableProps}
            ref={provided.innerRef}
            data-testid={`board-list:${status}`}
          >
            {filteredListIssues.map((issue, index) => (
              <BoardListItem
                key={issue.id}
                projectUsers={project.users}
                issue={issue}
                index={index}
                updateLocalProjectIssues={updateLocalProjectIssues}
                issues={project.issues}
              />
            ))}
            {provided.placeholder}
          </Box>
        </Box>
      )}
    </Droppable>
  );
};

const filterIssues = (projectIssues, filters) => {
  const { searchTerm, userIds, epicsSelected, typesSelected } = filters;
  let issues = projectIssues;

  if (searchTerm) {
    issues = issues.filter((issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (userIds.length > 0) {
    issues = issues.filter(
      (issue) => intersection(issue.userIds, userIds).length > 0
    );
  }
  if (epicsSelected.length > 0) {
    issues = issues.filter((issue) => epicsSelected.includes(issue.epic));
  }
  if (typesSelected.length > 0) {
    issues = issues.filter((issue) => typesSelected.includes(issue.type));
  }
  return issues;
};

const getSortedListIssues = (issues, status) =>
  issues
    .filter((issue) => issue.status === status)
    .sort((a, b) => a.listPosition - b.listPosition);

const formatIssuesCount = (allListIssues, filteredListIssues) => {
  if (allListIssues.length !== filteredListIssues.length) {
    return `${filteredListIssues.length} of ${allListIssues.length}`;
  }
  return allListIssues.length;
};

export default BoardList;
