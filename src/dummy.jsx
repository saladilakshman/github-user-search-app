<div className=" bg-white shadow-lg  dark:shadow-none shadow-blue-100 dark:bg-slate-800 rounded-lg px-10 py-8 ">
  <div className="grid grid-cols-3 gap-2 place-items-center">
    <div className=" overflow-auto h-full  w-2/3">
      <img
        src={avatar_url}
        alt=""
        className="size-28 rounded-full max-sm:size-20"
      />
    </div>
    <div className="flex flex-col justify-between items-baseline w-[38rem] gap-2 col-span-2 text-wrap  pr-12 dark:text-white text-gray-900">
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-4 pb-8">
          <h1 className=" text-sm lg:text-3xl  font-semibold">{name}</h1>
          <a href={html_url} className="text-xl text-blue-500 text-underline">
            @{login || name}
          </a>
          <h2 className="text-xl ">{bio ?? "Not bio available"}</h2>
        </div>
        <div className="dark:text-white text-gray-600">
          <h2 className="text-xl  max-sm:text-wrap">
            Joined on {""}
            {new Date(created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </h2>
        </div>
      </div>

      <div className="flex justify-between items-center gap-8 text-white bg-stone-900 px-10  lg:w-full w-3/4 rounded-lg py-2">
        <h2 className="text-lg">
          Repos
          <br />
          <span className="text-xl font-semibold">{public_repos}</span>
        </h2>
        <h2 className="text-lg">
          followers
          <br />
          <span className="text-xl font-semibold">{followers}</span>
        </h2>
        <h2 className="text-lg">
          following
          <br />
          <span className="text-xl font-semibold">{following}</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-4 py-8">
        {Marker.map((list, index) => {
          return (
            <div
              key={index}
              className="dark:text-white text-gray-400 flex gap-2 "
            >
              <div className=" text-base lg:text-2xl">{list.icon}</div>
              <h2
                className={`text-lg truncate  list-items ${
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
</div>;
