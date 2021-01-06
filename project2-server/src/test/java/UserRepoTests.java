import org.example.entities.User;
import org.example.persistence.UserRepo;
import org.junit.*;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "/test-application-context.xml" })
@WebAppConfiguration
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UserRepoTests {

    @Autowired
    private UserRepo userRepo;

    @Test
    // "aa" added to front of method name to ensure it gets called first
    public void aaAddUserTest() {
        User u = new User("testuser", "password", "Testfirstname",
                "Testlastname", "testemail@gmail.com");

        Assert.assertTrue(userRepo.addUser(u));
    }

    @Test
    public void getUserByUsernameTest() {
        User e = new User("testuser", "password", "Testfirstname",
                "Testlastname", "testemail@gmail.com");
        int userID = userRepo.getUserByUsername("testuser").getUserID();
        e.setUserID(userID);
        String expected = e.toString();

        String actual = userRepo.getUserByUsername("testuser").toString();

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void updateUserTest() {
        User e = new User("testuser", "password", "Newname",
                "Testlastname", "testemail@gmail.com");
        int userID = userRepo.getUserByUsername("testuser").getUserID();
        e.setUserID(userID);
        String expected = e.toString();

        User a = userRepo.getUserByUsername("testuser");
        a.setFirstName("Newname");
        userRepo.updateUser(a);
        String actual = userRepo.getUserByUsername("testuser").toString();

        Assert.assertEquals(expected, actual);
    }

    @Test
    // "z" added to front of method name to ensure it gets called last
    public void zDeleteUserTest() {
        Assert.assertTrue(userRepo.deleteUser("testuser"));
    }

}
