import React from "react";
import { Grid, Typography, Button, Box, Stack } from "@mui/material";

const TryItOutPage = () => {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Grid container spacing={2} sx={{ padding: "2rem" }}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Try it Out!
          </Typography>
          <Typography variant="body1" paragraph>
            Discover how Nested can transform your move to a new city. Our
            secure demo lets you explore all features without creating an
            account or saving your personal data. When you're ready, request
            beta access to try Nested with your own data.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ mr: 5, textAlign: "center" }}>
            <Stack direction="column" spacing={1}>
              <Button variant="contained" color="success">
                Launch Demo
              </Button>
              <Typography variant="caption" color="textSecondary">
                No sign-up required. Data-safe demo.
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Stack direction="column" spacing={1}>
              <Button variant="outlined" color="success">
                Request Beta Access
              </Button>
              <Typography variant="caption" color="textSecondary">
                Try Nested with your own data.
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default TryItOutPage;
