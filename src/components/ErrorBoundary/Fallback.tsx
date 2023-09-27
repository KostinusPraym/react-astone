import type { FallbackProps } from "react-error-boundary";

export const Fallback = ({ error }: FallbackProps) => {
  return (
    <div>
      <h1>Something went wrong:</h1>
      <p className="error">{error.message}</p>
    </div>
  );
};
