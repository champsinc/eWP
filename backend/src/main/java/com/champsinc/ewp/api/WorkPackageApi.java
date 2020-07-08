package com.champsinc.ewp.api;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.service.WorkPackageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
     * Api endpoint to get all work packages
     * @return list of all work orders
     */
    @ApiOperation(value = "Get all work packages")
    @GetMapping(
            value = "/wp/all",
            produces = "application/json"
    )
    public List<WorkPackage> getAllWorkPackages() {
        return workPackageService.findAll();
    }

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

}
