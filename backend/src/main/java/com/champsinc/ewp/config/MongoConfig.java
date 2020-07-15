package com.champsinc.ewp.config;

import com.champsinc.ewp.converter.ZonedDateTimeReadConverter;
import com.champsinc.ewp.converter.ZonedDateTimeWriteConverter;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import com.mongodb.client.MongoClient;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.convert.*;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.ArrayList;
import java.util.List;

/**
 * Mongo Client Configuration.
 * @author Dhiren Chandnani
 */
@Configuration
@EnableMongoRepositories(basePackages = "com.champsinc.ewp.repository")
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongosUri;

    @Value("${spring.data.mongodb.database}")
    private String databaseName;

    private final List<Converter<?, ?>> converters = new ArrayList<>();

    /**
     * Used to connect to mongoDB
     * @return MongoClient object
     */

    @Override
    protected String getDatabaseName() {
        return databaseName;
    }
    @Override
    public MongoClient mongoClient() {
        return MongoClients.create(mongosUri);
    }
/*
    @Override
    public @Bean MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), databaseName);
    }

 */
/*
    @Autowired private MongoDbFactory mongoDbFactory;

    @Autowired
    private MongoMappingContext mongoMappingContext;

    // To remove _class field
    @Bean
    public MappingMongoConverter mappingMongoConverter() {

        DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoDbFactory);
        MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, mongoMappingContext);
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));

        return converter;
    }
*/
    // To add custom date time converter
    @Override
    public MongoCustomConversions customConversions() {
        converters.add(new ZonedDateTimeReadConverter());
        converters.add(new ZonedDateTimeWriteConverter());
        return new MongoCustomConversions(converters);
    }

}