import { Post } from "./post";

export class User {
    userID: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;

    posts: any[] = [];
}
