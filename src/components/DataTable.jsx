import React, { Component } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import { Table } from "reactstrap";

import { DataDetailDialog } from "./DataDetailDialog";

export class DataTable extends Component {
  static defaultProps = {
    rowParser: (columns, row) => {
      const parsedRow = {};
      Object.keys(columns).forEach(col => {
        parsedRow[col] = row[col];
      });
      return parsedRow;
    },
    visibleEdit: true,
    visibleDelete: true,
    onRowEdit: (row, index) => {},
    onRowDelete: (row, index) => {}
  };

  static propTypes = {
    columns: PropTypes.object.isRequired,
    rows: PropTypes.array.isRequired,
    rowParser: PropTypes.func,
    visibleEdit: PropTypes.bool,
    visibleDelete: PropTypes.bool,
    onRowEdit: PropTypes.func,
    onRowDelete: PropTypes.func,
  };

  state = {
    detailDialogOpen: false,
    detailDialogTitle: "",
    detailDialogContent: ""
  }

  render() {
    const {
      columns,
      rows,
      rowParser,
      visibleEdit,
      visibleDelete,
      onRowEdit,
      onRowDelete
    } = this.props;

    const {
      detailDialogOpen,
      detailDialogTitle,
      detailDialogContent
    } = this.state;

    const columnsKeys = Object.keys(columns);

    const renderColumn = columnsKeys.map(col => (
      <th key={col}>
        <Typography variant="subheading">{col}</Typography>
      </th>
    ));

    const renderRow = rows.map((row, index) => {
      const parsedRow = rowParser(columns, row);
      const renderRows = columnsKeys.map(col => {
        if (columns[col] === "array") {
          return (
            <td key={col} onClick={() => this.openDetailDialog(col, parsedRow[col].toString())}>
              <Typography variant="body1">
                [{this.truncData(parsedRow[col].toString())}]
              </Typography>
            </td>
          );
        } else {
          return (
            <td key={col} onClick={() => this.openDetailDialog(col, parsedRow[col])}>
              <Typography variant="body1">{this.truncData(parsedRow[col])}</Typography>
            </td>
          );
        }
      });

      return (
        <tr key={parsedRow[columnsKeys[0]]}>
          {renderRows}
          {visibleEdit && (
            <td>
              <Button onClick={() => onRowEdit(parsedRow, index)}>
                Edit
              </Button>
            </td>
          )}
          {visibleDelete && (
            <td>
              <Button onClick={() => onRowDelete(parsedRow, index)}>
                Delete
              </Button>
            </td>
          )}
        </tr>
      );
    });

    return (
      <div>
        <Table responsive hover>
          <thead>
            <tr>
              {renderColumn}
              {visibleEdit && <th />}
              {visibleDelete && <th />}
            </tr>
          </thead>
          <tbody>{renderRow}</tbody>
        </Table>
        <DataDetailDialog
          isOpen={detailDialogOpen}
          title={detailDialogTitle}
          content={detailDialogContent}
          onDialogClosed={this.handleDetailDialogClose}
          onCloseClicked={this.handleDetailDialogClose} />
      </div>
    );
  }

  truncData = (data) => {
    if (data.length > 15) {
      return data.substring(0, 15) + "...";
    }
    return data;
  };

  openDetailDialog = (title, content) => {
    this.setState({
      detailDialogOpen: true,
      detailDialogTitle: title,
      detailDialogContent: content
    });
  };

  handleDetailDialogClose = () => {
    this.setState({
      detailDialogOpen: false
    });
  };
}

export default DataTable;
