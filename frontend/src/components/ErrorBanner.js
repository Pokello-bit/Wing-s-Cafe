import React from "react";

function ErrorBanner({ error }) {
  if (!error) return null;
  return <p style={{ color: "red" }}>⚠️ Unable to load products. Is the backend running?</p>;
}

export default ErrorBanner;
