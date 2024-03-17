import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const FooterPage = () => {
  return (
    <>
      <div className=" mt-20 py-10 bg-Background">
        <div className=" mx-5 md:mx-40 flex flex-col md:flex-row justify-start md:justify-around items-start gap-5">
          <div className="">
            <img src={logo} className="w-20" alt="logo" />
          </div>
        
          <div className="max-w-xl">
            VMovie does not store any files on our server, we only linked to the
            media which is hosted on 3rd party services.
          </div>
          <div className="">
            <div className="text-gray-400">Quick Links</div>
           <ul>
            <li className="hover:text-green-600 hover:scale-125 duration-300"><Link to={"/"}>Home</Link></li>
            <li className="hover:text-green-600 hover:scale-125 duration-300"><Link to={"latestMovie"}>Moives</Link></li>
            <li className="hover:text-green-600 hover:scale-125 duration-300"><Link to={"latesTVShow"}>TV Shows</Link></li>
            <li className="hover:text-green-600 hover:scale-125 duration-300"><Link to={"topRatingMovie"}>Top Rating</Link></li>
           </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterPage;
