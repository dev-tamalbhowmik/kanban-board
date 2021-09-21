import React, { useEffect } from "react";
import { xor } from "lodash";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { makeStyles } from "@mui/styles";

import CreateItem from "./CreateItem";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles({
  inputField: {
    marginRight: 18,
    // width: 160,
    // display: "inline-block",
    // height: 32,
  },
  avatarActiveBorder: {
    // display: "inline-flex",
    marginLeft: "-2px",
    borderRadius: "50%",
    transition: "transform 0.1s",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  avatars: {
    margin: "0 12px 0 2px",
  },
  avatar: {
    height: 32,
    width: 32,
  },
  epics: {
    width: 250,
  },
  clearAll: {
    height: 32,
    lineHeight: "32px",
    marginLeft: 15,
    paddingLeft: 12,
    borderLeft: `1px solid rgb(223, 225, 230)`,
    color: "rgb(66, 82, 110)",
    "&:hover": {
      color: "#5E6D84",
    },
  },
});

function BoardHeader({
  projectUsers,
  epics,
  types,
  defaultFilters,
  filters,
  mergeFilters,
  handleIssueCreate,
  project,
}) {
  const classes = useStyles();
  const { searchTerm, userIds, epicsSelected, typesSelected } = filters;
  const [epic, setEpic] = React.useState([]);
  const [type, setType] = React.useState([]);

  useEffect(() => {
    if (epicsSelected.length === 0) {
      setEpic([]);
    }
    if (typesSelected.length === 0) {
      setType([]);
    }
  }, [epicsSelected, typesSelected]);

  const [inputEpic, setInputEpic] = React.useState("");
  const [inputType, setInputType] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openForm, setOpenForm] = React.useState(false);

  const handleFormOpen = () => {
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const areFiltersCleared =
    !searchTerm &&
    userIds.length === 0 &&
    epicsSelected.length === 0 &&
    typesSelected.length === 0;

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        position: "absolute",
        top: 0,
        width: "100%",
        backgroundColor: "white",
        zIndex: 100,
        paddingBottom: "15px",
      }}
    >
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        // size="small"
        className={classes.inputField}
        value={searchTerm}
        onChange={(event) => mergeFilters({ searchTerm: event.target.value })}
      />
      <AvatarGroup
        direction="row-reverse"
        className={classes.avatars}
        max={3}
        onClick={handleClick}
      >
        {projectUsers.map((user) => (
          <Avatar
            key={user.id}
            sx={{
              boxShadow: userIds.includes(user.id)
                ? `0 0 0 4px rgb(0 82 204)`
                : "none",
            }}
            className={classes.avatar}
            alt={user.name}
            name={user.name}
            src={user.avatarUrl}
            onClick={(event) => {
              event.stopPropagation();
              mergeFilters({ userIds: xor(userIds, [user.id]) });
            }}
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
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            maxHeight: 32 * 5.5,
            width: 250,
          },
        }}
      >
        {projectUsers.map((user) => (
          <MenuItem key={user.id} selected={userIds.includes(user.id)}>
            <Checkbox
              edge="start"
              checked={userIds.includes(user.id)}
              tabIndex={-1}
              disableRipple
              onClick={(event) => {
                event.stopPropagation();
                mergeFilters({ userIds: xor(userIds, [user.id]) });
              }}
            />
            <Avatar
              className={classes.avatar}
              alt={user.name}
              name={user.name}
              src={user.avatarUrl}
            />{" "}
            {user.name}
          </MenuItem>
        ))}
      </Menu>

      <Autocomplete
        multiple
        limitTags={1}
        className={classes.epics}
        options={epics}
        onChange={(event, newValues) => {
          setEpic(newValues);
          mergeFilters({
            epicsSelected: newValues.map((item) => item.value),
          });
        }}
        value={epic}
        disableCloseOnSelect
        inputValue={inputEpic}
        onInputChange={(event, newInputValue) => {
          setInputEpic(newInputValue);
        }}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Epics" placeholder="" />
        )}
      />
      <Autocomplete
        multiple
        limitTags={1}
        className={classes.epics}
        options={types}
        value={type}
        onChange={(event, newValues) => {
          setType(newValues);
          mergeFilters({
            typesSelected: newValues.map((item) => item.value),
          });
        }}
        disableCloseOnSelect
        inputValue={inputType}
        onInputChange={(event, newInputValue) => {
          setInputType(newInputValue);
        }}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        )}
        style={{ marginLeft: 15 }}
        renderInput={(params) => (
          <TextField {...params} label="Types" placeholder="" />
        )}
      />
      {!areFiltersCleared && (
        <Box
          onClick={() => mergeFilters(defaultFilters)}
          className={classes.clearAll}
        >
          Clear all
        </Box>
      )}
      <Button
        variant="outlined"
        sx={{
          marginLeft: "auto",
          textTransform: "capitalize",
        }}
        onClick={handleFormOpen}
      >
        Create Item
      </Button>
      <CreateItem
        open={openForm}
        handleClose={handleFormClose}
        handleIssueCreate={handleIssueCreate}
        projectUsers={projectUsers}
        epics={epics}
        types={types}
        userIds={userIds}
        mergeFilters={mergeFilters}
        project={project}
      />
    </Box>
  );
}

export default BoardHeader;
