"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"
export default function RegisterForm(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!name || !email || !password ){
            setError("form must be filled")
            return
        } 

        try{

        const resUserExists = await fetch("api/userExists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({email})
        })

        const {user} = await resUserExists.json()
        if(user){
            setError("User Already exists")
            return
        }

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                name, email, password
            })
        })

        const data = res.json()
        if(res.ok){
            e.target.reset()
            router.push("/login")
            router.refresh()
        } else {
            setError(data.message || "Registration failed");
        }
      } catch(error){
        console.log(error)
      }
    } 

    return(
        <div>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">register</button>
            </form>
            <Link href={"/login"}>
          {" "}
          already have account <span>login </span>{" "}
        </Link>
         {error && (
            <div>
                <h2>{error}</h2>
            </div>
         )}
        </div>
    )
}