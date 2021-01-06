package org.example.entities;

import org.hibernate.annotations.Type;

import javax.persistence.*;

/**
 * Models a record in the posts database table, with instance variables corresponding to properties.
 */
@Entity
@Table(name="POSTS")
public class Post {

    @Id
    @Column(name="POST_ID")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int postID;

    @Column(name="USER_ID")
    private int userID;

    @Column(name="TITLE")
    private String title;

    @Column(name="SCORE")
    private double score;

    @Column(name="USER_SCORE")
    private double userScore;

    @Column(name="STATUS")
    private String status;

    @Column(name="REVIEW")
    private String review;

    @Column(name="COVER_ART")
    private String coverArt;

    @Column(name="RELEASE_DATE")
    private String releaseDate;

    @Column(name="RELEASE_REGION")
    private String releaseRegion;

    @Column(name="AGE_RATING")
    private String ageRating;

    @Column(name="GENRES")
    private String genres;

    @Column(name="PLATFORMS")
    private String platforms;

    @Column(name="SCREENSHOTS")
    private String screenshots;

    public Post() {}

    public Post(int userID, String title, double score, double userScore, String status, String review, String coverArt, String releaseDate, String releaseRegion, String ageRating, String genres, String platforms, String screenshots) {
        this.userID = userID;
        this.title = title;
        this.score = score;
        this.userScore = userScore;
        this.status = status;
        this.review = review;
        this.coverArt = coverArt;
        this.releaseDate = releaseDate;
        this.releaseRegion = releaseRegion;
        this.ageRating = ageRating;
        this.genres = genres;
        this.platforms = platforms;
        this.screenshots = screenshots;
    }

    public int getPostID() {
        return postID;
    }

    public void setPostID(int postID) {
        this.postID = postID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public double getUserScore() {
        return userScore;
    }

    public void setUserScore(double userScore) {
        this.userScore = userScore;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getCoverArt() {
        return coverArt;
    }

    public void setCoverArt(String coverArt) {
        this.coverArt = coverArt;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getReleaseRegion() {
        return releaseRegion;
    }

    public void setReleaseRegion(String releaseRegion) {
        this.releaseRegion = releaseRegion;
    }

    public String getAgeRating() {
        return ageRating;
    }

    public void setAgeRating(String ageRating) {
        this.ageRating = ageRating;
    }

    public String getGenres() {
        return genres;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }

    public String getPlatforms() {
        return platforms;
    }

    public void setPlatforms(String platforms) {
        this.platforms = platforms;
    }

    public String getScreenshots() {
        return screenshots;
    }

    public void setScreenshots(String screenshots) {
        this.screenshots = screenshots;
    }

    @Override
    public String toString() {
        return "Post{" +
                "postID=" + postID +
                ", userID=" + userID +
                ", title='" + title + '\'' +
                ", score=" + score +
                ", userScore=" + userScore +
                ", status='" + status + '\'' +
                ", review='" + review + '\'' +
                ", coverArt='" + coverArt + '\'' +
                ", releaseDate='" + releaseDate + '\'' +
                ", releaseRegion='" + releaseRegion + '\'' +
                ", ageRating='" + ageRating + '\'' +
                ", genres='" + genres + '\'' +
                ", platforms='" + platforms + '\'' +
                ", screenshots='" + screenshots + '\'' +
                '}';
    }
}
