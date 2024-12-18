"use client"
import React, { useEffect, useState } from 'react'
import { account } from '../appwrite'
import { AppSidebar } from "@/app/dashboard/innerdashboard/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"



const dashboard = ({children}) => {

    const [userData, setUserData] = useState()
    const [sideBarTitle,setsidebartitle] = useState('')

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


    console.log(sideBarTitle)

    return (
        <SidebarProvider>
        <AppSidebar
        setsidebartitle={setsidebartitle}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger /> 
              <Separator orientation="vertical" className="mr-2 h-4" />
              {sideBarTitle}
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {}
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
}

export default dashboard