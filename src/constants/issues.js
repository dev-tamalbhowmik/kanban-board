export const IssueType = {
  TASK: "task",
  BUG: "bug",
  STORY: "story",
};

export const IssueStatus = {
  TODO: "todo",
  INPROGRESS: "inprogress",
  DEVCOMPLETE: "devcomplete",
  INQA: "inqa",
  DONE: "done",
};

export const IssueEpic = {
  ADMIN: "admin",
  HEADER: "header",
  FOOTER: "footer",
  FEATURE: "feature",
  USERPROFILE: "userprofile",
  LOGIN: "login",
};

export const IssueTypeCopy = {
  [IssueType.TASK]: "Task",
  [IssueType.BUG]: "Bug",
  [IssueType.STORY]: "Story",
};

export const IssueStatusCopy = {
  [IssueStatus.TODO]: "TODO",
  [IssueStatus.INPROGRESS]: "IN PROGRESS",
  [IssueStatus.DEVCOMPLETE]: "DEV COMPLETE",
  [IssueStatus.INQA]: "IN QA",
  [IssueStatus.DONE]: "DONE",
};

export const IssueEpicCopy = {
  [IssueEpic.ADMIN]: "Admin",
  [IssueEpic.HEADER]: "Header",
  [IssueEpic.FOOTER]: "Footer",
  [IssueEpic.FEATURE]: "Feature",
  [IssueEpic.USERPROFILE]: "User Profile",
  [IssueEpic.LOGIN]: "Login",
};
