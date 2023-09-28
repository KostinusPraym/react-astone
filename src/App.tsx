import React from "react";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";

import Routes from "./routes/Routes";
import { useAppDispatch } from "./hooks/reduxHooks";
import { checkAuth } from "./redux/actions/authActions";
import { Fallback } from "./components/ErrorBoundary/Fallback";
import { FeatureProvider } from "./components/FeatureProvider/FeatureProvider";

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <FeatureProvider>
        <div className="min-h-screen bg-white px-5">
          <Toaster />
          <Routes />
        </div>
      </FeatureProvider>
    </ErrorBoundary>
  );
}

export default App;
