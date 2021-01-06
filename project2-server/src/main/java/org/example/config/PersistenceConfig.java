package org.example.config;

import com.zaxxer.hikari.HikariDataSource;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.example.App;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Configures connection to database with Hibernate
 */
@Configuration
@EnableTransactionManagement
public class PersistenceConfig {
    private static final Logger logger = LogManager.getLogger(PersistenceConfig.class);

    @Bean
    public DataSource dataSource() {
        logger.info("Setting up datasource");
        HikariDataSource ds = new HikariDataSource();

        try (InputStream input = PersistenceConfig.class.getClassLoader().getResourceAsStream("database.properties")) {

            Properties prop = new Properties();

            if (input == null) {
                logger.error("Sorry, unable to find config.properties");
            }

            prop.load(input);

            ds.setJdbcUrl(prop.getProperty("db.url"));
            ds.setUsername(prop.getProperty("db.username"));
            ds.setPassword(prop.getProperty("db.password"));
            ds.setDriverClassName("org.postgresql.Driver");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return ds;
    }

    @Bean
    public LocalSessionFactoryBean entityManager() {
        logger.info("Setting up Session Factory");
        LocalSessionFactoryBean sf = new LocalSessionFactoryBean();
        sf.setDataSource(dataSource());
        sf.setPackagesToScan("org.example.entities");
        sf.setHibernateProperties(getHibernateProperties());
        return sf;
    }

    @Bean
    public HibernateTransactionManager transactionManager() {
        logger.info("Setting up Transaction Manager");
        HibernateTransactionManager txManager = new HibernateTransactionManager();
        txManager.setSessionFactory(entityManager().getObject());
        return txManager;
    }

    private Properties getHibernateProperties() {
        Properties props = new Properties();
        //props.setProperty("hibernate.hbm2ddl.auto", "create");
        props.setProperty("hibernate.jdbc.lob.non_contextual_creation", "true");
        props.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQL9Dialect");
        props.setProperty("hibernate.connection.driver_class", "org.postgresql.Driver");
        props.setProperty("hibernate.show_sql", "true");
        props.setProperty("hibernate.format_sql", "true");
        props.setProperty("hibernate.enable_lazy_load_no_trans", "true");
        return props;
    }
}
