import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Data from "./data/Data.tsx";
import ErrorPage from "./ErrorPage.tsx";
import "./index.css";
import LandingPage from "./LandingPage.tsx";
import Scout from "./scout/Scout.tsx";
import Upload from "./upload/Upload.tsx";
import { trpc } from "./utils/Trpc.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <LandingPage />,
        },
        {
          path: "scout",
          element: <Scout />,
        },
        {
          path: "data",
          element: <Data />,
        },
        {
          path: "upload",
          element: <Upload />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#000f5d", // Indiana Flag Blue
        contrastText: "#fff",
      },
      secondary: {
        main: "#d59f0f", // Indiana Flag Gold
        contrastText: "#000",
      },
      background: {
        default: "#f1dc8e", // Light Indiana Flag Gold
        paper: "#dddddd",
      },
    },
    typography: {
      h1: {
        fontSize: "5rem",
      },
      h2: {
        fontSize: "2rem",
      },
      body1: {
        fontSize: "1.5em",
      },
      button: {
        fontSize: "1.3em",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "#000f5d",
          },
        },
      },
    },
  })
);

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_SERVER_URL + "/api",
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <trpc.Provider
        client={trpcClient}
        queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider
            router={router}
            future={{ v7_startTransition: true }}
          />
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  </StrictMode>
);
