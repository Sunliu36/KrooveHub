"use client";

import { useState, useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";

interface TimeSlot {
  dayIndex: number;
  hourIndex: number;
}

const WhenToDance = () => {
  const indexToDay = ["日", "一", "二", "三", "四", "五", "六"];
  const hours = Array.from({ length: 15 }, (_, i) => i + 8); // 8-22 hours
  const [selectedTimes, setSelectedTimes] = useState<TimeSlot[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startSlot, setStartSlot] = useState<TimeSlot | null>(null);
  const [isUnselecting, setIsUnselecting] = useState(false);

  const isSlotSelected = (dayIndex: number, hourIndex: number) => {
    if (!selectedTimes) {
      return false;
    }
    return selectedTimes.some(
      (slot) => slot.dayIndex === dayIndex && slot.hourIndex === hourIndex,
    );
  };
  useEffect(() => {
    fetch("/api/user/when")
      .then((res) => res.json())
      .then((data: TimeSlot[]) => {
        console.log(data);
        if (data.length > 0) {
          setSelectedTimes(data);
        }
      })
      .catch((error) => {
        console.error("Failed to load availability", error);
      });
  }, []);

  const handleMouseDown = (dayIndex: number, hourIndex: number) => {
    const selected = isSlotSelected(dayIndex, hourIndex);
    setIsSelecting(true);
    setIsUnselecting(selected);
    setStartSlot({ dayIndex, hourIndex });

    if (selected) {
      setSelectedTimes((current) =>
        current?.filter(
          (slot) =>
            !(slot.dayIndex === dayIndex && slot.hourIndex === hourIndex),
        ),
      );
    } else {
      setSelectedTimes((current) => [
        ...(current || []),
        { dayIndex, hourIndex },
      ]);
    }
  };

  const handleMouseEnter = (dayIndex: number, hourIndex: number) => {
    if (isSelecting && startSlot) {
      const dayStartIndex = startSlot.dayIndex;
      const dayEndIndex = dayIndex;
      const hourStartIndex = startSlot.hourIndex;
      const hourEndIndex = hourIndex;

      const newSelectedTimes: TimeSlot[] = [];

      for (
        let d = Math.min(dayStartIndex, dayEndIndex);
        d <= Math.max(dayStartIndex, dayEndIndex);
        d++
      ) {
        for (
          let h = Math.min(hourStartIndex, hourEndIndex);
          h <= Math.max(hourStartIndex, hourEndIndex);
          h++
        ) {
          const slot: TimeSlot = { dayIndex: d, hourIndex: h };
          newSelectedTimes.push(slot);
        }
      }

      if (isUnselecting) {
        setSelectedTimes((current) =>
          current?.filter(
            (slot) =>
              !newSelectedTimes.some(
                (newSlot) =>
                  newSlot.dayIndex === slot.dayIndex &&
                  newSlot.hourIndex === slot.hourIndex,
              ),
          ),
        );
      } else {
        setSelectedTimes((current) => [
          ...current.filter(
            (slot) =>
              !newSelectedTimes.some(
                (newSlot) =>
                  newSlot.dayIndex === slot.dayIndex &&
                  newSlot.hourIndex === slot.hourIndex,
              ),
          ),
          ...newSelectedTimes,
        ]);
      }
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    setStartSlot(null);
    setIsUnselecting(false);
  };

  const saveWhenToDance = (selectedTimes: TimeSlot[]) => {
    console.log(selectedTimes);
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

  const dismissChange = () => {
    fetch("/api/user/when")
      .then((res) => res.json())
      .then((data: TimeSlot[]) => {
        console.log(data);
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
            {hours.map((hour) => (
              <Button
                key={`${day}-${hour}`}
                sx={{
                  height: 20,
                  minWidth: 30,
                  padding: 0,
                  marginBottom: 0.5,
                  border: isSlotSelected(dayIndex, hour)
                    ? "2px solid blue" // Added border for selected times
                    : "1px solid #ccc", // Default border
                  backgroundColor: isSlotSelected(dayIndex, hour)
                    ? "lightgreen"
                    : "lightgray",
                  "&:hover": {
                    backgroundColor: isSlotSelected(dayIndex, hour)
                      ? "green"
                      : "gray",
                  },
                }}
                onMouseDown={() => handleMouseDown(dayIndex, hour)}
                onMouseEnter={() => handleMouseEnter(dayIndex, hour)}
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
