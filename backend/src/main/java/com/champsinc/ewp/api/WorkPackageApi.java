package com.champsinc.ewp.api;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.service.WorkPackageService;
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
public class WorkPackageApi {

    @Autowired
    private WorkPackageService workPackageService;

    /**
     * Api endpoint to get all work orders
     * @return list of all work orders
     */
    @ApiOperation(value = "Get all work orders")
    @GetMapping(value = "/wo/all")
    public List<WorkPackage> getAllWorkPackages() {
        return workPackageService.findAll();
    }

    /**
     * Api endpoint to get all sections of the work order
     * @param ewpId id of the work order to be fetched
     * @return a particular work order
     */
    @ApiOperation(value = "Get work package sections by work package id")
    @GetMapping(value = "/wp/{ewpId}")
    public ResponseEntity<String> getWorkPackageSections(@PathVariable("ewpId") String ewpId) {
        String responseObject =  workPackageService.findById(ewpId);
        if(responseObject.contains("error")){
            return new ResponseEntity<>(responseObject, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }

}
