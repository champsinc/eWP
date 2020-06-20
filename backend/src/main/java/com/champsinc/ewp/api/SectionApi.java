package com.champsinc.ewp.api;
import com.champsinc.ewp.model.Section;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.service.SectionService;
import com.champsinc.ewp.service.WorkPackageService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
public class SectionApi {

    @Autowired
    private SectionService sectionService;

    /**
     * Api endpoint to get all work orders
     * @return a particular work order
     */
    @ApiOperation(value = "Get work package sections by work package id")
    @GetMapping(value = "/section/{sectionId}")
    public ResponseEntity<String> getSectionSubSections(@PathVariable("sectionId") String sectionId) {
        String responseObject =  sectionService.findSubSectionBySectionId(sectionId);
        if(responseObject.contains("error")){
            return new ResponseEntity<>(responseObject, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }

    /**
     * Api endpoint to get all work orders
     * @return a particular work order
     */
    @ApiOperation(value = "Get work package sections by work package id")
    @RequestMapping(
            value = "/section/update",
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<String> updateSectionSubSections(String payload) {
        String responseObject =  sectionService.findSubSectionBySectionId(payload);
        if(responseObject.contains("error")){
            return new ResponseEntity<>(responseObject, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }
}
