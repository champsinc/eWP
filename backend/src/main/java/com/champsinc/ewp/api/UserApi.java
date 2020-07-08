package com.champsinc.ewp.api;
import com.champsinc.ewp.model.User;
import com.champsinc.ewp.repository.UserRepository;
import com.champsinc.ewp.service.UserService;
import com.google.gson.JsonObject;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;

/**
 * Defining the api links related to users
 * @author Dhiren Chandnani
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
@Api(tags = "User API")
public class UserApi {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    /**
     * Api endpoint to get all work packages for a user
     * @param userId user id to be searched
     * @return json object of all user work packages
     */
    @ApiOperation(value = "Get user work packages by user id")
    @GetMapping(
            value = "/user/wp/{userId}",
            produces = "application/json"
    )
    public ResponseEntity<String> getUserWorkPackages(@ApiParam(value = "Id of the user", required = true) @PathVariable("userId") String userId) {
        String responseObject =  userService.findUserWorkPackages(userId);
        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }

    /**
     * Api endpoint to update a user
     * @return error or success about the update
     */
    @ApiOperation(value = "Update user")
    @RequestMapping(
            value = "/user/update",
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<String> updateUser(@ApiParam(value = "User JSON with fields to be changed", required = true) String userDetails) {
        JsonObject responseObject =  userService.updateUser(userDetails);
        if(responseObject.has("error")){
            return new ResponseEntity<>(responseObject.toString(), HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(responseObject.toString(), HttpStatus.OK);
        }
    }

    /**
     * Api endpoint to get user details by userId
     * @return user object
     */
    @ApiOperation(value = "Get user by userId")
    @GetMapping(
            value = "/user/{userId}",
            produces = "application/json"
    )
    public ResponseEntity<User> getUser(@ApiParam(value = "User id to be searched", required = true) @PathVariable("userId") String userId) {
        User user =  userService.findUserById(userId);
        if(user == null){
            return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    /**
     * Api endpoint to validate user details
     * @return string for validation or invalidation
     */
    @ApiOperation(value = "Validate user credentials")
    @PostMapping(
            value = "/user/login",
            produces = "application/json",
            consumes = "application/json"
    )
    public ResponseEntity<String> userLogin(
            @ApiParam(value = "User credentials (email, password)", required = true)
            @RequestBody String userCredentials) {
        String response = userService.userLogin(userCredentials);
        if(response.contains("validated")){
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        else{
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    /**
     * Api endpoint to register new user
     * @return string for registration
     */
    @ApiOperation(value = "Validate user credentials")
    @RequestMapping(
            value = "/user/register",
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<String> userRegister(
            @ApiParam(value = "User credentials for registration", required = true)
            @RequestBody String userCredentials) {
        String response = userService.userRegister(userCredentials);
        if(response.contains("false")){
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    /**
     * Api endpoint to register new user
     * @return string for registration
     */
    @ApiOperation(value = "Verify activation code")
    @RequestMapping(
            value = "/user/activate",
            method = RequestMethod.GET
    )
    public ResponseEntity<String> userVerify(
            @ApiParam(value = "Verify user activation code", required = true)
            @RequestParam String id) {
        boolean response = userService.userVerify(id);
        if(!response){
            return new ResponseEntity<>("Invalid verification URL", HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>("You have been verified. Thank you!", HttpStatus.OK);
        }
    }

    /**
     * Api endpoint to perform forgot password for user
     * @return string for registration
     */
    @ApiOperation(value = "Forgot password")
    @RequestMapping(
            value = "/user/forgot_password",
            method = RequestMethod.GET
    )
    public ResponseEntity<String> userForgotPassword(
            @ApiParam(value = "Email id of the user", required = true)
            @RequestParam String emailId) {
        String response = userService.userForgotPassword(emailId);
        if(response.contains("false")){
            return new ResponseEntity<>("No such email exists", HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>("Forgot password email sent", HttpStatus.OK);
        }
    }

    /**
     * Api endpoint to check forgot password token and change password
     * @return string for forgot password
     */
    @ApiOperation(value = "Change forgotten password")
    @RequestMapping(
            value = "/user/forgot_password_change",
            method = RequestMethod.GET
    )
    public ResponseEntity<String> userForgotPasswordProcess(
            @ApiParam(value = "Forgot password token", required = true) @RequestParam String token,
            @ApiParam(value = "New password", required = true) @RequestParam String password
            ) {
        String response = userService.userForgotPasswordProcess(token, password);
        if(response.contains("false")){
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }


    // SAMPLE

    @ApiOperation(value = "Sample api")
    @RequestMapping(
            value = "/user/add_user",
            method = RequestMethod.GET
    )
    public ResponseEntity<String> userAdd(
            @RequestParam String email
    ) {

        return new ResponseEntity<>("SAMPLE", HttpStatus.OK);
    }
}
