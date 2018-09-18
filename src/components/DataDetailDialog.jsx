import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

export class DataDetailDialog extends Component {
  static defaultProps = {
    isOpen: false,
    title: "",
    content: "",
    closeButtonText: "Close",
    onDialogClosed: () => {},
    onCloseClicked: () => {}
  };

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    closeButtonText: PropTypes.string,
    onDialogClosed: PropTypes.func,
    onCloseClicked: PropTypes.func
  };

  render() {
    const {
      isOpen,
      title,
      content,
      closeButtonText,
      onDialogClosed,
      onCloseClicked
    } = this.props;

    return (
      <Dialog open={isOpen} onClose={onDialogClosed} scroll="paper">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onCloseClicked}>
            {closeButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DataDetailDialog;
