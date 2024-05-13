import type { NextPage } from "next";

import { Container, Button } from "@mui/material";

import WhenToDance from "@/components/whenToDance";

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <h1>Choose Your Available Times</h1>
      <WhenToDance />
      <div className="flex items-center justify-center w-full gap-2">
        <Button variant="contained" color="primary" href="/signup">
          送出
        </Button>
        <Button variant="contained" color="primary" href="/">
          取消
        </Button>
      </div>
    </Container>
  );
};

export default Home;
