import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_SERVICE } from "../../config";
import axios from "axios";
import { Typography, Avatar } from "@material-ui/core";

const ViewCompany = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({});

  useEffect(async () => {
    await axios
      .get(`${API_SERVICE}/getcompany/${id}`)
      .then((res) => {
        setCompany(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(company);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar>{company?.fullName?.slice(0, 2)}</Avatar>
        {/* <img src={company.filePath} /> */}
        <Typography variant="h5" style={{ marginLeft: "10px" }}>
          {company?.fullName}
        </Typography>
      </div>
      <div>
        <Typography variant="body1" style={{ marginLeft: "10px" }}>
          Address: {company?.address}
        </Typography>
        <Typography variant="body1" style={{ marginLeft: "10px" }}>
          Website: {company?.website}
        </Typography>
        <Typography variant="body1" style={{ marginLeft: "10px" }}>
          Phone: {company?.phone}
        </Typography>
      </div>
    </div>
  );
};

export default ViewCompany;
