// src/components/Spinner.js
import React from "react";
import { ClipLoader } from "react-spinners";

export default function Spinner({ loading }) {
  // Centered wrapper with a subtle fade
  return (
    <div className="flex items-center justify-center h-64">
      <ClipLoader
        color="#4F46E5"        // a pleasant indigo shade
        loading={loading}
        size={60}              // size in px
        aria-label="Loading Spinner"
      />
    </div>
  );
}
