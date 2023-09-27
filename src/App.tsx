import React from "react";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";

import { useAppDispatch } from "./hooks/redux-hooks";
import { checkAuth } from "./redux/actions/authActions";
import Routes from "./routes/Routes";
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
