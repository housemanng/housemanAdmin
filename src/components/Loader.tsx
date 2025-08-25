// src/components/Loader.jsx

import { FiLoader } from "react-icons/fi";

const Loader = ({ color = "#0097a7", size = 50 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FiLoader
        size={size}
        className="spinner"
        style={{
          color: color,
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  );
};

export default Loader;
