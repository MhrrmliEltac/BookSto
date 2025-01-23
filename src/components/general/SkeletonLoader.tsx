import React from "react";
import "../../assets/css/SkeletonLoader.css";

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 1 }) => {
  return (
    <div className="skeleton-container">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="skeleton-item">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
          </div>
        ))}
    </div>
  );
};

export default SkeletonLoader;
