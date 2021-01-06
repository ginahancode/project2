package org.example.persistence;

import org.example.entities.User;
import org.hibernate.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Methods that query the database for User objects.
 */
@Repository
@Transactional
public class UserRepo {
    private SessionFactory sessionFactory;

    @Autowired
    public UserRepo(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }


    /*------------------------------------------------------------------------------------------------*/


    /**
     * Used when an existing user logs in.
     *
     * @param username The username that the user provides the login form.
     * @return The User object if the user exists, null if the user does not exist.
     */
    public User getUserByUsername(String username) {
        User user = null;

        Session session = sessionFactory.getCurrentSession();
        Query query = session.createQuery("FROM User WHERE username = :username");
        query.setString("username", username);

        List<User> result = query.list();
        for(User u:result) {
            user = u;
        }

        return user;
    }


    /*------------------------------------------------------------------------------------------------*/


    /**
     * Used when creating a new user.
     *
     * @param user A User object containing the new user's information.
     */
    public boolean addUser(User user) {
        Session session = sessionFactory.getCurrentSession();
        session.save(user);
        return true;
    }


    /*------------------------------------------------------------------------------------------------*/


    /**
     * Used when a user deletes their account.
     *
     * @param username The username of the user who wants to be removed.
     */
    public boolean deleteUser(String username) {
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createQuery("DELETE User WHERE username = :username");
        query.setString("username", username);
        query.executeUpdate();
        return true;
    }


    /*------------------------------------------------------------------------------------------------*/


    /**
     * Used when a user updates their information.
     *
     * @param user An object containing the updated user information.
     */
    public void updateUser(User user) {
        Session session = sessionFactory.getCurrentSession();

        Query query = session.createQuery("UPDATE User " +
                "SET username = :newUsername, " +
                "password = :newPassword, " +
                "firstName = :newFirstName, " +
                "lastName = :newLastName, " +
                "email = :newEmail " +
                "WHERE userID = :userID");

        query.setParameter("newUsername", user.getUsername());
        query.setParameter("newPassword", user.getPassword());
        query.setParameter("newFirstName", user.getFirstName());
        query.setParameter("newLastName", user.getLastName());
        query.setParameter("newEmail", user.getEmail());
        query.setParameter("userID", user.getUserID());
        query.executeUpdate();
    }


    /*------------------------------------------------------------------------------------------------*/


    /**
     * Used to populate the socials page, in which users can see all users and their posts.
     *
     * @return A list of all users and their posts.
     */
    public List getAllUsersAndPosts() {
        Session session = sessionFactory.getCurrentSession();

        String sql = "SELECT * FROM USERSANDPOSTS order by user_id asc";
        SQLQuery query = session.createSQLQuery(sql);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

        List results = query.list();

        return results;
    }



}
