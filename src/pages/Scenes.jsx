import React, { Component } from "react";
import BaseDataPage from "./BaseDataPage";

class Scenes extends Component {
  render() {
    const dataPath = "scenes";

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

    const dialogDataTransform = data => {
      data["tags"] = data["tags"].replace(/\s/gi, "_").split(",");
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

export default Scenes;
