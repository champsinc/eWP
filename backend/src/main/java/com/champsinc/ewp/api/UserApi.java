package com.champsinc.ewp.api;
import com.champsinc.ewp.model.SubSection;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.service.SubSectionService;
import com.champsinc.ewp.service.UserService;
import com.google.gson.JsonObject;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Defining the api links related to work orders
 * @author Dhiren Chandnani
 */
@RestController
@RequestMapping("/api")
@Api(tags = "Work Order API")
public class UserApi {

    @Autowired
    private UserService userService;

    /**
     * Api endpoint to get all work orders
     * @return a particular work order
     */
    @ApiOperation(value = "Get work package sections by work package id")
    @GetMapping(value = "/user/wp/{userId}")
    public ResponseEntity<String> getUserWorkPackages(@PathVariable("userId") String userId) {
        String responseObject =  userService.findUserWorkPackages(userId);
        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }

    /**
     * Api endpoint to get all work orders
     * @return a particular work order
     */
    @ApiOperation(value = "Get work package sections by work package id")
    @RequestMapping(
            value = "/user/update",
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<String> updateUser(String userDetails) {
        JsonObject responseObject =  userService.updateUser(userDetails);
        if(responseObject.has("error")){
            return new ResponseEntity<>(responseObject.toString(), HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(responseObject.toString(), HttpStatus.OK);
        }
    }

}
