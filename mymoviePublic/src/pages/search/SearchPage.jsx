import { useEffect, useState } from "react";
import { request } from "../../utlis/request";
import { configImage, formatDateClient } from "../../utlis/helper";
import { useParams } from "react-router-dom";

import { BsFillPlayFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import noImage from "../../assets/noImage.png";

import { Tag, Pagination, ConfigProvider } from "antd";

const SearchPage = () => {

  const { search } = useParams();
  const [movie, setMovie] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [loading, setLoading] = useState(false);
  const [objFilter, setObjFilter] = useState({
    page: 1,
  });

  useEffect(() => {
    getResult();

  }, [objFilter]);

  const getResult = async () => {
    const param = encodeURIComponent(search);
    const { page } = objFilter;
    setLoading(true);
    try {
      const res = await request(
        `search/multi?query=${param}&page=${page}`,
        "GET"
      );
      if (res && res.results) {
        const tvShows = res.results;
        setTotalMovies(res.total_results);
        for (const result of res.results) {
          if (result.media_type === "tv") {
            const tvShowRes = await request(`tv/${result.id}`, "GET");
            if (tvShowRes && tvShowRes.last_episode_to_air) {
              // Add null check here
              // Update the TV show object with additional information
              result.season_number =
                tvShowRes.last_episode_to_air.season_number;
              result.episode_number =
                tvShowRes.last_episode_to_air.episode_number;
            }
          } else if (result.media_type === "movie") {
            const movieRes = await request(`movie/${result.id}`, "GET");
            if (movieRes) {
              // Update the movie object with runtime
              result.runtime = movieRes.runtime;
            }
          }
        }

        setMovie(tvShows);
        setLoading(false);
      } else {
        console.log("No results found.");
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const viewDetail = (id, mediaType) => {
    if (mediaType === "movie") {
      window.location.href = `/streaming/${id}`;
    } else if (mediaType === "tv") {
      window.location.href = `/tvstreaming/${id}`;
    }
  };
  const loopSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <>
      <div className="my-container pt-40">
        <div className=" text-white text-left text-2xl mb-10">
          Search result of {""}
          <span className="text-green-600 font-black">{search}</span>
        </div>
        {loading ? (
           <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 w-full ">
           {loopSkeleton.map((_, i) => (
             <div
               key={i}
               className="animate-pulse w-full flex flex-col justify-start items-start gap-2 "
             >
               <div className=" bg-gray-400 w-full h-[290px] flex justify-center items-center rounded-xl   ">
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24"
                   strokeWidth={2}
                   stroke="currentColor"
                   className=" w-12 text-gray-500"
                 >
                   <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                   />
                 </svg>
               </div>
               <div className="h-5 ml-5 bg-gray-400 w-20 rounded-xl"></div>
             </div>
           ))}
         </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10 ">
            {movie.map((mo, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col group   "
                  onClick={() => viewDetail(mo.id, mo.media_type)}
                >
                  <div className="relative">
                    <div className="border border-green-600  overflow-hidden rounded-xl ">
                      {mo.poster_path ? (
                        <img
                          src={configImage.image_path + mo.poster_path}
                          className="w-auto object-cover group-hover:opacity-50 group-hover:scale-105 duration-300 cursor-pointer"
                          alt=""
                        />
                      ) : (
                        <img
                          src={noImage}
                          className="w-auto object-cover group-hover:opacity-50 group-hover:scale-105 duration-300 cursor-pointer"
                          alt=""
                        />
                      )}
                    </div>

                    <div className="absolute top-2 right-0 text-sm">
                      <Tag color="success" className="text-sm">
                        HD
                      </Tag>
                    </div>
                    <div className=" bg-green-600  flex justify-center items-center text-black bottom-[40%] right-[40%]  p-4 rounded-full  absolute shadow-md opacity-0  group-hover:opacity-100 translate-y-4  group-hover:translate-y-0 transition duration-200 ease-in-out cursor-pointer">
                      <BsFillPlayFill className=" text-white text-2xl xl:text-3xl" />
                    </div>
                  </div>

                  <div className=" flex flex-col justify-start items-start text-start mt-2  ">
                    <div className="text-start font-bold group-hover:text-green-600">
                      {mo.media_type === "tv" ? mo.name : mo.title}
                    </div>

                    {mo.media_type === "tv" ? (
                      <div className=" flex justify-center items-center gap-3 font-medium text-gray-500">
                        <div className="">
                          {formatDateClient(mo.release_date)}
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="">
                            <GoStarFill className="text-green-600" />
                          </div>
                          <div className="">{mo.vote_average.toFixed(1)}</div>
                        </div>
                        {mo.season_number && mo.episode_number && (
                          <div className="flex justify-center items-center gap-1">
                            <div className="">S{mo.season_number}</div>
                            <div className="">
                              <GoDotFill className="text-sm" />
                            </div>
                            <div className="">{mo.episode_number}</div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center gap-3 font-medium text-gray-500">
                        <div className="">
                          {formatDateClient(mo.release_date)}
                        </div>
                        {mo.runtime && (
                          <div className="flex justify-center items-center gap-1">
                            <div className="">
                              <GoDotFill className="text-sm" />
                            </div>
                            <div className="">{mo.runtime}mn</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex justify-center items-center">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemActiveBg: "#1E5128",
                  colorPrimaryBorder: "#1E5128",
                  colorText: "white",
                  colorBgTextActive: "red",
                  colorBgTextHover: "#1E5128",
                  colorBorder: "white",
                  colorPrimary: "white",
                  controlOutline: "white",
                },
              },
            }}
          >
            <Pagination
              pageSize={20}
              showSizeChanger={false}
              defaultCurrent={1}
              total={totalMovies}
              onChange={(page) => {
                setObjFilter({
                  ...objFilter,
                  page: page,
                });
                // Scroll to the top of the page
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
