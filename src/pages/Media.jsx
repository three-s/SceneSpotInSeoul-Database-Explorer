import React, { Component } from "react";
import BaseDataPage from "./BaseDataPage";

class Media extends Component {
  render() {
    const dataPath = "media";

    const dataColumns = {
      uuid: "string",
      name: "string",
      desc: "string",
      image: "string",
      tags: "array"
    };

    const dataRowParser = (columns, row) => {
      return {
        uuid: row.data.uuid,
        name: row.data.name,
        desc: row.data.desc,
        image: row.data.image,
        tags: row.tags
      };
    };

    const dialogDataTransform = data => {
      data["tags"] = data["tags"].split(",");
      return data;
    };

    return (
      <BaseDataPage
        dataPath={dataPath}
        dataColumns={dataColumns}
        dataRowParser={dataRowParser}
        dialogDataTransform={dialogDataTransform}
      />
    );
  }
}

export default Media;
