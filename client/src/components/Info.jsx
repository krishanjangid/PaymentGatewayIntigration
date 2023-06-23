import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Info() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fatchData = async () => {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fatchData();
  }, []);
  const filteredValues = users.filter((user) =>
  user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()) || user.address.city.toLowerCase().includes(searchQuery.toLowerCase()) || user.website.toLowerCase().includes(searchQuery.toLowerCase())
);

  function sorthandler() {
    const sorted = [...filteredValues].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sorted);
  }
  function fileterhandler(e) {
    setSearchQuery(e.target.value);
  }
  
console.log(filteredValues);

 
 
  return (
    <>
      <input
        type="search"
        placeholder="search"
        value={searchQuery}
        className="p-2 m-5 rounded-md  bg-black text-white"
        onChange={fileterhandler}
      />
      <button
        className="btn p-2 m-5 rounded-md  bg-black text-white"
        onClick={sorthandler}
      >
        Sort List
      </button>
      {filteredValues.map((c) => {
        return (
          <Details
            key={c.id}
            name={c.name}
            email={c.email}
            address={c.address}
            website={c.website}
          />
        );
      })}
    </>
  );
}

const Details = ({ name, email, address, website }) => {
  return (
    <>
      <div className="container p-5 ">
        <div className=" w-64  rounded-xl  flex  gap-10 p-2  bg-gradient-to-r from-indigo-500 to-violet-700 text-slate-200">
          <div className=" text-right p-1 ">
            <h4>
              <b>{name}</b>
            </h4>
            <p>{email}</p>
            <address>
              {address.city} {address.zipcode}
            </address>
            <a
              href={`https://www.${website}`}
              target="_blank"
            >{`https://www.${website}`}</a>
          </div>
        </div>
      </div>
    </>
  );
};

// const filter = [...users].filter((user) => user.name.toLowerCase().includes(e.target.value.toLowerCase()));
// setUsers(filter);
