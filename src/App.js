import { QueryClient, QueryClientProvider } from "react-query";
import axios, { CancelToken } from "axios";
import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import National from "./Components/National";
import Regional from "./Components/Regional";
import RegionProvider from "./Providers/RegionProvider";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const defaultQueryFn = async ({ queryKey }) => {
  const [key, params = {}] = queryKey;

  const source = CancelToken.source();

  const promise = axios.get(key, {
    params,
    cancelToken: source.token,
  });

  promise.cancel = () => {
    source.cancel("React query terminated query");
  };

  const { data } = await promise;

  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: true,
      queryFn: defaultQueryFn,
      refetchOnMount: false,
      retry: false,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

function fallbackRender({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <p>Something went wrong...</p>
      {/* <pre style={{ color: "red" }}>{error.message}</pre> */}
    </div>
  );
}

const AppProvider = ({ children }) => (
  <ErrorBoundary fallbackRender={fallbackRender}>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default function App() {
  return (
    <AppProvider>
      <RegionProvider>
        <Routes>
          <Route path="/" element={<National />} />
          <Route path="/regional/:code" element={<Regional />} />
        </Routes>
      </RegionProvider>
    </AppProvider>
  );
}
