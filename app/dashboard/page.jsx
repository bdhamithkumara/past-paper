"use client"
import React, { useEffect, useState } from 'react'
import { account } from '../appwrite'
import { AppSidebar } from "@/components/app-sidebar"
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
        <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
}

export default page