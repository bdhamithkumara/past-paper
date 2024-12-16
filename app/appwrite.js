"use client";
import { Client, Account, OAuthProvider } from 'appwrite'

const client = new Client()
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)


  const account = new Account(client)

export { OAuthProvider , client, account}

