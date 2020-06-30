package com.champsinc.ewp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Configuration properties and generation of swagger api documentation
 * @author Dhiren Chandnani
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Value("${swagger.api.title}")
    private String title;

    @Value("${swagger.api.description}")
    private String description;

    @Value("${swagger.api.version}")
    private String version;

    @Value("${swagger.api.controller.basepackage}")
    private String basePackage;

    /**
     * Create a new swagger api
     * @return Docket
     */
    @Bean
    public Docket swaggerApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage(basePackage))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(metaData());
    }

    /**
     * Define metadata info for swagger documentation
     * @return ApiInfoBuilder object
     */
    private ApiInfo metaData() {
        return new ApiInfoBuilder()
                .title("eWP Api Documentation")
                .description(
                        "Spring Boot REST API - This page documents all endpoints which can be accessed in the eWP application. " +
                        "Any organization can test out these API links directly to see the type of data required and the expected output. " +
                        "You can track the progress on eWP via Trello: https://trello.com/b/5bwLbCmN/ewp-champs"
                )
                .version(version)
                .build();
    }
}
