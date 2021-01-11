package com.champsinc.ewp.api;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.service.WorkPackageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Defining the api links related to work packages
 * @author Dhiren Chandnani
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
@Api(tags = "Work Package API")
public class WorkPackageApi {

    @Autowired
    private WorkPackageService workPackageService;

    /**
     * Api endpoint to get all sections of the work order
     * @param ewpId id of the work order to be fetched
     * @return a particular work order
     */
    @ApiOperation(value = "Get work package sections by work package id")
    @GetMapping(
            value = "/wp/{ewpId}",
            produces = "application/json"
    )
    public ResponseEntity<String> getWorkPackageSections(@PathVariable("ewpId") String ewpId) {
        String responseObject =  workPackageService.findById(ewpId);
        if(responseObject.contains("error")){
            return new ResponseEntity<>(responseObject, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }

    /**
     * Api endpoint to change status of the work order
     * @return update on success or failure
     */
    @ApiOperation(value = "Get work package sections by work package id")
    @RequestMapping(
            value = "/wp/changestatus",
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<String> changeWorkPackageStatus(
            @ApiParam(value = "User JSON with fields to be changed", required = true)
            @RequestBody String statusDetails) {
        String responseObject = workPackageService.changeWorkPackageStatus(statusDetails);
        if(responseObject.contains("error")){
            return new ResponseEntity<>(responseObject, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }

    /**
     * Api endpoint to change percentage completed value of the work order
     * @return update on success or failure
     */
    @ApiOperation(value = "Change percentage completed value of work package by its id")
    @RequestMapping(
            value = "/wp/changepercent",
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<String> changeWorkPackagePercentage(
            @ApiParam(value = "User JSON with fields to be changed", required = true)
            @RequestBody String percentageDetails) {
        String responseObject = workPackageService.changeWorkPackagePercentage(percentageDetails);
        if(responseObject.contains("error")){
            return new ResponseEntity<>(responseObject, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }
}
