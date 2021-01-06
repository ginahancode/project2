package org.example;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * Allows us to use Spring MVC in our project.
 */
@Component
@EnableWebMvc
public class App
{
    private static final Logger logger = LogManager.getLogger(App.class);

    public App() {
        logger.info("Creating App");
    }
}
