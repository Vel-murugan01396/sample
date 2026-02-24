"use client";
import React, { useState } from "react";
import Showing from "./formShowing";
export default function Home() {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    gender: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    gender: "",
  });

  // 🔹 handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error for that field
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // 🔹 validation function
  const validateForm = () => {
    let newError = {
      name: "",
      email: "",
      mobilenumber: "",
      gender: "",
    };

    let isValid = true;

    if (!data.name) {
      newError.name = "Name is required";
      isValid = false;
    }

    if (!data.email) {
      newError.email = "Email is required";
      isValid = false;
    }

    if (!data.mobilenumber) {
      newError.mobilenumber = "Mobile number is required";
      isValid = false;
    }

    if (!data.gender) {
      newError.gender = "Gender is required";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  // 🔹 submit handler
  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!validateForm()) return;

    console.log("Form Submitted ✅", data);
    const payload={
      name:data.name,
      email:data.email,
      mobilenumber:data.mobilenumber,
      gender:data.gender
    }

    try {
      const res= await fetch("/api/form",{
        method:"POST",
        body: JSON.stringify(payload)
      })

      if (res.ok){
        const result=await res.json()
        console.log("result",result)
        setData({name:"",email:"",mobilenumber:"",gender:""})
      }
    
    } catch (error) {
      setError({
        ...error,
        api:"error is occutre"
      })
    }
  };

  return (<>
    <div className="w-full flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        
        {/* Name */}
        <div>
          <input
            name="name"
            type="text"
            placeholder="Enter Your Name"
            value={data.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {error.name && <p className="text-red-500">{error.name}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            type="text"
            placeholder="Enter Email"
            value={data.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {error.email && <p className="text-red-500">{error.email}</p>}
        </div>

        {/* Mobile */}
        <div>
          <input
            name="mobilenumber"
            type="number"
            placeholder="Enter Mobile Number"
            value={data.mobilenumber}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {error.mobilenumber && (
            <p className="text-red-500">{error.mobilenumber}</p>
          )}
        </div>

        {/* Gender */}
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={data.gender === "male"}
              onChange={handleChange}
            />{" "}
            Male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={data.gender === "female"}
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>
        {error.gender && <p className="text-red-500">{error.gender}</p>}

        {/* Submit */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
    <Showing/>
    </>
  );
}