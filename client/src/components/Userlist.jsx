import React, { useState,useEffect} from "react";
import './Userlist.css';
import axios from "axios";

export default function Userlist() {
    const [users, setUsers] = useState({});
    const [name, setName] = useState("krishan jangid");
    const [age, setAge] = useState("21");
    const fatchData = async () => {
        try{
            const { data } = await axios.get("http://localhost:4000/api/v1/users/me",{
                headers: {
                    access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhkNjNhODM1ZTYzYjliMDg3OTc2NmUiLCJpYXQiOjE2ODY5ODc3MTN9.ErbGZtn7DQchJAMveD7KZFzn6DFCzpedgB8n6jHAfIY`,
                },
            });
            setUsers(data);
            const Age = Math.floor((Date.parse(today) - Date.parse(pastdate))/(1000*60*60*24*365));
            setAge(Age);
        }
        catch(error){
            console.log(error);
        }
    }
    
    useEffect( () => {
      
        fatchData();
        
    }, [])
    console.log(users);
    const pastdate = users?.user?.dob;
    const today = new Date().toISOString().split('T')[0];
    
    console.log(pastdate,today,age);
    return (
        <>
            <div className="container p-5">
                <div className=" w-64  rounded-xl  flex  gap-10 p-2  bg-gradient-to-r from-indigo-500 to-violet-700 text-slate-200">
                
                <img  src={users?.user?.file} alt="Avatar" className="rounded-full h-16 w-16" />
                
                <div className=" text-right p-1 ">
                <h4><b>{users?.user?.name}</b></h4>
                <p>{age} year old </p>
                </div>
                </div>
               
            </div>
        </>
       ) 
}