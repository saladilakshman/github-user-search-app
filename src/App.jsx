import "./App.css";
import SearchIcon from "./assets/search.svg";
import { MdLocationOn } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoMoonOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [username, setUsername] = useState(undefined);
  const [error, setError] = useState(false);
  const [isdarkmode, setIsdarkmode] = useState(
    JSON.parse(window.localStorage.getItem("theme")) ?? false
  );
  const [userdetails, setUserdetails] = useState(
    () =>
      JSON.parse(window.localStorage.getItem("profile")) ?? {
        bio: "Octocat",
        name: "The Octocat",
        html_url: "https://github.com/octocat",
        created_at: "11 Jan 2011",
        avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
        public_repos: 8,
        followers: 13995,
        following: 8,
        location: "San francisco",
        blog: "https://github.blog/",
        company: "@github",
      }
  );
  const getUserdetails = async () => {
    if (username === undefined) {
      return null;
    } else {
      await axios
        .get(`https://api.github.com/users/${username}`)
        .then((res) => {
          setUserdetails(res?.data);
          setError(false);
          console.log(res?.data);
        })
        .catch(() => {
          setUserdetails(userdetails);
          setError(true);
        })
        .finally(() => {
          setUsername("");
        });
    }
  };
  useEffect(() => {
    window.localStorage.setItem("profile", JSON.stringify(userdetails));
    window.localStorage.setItem("theme", JSON.stringify(isdarkmode));
  }, [userdetails, isdarkmode]);
  const markerList = (location, social, anchor, office) => {
    return [
      {
        icon: <MdLocationOn />,
        name: location,
      },
      {
        icon: <FaTwitter />,
        name: social,
      },
      {
        icon: <FaLink />,
        name: anchor,
      },
      {
        icon: <HiBuildingOffice2 />,
        name: office,
      },
    ];
  };

  const {
    bio,
    avatar_url,
    blog,
    company,
    created_at,
    followers,
    following,
    location,
    public_repos,
    name,
    html_url,
    twitter_username,
    login,
  } = userdetails;
  const Marker = markerList(location, twitter_username, blog, company);
  useEffect(() => {
    const listItems = document.querySelectorAll(".list-items");
    listItems[2].addEventListener("click", () => {
      window.location.href = html_url;
    });
  }, [html_url]);
  return (
    <main className={`${isdarkmode && "dark"}`}>
      <div className="dark:bg-slate-900 bg-slate-100 font-mono dark:text-white h-screen transition-all">
        <div className="container mx-auto lg:px-40 py-20  lg:w-2/3 px-6 w-full">
          <div className="flex justify-between items-center pb-4">
            <h1 className=" text-2xl lg:text-4xl dark:text-white font-semibold">
              devFinder
            </h1>
            <div>
              <div
                className=" flex flex-row  cursor-default"
                onClick={() => {
                  setIsdarkmode((prevState) => !prevState);
                }}
              >
                {isdarkmode ? (
                  <div className="flex justify-center items-center gap-3  dark:text-white text-lg text-gray-500">
                    <h2>Light</h2>
                    <FiSun className="md:text-2xl text-base" />
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-3 dark:text-white text-lg text-gray-500">
                    <h2>Dark</h2>
                    <IoMoonOutline className="md:text-2xl text-base" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative pb-8">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
              placeholder="Search username"
              className="input"
            />
            <div className="absolute left-2 top-3 text-blue-500">
              <img src={SearchIcon} alt="" />
            </div>
            <button className="search-button" onClick={getUserdetails}>
              Search
            </button>
            {error && (
              <h3 className="lg:text-xl text-base text-red-700 p-1">
                No results!
              </h3>
            )}
          </div>
          {/**Profile component */}
          <div className=" bg-white shadow-lg  dark:shadow-none shadow-blue-100 dark:bg-slate-800 rounded-lg pr-10 py-8 ">
            <div className="grid grid-cols-2 gap-2 place-items-center">
              <div className=" h-full  md:w-2/3 w-full max-sm:pl-2">
                <img
                  src={avatar_url}
                  alt=""
                  className="md:size-28 rounded-full size-16"
                />
              </div>
              <div className="flex flex-col flex-wrap justify-between items-baseline  gap-8  text-wrap  lg:pr-20 pr-2 dark:text-white text-gray-900">
                <div className="flex flex-wrap justify-between w-3/4">
                  <div className="flex flex-col  justify-enter items-baseline gap-2 md:gap-4 pb-8">
                    <h1 className=" text-sm md:text-3xl  font-semibold">
                      {name}
                    </h1>
                    <a
                      href={html_url}
                      className=" text-sm md:text-xl text-blue-500 text-underline"
                    >
                      @{login || name}
                    </a>
                    <div className="dark:text-white text-gray-600 flex-1">
                      <h2 className=" text-sm md:text-xl text-wrap">
                        Joined on {""}
                        {new Date(created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </h2>
                    </div>
                    <h2 className=" text-sm md:text-xl ">
                      {bio ?? "Not bio available"}
                    </h2>
                  </div>
                </div>
                <div className="max-sm:pr-6">
                  <div className="flex justify-start items-center md:gap-8 gap-6 text-white dark:bg-stone-900 lg:px-10 rounded-lg py-2 capitalize bg-sky-900 w-[95%] pr-4 pl-2 ">
                    <h2 className=" text-sm md:text-lg">
                      Repos
                      <br />
                      <span className="text-base md:text-xl font-semibold">
                        {public_repos}
                      </span>
                    </h2>
                    <h2 className="text-sm md:text-lg">
                      followers
                      <br />
                      <span className=" text-base md:text-xl font-semibold">
                        {followers}
                      </span>
                    </h2>
                    <h2 className="text-sm md:text-lg">
                      following
                      <br />
                      <span className="text-base md:text-xl font-semibold">
                        {following}
                      </span>
                    </h2>
                  </div>
                </div>
                <div className="grid grid-cols-2  gap-x-2 md:gap-x-10 gap-y-4 py-8  max-sm:mr-10 truncate">
                  {Marker.map((list, index) => {
                    return (
                      <div
                        key={index}
                        className="dark:text-white text-gray-400 flex gap-2 "
                      >
                        <div className=" text-base lg:text-2xl">
                          {list.icon}
                        </div>
                        <h2
                          className={` text-xs md:text-lg truncate  list-items ${
                            list.name?.includes("https")
                              ? "cursor-default text-blue-500"
                              : ""
                          }`}
                        >
                          {list.name || "Not available"}
                        </h2>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
