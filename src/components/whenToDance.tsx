"use client";

import { useState } from "react";

import { Box, Button, Typography } from "@mui/material";

interface TimeSlot {
  day: string;
  hour: number;
}

const WhenToDance = () => {
  const days = ["日", "一", "二", "三", "四", "五", "六"];
  const hours = Array.from({ length: 24 }, (_, i) => i + 1); // 1-24 hours
  const [selectedTimes, setSelectedTimes] = useState<TimeSlot[]>([]);

  const toggleTimeSlot = (day: string, hour: number) => {
    const index = selectedTimes.findIndex(
      (slot) => slot.day === day && slot.hour === hour,
    );
    if (index >= 0) {
      setSelectedTimes((current) => current.filter((_, i) => i !== index));
    } else {
      setSelectedTimes((current) => [...current, { day, hour }]);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 920,
        mx: "auto",
        my: 4,
        display: "grid",
        gridTemplateColumns: "60px repeat(7, 1fr)",
      }}
    >
      <Box
        key={"day"}
        sx={{ maxWidth: 30, textAlign: "center", borderBottom: "solid #ccc" }}
      >
        <Typography variant="h6">day</Typography>
        {hours.map((hour) => (
          <Button
            key={hour}
            sx={{
              height: 20,
              minWidth: 30,
              padding: 0,
              color: "white",
            }}
          >
            {hour}
          </Button>
        ))}
      </Box>
      {days.map((day) => (
        <Box
          key={day}
          sx={{ maxWidth: 30, textAlign: "center", borderBottom: "solid #ccc" }}
        >
          <Typography variant="h6">{day}</Typography>
          {hours.map((hour) => (
            <Button
              key={`${day}-${hour}`}
              sx={{
                height: 20,
                minWidth: 30,
                padding: 0,
                backgroundColor: selectedTimes.some(
                  (slot) => slot.day === day && slot.hour === hour,
                )
                  ? "lightgreen"
                  : "lightgray",
                "&:hover": {
                  backgroundColor: selectedTimes.some(
                    (slot) => slot.day === day && slot.hour === hour,
                  )
                    ? "green"
                    : "gray",
                },
              }}
              onClick={() => toggleTimeSlot(day, hour)}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default WhenToDance;
