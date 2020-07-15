package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.User;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.repository.UserRepository;
import com.champsinc.ewp.repository.WorkPackageRepository;
import com.champsinc.ewp.service.UserService;
import com.google.gson.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import java.io.IOException;
import java.util.*;

/**
 * Implementation of each function in the service class
 * @author Dhiren Chandnani
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    WorkPackageRepository workPackageRepository;
    @Autowired
    private JavaMailSender javaMailSender;

    /**
     * Function to get all work packages
     * @return specific work package by id
     */
    @Override
    public String findUserWorkPackages(String userId){
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        List<WorkPackage> workPackages =  workPackageRepository.findByUserId(new ObjectId(userId));
        if(workPackages != null) {
            return gson.toJson(workPackages);
        }
        else{
            JsonObject response = new JsonObject();
            response.addProperty("Error", "Unable to find work packages for this user");
            return gson.toJson(response);
        }
    }

    /**
     * Function to get all work packages
     * @return specific work package by id
     */
    @Override
    public JsonObject updateUser(String userDetails){
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonObject responseJSON = new JsonObject();
        try{
            User userModel = gson.fromJson(userDetails, User.class);
            if(userRepository.findById(userModel.getId()).isPresent()){
                userRepository.save(userModel);
            }
            else{
                responseJSON.addProperty("error", "No such user");
            }
            return responseJSON;
        }
        catch (JsonSyntaxException je){
            responseJSON.addProperty("error", "Invalid user json");
            return responseJSON;
        }
    }

    /**
     * Function to get user details
     * @return user object
     */
    @Override
    public User findUserById(String userId){
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    /**
     * Function to validate user credentials
     * @return string response
     */
    @Override
    public String userLogin(String userCredentials){
        JsonObject responseJSON = new JsonObject();
        Gson gson = new GsonBuilder().setPrettyPrinting().excludeFieldsWithoutExposeAnnotation().create();
        JsonObject userCredentialsObject = JsonParser.parseString(userCredentials).getAsJsonObject();
        User user = userRepository.findByEmail(userCredentialsObject.get("email").getAsString());
        if(user != null && user.isVerified()){
            if(user.isVerified()){
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                if(passwordEncoder.matches(userCredentialsObject.get("password").getAsString(), user.getPassword())){
                    return gson.toJson(user);
                }
                else{
                    responseJSON.addProperty("error", "Incorrect email/password");
                    return gson.toJson(responseJSON);
                }
            }
            else{
                responseJSON.addProperty("error", "User is not verified");
                return gson.toJson(responseJSON);
            }
        }
        else{
            responseJSON.addProperty("error", "Incorrect email/password");
            return gson.toJson(responseJSON);
        }
    }

    /**
     * Function to register new user
     * @return string response
     */
    @Override
    public String userRegister(String userCredentials){
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonObject responseJSON = new JsonObject();
        User user = gson.fromJson(userCredentials, User.class);
        if(userRepository.findByEmail(user.getEmail()) == null){
            String activationCode = UUID.randomUUID().toString();
            String url = "http://localhost:8080/api/user/activate?id="+activationCode;
            String body = "Hi "+ user.getName() + ",\n" +
                    "Thanks for registration. Please open this link to verify your email address.\n"+
                    "Link: <a href=\""+url+"\">"+url+"</a>\n"+
                    "\nBest Regards,\nChamps Software";
            String subject = "New Account Activation";
            user.setActivationCode(activationCode);
            user.setVerified(false);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            responseJSON.addProperty("registration", sendEmail(user.getEmail(), subject, body));
        }
        else{
            responseJSON.addProperty("registration", false);
        }
        return gson.toJson(responseJSON);
    }

    private boolean sendEmail(String email, String subject, String body){
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject(subject);
        msg.setText(body);
        try{
            javaMailSender.send(msg);
            return true;
        }
        catch(MailException e){
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Function to verify user activation code
     * @return string response
     */
    @Override
    public boolean userVerify(String activationCode){
        User user = userRepository.findByActivationCode(activationCode);
        if(user != null){
            user.setVerified(true);
            userRepository.save(user);
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Function to send forgot password email
     * @return string response
     */
    @Override
    public String userForgotPassword(String emailId){
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        User user = userRepository.findByEmail(emailId);
        JsonObject responseJSON = new JsonObject();
        if(user != null){
            String subject = "Reset Password";
            String forgotPasswordCode = UUID.randomUUID().toString();
            String url = "https://ewp.github.io/resetPassword?id=" + forgotPasswordCode;
            String body = "Hi "+ user.getName() + ",\n" +
                    "Please open the following link to reset your password.\n"+
                    "Link: <a href=\""+url+"\">Reset Password</a>\n"+
                    "\nBest Regards,\nChamps Software";
            user.setForgotPasswordToken(forgotPasswordCode);
            user.setForgotPasswordExpiryDate(calculateExpiryDate());
            userRepository.save(user);
            responseJSON.addProperty("forgot_password", sendEmail(user.getEmail(), subject, body));
        }
        else{
            responseJSON.addProperty("forgot_password", false);
        }
        return gson.toJson(responseJSON);
    }

    private Date calculateExpiryDate(){
        final Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Date().getTime());
        cal.add(Calendar.MINUTE, 60*24);
        return new Date(cal.getTime().getTime());
    }

    /**
     * Function to send forgot password email
     * @return string response
     */
    @Override
    public String userForgotPasswordProcess(String forgotPasswordToken, String password){
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonObject responseJSON = new JsonObject();
        User user = userRepository.findByForgotPasswordToken(forgotPasswordToken);
        if(user != null && checkExpiryDate(user.getForgotPasswordExpiryDate())){
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setForgotPasswordExpiryDate(null);
            user.setForgotPasswordToken(null);
            userRepository.save(user);
            responseJSON.addProperty("reset_password", true);
        }
        else{
            responseJSON.addProperty("reset_password", false);
        }
        return gson.toJson(responseJSON);
    }

    private boolean checkExpiryDate(Date expiryDate){
        final Calendar cal = Calendar.getInstance();
        return expiryDate.before(cal.getTime());
    }
}