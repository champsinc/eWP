package com.champsinc.ewp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

/**
 * Main spring boot application class
 * @author Dhiren Chandnani
 */
@SpringBootApplication()
public class EwpApplication extends AbstractSecurityWebApplicationInitializer {
    public static void main(String[] args) {
        SpringApplication.run(EwpApplication.class, args);
    }

}
