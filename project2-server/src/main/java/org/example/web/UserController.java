package org.example.web;

import org.example.entities.User;
import org.example.persistence.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

/**
 * Maps HTTP requests related to users to functions that query the users database table.
 */
@RestController
@CrossOrigin
@RequestMapping("users")
public class  UserController {
    @Autowired
    private UserRepo userRepo;

    /**
     * Called when the user navigates to the socials page.
     *
     * @return A list of all users and their posts.
     */
    @GetMapping(path="/usersandposts", produces = MediaType.APPLICATION_JSON_VALUE)
    public List getAllUsersAndPosts() {
        return userRepo.getAllUsersAndPosts();
    }

    /**
     * Called when a new user registers.
     *
     * @param user An object containing information about the new user.
     * @return True if the new user was added, false if not.
     */
    @PostMapping("save-user")
    @CrossOrigin(origins="*")
    public boolean addUser(@RequestBody User user) {
        return userRepo.addUser(user);
    }

    /**
     * Called when a user logs in.
     *
     * @param u An object containing information about the user who is attempting to log in.
     * @return The User object if the user successfully logs in, null if not.
     */
    @PostMapping("login")
    public User authenticate(@RequestBody User u) {
        User user = userRepo.getUserByUsername(u.getUsername());

        if (user != null &&
                user.getPassword().equals(u.getPassword())) {
            System.out.println("User login success");
            return user;
        } else {
            System.out.println("User login failed");
            return null;
        }
    }

    /**
     * Called when a user updates their information.
     *
     * @param user An object containing the user's updated information.
     * @return The HTTP response.
     * @throws URISyntaxException
     */
    @PostMapping(path="update-user")
    @ResponseBody
    @CrossOrigin(origins="*")
    public ResponseEntity<String> updateUser(@RequestBody User user) throws URISyntaxException {
        if (user == null) {
            return new ResponseEntity<>("User is required", HttpStatus.BAD_REQUEST);
        } else {
            userRepo.updateUser(user);
            HttpHeaders httpHeaders = new HttpHeaders();
            return new ResponseEntity<>(null, httpHeaders, HttpStatus.ACCEPTED);
        }
    }

}
