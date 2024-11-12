"use client"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function UserInfo(){
    const { data : session} = useSession()

    return (
        <div>
            <h1>Name : {session.user?.name} </h1>
            <h1>Name : {session.user?.email} </h1>
            <button onClick={signOut}>sign out</button>
        </div>
    )
}