package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.SubSection;
import com.champsinc.ewp.model.User;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.repository.SubSectionRepository;
import com.champsinc.ewp.repository.UserRepository;
import com.champsinc.ewp.repository.WorkPackageRepository;
import com.champsinc.ewp.service.UserService;
import com.google.gson.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

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
}