// WhenToMeet.tsx
import React, { useState, useEffect } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";

interface TimeSlot {
  [time: string]: number; // Number of available people
}

interface AvailabilityType {
  [day: string]: TimeSlot;
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const times = [
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

interface WhenToMeetProps {
  classname: string;
}

const WhenToMeet: React.FC<WhenToMeetProps> = ({ classname }) => {
  const [availability, setAvailability] = useState<AvailabilityType>({});
  const [showNumber, setShowNumber] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const handleSlotClick = (day: string, time: string) => {
    const newAvailability = { ...availability };
    const currentCount = newAvailability[day][time] || 0;
    newAvailability[day][time] = currentCount + 1; // Increment on click
    setAvailability(newAvailability);
  };
  useEffect(() => {
    fetch(`/api/${classname}/availability`)
      .then((res) => res.json())
      .then((data: AvailabilityType) => {
        console.log(data);
        setAvailability(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load availability", error);
        setLoading(false);
      });
  }, [classname]);

  const getColor = (count: number): string => {
    switch (count) {
      case 0:
        return "#ffccbc"; // Red for no availability
      case 1:
        return "#ffe0b2"; // Orange for very low availability
      case 2:
        return "#fff9c4"; // Yellow for low availability
      case 3:
        return "#b2ebf2"; // Light blue for lower medium availability
      case 4:
        return "#80deea"; // Cyan for medium availability
      case 5:
        return "#80cbc4"; // Teal for higher medium availability
      case 6:
        return "#a5d6a7"; // Light green for good availability
      case 7:
        return "#c5e1a5"; // Green for high availability
      case 8:
        return "#aed581"; // Lime green for higher availability
      default:
        return "#9ccc65"; // Strong green for excellent availability
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const setShowNumberHandler = () => {
    setShowNumber(!showNumber);
  };

  return (
    <>
      <Button variant="contained" onClick={setShowNumberHandler}>
        {showNumber ? "Hide" : "Show"}{" "}
      </Button>
      <TableContainer component={Paper} elevation={3} sx={{ maxWidth: 850 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: "2px" }}></TableCell>
              {days.map((day) => (
                <TableCell
                  key={day}
                  align="center"
                  sx={{ padding: { xs: "4px", sm: "8px" }, fontWeight: "bold" }}
                >
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {times.map((time, index) => (
              <TableRow key={time}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    padding: { xs: "2px", sm: "4px" },
                    fontWeight: "bold",
                    justify: "center",
                  }}
                >
                  {time}
                </TableCell>
                {days.map((day) => (
                  <TableCell
                    key={day}
                    align="center"
                    sx={{
                      bgcolor: getColor(availability[day]?.[time] || 0),
                      cursor: "pointer",
                      fontSize: { xs: "0.75rem", sm: "1rem" },
                    }}
                    onClick={() => handleSlotClick(day, time)}
                  >
                    {showNumber ? availability[day]?.[time] || 0 : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WhenToMeet;
