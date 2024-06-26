"use client";

import { useState } from "react";

import {
  Typography,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

// Define the pricing data as an array of objects
const pricingData = [
  {
    name: "全網吃到飽",
    price: "$499/月 $5500/年",
    features: ["• 線上課程無限次觀看", "• 隊形校正系統", "• 成員匹配加速器"],
  },
  {
    name: "練舞房練到飽方案",
    price: "$399/月 $3999/年",
    features: ["• 線上課程無限次觀看", "• 成員匹配加速器"],
  },
  {
    name: "隊形校正系統",
    price: "$199/月 $1999/年",
    features: ["• 隊形校正系統", "• 成員匹配加速器"],
  },
];

const PricingBar = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleChoosePlan = (planName: string) => {
    setSelectedPlan(planName);
    // Here you can add additional functionality, like redirecting to a checkout page or showing a confirmation message
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 8, mb: 8 }}>
      {pricingData.map((tier, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} maxWidth={380}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              {tier.name}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {tier.price}
            </Typography>
            <List>
              {tier.features.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleChoosePlan(tier.name)}
            >
              {selectedPlan === tier.name ? "Selected" : "Choose Plan"}
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PricingBar;
