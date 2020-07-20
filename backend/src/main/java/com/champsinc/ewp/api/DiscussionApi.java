package com.champsinc.ewp.api;

import com.champsinc.ewp.service.DiscussionService;
import com.google.gson.JsonObject;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Defining the api links related to discussion section
 * @author Dhiren Chandnani
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
@Api(tags = "Discussion API")
public class DiscussionApi {

    @Autowired
    private DiscussionService discussionService;

    /**
     * Api endpoint to get all discussion items for a work package
     * @param wpId work package id of the discussion
     * @return json object of all discussion items of that work package
     */
    @ApiOperation(
            notes = "This API endpoint is used to get all discussion items for a work package",
            value = "Get all discussion items for a work package"
    )
    @GetMapping(
            value = "/discuss/wp/{wpId}",
            produces = "application/json"
    )
    public ResponseEntity<String> getWorkPackageDiscussion(@ApiParam(value = "Work Package Id to be searched", required = true) @PathVariable("wpId") String wpId) {
        String responseObject =  discussionService.findByWpId(wpId);
        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }


    @ApiOperation(
            notes = "API endpoint to insert a discussion item",
            value = "Insert a new discussion item"
    )
    @RequestMapping(
            value = "/discuss/insert",
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<String> insertDiscussion(
            @ApiParam("JSON containing arraylist of subsections for a section")
            @RequestBody String payload
    ) {
        JsonObject responseObject =  discussionService.insertDiscussion(payload);
        return new ResponseEntity<>(responseObject.toString(), HttpStatus.OK);
    }
}
