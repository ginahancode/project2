package org.example.persistence;

import org.example.entities.Post;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Methods that query the database for Post objects.
 */
@Repository
@Transactional
public class PostRepo {
    private SessionFactory sessionFactory;

    @Autowired
    public PostRepo(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }


    /*------------------------------------------------------------------------------------------------*/


    /**
     * Used to populate a user's list.
     *
     * @param userID The ID of the user whose list we want to see.
     * @return A list of all the user's posts.
     */
    public List<Post> getAllPostsForUser(int userID) {
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createQuery("FROM Post WHERE userID = :userID ORDER BY userScore DESC");
        query.setParameter("userID", userID);
        return query.list();
    }


    /*------------------------------------------------------------------------------------------------*/


    /**
     * Used when a user adds a new post to their list.
     *
     * @param post A Post object containing information about the new post.
     */
    public boolean addPost(Post post) {
        Session session = sessionFactory.getCurrentSession();
        session.save(post);
        return true;
    }


    /*------------------------------------------------------------------------------------------------*/


    /**
     * Used when a user deletes a post from their list.
     *
     * @param postID The ID of the post that we want to delete.
     */
    public boolean deletePost(int postID) {
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createQuery("DELETE Post WHERE postID = :postID");
        query.setParameter("postID", postID);
        query.executeUpdate();
        return true;
    }


    /*------------------------------------------------------------------------------------------------*/

    /**
     * Used when a user updates their score, status, and/or review for a post.
     *
     * @param post A Post object containing the updated post.
     */
    public void updatePost(Post post) {
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createQuery("UPDATE Post SET userScore = :newUserScore, status = :newStatus, review = :newReview WHERE postID = :postID");
        query.setParameter("newUserScore", post.getUserScore());
        query.setParameter("newStatus", post.getStatus());
        query.setParameter("newReview", post.getReview());
        query.setParameter("postID", post.getPostID());
        query.executeUpdate();
    }
}
