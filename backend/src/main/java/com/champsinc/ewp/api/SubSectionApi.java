package com.champsinc.ewp.api;
import com.champsinc.ewp.model.SubSection;
import com.champsinc.ewp.service.SubSectionService;
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
public class SubSectionApi {

    @Autowired
    private SubSectionService subSectionService;

    /**
     * Api endpoint to get all work orders
     * @return a particular work order
     */
    @ApiOperation(value = "Get work package sections by work package id")
    @GetMapping(value = "/subsections")
    public ResponseEntity<String> getAllSubSections() {
        List<SubSection> responseObject =  subSectionService.findAll();
        return new ResponseEntity<>(responseObject.toString(), HttpStatus.OK);
    }

}
