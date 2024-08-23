export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  bio: string;
  address: string;
  profileImage: string;
  socialLinks: {
    name: string;
    url: string;
  }[];
  recipes: string[];
  createdAt: Date;
  updatedAt: Date;
}
