import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import userGetAllUsers from "../../context/userGetAllUsers.jsx";
import useConversation from "../../statemanage/useConversation.js";
import toast from "react-hot-toast";
import img from './profile.jpg'

function Search() {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allUsers] = userGetAllUsers();
  const { setSelectedConversation } = useConversation();

  useEffect(() => {
    // empty search or no users
    if (search.trim() === "" || !allUsers?.allUsers) {
      setFilteredUsers([]);
      return;
    }
// apply filtered on allUsers
    const filtered = allUsers.allUsers.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    // set updated users
    setFilteredUsers(filtered);
  }, [search, allUsers]); // when we make changes in it useEffect will work

  const handleSelectUser = (user) => {
    setSelectedConversation(user);
    setSearch(""); // This will also cause the popup to disappear
  };

  return (
    <div className="px-4 py-4">
      {/* This relative container is the key. The popup will be positioned relative to it. */}
      <div className="relative">
        {/* Search Input */}
        <label className="border-[1px] border-gray-700 bg-black bg-opacity-30 rounded-lg p-3 flex items-center gap-2 w-full">
          <IoSearch className="text-white text-xl" />
          <input
            type="text"
            className="grow outline-none bg-transparent text-white placeholder-gray-400"
            placeholder="Search for a user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        {/* --- Popup for Search Results --- */}
        {/* It only renders when there is a search term and there are results */}
        {search.trim() !== "" && filteredUsers.length > 0 && (
          <div
            className="absolute top-full mt-2 w-full z-50 bg-slate-800 border border-gray-700 rounded-lg p-2 max-h-60 overflow-y-auto"
          >
            <div className="flex flex-col gap-1">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleSelectUser(user)}
                  className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-blue-600"
                >
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                                        {/* user profile image  */}
                                        <img src={img} />
                                     
                                    </div> 
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;