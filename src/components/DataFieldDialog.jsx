import React, { Component } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

export class DataFieldDialog extends Component {
  static defaultProps = {
    positiveButtonText: "ok",
    nagativeButtonText: "cancel",
    isOpen: false,
    disableColumns: [],
    defaultData: {},
    dataTransform: data => data,
    onPositiveClicked: data => {},
    onNegativeClicked: () => {},
    onDialogClosed: () => {}
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    positiveButtonText: PropTypes.string,
    nagativeButtonText: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    columns: PropTypes.object.isRequired,
    disableColumns: PropTypes.arrayOf(PropTypes.string),
    defaultData: PropTypes.object,
    dataTransform: PropTypes.func,
    onPositiveClicked: PropTypes.func,
    onNegativeClicked: PropTypes.func,
    onDialogClosed: PropTypes.func
  };

  state = {
    data: this.props.defaultData
  };

  componentDidMount() {
    this.clearFieldData(this.props.columns);
  }

  render() {
    const {
      title,
      positiveButtonText,
      nagativeButtonText,
      isOpen,
      columns,
      disableColumns,
      dataTransform,
      onPositiveClicked,
      onNegativeClicked,
      onDialogClosed
    } = this.props;

    const columnsKeys = Object.keys(columns);
    const renderField = columnsKeys.map(col => (
      <TextField
        key={col}
        id={col}
        label={col}
        value={this.state.data[col]}
        onChange={this.handleTextFieldChange(col)}
        margin="dense"
        fullWidth
        disabled={disableColumns.indexOf(col) >= 0}
      />
    ));

    return (
      <Dialog open={isOpen} onClose={onDialogClosed} onEntered={this.handleDialogEntered}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{renderField}</DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onNegativeClicked}>
            {nagativeButtonText}
          </Button>
          <Button
            color="primary"
            onClick={() => onPositiveClicked(dataTransform(this.state.data))}
          >
            {positiveButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  initFieldData = (columns, defaultData) => {
    let initData = {};

    const columnsKeys = Object.keys(columns);
    columnsKeys.forEach(col => {
      if (Object.keys(defaultData).length === 0) {
        initData[col] = "";
      } else {
        if (typeof defaultData[col] !== "undefined") {
          if (columns[col] === "array") {
            initData[col] = defaultData[col].toString();
          } else {
            initData[col] = defaultData[col];
          }
        } else {
          initData[col] = "";
        }
      }
    });

    this.setState({
      data: initData
    });
  };

  clearFieldData = columns => {
    let clearData = {};

    const columnsKeys = Object.keys(columns);
    columnsKeys.forEach(col => {
      clearData[col] = "";
    });

    this.setState({
      data: clearData
    });
  };

  handleDialogEntered = () => {
    const { columns, defaultData } = this.props;
    this.initFieldData(columns, defaultData);
  };

  handleTextFieldChange = name => event => {
    const newData = this.state.data;
    newData[name] = event.target.value;
    this.setState({
      data: newData
    });
  };
}

export default DataFieldDialog;
