import React, { Component } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Table } from "reactstrap";

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
    onRowEdit: row => {},
    onRowDelete: row => {}
  };

  static propTypes = {
    columns: PropTypes.object.isRequired,
    rows: PropTypes.array.isRequired,
    rowParser: PropTypes.func,
    visibleEdit: PropTypes.bool,
    visibleDelete: PropTypes.bool,
    onRowEdit: PropTypes.func,
    onRowDelete: PropTypes.func
  };

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

    const columnsKeys = Object.keys(columns);

    const renderColumn = columnsKeys.map(col => (
      <th key={col}>
        <Typography variant="subheading">{col}</Typography>
      </th>
    ));

    const renderRow = rows.map(row => {
      const parsedRow = rowParser(columns, row);
      const renderRows = columnsKeys.map(col => {
        if (columns[col] === "array") {
          return (
            <td key={col}>
              <Typography variant="body1">
                [{parsedRow[col].toString()}]
              </Typography>
            </td>
          );
        } else {
          return (
            <td key={col}>
              <Typography variant="body1">{parsedRow[col]}</Typography>
            </td>
          );
        }
      });

      return (
        <tr key={parsedRow[columnsKeys[0]]}>
          {renderRows}
          {visibleEdit && (
            <td>
              <IconButton onClick={() => onRowEdit(parsedRow)}>
                <EditIcon />
              </IconButton>
            </td>
          )}
          {visibleDelete && (
            <td>
              <IconButton onClick={() => onRowDelete(parsedRow)}>
                <DeleteIcon />
              </IconButton>
            </td>
          )}
        </tr>
      );
    });

    return (
      <Table hover>
        <thead>
          <tr>
            {renderColumn}
            {visibleEdit && <th />}
            {visibleDelete && <th />}
          </tr>
        </thead>
        <tbody>{renderRow}</tbody>
      </Table>
    );
  }
}

export default DataTable;
