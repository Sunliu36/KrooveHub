import React, { useState, useEffect } from "react";

import { Typography, CircularProgress, Button, Box, Grid } from "@mui/material";

interface AvailabilityType {
  [dayIndex: number]: {
    [hourIndex: number]: number;
  };
}

interface TimeSlot {
  dayIndex: number;
  hourIndex: number;
}

const indexToDay = ["日", "一", "二", "三", "四", "五", "六"];
const numPeople = [0, 5, 10, 15, 20, 25, 30, 35];

const hours = Array.from({ length: 15 }, (_, i) => i + 8); // 8-22 hours

interface WhenToMeetProps {
  classname: string;
}

const WhenToDance: React.FC<WhenToMeetProps> = ({ classname }) => {
  const [selectedTimes, setSelectedTimes] = useState<TimeSlot[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startSlot, setStartSlot] = useState<TimeSlot | null>(null);
  const [showNumber, setShowNumber] = useState<boolean>(false);
  const [availability, setAvailability] = useState<AvailabilityType>({});
  const [loading, setLoading] = useState<boolean>(true);

  const isSlotSelected = (dayIndex: number, hourIndex: number) => {
    if (!selectedTimes) {
      return false;
    }
    return selectedTimes.some(
      (slot) => slot.dayIndex === dayIndex && slot.hourIndex === hourIndex,
    );
  };

  const toggleSlot = (dayIndex: number, hourIndex: number) => {
    const selected = isSlotSelected(dayIndex, hourIndex);
    if (selected) {
      setSelectedTimes((current) =>
        current.filter(
          (slot) =>
            !(slot.dayIndex === dayIndex && slot.hourIndex === hourIndex),
        ),
      );
    } else {
      setSelectedTimes((current) => [...current, { dayIndex, hourIndex }]);
    }
  };

  const handleMouseDown = (dayIndex: number, hourIndex: number) => {
    toggleSlot(dayIndex, hourIndex);
    setIsSelecting(true);
    setStartSlot({ dayIndex, hourIndex });
  };

  const handleMouseEnter = (dayIndex: number, hourIndex: number) => {
    if (isSelecting && startSlot) {
      toggleSlot(dayIndex, hourIndex);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    setStartSlot(null);
  };

  const handleTouchStart = (dayIndex: number, hourIndex: number) => {
    handleMouseDown(dayIndex, hourIndex);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (
      element &&
      element instanceof HTMLElement &&
      element.dataset.day &&
      element.dataset.hour
    ) {
      const dayIndex = parseInt(element.dataset.day, 10);
      const hourIndex = parseInt(element.dataset.hour, 10);
      handleMouseEnter(dayIndex, hourIndex);
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  useEffect(() => {
    fetch(`/api/${classname}/availability`)
      .then((res) => res.json())
      .then((data: AvailabilityType) => {
        if (data) {
          setAvailability(data);
        }
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
        return "#808080"; // Gray for no availability
      case 1:
        return "#ccffcc"; // Very Light Green for very low availability
      case 2:
        return "#99ff99"; // Light Green for low availability
      case 3:
        return "#66ff66"; // Pastel Green for lower medium availability
      case 4:
        return "#33cc33"; // Lime Green for medium availability
      case 5:
        return "#29a329"; // Medium Green for higher medium availability
      case 6:
        return "#248f24"; // Sea Green for good availability
      case 7:
        return "#1f7a1f"; // Forest Green for high availability
      case 8:
        return "#145214"; // Dark Green for higher availability
      default:
        return "#0d3c0d"; // Very Dark Green for excellent availability
    }
  };
  const getCount = (count: number) => {
    for (let i = 0; i < numPeople.length; i++) {
      if (count <= numPeople[i]) {
        return i;
      }
    }
    return numPeople.length - 1;
  };

  if (loading) {
    return <CircularProgress />;
  }

  const setShowNumberHandler = () => {
    setShowNumber(!showNumber);
  };

  const saveWhenToDance = (selectedTimes: TimeSlot[]) => {
    console.log(selectedTimes);
    fetch(`/api/${classname}/whenToDance`, {
      method: "POST",
      body: JSON.stringify(selectedTimes),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to save availability", error);
      });
  };

  const cancelWhenToDance = () => {
    setSelectedTimes([]);
  };

  return (
    <>
      <Box sx={{ padding: 0, marginBottom: 0 }}>
        <Typography variant="h6">Availability Legend</Typography>
        <Grid container spacing={1}>
          {numPeople.map((count, index) => (
            <Grid item key={count}>
              <Box
                sx={{
                  width: 25,
                  height: 25,
                  gap: 0,
                  padding: 0,
                  marginBottom: 0,
                  backgroundColor: getColor(index),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #ccc",
                }}
              >
                {count}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Button
        variant="contained"
        sx={{ color: "white", backgroundColor: "#0077cc" }}
        onClick={setShowNumberHandler}
      >
        {showNumber ? "隱藏" : "顯示"}
      </Button>
      <Box
        sx={{
          maxWidth: 920,
          mx: "auto",
          gap: 0,
          padding: 0,
          marginBottom: 0,
          display: "grid",
          gridTemplateColumns: "60px repeat(7, 1fr)",
        }}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <Box
          key={"day"}
          sx={{ maxWidth: 30, textAlign: "center", borderBottom: "solid #ccc" }}
        >
          <Typography variant="h6">Hour</Typography>
          {hours.map((hour) => (
            <Button
              key={hour}
              sx={{
                height: 20,
                minWidth: 45,
                padding: 0,
                marginBottom: 0.5,
                border: "1px solid #ccc",
                "&:disabled": {
                  color: "black",
                  backgroundColor: "white",
                },
              }}
              disabled
            >
              {hour}:00
            </Button>
          ))}
        </Box>
        {indexToDay.map((day, dayIndex) => (
          <Box
            key={day}
            sx={{
              maxWidth: 35,
              textAlign: "center",
              borderBottom: "solid #ccc",
            }}
          >
            <Typography variant="h6">{day}</Typography>
            {hours.map((hourIndex) => (
              <Button
                key={`${dayIndex}-${hourIndex}`}
                sx={{
                  height: 20,
                  minWidth: 30,
                  padding: 0,
                  marginBottom: 0.5,
                  color: "black",
                  border: isSlotSelected(dayIndex, hourIndex)
                    ? "2px solid #00008b" // Added border for selected times
                    : "0px solid", // Default border
                  backgroundColor: isSlotSelected(dayIndex, hourIndex)
                    ? getColor(
                        getCount(availability[dayIndex]?.[hourIndex]) + 1 || 1,
                      )
                    : getColor(
                        getCount(availability[dayIndex]?.[hourIndex]) || 0,
                      ),
                  "&:hover": {
                    backgroundColor: isSlotSelected(dayIndex, hourIndex)
                      ? getColor(
                          getCount(availability[dayIndex]?.[hourIndex]) + 1 ||
                            1,
                        )
                      : getColor(
                          getCount(availability[dayIndex]?.[hourIndex]) || 0,
                        ),
                  },
                }}
                onMouseEnter={() => handleMouseEnter(dayIndex, hourIndex)}
                onMouseDown={() => handleMouseDown(dayIndex, hourIndex)}
                onTouchStart={() => handleTouchStart(dayIndex, hourIndex)}
              >
                {showNumber &&
                  (isSlotSelected(dayIndex, hourIndex)
                    ? availability[dayIndex]?.[hourIndex] + 1
                    : availability[dayIndex]?.[hourIndex])}
              </Button>
            ))}
          </Box>
        ))}
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => saveWhenToDance(selectedTimes)}
          sx={{ margin: 1 }}
        >
          儲存
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => cancelWhenToDance()}
          sx={{ margin: 1 }}
        >
          取消
        </Button>
      </Box>
    </>
  );
};

export default WhenToDance;
