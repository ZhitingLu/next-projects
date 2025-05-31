import React from "react";
import FollowCard from "./FollowCard";

export default function FollowSuggestions() {
  return (
    <div className="border border-gray-100 rounded-xl pt-3 my-3">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold px-3">Who to follow</h2>
        <FollowCard name="Zhiting Lu" username="zlu" avatar="/avatar1.png" verified={true} />
        <FollowCard
          name="Alex Smith"
          username="alexsmith"
          avatar="/avatar2.png"
          verified={false}
        />
        <FollowCard name="Cat Lover" username="clover" avatar="/avatar3.png" verified={true}/>

        <div className="hover:bg-gray-100 py-3 cursor-pointer">
          <button
            className="text-[var(--twitter-blue)] pl-4 font-semibold hover:text-blue-400 text-sm cursor-pointer 
      "
          >
            Show more
          </button>
        </div>
      </div>
    </div>
  );
}
