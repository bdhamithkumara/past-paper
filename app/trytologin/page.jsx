"use client";
import React, { useEffect } from 'react'
import Image from 'next/image'
import { account, OAuthProvider } from '../appwrite'
import { redirect } from 'next/navigation';


const page = () => {

    const loginWithGoogle = async () => {
      try {
        await account.createOAuth2Session(OAuthProvider.Google,
             'http://localhost:3000/dashboard',
             'http://localhost:3000/trytologin'
        )
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div>
        <button onClick={loginWithGoogle}>
            <Image src="/btn_google_signin_light_normal_web.png" 
                alt="Google Sign-In"
                width={200} 
                height={50} 
            />
        </button>
    </div>
  )
}

export default page