import org.example.entities.Post;
import org.example.entities.User;
import org.example.persistence.PostRepo;
import org.example.persistence.UserRepo;
import org.junit.Assert;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "/test-application-context.xml" })
@WebAppConfiguration
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class PostRepoTests {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    private static int postID;
    private static int userID;

    @Test
    // "aa" added to front of method name to ensure it gets called first
    public void aaAddPostTest() {
        User u = new User("testuser", "password", "Testfirstname",
                "Testlastname", "testemail@gmail.com");
        userRepo.addUser(u);
        userID = userRepo.getUserByUsername("testuser").getUserID();

        Post p = new Post(userID, "Test Title", 10.00, 10.00, "Completed",
                "Review", "Cover Art", "Release Date", "Release Region", "T",
                "Genres", "Platforms", "Screenshots");

        Assert.assertTrue(postRepo.addPost(p));
    }

    @Test
    // "a" added to front of method name to ensure it gets called second
    public void agetAllPostsForUserTest() {
        List<Post> a1 = postRepo.getAllPostsForUser(userID);
        Post a2 = a1.get(0);
        postID = a2.getPostID();
        String actual = a2.toString();

        Post e = new Post(userID, "Test Title", 10.00, 10.00, "Completed",
                "Review", "Cover Art", "Release Date", "Release Region", "T",
                "Genres", "Platforms", "Screenshots");
        e.setPostID(postID);
        String expected = e.toString();

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void updatePostTest() {
        Post e = new Post(userID, "Test Title", 10.00, 10.00, "Dropped",
                "Review", "Cover Art", "Release Date", "Release Region", "T",
                "Genres", "Platforms", "Screenshots");
        e.setPostID(postID);
        String expected = e.toString();

        List<Post> p = postRepo.getAllPostsForUser(userID);
        Post p1 = p.get(0);
        p1.setStatus("Dropped");
        postRepo.updatePost(p1);

        List<Post> a = postRepo.getAllPostsForUser(userID);
        Post a1 = a.get(0);
        String actual = a1.toString();

        Assert.assertEquals(expected, actual);
    }

    @Test
    // "z" added to front of method name to ensure it gets called last
    public void zDeletePostTest() {
        Assert.assertTrue(postRepo.deletePost(postID));
        userRepo.deleteUser("testuser");
    }
}
