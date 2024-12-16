"use client"
import React, { useEffect, useState } from 'react'
import { account } from '../appwrite'

const page = () => {

    const [userData, setUserData] = useState()

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData = await account.get()
                console.log(userData)

                const authorizedUsers = ["damithkumararoxx55@gmail.com"];

                if (!authorizedUsers.includes(userData?.email)) {

                    try {
                        await account.deleteSession('current')
                        window.location.href = "/";
                    } catch (error) {
                        console.error(error)
                    }
                }

                setUserData(userData)
            } catch (error) {
                console.error(error)
            }
        }

        checkUser()
    }, [])



    return (
        <div>welcome !!! {userData?.name}</div>
    )
}

export default page