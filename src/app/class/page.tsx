"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  useMediaQuery,
  useTheme,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Chip,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function ImagesList() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    // Assuming what data you might need, e.g., class name, time, etc.
    className: "",
    classTime: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const getCols = () => {
    if (isLg) return 4; // 3 columns for large screens
    if (isMd) return 3; // 2 columns for medium screens
    return 1; // 1 column for small screens
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [eventStatus, setEventStatus] = useState("ongoing"); // 'ongoing' or 'finished'
  return (
    <div className="justify-center items-center flex flex-col mt-4 w-full">
      <div className="flex gap-4 mb-4">
        <Button
          variant="outlined"
          onClick={() => setEventStatus("ongoing")}
          sx={{
            borderColor: "white",
            "&:hover": {
              color: "white",
            },
            color: "white",
          }}
        >
          已成功開設課程
        </Button>
        <Button
          variant="outlined"
          onClick={() => setEventStatus("finished")}
          sx={{
            borderColor: "white",
            "&:hover": {
              color: "white",
            },
            color: "white",
          }}
        >
          您開設的課程
        </Button>
      </div>
      <ImageList variant="masonry" cols={getCols()} gap={10}>
        {itemData
          .filter((item) =>
            eventStatus === "ongoing" ? item.isOngoing : !item.isOngoing,
          )
          .map((item) => (
            <Link key={item.img} href={`/class/${item.title}`}>
              <ImageListItem>
                <div className="group rounded-3xl overflow-hidden relative">
                  <Image
                    width={300}
                    height={300}
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="rounded-3xl p-0"
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      padding: "8px",
                    }}
                  >
                    <Typography variant="subtitle1">
                      {item.title} x {item.author}
                    </Typography>
                  </Box>
                </div>
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.author}
                  position="below"
                  sx={{
                    marginLeft: 2,
                  }}
                  actionIcon={
                    <>
                      <Chip
                        label="Intermediate"
                        color="primary" // Optional: Adjust color based on your theme
                        size="small" // Optional: Adjust size based on your preferences
                        className="mr-2 mt-4"
                      />
                      <Chip
                        label="40min"
                        color="secondary" // Optional: Adjust color based on your theme
                        size="small" // Optional: Adjust size based on your preferences
                        className="mr-2 mt-4"
                      />
                    </>
                  }
                />
              </ImageListItem>
            </Link>
          ))}
      </ImageList>
      <Box>
        {eventStatus === "finished" && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            sx={{
              justifyContent: "center",
              width: "100%",
              height: "50px",
            }}
          >
            添加新課程
          </Button>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="className"
            label="Class Name"
            type="text"
            fullWidth
            variant="outlined"
            name="className"
            value={formData.className}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="classTime"
            label="Class Time"
            type="text"
            fullWidth
            variant="outlined"
            name="classTime"
            value={formData.classTime}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    isOngoing: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex",
    isOngoing: true,
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
    isOngoing: false,
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
    isOngoing: true,
  },
];
