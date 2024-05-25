"use client";

import { useState, useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";

interface TimeSlot {
  dayIndex: number;
  hourIndex: number;
}

const WhenToDance = () => {
  const indexToDay = ["日", "一", "二", "三", "四", "五", "六"];
  const hourIndexs = Array.from({ length: 15 }, (_, i) => i + 8); // 8-22 hourIndexs
  const [selectedTimes, setSelectedTimes] = useState<TimeSlot[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startSlot, setStartSlot] = useState<TimeSlot | null>(null);

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
      element.dataset.hourIndex
    ) {
      const dayIndex = parseInt(element.dataset.day, 10);
      const hourIndex = parseInt(element.dataset.hourIndex, 10);
      handleMouseEnter(dayIndex, hourIndex);
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const saveWhenToDance = (selectedTimes: TimeSlot[]) => {
    fetch("/api/user/when", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

  useEffect(() => {
    fetch("/api/user/when")
      .then((res) => res.json())
      .then((data: TimeSlot[]) => {
        if (data.length > 0) {
          setSelectedTimes(data);
        }
      })
      .catch((error) => {
        console.error("Failed to load availability", error);
      });
  }, []);

  const dismissChange = () => {
    fetch("/api/user/when")
      .then((res) => res.json())
      .then((data: TimeSlot[]) => {
        if (data.length > 0) {
          setSelectedTimes(data);
        }
      })
      .catch((error) => {
        setSelectedTimes([]);
      });
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 920,
          mx: "auto",
          my: 4,
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
          <Typography variant="h6">hour</Typography>
          {hourIndexs.map((hourIndex) => (
            <Button
              key={hourIndex}
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
              {hourIndex}:00
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
            {hourIndexs.map((hourIndex) => (
              <Button
                key={`${day}-${hourIndex}`}
                data-day={dayIndex}
                data-hour={hourIndex}
                sx={{
                  height: 20,
                  minWidth: 30,
                  padding: 0,
                  marginBottom: 0.5,
                  border: isSlotSelected(dayIndex, hourIndex)
                    ? "2px solid blue" // Added border for selected times
                    : "1px solid #ccc", // Default border
                  backgroundColor: isSlotSelected(dayIndex, hourIndex)
                    ? "lightgreen"
                    : "lightgray",
                  "&:hover": {
                    backgroundColor: isSlotSelected(dayIndex, hourIndex)
                      ? "green"
                      : "gray",
                  },
                }}
                onMouseEnter={() => handleMouseEnter(dayIndex, hourIndex)}
                onMouseDown={() => handleMouseDown(dayIndex, hourIndex)}
                onTouchStart={() => handleTouchStart(dayIndex, hourIndex)}
              />
            ))}
          </Box>
        ))}
      </Box>
      <div className="flex items-center justify-center w-full">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => saveWhenToDance(selectedTimes)}
          sx={{ margin: 1 }}
        >
          送出
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dismissChange()}
          sx={{ margin: 1 }}
        >
          取消
        </Button>
      </div>
    </>
  );
};

export default WhenToDance;
