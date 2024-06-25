"use client";

import React from "react";

import { Stack, Avatar, Typography, Box } from "@mui/material";

interface TeacherProps {
  data: {
    teacher: string;
    image: string;
  }[];
}

const Teacher: React.FC<TeacherProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-80 h-40 rounded-md overflow-hidden relative">
        <div className="w-full flex items-start">
          <Typography variant="h6" className="mb-2">
            你喜歡的老師...
          </Typography>
        </div>
        <div className="overflow-x-auto w-full">
          <Stack direction="row" spacing={2} className="flex-nowrap">
            {data.map((item, index) => (
              <Box key={index} className="flex flex-col items-center min-w-max">
                <Avatar
                  alt={item.teacher}
                  src={item.image}
                  sx={{ width: "60px", height: "60px" }}
                />
                <Typography variant="caption" className="mt-1">
                  {item.teacher}
                </Typography>
              </Box>
            ))}
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
