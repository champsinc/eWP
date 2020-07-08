package com.champsinc.ewp.model;

import com.google.gson.annotations.Expose;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * Model class for sections
 * @author Dhiren Chandnani
 */
@Data
@Document(collection = "users")
@ApiModel
public class User {

    @Id
    private String id;

    @Expose
    private String name;

    @Size(min = 6, max = 20)
    private String password;

    @Expose
    @Min(value = 0)
    @Max(value = 3)
    private int role;

    @Expose
    @Email
    private String email;

    @Expose
    private boolean verified;
    private String activationCode;

    private String forgotPasswordToken;
    private Date forgotPasswordExpiryDate;

}
