import { Grid, Card, CardContent, Button } from "@mui/material";
import React from "react";

const SuccessPage = () => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <h3>Gen AI Hackathon Winners</h3>
            <p>
              Nested, the innovative solution for ..., was a proud winner of the
              Google Gen AI Hackathon. This recognition highlights the potential
              of Nested to ...
            </p>
            <Button
              variant="contained"
              href="https://devpost.com/software/nested"
              target="_blank"
            >
              See Our Devpost Entry
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* Add content for Featured on LinkedIn (Optional) */}
        {/** Replace with content and button if you have LinkedIn mentions */}
      </Grid>
    </>
  );
};

export default SuccessPage;
