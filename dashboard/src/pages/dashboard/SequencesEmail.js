import React from "react";
import { Typography, Button } from "@material-ui/core";

const SequencesEmail = () => {
  const data = [
    { amount: 0, name: "Total" },
    { amount: 0, name: "Scheduled" },
    { amount: 0, name: "Delivered" },
    { amount: 0, name: "Opened" },
    { amount: 0, name: "Clicked" },
    { amount: 0, name: "Replied" },
    { amount: 0, name: "Failed" },
    { amount: 0, name: "Bounced" },
  ];
  return (
    <div>
      {/* <div style={{ border: "1px solid grey", display: "flex" }}>
        {data?.map((field) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 30px",
              alignItems: "center",
              borderLeft: "1px solid grey",
              cursor: "pointer",
            }}
          >
            <Typography>{field.amount}</Typography>
            <Typography>{field.name}</Typography>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SequencesEmail;
