import NextAuth from "next-auth";

declare module "next-auth" {
interface Session {
    access_token: string;
    user:         IUser; 
  }

interface IUser {
    _id:      string;
    email:    string;
    username: string;
    name:     string;
    phone:    string;
    __v:      number;
}

interface User {
  access_token?: string;
  user:         IUser;  
}

}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    user:         IUser; 
  }
  interface IUser {
    _id:      string;
    email:    string;
    username: string;
    name:     string;
    phone:    string;
    __v:      number;
  }
}

