import { useEffect, useState } from "react";
import { request } from "../../utlis/request";

import { configImage, formatDateClient } from "../../utlis/helper";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { BsFillPlayFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { GoStarFill } from "react-icons/go";
import noImage from "../../assets/noImage.png";

import { Tag } from "antd";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [trendMoviLoad, setTrendMoviLoad] = useState(false);
  const [trendTVLoad, setTrendTVLoad] = useState(false);
  const [lateMoviLoad, setLateMoviLoad] = useState(false);
  const [lateTVLoad, setLateTVLoad] = useState(false);
  const [topRateLoad, setTopRateLoad] = useState(false);
  const [popluarMovie, setPopluarMovie] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [lastestMovie, setLatestMovie] = useState([]);
  const [lastestTV, setLatestTV] = useState([]);
  const [topRating, setTopRating] = useState([]);
  const [loppFeacture, setLoopFeacture] = useState(6);
  const [loopbody, setLoopbody] = useState(8);

  useEffect(() => {
    getPopularMovie();
    getTrendingMovie();
    getTrendingTV();
    getLatestMovie();
    getLatestTV();
    getTopRating();
    checkLoadingSize();

    window.addEventListener("resize", checkLoadingSize);

    return () => window.removeEventListener("resize", checkLoadingSize);
  }, []);

  const checkLoadingSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      setLoopFeacture(6);
      setLoopbody(8);
    } else if (screenWidth >= 768) {
      setLoopFeacture(3);
      setLoopbody(4);
    } else if (screenWidth < 640) {
      setLoopFeacture(2);
      setLoopbody(2);
    }
  };

  const getPopularMovie = async () => {
    setLoading(true);
    const res = await request("trending/all/week", "GET");

    if (res && res.results) {
      console.log("Result: ", res.results);
      const tvShows = res.results;

      // Iterate over each result and fetch additional details based on media type
      for (const result of res.results) {
        if (result.media_type === "tv") {
          const tvShowRes = await request(`tv/${result.id}`, "GET");
          if (tvShowRes) {
            // Update the TV show object with additional information
            result.season_number = tvShowRes.last_episode_to_air.season_number;
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
      setPopluarMovie(tvShows);
      setLoading(false);
    } else {
      console.log("No results found.");
    }
  };
  const getTrendingMovie = async () => {
    setTrendMoviLoad(true);
    const res = await request("trending/movie/day", "GET");
    if (res) {
      const movies = res.results;

      for (const result of res.results) {
        if (result.media_type === "tv") {
          const tvShowRes = await request(`tv/${result.id}`, "GET");
          if (tvShowRes) {
            // Update the TV show object with additional information
            result.season_number = tvShowRes.last_episode_to_air.season_number;
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
      setTrendingMovie(movies);
      setTrendMoviLoad(false);
    }
  };
  const getTrendingTV = async () => {
    setTrendTVLoad(true);
    const res = await request("trending/tv/week", "GET");
    if (res) {
      const tvShows = res.results;

      for (const tvShow of tvShows) {
        const tvShowRes = await request(`tv/${tvShow.id}`, "GET");
        if (tvShowRes) {
          tvShow.episode_number = tvShowRes.last_episode_to_air.episode_number;
          tvShow.season_number = tvShowRes.last_episode_to_air.season_number;
        }
      }
      setTrendingTV(tvShows);
    setTrendTVLoad(false);

    }
  };
  const getLatestMovie = async () => {
    setLateMoviLoad(true);
    const res = await request("discover/movie", "GET");
    if (res) {
      const movies = res.results;

      for (const movie of movies) {
        const runtimeRes = await request(`movie/${movie.id}`, "GET");
        if (runtimeRes) {
          movie.runtime = runtimeRes.runtime;
        }
      }
      setLatestMovie(movies);
    setLateMoviLoad(false);

    }
  };
  const getLatestTV = async () => {
    setLateTVLoad(true);
    const res = await request("discover/tv", "GET");
    if (res) {
      const tvShows = res.results;

      for (const tvShow of tvShows) {
        const tvShowRes = await request(`tv/${tvShow.id}`, "GET");
        if (tvShowRes) {
          tvShow.episode_number = tvShowRes.last_episode_to_air.episode_number;
          tvShow.season_number = tvShowRes.last_episode_to_air.season_number;
        }
      }
      setLatestTV(tvShows);
    setLateTVLoad(false);

    }
  };
  const getTopRating = async () => {
    setTopRateLoad(true);
    const res = await request("movie/top_rated", "GET");
    if (res) {
      const movies = res.results;

      for (const movie of movies) {
        const runtimeRes = await request(`movie/${movie.id}`, "GET");
        if (runtimeRes) {
          movie.runtime = runtimeRes.runtime;
        }
      }
      setTopRating(movies);
    setTopRateLoad(false);

    }
  };
  const viewDetail = (id) => {
    window.location.href = `/streaming/${id}`;
  };
  const viewDetailTV = (id) => {
    window.location.href = `/tvstreaming/${id}`;
  };
  const viewDetailboth = (id, mediaType) => {
    if (mediaType === "movie") {
      window.location.href = `/streaming/${id}`;
    } else if (mediaType === "tv") {
      window.location.href = `/tvstreaming/${id}`;
    }
  };
  const loopSkeletons = [1, 2, 3, 4, 5, 6];
  const loopSkeleton8 = [1, 2, 3, 4, 5, 6, 7, 8];
  
  return (
    <div>
      {loading ? (
        <div className="">
          <div className=" relative animate-pulse  bg-blue-gray-400 h-[700px] md:h-[700px] flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className=" w-40 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>

          <div className="  my-container  flex justify-center items-center gap-5  mt-[-200px]">
            {loopSkeletons.slice(0, loppFeacture).map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex flex-col justify-start items-start gap-2 w-full"
              >
                <div className=" bg-gray-400 w-full h-[300px] md:h-[400px] flex justify-center items-center rounded-xl ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-12 w-12 text-gray-500"
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
        </div>
      ) : (
        <div className="">
          <Splide
            options={{
              rewind: true,
              arrows: false,
              pagination: false,
              height: 700,
              type: "fade",
              autoplay: true,
              pauseOnHover: true,
              interval: 5000,
            }}
            aria-label="My Favorite Images"
          >
            {popluarMovie.slice(0, 10).map((mo, index) => {
              return (
                <SplideSlide
                  key={index}
                  className="bg-no-repeat bg-cover bg-top h-full w-full"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(20, 20, 20) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%), url(${
                      configImage.image_path + mo.backdrop_path
                    })`,
                    width: "100%",
                  }}
                >
                  <div className="flex flex-col justify-center items-start text-white absolute bottom-[25%] my-container">
                    <div className="flex flex-col justify-start items-start">
                      <div className="text-[40px] md:text-[50px] flex justify-start items-start cursor-default">
                        {mo.media_type === "tv" ? mo.name : mo.title}
                      </div>

                      <div className="flex justify-start items-start gap-5 ">
                        <div>
                          <div className="flex justify-center items-center gap-2">
                            <GoStarFill className="text-green-600 text-xl font-bold" />
                            <span className="font-black">
                              {typeof mo.vote_average === "number"
                                ? mo.vote_average.toFixed(1)
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                        <p>{formatDateClient(mo.release_date)}</p>
                        <div>
                          {mo.media_type === "tv" ? (
                            <div className="flex justify-center items-center gap-1">
                              <div className="">S{mo.season_number}</div>-
                              <div className="">E{mo.episode_number}</div>
                            </div>
                          ) : (
                            <span>{mo.runtime}mn |</span>
                          )}
                        </div>

                        <Tag color="success">
                          <span className="font-black">HD</span>
                        </Tag>
                      </div>
                    </div>
                    <div className="max-w-xl text-left text-gray-300 mt-3">
                      {mo.overview}
                    </div>

                    <div className="flex justify-center items-center gap-10 mt-5">
                      <Button
                        className="flex justify-center items-center gap-5 bg-white hover:bg-opacity-80 text-black font-black rounded-md w-36 p-3 hover:bg-brown-50 duration-300"
                        onClick={() => viewDetail(mo.id)}
                      >
                        <FaPlay className="text-green-600" />
                        <p>WATCH</p>
                      </Button>
                      <Button className="flex justify-center items-center gap-3 bg-white bg-opacity-30 hover:bg-opacity-10 font-black rounded-md w-46 p-3 hover:bg-brown-50 duration-300">
                        <FaPlus className="text-green-600 text-2xl" />
                        <p>MY LIST</p>
                      </Button>
                    </div>
                  </div>
                </SplideSlide>
              );
            })}
          </Splide>
          <div className="my-container mt-[-150px]">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
             
              slidesPerView={2}
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 30,
                },
              }}
              style={{
                "--swiper-navigation-color": "#16a34a",
              }}
            >
              {popluarMovie.map((mo, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className="flex flex-col group  "
                    onClick={() => viewDetailboth(mo.id, mo.media_type)}
                  >
                    <div className="relative">
                      <div className="border border-green-600  overflow-hidden rounded-xl">
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
                      <div className="text-start font-bold group-hover:text-green-600 line-clamp-1">
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
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}

      {/* Tranding Moives */}
      <div className=" mt-10 md:mt-[80px] my-container  ">
        <div className="text-white text-left text-xl md:text-2xl mb-10">
          Tranding Moives
        </div>
        {trendMoviLoad ? (
          <div className="flex justify-center items-center gap-5 w-full ">
            {loopSkeleton8.slice(0, loopbody).map((_, i) => (
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
          <div className=" w-full">
            <Swiper
              modules={[Pagination, Navigation]}
              lazy={true}
              slidesPerView={2}
              spaceBetween={30}
              navigation={window.innerWidth >= 640 ? true : false}
              slidesPerGroup={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                  slidesPerGroup: 2,
                  navigation: false,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  slidesPerGroup: 4,
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 30,
                  slidesPerGroup: 8,
                },
              }}
              className=" mySwiper"
              style={{
                "--swiper-navigation-color": "#16a34a",
              }}
            >
              {trendingMovie.map((mo, index) => {
                return (
                  <SwiperSlide
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
                      <div className="text-start font-bold group-hover:text-green-600 line-clamp-1">
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
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>

      {/* Tranding TV SHOWS */}
      <div className="mt-[40px] my-container">
        <div className=" text-white text-left text-xl md:text-2xl mb-10">
          Tranding TV SHOWS
        </div>
        {trendTVLoad ? (
          <div className="flex justify-center items-center gap-5 w-full ">
            {loopSkeleton8.slice(0, loopbody).map((_, i) => (
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
          <div className=" w-full">
            <Swiper
              modules={[Pagination, Navigation]}
              lazy={true}
              slidesPerView={2}
              spaceBetween={30}
              navigation={window.innerWidth >= 640 ? true : false}
              slidesPerGroup={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                  slidesPerGroup: 2,
                  navigation: false,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  slidesPerGroup: 4,
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 30,
                  slidesPerGroup: 8,
                },
              }}
              className=" mySwiper"
              style={{
                "--swiper-navigation-color": "#16a34a",
              }}
            >
              {trendingTV.map((mo, index) => {
                return (
                  <SwiperSlide key={index} className="flex flex-col group  ">
                    <div className="relative">
                      <div
                        className="border border-green-600  overflow-hidden rounded-xl"
                        onClick={() => viewDetailTV(mo.id)}
                      >
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
                      <div className="text-start font-bold group-hover:text-green-600 line-clamp-1">
                        {mo.name}
                      </div>
                      <div className=" flex justify-center items-center gap-3 font-medium text-gray-500">
                        <div className="">
                          {" "}
                          {formatDateClient(mo.first_air_date)}
                        </div>
                        <div className="flex justify-center items-center gap-1">
                          <div className=""> S{mo.season_number}</div>
                          <div className="">
                            <GoDotFill className="text-sm" />
                          </div>
                          <div className=""> {mo.episode_number}</div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>

      {/*  Latest Movies */}
      <div className="mt-[40px] my-container">
        <div className=" flex justify-between items-center text-white text-left text-xl md:text-2xl mb-10">
          <div className=""> Latest Movies</div>
          <Link to={"/latestMovie"}>
            <div className="flex justify-center items-center gap-2 text-gray-400 text-xl hover:underline cursor-pointer duration-200">
              <div className="">show All</div>
              <div className="">
                <IoIosArrowForward />
              </div>
            </div>
          </Link>
        </div>
        {lateMoviLoad ? (
          <div className="flex justify-center items-center gap-5 w-full ">
            {loopSkeleton8.slice(0, loopbody).map((_, i) => (
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
          <div className="w-full">
            <Swiper
              modules={[Pagination, Navigation]}
              lazy={true}
              slidesPerView={2}
              spaceBetween={30}
              navigation={window.innerWidth >= 640 ? true : false}
              slidesPerGroup={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                  slidesPerGroup: 2,
                  navigation: false,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  slidesPerGroup: 4,
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 30,
                  slidesPerGroup: 8,
                },
              }}
              className=" mySwiper"
              style={{
                "--swiper-navigation-color": "#16a34a",
              }}
            >
              {lastestMovie.map((mo, index) => {
                return (
                  <SwiperSlide
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
                      <div className="text-start font-bold group-hover:text-green-600 line-clamp-1">
                        {mo.original_title}
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
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>

      {/*  Latest TV SHOWS */}
      <div className="mt-[40px] my-container">
        <div className=" flex justify-between items-center text-white text-left text-xl md:text-2xl mb-10">
          <div className=""> Latest TV Shows </div>
          <Link to={"/latesTVShow"}>
            <div className="flex justify-center items-center gap-2 text-gray-400 text-xl hover:underline cursor-pointer duration-200">
              <div className="">show All</div>
              <div className="">
                <IoIosArrowForward />
              </div>
            </div>
          </Link>
        </div>
        {lateTVLoad ? (
          <div className="flex justify-center items-center gap-5 w-full ">
            {loopSkeleton8.slice(0, loopbody).map((_, i) => (
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
          <div className="w-full">
            <Swiper
              modules={[Pagination, Navigation]}
              lazy={true}
              slidesPerView={2}
              spaceBetween={30}
              navigation={window.innerWidth >= 640 ? true : false}
              slidesPerGroup={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                  slidesPerGroup: 2,
                  navigation: false,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  slidesPerGroup: 4,
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 30,
                  slidesPerGroup: 8,
                },
              }}
              className=" mySwiper"
              style={{
                "--swiper-navigation-color": "#16a34a",
              }}
            >
              {lastestTV.map((mo, index) => {
                return (
                  <SwiperSlide key={index} className="flex flex-col group  ">
                    <div className="relative">
                      <div
                        className="border h-[280px] border-green-600  overflow-hidden rounded-xl"
                        onClick={() => viewDetailTV(mo.id)}
                      >
                        <img
                          src={configImage.image_path + mo.poster_path}
                          className="w-full h-full object-cover group-hover:opacity-50  group-hover:scale-105 duration-300 cursor-pointer"
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
                      <div className="text-start font-bold group-hover:text-green-600 line-clamp-1">
                        {mo.name}
                      </div>
                      <div className=" flex justify-center items-center gap-3 font-medium text-gray-500">
                        <div className="">
                          {" "}
                          {formatDateClient(mo.first_air_date)}
                        </div>
                        <div className="flex justify-center items-center gap-1">
                          <div className=""> S{mo.season_number}</div>
                          <div className="">
                            <GoDotFill className="text-sm" />
                          </div>
                          <div className=""> {mo.episode_number}</div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>

      {/* TOP Rating */}
      <div className="mt-[40px] my-container">
        <div className=" flex justify-between items-center text-white text-left text-xl md:text-2xl mb-10">
          <div className=""> TOP Rating Movies</div>
          <Link to={"/topRatingMovie"}>
            <div className="flex justify-center items-center gap-2 text-gray-400 text-xl hover:underline cursor-pointer duration-200">
              <div className="">show All</div>
              <div className="">
                <IoIosArrowForward />
              </div>
            </div>
          </Link>
        </div>
        {topRateLoad ? (
          <div className="flex justify-center items-center gap-5 w-full ">
            {loopSkeleton8.slice(0, loopbody).map((_, i) => (
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
          <div className="w-full">
            <Swiper
              modules={[Pagination, Navigation]}
              lazy={true}
              slidesPerView={2}
              spaceBetween={30}
              navigation={window.innerWidth >= 640 ? true : false}
              slidesPerGroup={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                  slidesPerGroup: 2,
                  navigation: false,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  slidesPerGroup: 4,
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 30,
                  slidesPerGroup: 8,
                },
              }}
              className=" mySwiper"
              style={{
                "--swiper-navigation-color": "#16a34a",
              }}
            >
              {topRating.map((mo, index) => {
                return (
                  <SwiperSlide key={index} className="flex flex-col group  ">
                    <div className="relative">
                      <div
                        className="border border-green-600  overflow-hidden rounded-xl"
                        onClick={() => viewDetail(mo.id)}
                      >
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

                    <div className=" flex flex-col  justify-start items-start text-start mt-2  ">
                      <div className="text-start font-bold group-hover:text-green-600 line-clamp-1">
                        {mo.original_title}
                      </div>
                      <div className=" flex justify-center items-center gap-3 font-medium text-gray-500">
                        <div className="">
                          {formatDateClient(mo.release_date)}
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="">
                            {" "}
                            <GoStarFill className="text-green-600" />
                          </div>
                          <div className="">{mo.vote_average.toFixed(1)}</div>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                          <div className="">
                            <GoDotFill className="text-sm" />
                          </div>
                          <div className=""> {mo.runtime}mn</div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
