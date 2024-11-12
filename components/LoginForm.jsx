'use client'
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const router = useRouter()


  const handleSignIn = async (e) => {
    e.preventDefault();
    try { 
      const res = await signIn("credentials", {email, password, redirect:false})
      if(res?.error){
        setError(res.error)
        return
      }


    router.replace('/dashboard')
    } catch(error){
      console.log(error)
    }
  }

  return (
    <div>
    <form onSubmit={handleSignIn}>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
    <Link href="/register">register</Link>
    </div>
  );
}
