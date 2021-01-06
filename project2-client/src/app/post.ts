export class Post {
    postID: number = null;
    userID: number = null;
    title: string; //basic info
    score: number; 
    userScore: number;
    status: string; //basic info
    review: string; 
    coverArt: string; //basic info
    releaseDate: string;  //maybe change this type? //also, this returns an array so account for that
    releaseRegion: string;
    ageRating: string;
    genres: string;
    platforms: string;
    screenshots: string; //look at artworks section of API as well
    //artworks: string[];

    constructor(){}
}