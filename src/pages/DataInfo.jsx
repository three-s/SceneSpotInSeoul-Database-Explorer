import React, { Component } from "react";
import axios from "axios";

import { DataTable } from "../components/DataTable";

import Constants from "../Constants";

class DataInfo extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    this.readData();
  }

  render() {
    const { data } = this.state;

    const dataColumns = {
      id: "string",
      updateDate: "string"
    };

    return (
      <DataTable 
        columns={dataColumns}
        rows={[data]}
        visibleEdit={false}
        visibleDelete={false}
      />
    );
  }

  readData = () => {
    return axios
      .get(`${Constants.BASE_API_ENDPOINT}/info`)
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export default DataInfo;