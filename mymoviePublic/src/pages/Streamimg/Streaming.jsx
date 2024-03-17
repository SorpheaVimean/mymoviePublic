import { useEffect, useRef, useState } from "react";
import { request } from "../../utlis/request";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { configImage, formatDateClient, minToHour } from "../../utlis/helper";
import { Tag, Rate, Divider, Modal } from "antd";

import { GoStarFill } from "react-icons/go";
import { BsFillPlayFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import noImage from "../../assets/noImage.png";

const Streaming = () => {
  const { id } = useParams();
  const playerRef = useRef(null);
  const [movieDetail, setMovieDetail] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [director, setDirector] = useState([]);
  const [casts, setCasts] = useState([]);
  const [source, setSource] = useState("123");
  const [loading, setLoading] = useState(true);
  const [loadingtwo, setLoadingtwo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loopbody, setLoopbody] = useState(4);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    // Pause the YouTube video
    if (playerRef.current && playerRef.current.internalPlayer) {
      playerRef.current.internalPlayer.pauseVideo();
    }
  };
  useEffect(() => {
    getMovieDetails();
    getCredits();
    getSimilar();
    getTrailer();
    checkLoadingSize();

    window.addEventListener("resize", checkLoadingSize);

    return () => window.removeEventListener("resize", checkLoadingSize);
  }, []);

  const checkLoadingSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      setLoopbody(4);
    } else if (screenWidth >= 768) {
      setLoopbody(3);
    } else if (screenWidth < 640) {
      setLoopbody(2);
    }
  };
  const getMovieDetails = async () => {
    var param = id;
    setLoading(true);
    const res = await request("movie/" + param, "GET");
    if (res) {
      setMovieDetail(res);
      setLoading(false);
    }
  };
  const getSimilar = async () => {
    var param = id;
    setLoadingtwo(true);
    const res = await request("movie/" + param + "/recommendations", "GET");
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
      setSimilar(movies);
      setLoadingtwo(false);
    }
  };
  const getCredits = async () => {
    var param = id;
    setLoading(true);
    const res = await request("movie/" + param + "/credits", "GET");
    if (res) {
      setLoading(false);

      setCasts(res.cast);

      // Extract director from the credits
      const crew = res.crew;
      const director = crew.find((member) => member.job === "Director");

      if (director) {
        setDirector(director.original_name);
      } else {
        setDirector("Director not found");
      }
    }
  };

  const getTrailer = async () => {
    var param = id;
    setLoading(true);
    const res = await request("movie/" + param + "/videos", "GET");
    if (res && res.results.length > 0) {
      setLoading(false);
      // Find the trailer video
      const trailerVideo = res.results.find(
        (video) => video.type === "Trailer"
      );
      if (trailerVideo) {
        // Set the trailer key as the videoId
        setTrailer(trailerVideo.key);
      } else {
        setTrailer(res.results[0].key);
      }
    }
  };
  const viewDetail = (id) => {
    window.location.href = `/streaming/${id}`;
  };
  const handleSourceChange = (newSource) => {
    setSource(newSource);
  };

  let srcUrl;

  if (source === "123") {
    srcUrl = `https://play.123embed.net/mv/${id}`;
  } else if (source === "vidsrc") {
    srcUrl = `https://vidsrc.to/embed/movie/${id}`;
  } else if (source === "autoembed") {
    srcUrl = `https://autoembed.co/movie/tmdb/${id}`;
  } else if (source === "superembed") {
    srcUrl = `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`;
  } else {
    // Default to 123 if no valid source provided
    srcUrl = `https://play.123embed.net/mv/${id}`;
  }

  const loopSkeleton = [1, 2, 3, 4, 5, 6, 7, 8];

  // const fetchMovies = async () => {
  //   const res = await requestStreaming("385687", "GET");
  //   if (res) {
  //     setLoading(false);
  //     setMovies(res);
  //     // console.log("Result", res);
  //   }
  // try {
  //   const response = await axios.get('https://vidsrc.to/vapi/movie/new');
  //   setMovies(response.data.result.items);
  //   console.log( "list", response.data.result);
  //   setLoading(false);
  // } catch (error) {
  //   console.error("Error fetching movies:", error);
  //   setLoading(false);
  // }
  // };
  return (
    <div className="my-container">
      {loading ? (
        <div className="animate-pulse pt-40">
          <div className=" bg-gray-400 h-10 rounded-xl w-40 text-left text-2xl mb-3"></div>
          <div className=" h-[700px] bg-gray-400 flex justify-center items-center rounded-xl">
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
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-start">
          <div className="text-white text-left text-2xl pt-40 mb-5">
            {movieDetail.title}
          </div>

          {/* ======================Steaming Movie==================== */}
          <div className=" flex flex-col-reverse lg:flex-row justify-start items-start w-full h-screen bg-Background mb-10">
            <div className="flex flex-col justify-center w-full lg:w-52 ">
              <div className="flex flex-col  justify-start items-center lg:items-start px-2 gap-5 mt-2 ">
                <div className="text-xl  text-gray-500">Choose Server</div>
                <div className="text-center lg:text-left text-gray-500 ">
                  If the current server doesn't work, don't worry; you can
                  choose another server below.{" "}
                </div>
              </div>

              {/* Servers */}
              <div className="flex flex-col mx-3 lg:mx-0  mt-2 gap-5">
                <button
                  className={`px-4 py-2 flex justify-start items-center gap-3 rounded-xl ${
                    source === "123"
                      ? "bg-gray-400 bg-opacity-30 text-white "
                      : "bg-transparent text-green-600"
                  }`}
                  onClick={() => handleSourceChange("123")}
                >
                  <div className="">
                    <FaPlay className="text-green-600" />
                  </div>
                  <div className="flex  lg:flex-col justify-start items-start gap-3 lg:gap-0">
                    <div className="text-gray-500 ">Server</div>
                    <div className="text-xl lg:text-sm">123Play</div>
                  </div>
                </button>
                <button
                  className={`px-4 py-2 flex justify-start items-center gap-3 rounded-xl ${
                    source === "vidsrc"
                      ? "bg-gray-400 bg-opacity-30 text-white "
                      : "bg-transparent text-green-600"
                  }`}
                  onClick={() => handleSourceChange("vidsrc")}
                >
                  <div className="">
                    <FaPlay className="text-green-600" />
                  </div>
                  <div className="flex  lg:flex-col justify-start items-start gap-3 lg:gap-0">
                    <div className="text-gray-500">Server</div>
                    <div className="text-xl lg:text-sm">Vidsrc</div>
                  </div>
                </button>
                <button
                  className={`px-4 py-2 flex justify-start items-center gap-3 rounded-xl ${
                    source === "autoembed"
                      ? "bg-gray-400 bg-opacity-30 text-white "
                      : "bg-transparent text-green-600"
                  }`}
                  onClick={() => handleSourceChange("autoembed")}
                >
                  <div className="">
                    <FaPlay className="text-green-600" />
                  </div>
                  <div className="flex  lg:flex-col justify-start items-start gap-3 lg:gap-0">
                    <div className="text-gray-500">Server</div>
                    <div className="text-xl lg:text-sm">autoembed</div>
                  </div>
                </button>
                <button
                  className={`px-4 py-2 flex justify-start items-center gap-3 rounded-xl ${
                    source === "superembed"
                      ? "bg-gray-400 bg-opacity-30 text-white "
                      : "bg-transparent text-green-600"
                  }`}
                  onClick={() => handleSourceChange("superembed")}
                >
                  <div className="">
                    <FaPlay className="text-green-600" />
                  </div>
                  <div className="flex  lg:flex-col justify-start items-start gap-3 lg:gap-0">
                    <div className="text-gray-500">Server</div>
                    <div className="text-xl lg:text-sm">superembed</div>
                  </div>
                </button>
              </div>
            </div>
            <iframe
              className="p-1"
              width="100%"
              height="100%"
              title="google"
              src={srcUrl}
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="grid grid-col-1 2xl:grid-cols-2 gap-10 ">
            <div className="col1 lg:max-h-[600px] flex flex-col md:flex-row justify-start items-start gap-10 bg-[#161616] p-5 rounded-xl">
              {/* ======================Poster==================== */}
              <div className="flex md:flex-col justify-center items-center gap-5">
                <div className="border-2 border-green-600 w-40 md:w-72 rounded-xl  overflow-hidden">
                  <img
                    src={configImage.image_path + movieDetail.poster_path}
                    className="w-auto object-cover group-hover:opacity-50  group-hover:scale-105 duration-300 cursor-pointer"
                    alt=""
                  />
                </div>
                <div className="flex justify-start items-start gap-3">
                  <div className="">{movieDetail.vote_average}</div>
                  <Rate
                    allowHalf
                    defaultValue={movieDetail.vote_average / 2}
                    disabled
                    style={{ color: "#52c41a" }}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-start items-start">
                <div className="text-3xl font-bold">{movieDetail.title}</div>

                {/* ======================YouTube Video==================== */}
                <div className="flex justify-start items-center gap-5 mt-3">
                  <div
                    className="text-lg border border-green-600 px-4 py-0.5 rounded-lg cursor-pointer hover:bg-green-600 duration-300 hover:border-white"
                    onClick={showModal}
                  >
                    Trailer
                  </div>
                  <Modal
                    title={`Trailer: ${movieDetail.title}`}
                    width={"auto"}
                    footer={false}
                    centered
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    className="max-w-full"
                  >
                    <div className="relative overflow-hidden aspect-w-16 aspect-h-9">
                      <YouTube
                        videoId={trailer}
                        opts={{
                          width: "100%",
                        }}
                        ref={playerRef}
                        containerClassName={
                          "absolute top-0 left-0 w-full h-full"
                        }
                      />
                    </div>
                  </Modal>

                  <div className="flex justify-center items-center gap-3">
                    <div className="">
                      <GoStarFill className="text-green-600" />
                    </div>
                    <div className="">
                      {typeof movieDetail.vote_average === "number"
                        ? movieDetail.vote_average.toFixed(1)
                        : "N/A"}
                    </div>
                  </div>
                  <div className="text-lg">
                    {minToHour(movieDetail.runtime)}
                  </div>
                  <Tag className=" text-green-600 text-sm border-green-600 bg-black bg-opacity-50 ">
                    1080p
                  </Tag>
                </div>

                <div className=" mt-7 text-left text-gray-400">
                  {movieDetail.overview}
                </div>

                <div className="flex flex-col  justify-start items-start gap-1 mt-6">
                  <div className="text-gray-300">
                    <span className="text-gray-400 mr-4">Released :</span>

                    <span className="hover:text-green-600 cursor-default duration-300">
                      {movieDetail.release_date}
                    </span>
                  </div>
                  <div className="text-gray-300">
                    <span className="text-gray-400 mr-4 ">Director:</span>
                    <span className="hover:text-green-600 cursor-default duration-300">
                      {director}
                    </span>
                  </div>
                  <div className="self-start text-left text-gray-300">
                    <span className="text-gray-400 mr-4">Casts: </span>
                    <span className="space-x-3">
                      {casts.slice(0, 9).map((name, index) => (
                        <span
                          key={index}
                          className="hover:text-green-600 cursor-default duration-300"
                        >
                          {name.name},
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="text-gray-300">
                    <span className="text-gray-400 mr-4">Genres: </span>
                    <span className="space-x-3">
                      {movieDetail.genres.map((name, index) => (
                        <span
                          key={index}
                          className="hover:text-green-600 cursor-default duration-300"
                        >
                          {name.name},
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="text-gray-300">
                    <span className="text-gray-400 mr-4">Country: </span>
                    <span className="space-x-3">
                      {movieDetail.production_countries.map((name, index) => (
                        <span
                          key={index}
                          className="hover:text-green-600 cursor-default duration-300"
                        >
                          {name.name},
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="self-start text-left text-gray-300">
                    <span className="text-gray-400 mr-4">Productions: </span>
                    <span className="space-x-3">
                      {movieDetail.production_companies.map((name, index) => (
                        <span
                          key={index}
                          className="hover:text-green-600 cursor-default duration-300"
                        >
                          {name.name},
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================Similar Movies==================== */}
            <div className="text-left ">
              <div className="text-white text-left text-2xl mb-3">
                Similar Movies
              </div>
              <Divider />
              {loadingtwo ? (
                <div className="flex justify-center items-center gap-5 w-full ">
                  {loopSkeleton.slice(0, loopbody).map((_, i) => (
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
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {similar.slice(0, 20).map((mo, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col group  "
                        onClick={() => viewDetail(mo.id)}
                      >
                        <div className="relative ">
                          <div className="border border-green-600   overflow-hidden rounded-xl">
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
                            <BsFillPlayFill className=" text-white text-4xl xl:text-3xl" />
                          </div>
                        </div>

                        <div className=" flex flex-col justify-start items-start text-start mt-2  ">
                          <div className="text-start font-bold group-hover:text-green-600">
                            {mo.title}
                          </div>
                          <div className=" flex justify-center items-center gap-3 font-medium text-gray-500">
                            <div className="">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Streaming;
