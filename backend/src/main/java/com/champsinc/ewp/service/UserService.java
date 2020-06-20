package com.champsinc.ewp.service;

import com.champsinc.ewp.model.WorkPackage;
import com.google.gson.JsonObject;

import java.util.List;

public interface UserService {
    String findUserWorkPackages(String userId);
    JsonObject updateUser(String userDetails);
}
