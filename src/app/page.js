
"use client"
import React,{useState,useEffect} from 'react';
export default function Home() {
  const [data,setData]=useState([]);
  useEffect(()=>{
    fetchingData();
  },[])

  const fetchingData=async()=>{
    try {
      const res=await fetch('https://jsonplaceholder.typicode.com/posts');
      if(res.ok){
        const result =await res.json();
   
        setData(result);

      }
    } catch (error) {
      console.log(error,"error in fetching data")
    }
  }
    return (
  <>

<div className="w-full flex flex-wrap">
  {data.slice(0, 16).map((item, index) => (
    <div key={index} className="w-1/4 p-2">
      <div className="bg-green-200 p-2 text-center">
        <h2>{item.title}</h2>
      </div>
    </div>
  ))}
</div>
  </>
  );
}
