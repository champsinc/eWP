package com.champsinc.ewp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Main spring boot application class
 * @author Dhiren Chandnani
 */
@SpringBootApplication()
public class EwpApplication {
    public static void main(String[] args) {
        SpringApplication.run(EwpApplication.class, args);
    }
}
