"use client";

import { useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Box,
} from "@mui/material";

export function WhereToDance() {
  const cities = [
    { name: "台北市", code: "TPE" },
    { name: "台中市", code: "TXG" },
    { name: "高雄市", code: "KHH" },
    { name: "台南市", code: "TNN" },
    { name: "新竹市", code: "HSZ" },
    { name: "桃園市", code: "TYN" },
    { name: "基隆市", code: "KEE" },
    { name: "嘉義市", code: "CYI" },
    { name: "屏東縣", code: "PIF" },
    { name: "宜蘭縣", code: "ILA" },
    { name: "花蓮縣", code: "HUN" },
    { name: "台東縣", code: "TTT" },
    { name: "苗栗縣", code: "MIA" },
    { name: "南投縣", code: "NAN" },
    { name: "彰化縣", code: "CHA" },
    { name: "雲林縣", code: "YUN" },
    { name: "澎湖縣", code: "PEN" },
    { name: "金門縣", code: "KIN" },
    { name: "連江縣", code: "LIE" },
  ];

  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const handleCityChange = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city)
        ? prev.filter((selectedCity) => selectedCity !== city)
        : [...prev, city],
    );
  };

  const saveWhereToDance = (selectedCities: string[]) => {
    console.log(selectedCities);
    fetch("/api/user/where", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedCities),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to save availability", error);
      });
  };

  const cancelWhereToDance = () => {
    fetch("/api/user/where")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSelectedCities(data);
      })
      .catch((error) => {
        console.error("Failed to load availability", error);
      });
  };

  useEffect(() => {
    fetch("/api/user/where")
      .then((res) => res.json())
      .then((data: string[]) => {
        console.log(data);
        if (data.length > 0) {
          setSelectedCities(data);
        }
      })
      .catch((error) => {
        console.error("Failed to load availability", error);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex ">
        <h1 className="text-3xl font-bold mb-2">
          Where <br /> to Dance
        </h1>
        <p className="text-center">
          Choose the place that suits you best and start dancing today.
        </p>
        <div className="flex items-center justify-center w-full mt-4 mb-3">
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <FormGroup>
                {cities.slice(0, Math.ceil(cities.length / 2)).map((city) => (
                  <FormControlLabel
                    key={city.code}
                    control={
                      <Checkbox
                        sx={{ color: "white" }}
                        checked={selectedCities.includes(city.code)}
                        onChange={() => handleCityChange(city.code)}
                      />
                    }
                    label={city.name}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormGroup
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {cities.slice(Math.ceil(cities.length / 2)).map((city) => (
                  <FormControlLabel
                    key={city.code}
                    control={
                      <Checkbox
                        sx={{ color: "white" }}
                        checked={selectedCities.includes(city.code)}
                        onChange={() => handleCityChange(city.code)}
                      />
                    }
                    label={city.name}
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </div>
        <Box className="flex items-center justify-center w-full gap-2">
          <Button
            variant="contained"
            color="primary"
            onClick={() => saveWhereToDance(selectedCities)}
          >
            送出
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => cancelWhereToDance()}
          >
            取消
          </Button>
        </Box>
      </div>
    </main>
  );
}

export default WhereToDance;
