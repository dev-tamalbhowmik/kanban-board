import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
// import {
//   moveItemWithinArray,
//   insertItemIntoArray,
// } from "shared/utils/javascript";
import { IssueStatus } from "../../constants/issues";
import BoardList from "./BoardList";
import {
  insertItemIntoArray,
  moveItemWithinArray,
} from "../../utils/javascript";

const Board = ({ project, filters, updateLocalProjectIssues }) => {
  const currentUserId = 1;

  const handleIssueDrop = ({ draggableId, destination, source }) => {
    if (!isPositionChanged(source, destination)) return;
    const issueId = Number(draggableId);
    const updatedFields = {
      status: destination.droppableId,
      listPosition: calculateIssueListPosition(
        project.issues,
        destination,
        source,
        issueId
      ),
    };
    updateLocalProjectIssues(issueId, updatedFields);
  };

  return (
    <DragDropContext onDragEnd={handleIssueDrop}>
      <Box
        sx={{
          display: "flex",
          margin: "26px -5px 0",
          overflowY: "scroll",
          paddingTop: "100px",
          height: "900px",
        }}
      >
        {Object.values(IssueStatus).map((status) => (
          <BoardList
            key={status}
            status={status}
            project={project}
            filters={filters}
            updateLocalProjectIssues={updateLocalProjectIssues}
          />
        ))}
      </Box>
    </DragDropContext>
  );
};

const isPositionChanged = (destination, source) => {
  if (!destination) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

const calculateIssueListPosition = (...args) => {
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(...args);
  let position;

  if (!prevIssue && !nextIssue) {
    position = 1;
  } else if (!prevIssue) {
    position = nextIssue.listPosition - 1;
  } else if (!nextIssue) {
    position = prevIssue.listPosition + 1;
  } else {
    position =
      prevIssue.listPosition +
      (nextIssue.listPosition - prevIssue.listPosition) / 2;
  }
  return position;
};

const getAfterDropPrevNextIssue = (
  allIssues,
  destination,
  source,
  droppedIssueId
) => {
  const beforeDropDestinationIssues = getSortedListIssues(
    allIssues,
    destination.droppableId
  );
  const droppedIssue = allIssues.find((issue) => issue.id === droppedIssueId);
  const isSameList = destination.droppableId === source.droppableId;

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index
      )
    : insertItemIntoArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index
      );

  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    nextIssue: afterDropDestinationIssues[destination.index + 1],
  };
};

const getSortedListIssues = (issues, status) =>
  issues
    .filter((issue) => issue.status === status)
    .sort((a, b) => a.listPosition - b.listPosition);

export default Board;
