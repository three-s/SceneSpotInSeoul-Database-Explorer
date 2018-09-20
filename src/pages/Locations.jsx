import React, { Component } from "react";
import BaseDataPage from "./BaseDataPage";

class Locations extends Component {
  render() {
    const dataPath = "locations";

    const dataColumns = {
      uuid: "string",
      name: "string",
      desc: "string",
      image: "string",
      address: "string",
      lat: "float",
      lon: "float",
      tags: "array"
    };

    const dataRowParser = (columns, row) => {
      return {
        uuid: row.data.uuid,
        name: row.data.name,
        desc: row.data.desc,
        image: row.data.image,
        address: row.data.address,
        lat: row.data.lat,
        lon: row.data.lon,
        tags: row.tags
      };
    };

    const dialogDataTransform = data => {
      data["lat"] = parseFloat(data["lat"]);
      data["lon"] = parseFloat(data["lon"]);
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

export default Locations;
