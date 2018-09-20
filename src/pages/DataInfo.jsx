import React, { Component } from "react";
import BaseDataPage from "./BaseDataPage";

class DataInfo extends Component {
  render() {
    const dataPath = "info";

    const dataColumns = {
      name: "string",
      updatedDate: "string"
    };

    return (
      <BaseDataPage
        dataPath={dataPath}
        dataColumns={dataColumns}
        readOnly={true}
        />
    );
  }
}

export default DataInfo;