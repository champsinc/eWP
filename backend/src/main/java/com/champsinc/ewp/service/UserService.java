package com.champsinc.ewp.service;

import com.champsinc.ewp.model.User;
import com.google.gson.JsonObject;

public interface UserService {
    String findUserWorkPackages(String userId);
    JsonObject updateUser(String userDetails);
    User findUserById(String userId);
    String userLogin(String userCredentials);
    String userRegister(String userCredentials);
    boolean userVerify(String activationCode);
    String userForgotPassword(String emailId);
    String userForgotPasswordProcess(String forgotPasswordToken, String password);
}
