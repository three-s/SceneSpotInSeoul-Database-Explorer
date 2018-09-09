import React, { Component } from "react";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";

import AddIcon from "@material-ui/icons/Add";

import { DataTable } from "../components/DataTable";
import { DataFieldDialog } from "../components/DataFieldDialog";

import Constants from "../Constants";
import Utils from "../Utils";

class Scenes extends Component {
  state = {
    addDialogOpen: false,
    editDialogOpen: false,
    editDialogDefaultData: {},
    snackbarOpen: false,
    snackbarMessage: "",
    data: []
  };

  componentDidMount() {
    this.readData();
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;

    const dataColumns = {
      uuid: "string",
      desc: "string",
      image: "string",
      related_location: "string",
      related_media: "string",
      tags: "array"
    };

    const dataRowParser = (columns, row) => {
      return {
        uuid: row.data.uuid,
        desc: row.data.desc,
        image: row.data.image,
        related_location: row.related_location,
        related_media: row.related_media,
        tags: row.tags
      };
    };

    return (
      <div>
        <DataTable
          columns={dataColumns}
          rows={data}
          rowParser={dataRowParser}
          onRowEdit={this.handleRowEdit}
          onRowDelete={this.handleRowDelete}
        />
        <Button
          variant="fab"
          color="primary"
          className={classes.fab}
          onClick={() => {
            this.setState({
              addDialogOpen: true
            });
          }}
        >
          <AddIcon />
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
        />
        <DataFieldDialog
          title="Add item"
          positiveButtonText="add"
          isOpen={this.state.addDialogOpen}
          columns={Utils.excludeObjectKey(dataColumns, "uuid")}
          dataTransform={this.dialogDataTransform}
          onPositiveClicked={data => {
            this.createData(data);
            this.handleAddDialogClose();
          }}
          onNegativeClicked={this.handleAddDialogClose}
          onDialogClosed={this.handleAddDialogClose}
        />
        <DataFieldDialog
          title="Edit item"
          positiveButtonText="edit"
          isOpen={this.state.editDialogOpen}
          columns={dataColumns}
          disableColumns={["uuid"]}
          defaultData={this.state.editDialogDefaultData}
          dataTransform={this.dialogDataTransform}
          onPositiveClicked={data => {
            this.updateData(data);
            this.handleEditDialogClose();
          }}
          onNegativeClicked={this.handleEditDialogClose}
          onDialogClosed={this.handleEditDialogClose}
        />
      </div>
    );
  }

  createData = newData => {
    return axios
      .post(`${Constants.BASE_API_ENDPOINT}/scenes`, newData)
      .then(response => {
        const responseBody = response.data;
        this.showSnackbar(`${responseBody.data.uuid} is added.`);
        this.createDataInLocal(responseBody);
      })
      .catch(error => {
        this.handleRequestError(error);
      });
  };

  readData = () => {
    return axios
      .get(`${Constants.BASE_API_ENDPOINT}/scenes`)
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        this.handleRequestError(error);
      });
  };

  updateData = newData => {
    return axios
      .put(`${Constants.BASE_API_ENDPOINT}/scenes/${newData.uuid}`, newData)
      .then(response => {
        const responseBody = response.data;
        this.showSnackbar(`${responseBody.data.uuid} is updated.`);
        this.deleteDataInLocal(responseBody.data.uuid);
        this.createDataInLocal(responseBody);
      })
      .catch(error => {
        this.handleRequestError(error);
      });
  };

  deleteData = uuid => {
    return axios
      .delete(`${Constants.BASE_API_ENDPOINT}/scenes/${uuid}`)
      .then(response => {
        this.showSnackbar(`${uuid} is deleted.`);
        this.deleteDataInLocal(uuid);
      })
      .catch(error => {
        this.handleRequestError(error);
      });
  };

  createDataInLocal = data => {
    const copiedData = this.state.data;
    copiedData.push(data);
    this.setState({
      data: copiedData
    });
  };

  deleteDataInLocal = uuid => {
    this.setState({
      data: this.state.data.filter(it => it.data.uuid !== uuid)
    });
  };

  dialogDataTransform = data => {
    data["tags"] = data["tags"].split(",");
    return data;
  };

  showSnackbar = message => {
    this.setState({ snackbarOpen: true, snackbarMessage: message });
  };

  handleAddDialogClose = () => {
    this.setState({ addDialogOpen: false });
  };

  handleEditDialogClose = () => {
    this.setState({ editDialogOpen: false });
  };

  handleRowEdit = row => {
    this.setState({
      editDialogDefaultData: row,
      editDialogOpen: true
    });
  };

  handleRowDelete = row => {
    this.deleteData(row.uuid);
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleRequestError = error => {
    if (typeof error.response.data.message !== "undefined") {
      this.showSnackbar(`${error.response.data.message}`);
    }
    console.error(error);
  };
}

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: 0,
    right: 0,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Scenes);
