import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Icon from "../ui-elements/icons";
import { IssueStatusCopy } from "../../constants/issues";

const useStyles = makeStyles({
  issueLink: {
    display: "flex",
    marginBottom: "5px",
    width: "100%",
  },
  issue: {
    padding: 10,
    borderRadius: 3,
    background: "#fff",
    boxShadow: "0px 1px 2px 0px rgba(9, 30, 66, 0.25)",
    transition: "background 0.1s",
    width: "100%",
  },
  titleCount: {
    textTransform: "lowercase",
    fontSize: 13,
  },
  title: {
    paddingBottom: 11,
    fontSize: 15,
  },
  "&:hover": {
    background: "#EBECF0",
  },
  avatar: {
    height: 32,
    width: 32,
  },
});

const ITEM_HEIGHT = 48;

const BoardListItem = ({
  projectUsers,
  issue,
  index,
  updateLocalProjectIssues,
  issues,
}) => {
  const classes = useStyles();
  const assignees = issue.userIds.map((userId) =>
    projectUsers.find((user) => user.id === userId)
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = Object.entries(IssueStatusCopy)
    .map(([key, value]) => {
      return { title: value, value: key };
    })
    .filter((item) => item.value !== issue.status);

  const handleChange = (value) => {
    let issuePositions = issues.map((item) => item.listPosition).sort();
    let issuePosition = issuePositions.length
      ? issuePositions[issuePositions.length - 1] + 1
      : 1;
    const updatedFields = {
      status: value,
      listPosition: issuePosition,
    };
    console.log(
      "🚀 ~ file: BoardListItem.js ~ line 84 ~ handleChange ~ updatedFields",
      updatedFields
    );
    updateLocalProjectIssues(issue.id, updatedFields);
    setAnchorEl(null);
  };

  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          data-testid="list-issue"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.issueLink}
        >
          <Box
            className={classes.issue}
            sx={{
              transform:
                snapshot.isDragging && !snapshot.isDropAnimating
                  ? "rotate(3deg)"
                  : "",
              boxShadow:
                snapshot.isDragging && !snapshot.isDropAnimating
                  ? "5px 10px 30px 0px rgba(9, 30, 66, 0.15)"
                  : "none",
            }}
          >
            <Typography className={classes.title}>{issue.title}</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Icon type={issue.type} />
              </Box>
              <AvatarGroup max={3} direction="row-reverse">
                {assignees.map((user) => (
                  <Avatar
                    className={classes.avatar}
                    key={user.id}
                    size={24}
                    name={user.name}
                    alt={user.name}
                    src={user.avatarUrl}
                  />
                ))}
              </AvatarGroup>

              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option.value}
                    onClick={() => handleChange(option.value)}
                  >
                    {option.title}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

export default BoardListItem;
