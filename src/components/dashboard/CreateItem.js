import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { makeStyles } from "@mui/styles";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";

const useStyles = makeStyles({
  inputField: {
    margin: "10px 0",
  },
  button: {
    marginLeft: "auto",
  },
  autoComField: {
    margin: "20px 0",
  },
  avatar: {
    height: 24,
    width: 24,
    marginRight: 4,
  },
  chip: {
    display: "flex",
    marginRight: 18,
  },
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CreateItem = ({
  projectUsers,
  epics,
  types,
  open,
  handleClose,
  handleIssueCreate,
  project,
}) => {
  const classes = useStyles();
  const validationSchema = yup.object({
    title: yup.string("Enter your title").required("Title is required"),
    description: yup
      .string("Enter your description")
      .required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      inputEpic: "",
      inputType: "",
      inputAssigned: "",
      epic: null,
      type: null,
      assigned_to: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleIssueCreate(formatItem(values, project));
      handleClose();
    },
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      scroll="body"
    >
      <DialogTitle>Create item</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            className={classes.inputField}
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            multiline
            className={classes.inputField}
            rows={4}
            maxRows={8}
            id="description"
            name="description"
            label="Description"
            type="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <Autocomplete
            fullWidth
            limitTags={1}
            className={classes.autoComField}
            options={epics}
            onChange={(event, newValues) => {
              formik.setFieldValue("epic", newValues);
            }}
            value={formik.values.epic}
            disableCloseOnSelect
            inputValue={formik.values.inputEpic}
            onInputChange={(event, newInputValue) => {
              formik.setFieldValue("inputEpic", newInputValue);
            }}
            getOptionLabel={(option) => (option.title ? option.title : "")}
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
            fullWidth
            limitTags={1}
            className={classes.autoComField}
            options={types}
            value={formik.values.type}
            onChange={(event, newValues) => {
              formik.setFieldValue("type", newValues);
            }}
            disableCloseOnSelect
            inputValue={formik.values.inputType}
            onInputChange={(event, newInputValue) => {
              formik.setFieldValue("inputType", newInputValue);
            }}
            getOptionLabel={(option) => (option.title ? option.title : "")}
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
              <TextField {...params} label="Types" placeholder="" />
            )}
          />
          <Autocomplete
            multiple
            fullWidth
            limitTags={1}
            className={classes.autoComField}
            options={projectUsers}
            value={formik.values.assigned_to}
            onChange={(event, newValues) => {
              formik.setFieldValue("assigned_to", newValues);
            }}
            disableCloseOnSelect
            inputValue={formik.values.inputAssigned}
            onInputChange={(event, newInputValue) => {
              formik.setFieldValue("inputAssigned", newInputValue);
            }}
            getOptionLabel={(option) => (option.name ? option.name : "")}
            renderTags={(options, props) => {
              return options.map((option, key) => {
                return (
                  <div {...props} className={classes.chip} key={key}>
                    <Avatar
                      className={classes.avatar}
                      alt={option.name}
                      name={option.name}
                      src={option.avatarUrl}
                    />
                    {option.name}
                  </div>
                );
              });
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                <Avatar
                  className={classes.avatar}
                  alt={option.name}
                  name={option.name}
                  src={option.avatarUrl}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Assignees" placeholder="" />
            )}
          />

          <DialogActions>
            <Button
              type="submit"
              onClick={handleClose}
              className={classes.button}
            >
              Cancel
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const formatItem = (values, project) => {
  let issues = project.issues;
  let issueIds = issues.map((item) => item.id).sort();
  let issuePositions = issues.map((item) => item.listPosition).sort();
  let issueId = issueIds.length ? issueIds[issueIds.length - 1] + 1 : 1;
  let issuePosition = issuePositions.length
    ? issuePositions[issuePositions.length - 1] + 1
    : 1;

  let issue = {
    id: issueId,
    title: values.title,
    description: values.description,
    type: values.type ? values.type.value : "",
    status: "todo",
    listPosition: issuePosition,
    epic: values.epic ? values.epic.value : "",
    createdAt: moment().format(),
    updatedAt: moment().format(),
    userIds: values.assigned_to.length
      ? values.assigned_to.map((user) => user.id)
      : [],
  };
  return issue;
};

export default CreateItem;
