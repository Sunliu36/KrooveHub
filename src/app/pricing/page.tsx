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
    name: "Basic (Template)",
    price: "$0/month",
    description:
      "With the Basic plan, you can participate in public courses, view and post videos, join public groups, and receive basic customer support.",
    features: [
      "• Participate in public courses",
      "• View and post videos",
      "• Join public groups",
      "• Basic customer support",
    ],
  },
  {
    name: "Standard (Template)",
    price: "$120/month",
    description:
      "With the Standard plan, you can participate in all courses, view and post videos, join all groups, receive priority customer support, and use the Mixplayer feature.",
    features: [
      "• Participate in all courses",
      "• View and post videos",
      "• Join all groups",
      "• Priority customer support",
      "• Use Mixplayer feature",
    ],
  },
  {
    name: "Group (Template)",
    price: "$600/month",
    description:
      "With the Group plan, a group is provided with all the above features. Additionally, group members can produce and share their own videos. The plan includes a limit on group size of 6 and access to dedicated group management tools and customer support.",
    features: [
      "• Provides all the above features for groups",
      "• Group members can produce and share their own videos",
      "• Group size limit of 6",
      "• Access to dedicated group management tools",
      "• Access to dedicated customer support",
    ],
  },
];

const PricingBar = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleChoosePlan = (planName: string) => {
    setSelectedPlan(planName);
    // Here you can add additional functionality, like redirecting to a checkout page or showing a confirmation message
    console.log(`Selected plan: ${planName}`);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {pricingData.map((tier, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              {tier.name}
            </Typography>
            <Typography variant="h3" gutterBottom>
              {tier.price}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {tier.description}
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
