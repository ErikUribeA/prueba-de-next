export interface IResponseCreateUser {
    id: number,
    email: string;
    username: string;
    name: string;
    phone: string;
  }
  
  export interface IUserRegistered {
    email: string;
    username: string;
    password: string;
    name: string;
    phone: string;
  }