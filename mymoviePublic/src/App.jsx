import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import HomePage from "./pages/home/HomePage";
import LastetMovie from "./pages/latestMovie/LatetMovie";
import LastestTVShow from "./pages/lastestTVShow/LatestTVShow";
import Streaming from "./pages/Streamimg/Streaming";
import TVStreaming from "./pages/Streamimg/TVStreaming";
import TopRatingMovie from "./pages/topRateing/TopRatingMovie";
import TopRatingTVShow from "./pages/topRateing/TopRatingTVShow";
import SearchPage from "./pages/search/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="latestMovie" element={<LastetMovie />} />
          <Route path="latesTVShow" element={<LastestTVShow />} />
          <Route path="topRatingMovie" element={<TopRatingMovie />} />
          <Route path="topRatingTVShow" element={<TopRatingTVShow />} />
          <Route path="streaming/:id?" element={<Streaming />} />
          <Route path="tvstreaming/:id?" element={<TVStreaming />} />
          <Route path="search/:search?" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
