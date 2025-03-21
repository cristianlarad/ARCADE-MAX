import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./theme/theme-provider";
import { router } from "./routes";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
