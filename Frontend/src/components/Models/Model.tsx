export interface Movie {
  name: string;
  body: string;
  creator?: string;
  image: string;
  _id?: any;
}

export interface User {
  username: string;
  email: string;
  password: string;
  bio: string;
  image: string;
}

export interface Login {
  email: string;
  password: string;
}
