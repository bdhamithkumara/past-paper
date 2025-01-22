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
import Page1 from './innerdashboard/page1/page'
import Page2 from './innerdashboard/page2/page'
import Page3 from './innerdashboard/page3/page'
import { useRouter } from 'next/navigation';

const dashboard = ({children}) => {

    const [userData, setUserData] = useState()
    const [sideBarTitle,setsidebartitle] = useState('')
    const router = useRouter();

    useEffect(() => {
      const checkSession = async () => {
        try {
          const session = await account.get();
          if (session) {
            router.push('/dashboard'); 
          }else{
            router.push('/web');
          }
        } catch (error) {
          console.error('Not logged in:', error);
        }
      };
  
      checkSession();
    }, []);

    useEffect(() => {
      const checkUser = async () => {
          try {
              const userData = await account.get(); // Fetch user data
              console.log(userData);
  
              const authorizedUsers = ["damithkumararoxx55@gmail.com"];
  
              if (!authorizedUsers.includes(userData?.email)) {
                  // If user is not authorized, delete the session and redirect
                  try {
                      await account.deleteSession('current');
                      window.location.href = "/";
                  } catch (error) {
                      console.error("Error deleting session:", error);
                  }
              }
  
              // Set user data if the user is authorized
              setUserData(userData);
          } catch (error) {
              console.error("Error fetching user data:", error);
  
              window.location.href = "/";
          }
      };
  
      checkUser();
  }, []);


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
            {userData}
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
}

export default dashboard