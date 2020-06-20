package com.champsinc.ewp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;

/**
 * Model class for sections
 * @author Dhiren Chandnani
 */
@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;
    private int role;

    @Email
    private String email;
}
