import Routes from "./routes";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#69f0ae",
    },
    secondary: {
      main: "#e8f5e9",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
