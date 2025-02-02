import { memo } from "react";
import ContentLoader from "react-content-loader";

const SkeletonLoader = memo(() => (
  <ContentLoader
    speed={2}
    width={200}
    height={300}
    viewBox="0 0 150 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="200" height="300" />
  </ContentLoader>
));

export default SkeletonLoader;
