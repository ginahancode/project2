package org.example.web;

import org.example.entities.Post;
import org.example.persistence.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.util.List;

/**
 * Maps HTTP requests related to posts to functions that query the posts database table.
 */
@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "*")
public class PostController {
    Connection conn;

    @Autowired
    private PostRepo postRepo;

    /**
     * Called when a user sees their list.
     *
     * @param userID The ID of the users whose posts we need.
     * @return A list with all of the user's posts.
     */
    @GetMapping(path= "/posts-by-status", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Post> getAllPostsForUser(@RequestParam int userID) {
        return postRepo.getAllPostsForUser(userID);
    }

    /**
     * Called when a user adds a game to their list.
     *
     * @param game A Post object containing information about the added game.
     * @return The HTTP response.
     * @throws URISyntaxException
     */
    @PostMapping(path="/newpost", consumes=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin(origins = "*")
    public ResponseEntity<Post> addPost(@RequestBody Post game) throws URISyntaxException {
        if(game == null) {
            return new ResponseEntity<Post>(new Post(), HttpStatus.BAD_REQUEST);
        } else {
            System.out.println(game);
            if (game.getScore() >= 100)
                game.setScore(99.99);
            postRepo.addPost(game);
            HttpHeaders httpHeaders = new HttpHeaders();
            return new ResponseEntity<Post>(game, httpHeaders, HttpStatus.CREATED);
        }
    }

    /**
     * Called when a user updates the score, status, or review of one of their posts.
     *
     * @param game A Post object containing the updated information.
     * @return The HTTP response.
     * @throws URISyntaxException
     */
    @PostMapping(path="/updatepost", consumes=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> updatePost(@RequestBody Post game) throws URISyntaxException {
        if(game == null) {
            return new ResponseEntity<>("post is required", HttpStatus.BAD_REQUEST);
        } else {
            System.out.println(game);
            postRepo.updatePost(game);
            HttpHeaders httpHeaders = new HttpHeaders();
            return new ResponseEntity<>(null, httpHeaders, HttpStatus.CREATED);
        }
    }

    /**
     * Called when a user deletes a post.
     *
     * @param postID The ID of the post to be deleted.
     * @return True if the post was able to be deleted, false if not.
     */
    @DeleteMapping(path="deletepost")
    @CrossOrigin(origins = "*")
    public boolean deletePost(@RequestParam String postID) {
        System.out.println("Reached delete in PostController");
        Integer post_id = Integer.parseInt(postID);
        return postRepo.deletePost(post_id);
    }
}
