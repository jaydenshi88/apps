"use client";
import React, { useState } from "react";
import Joyride, { CallBackProps, STATUS } from "react-joyride";

const Tutorial = () => {
  const [run, setRun] = useState(false);

  // Define your steps
  const steps = [
    {
      target: ".nag",
      content: "This is your first step!",
    },
    {
      target: ".step",
      content: "This is your second step!",
    },
    // Add more steps as needed
  ];

  return <Joyride steps={steps} run={run} />;
};

export default Tutorial;
