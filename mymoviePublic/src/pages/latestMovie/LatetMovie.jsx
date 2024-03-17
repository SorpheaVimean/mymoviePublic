import { useEffect, useState } from "react";
import { request } from "../../utlis/request";
import { configImage, formatDateClient } from "../../utlis/helper";

import { BsFillPlayFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

import { Select, Tag, Pagination, ConfigProvider } from "antd";


const LastetMovie = () => {

  const { Option } = Select;
  const [movie, setMovie] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1994 },
    (_, index) => currentYear - index
  );
  const [objFilter, setObjFilter] = useState({
    page: 1,
  });
  const { with_genres, year } = objFilter;

  useEffect(() => {
    getMovie(objFilter);
    getMovieGenres();
  }, [objFilter]);

  const getMovie = async (parameter = {}) => {
    setLoading(true);
    var param = "?page=" + (parameter.page || 1);
    if (parameter.with_genres) {
      param += "&with_genres=" + parameter.with_genres;
    }
    if (parameter.year) {
      param += "&year=" + parameter.year;
    }
    const res = await request("discover/movie" + param, "GET");
    if (res) {
      const movies = res.results;

      // Iterate over each movie and fetch runtime
      for (const movie of movies) {
        const runtimeRes = await request(`movie/${movie.id}`, "GET");
        if (runtimeRes) {
          // Update the movie object with runtime
          movie.runtime = runtimeRes.runtime;
        }
      }

      // Set the state with updated movies
      setMovie(movies);
      setTotalMovies(res.total_results);
      setLoading(false);
    }
  };
  const getMovieGenres = async () => {
    const res = await request("genre/movie/list", "GET");
    if (res) {
      setMovieGenres(res.genres);
    }
  };
  const viewDetail = (id) => {
    window.location.href = `/streaming/${id}`;
  };

  const loopSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <>
      <div className="my-container pt-32 md:pt-40">
        <div className=" text-white text-left text-2xl mb-10">
          Latest Movies
        </div>

        <div className="flex justify-start items-start gap-5 mb-7">
          {/* Genre */}
          <div className="">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    clearBg: "#191A19",
                    optionActiveBg: "#1E5128",
                    optionSelectedBg: "#1E5128",
                    optionSelectedColor: "white",
                    selectorBg: "#16a34a",
                    colorBgElevated: "#191A19",
                    colorBorder: "white",
                    colorText: "white",
                    colorTextPlaceholder: "white",
                    controlOutline: "white",
                  },
                },
              }}
            >
              <Select
                value={with_genres}
                allowClear
                showSearch
                style={{
                  width: 150,
                }}
                placeholder="Genres"
                onChange={(value) => {
                  setObjFilter({
                    ...objFilter,
                    with_genres: value,
                    page: 1,
                  });
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                } //
              >
                {movieGenres?.map((item, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </ConfigProvider>
          </div>

          {/* years */}
          <div className="">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    // clearBg: "black",
                    optionActiveBg: "#1E5128",
                    optionSelectedBg: "green",
                    optionSelectedColor: "white",
                    selectorBg: "#16a34a",
                    colorBgElevated: "#191A19",
                    colorBorder: "white",
                    colorText: "white",
                    colorTextPlaceholder: "white",
                    controlOutline: "white",
                  },
                },
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              } //
            >
              <Select
                value={year} // Use year from state as value
                allowClear
                showSearch
                style={{
                  width: 150,
                }}
                placeholder="Year"
                onChange={(value) => {
                  setObjFilter({
                    ...objFilter,
                    year: value,
                    page: 1, // Reset page to 1 when year is changed
                  });
                }}
              >
                {years.map((year) => (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                ))}
              </Select>
            </ConfigProvider>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 w-full ">
            {loopSkeleton.map((_, i) => (
              <div
                key={i}
                className="animate-pulse w-full flex flex-col justify-start items-start gap-2 "
              >
                <div className=" bg-gray-400 w-full h-[300px] md:h-[350px] 2xl:h-[450px] flex justify-center items-center rounded-xl   ">
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
                  className="flex flex-col group  "
                  onClick={() => viewDetail(mo.id)}
                >
                  <div className="relative">
                    <div className="border border-green-600  overflow-hidden rounded-xl">
                      <img
                        src={configImage.image_path + mo.poster_path}
                        className="w-auto object-cover group-hover:opacity-50  group-hover:scale-105 duration-300 cursor-pointer"
                        alt=""
                      />
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
                      {mo.title}
                    </div>
                    <div className=" flex justify-center items-center gap-3 font-medium text-gray-500">
                      <div className="">
                        {" "}
                        {formatDateClient(mo.release_date)}
                      </div>
                      <div className="flex justify-center items-center gap-1">
                        <div className="">
                          <GoDotFill className="text-sm" />
                        </div>
                        <div className=""> {mo.runtime}mn</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-5 justify-center items-center">
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
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default LastetMovie;
