package com.champsinc.ewp.config;

import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mongodb.client.MongoClient;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * Mongo Client Configuration.
 * @author Dhiren Chandnani
 */
@Configuration
@EnableMongoRepositories(basePackages = "com.champsinc.ewp.repository")
public class MongoConfig {

    @Value("${spring.data.mongodb.uri}")
    private String mongosUri;

    @Value("${spring.data.mongodb.database}")
    private String databaseName;

    /**
     * Used to connect to mongoDB
     * @return MongoClient object
     */
    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(mongosUri);
    }

    public @Bean MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), databaseName);
    }


}