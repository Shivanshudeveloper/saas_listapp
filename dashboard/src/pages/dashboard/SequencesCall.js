import React from "react";
import { Typography } from "@material-ui/core";

const SequencesCall = () => {
  const data = [
    { amount: 0, name: "Total" },
    { amount: 0, name: "Answered" },
    { amount: 0, name: "Not-Answered" },
  ];
  return (
    // <div style={{ border: "1px solid grey", display: "flex" }}>
    //   {data?.map((field) => (
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         padding: "10px 30px",
    //         alignItems: "center",
    //         borderLeft: "1px solid grey",
    //         cursor: "pointer",
    //       }}
    //     >
    //       <Typography>{field.amount}</Typography>
    //       <Typography>{field.name}</Typography>
    //     </div>
    //   ))}
    // </div>
    <></>
  );
};

export default SequencesCall;
