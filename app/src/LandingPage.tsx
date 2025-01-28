import { Stack, Typography } from "@mui/material";
import { LinkButton } from "./components/LinkButton.tsx";

export default function LandingPage() {
  return (
    <Stack
      sx={{
        bgcolor: "primary.main",
        width: 1,
        height: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          color: "primary.contrastText",
          mb: 4,
        }}>
        Indiana Scouting Alliance 2025
      </Typography>
      <Stack gap={2}>
        <LinkButton
          to="/scout"
          color="secondary">
          Scout
        </LinkButton>
        <LinkButton
          to="/data"
          color="secondary">
          View Data
        </LinkButton>
        <LinkButton
          to="/upload"
          color="secondary">
          Upload Data
        </LinkButton>
      </Stack>
    </Stack>
  );
}
