import { Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";
import { PageLoader } from "./components/PageLoader";

const Home = lazy(() => import("./pages/Home"));
const ProudMoments = lazy(() => import("./pages/ProudMoments"));

export default function App() {
  return (
 <Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/proud-moments" element={<ProudMoments />} />
  </Routes>
</Suspense>
  );
}