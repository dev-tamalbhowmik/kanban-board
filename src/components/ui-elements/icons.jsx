import React from "react";
import BugReportIcon from "@mui/icons-material/BugReport";
import TaskIcon from "@mui/icons-material/Task";
import BookIcon from "@mui/icons-material/Book";
import ErrorIcon from "@mui/icons-material/Error";

const defaultProps = {
  className: undefined,
  size: 16,
  left: 0,
  top: 0,
};

const Icon = ({ type, ...iconProps }) => {
  switch (type) {
    case "bug":
      return <BugReportIcon color="error" {...iconProps} />;
    case "task":
      return <TaskIcon color="primary" {...iconProps} />;
    case "story":
      return <BookIcon color="success" {...iconProps} />;
    default:
      return <ErrorIcon color="error" {...iconProps} />;
  }
};

Icon.defaultProps = defaultProps;

export default Icon;
