'use client'
import { useSession, signOut } from 'next-auth/react';

export default function Dashboard() {

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
