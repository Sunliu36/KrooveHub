import React, { useState, useEffect } from "react";

import { Typography, CircularProgress, Button, Box } from "@mui/material";

interface AvailabilityType {
  [dayIndex: number]: {
    [hourIndex: number]: number;
  };
}

interface TimeSlot {
  dayIndex: number;
  hourIndex: number;
}

const indexToDay = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."];
const numPeople = [0, 5, 10, 15, 20, 25, 30, 35];

const hours = Array.from({ length: 14 }, (_, i) => i + 9); // 8-22 hours

interface WhenToDanceProps {
  classname: string;
}

const WhenToDance: React.FC<WhenToDanceProps> = ({ classname }) => {
  const [selectedTimes, setSelectedTimes] = useState<TimeSlot[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  // const [showNumber, setShowNumber] = useState<boolean>(false);
  const [availability, setAvailability] = useState<AvailabilityType>({});
  const [loading, setLoading] = useState<boolean>(true);

  const isSlotSelected = (dayIndex: number, hourIndex: number) => {
    return selectedTimes.some(
      (slot) => slot.dayIndex === dayIndex && slot.hourIndex === hourIndex,
    );
  };

  const toggleSlot = (dayIndex: number, hourIndex: number) => {
    setSelectedTimes((current) => {
      const isSelected = current.some(
        (slot) => slot.dayIndex === dayIndex && slot.hourIndex === hourIndex,
      );
      if (isSelected) {
        return current.filter(
          (slot) =>
            !(slot.dayIndex === dayIndex && slot.hourIndex === hourIndex),
        );
      } else {
        return [...current, { dayIndex, hourIndex }];
      }
    });
  };

  const handleMouseDown = (dayIndex: number, hourIndex: number) => {
    toggleSlot(dayIndex, hourIndex);
    setIsSelecting(true);
  };

  const handleMouseEnter = (dayIndex: number, hourIndex: number) => {
    if (isSelecting) {
      toggleSlot(dayIndex, hourIndex);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
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
        return "transparent"; // Transparent for no availability
      case 1:
        return "white"; // Very Light Green for very low availability
      // case 2:
      //   return "#99ff99"; // Light Green for low availability
      // case 3:
      //   return "#66ff66"; // Pastel Green for lower medium availability
      // case 4:
      //   return "#33cc33"; // Lime Green for medium availability
      // case 5:
      //   return "#29a329"; // Medium Green for higher medium availability
      // case 6:
      //   return "#248f24"; // Sea Green for good availability
      // case 7:
      //   return "#1f7a1f"; // Forest Green for high availability
      // case 8:
      //   return "#145214"; // Dark Green for higher availability
      default:
        return "white"; // Very Dark Green for excellent availability
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

  // const setShowNumberHandler = () => {
  //   setShowNumber(!showNumber);
  // };

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
      <Box
        sx={{
          maxWidth: 920,
          mx: "auto",
          gap: 0,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "50px repeat(7, 1fr)",
        }}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <Box
          key={"day"}
          sx={{ maxWidth: 20, textAlign: "center", marginTop: 3 }}
        >
          {hours.map((hour) => (
            <Button
              key={hour}
              sx={{
                height: 20,
                minWidth: 45,
                padding: 0,
                "&:disabled": {
                  color: "white",
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
              maxWidth: 40,
              height: 20,
              gap: 0,
              padding: 0,
              textAlign: "center",
            }}
          >
            {day}
            {hours.map((hourIndex) => (
              <Button
                key={`${dayIndex}-${hourIndex}`}
                sx={{
                  height: 20,
                  minWidth: 25,
                  padding: 0,
                  margin: 0,
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
                data-day={dayIndex}
                data-hour={hourIndex}
              >
                {/* {showNumber &&
                  (isSlotSelected(dayIndex, hourIndex)
                    ? availability[dayIndex]?.[hourIndex] + 1
                    : availability[dayIndex]?.[hourIndex])} */}
              </Button>
            ))}
          </Box>
        ))}
      </Box>
      <Box sx={{ textAlign: "center", marginBottom: 8 }}>
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
