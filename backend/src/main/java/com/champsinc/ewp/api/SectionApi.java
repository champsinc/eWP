package com.champsinc.ewp.api;
import com.champsinc.ewp.service.SectionService;
import com.google.gson.JsonObject;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Defining the api links related to sections
 * @author Dhiren Chandnani
 */
@RestController
@RequestMapping("/api")
@Api(tags = "Section API")
public class SectionApi {

    @Autowired
    private SectionService sectionService;

    /**
     * Api endpoint to get all subsections of a section
     * @param sectionId section id to be searched
     * @return json object of all subsections with their data items
     */
    @ApiOperation(
            notes = "This API endpoint is used to get all subsections along with their data items for any section",
            value = "Get all subsections for a section by id"
    )
    @GetMapping(
            value = "/section/{sectionId}",
            produces = "application/json"
    )
    public ResponseEntity<String> getSectionSubSections(@ApiParam(value = "Section Id to be searched", required = true) @PathVariable("sectionId") String sectionId) {
        String responseObject =  sectionService.findSubSectionBySectionId(sectionId);
        if(responseObject.contains("error")){
            return new ResponseEntity<>(responseObject, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }

    /**
     * Api endpoint to update all subsections for a section
     * @return status if update was successful or if any errors were present
     */

    /*
    @ApiOperation(
            notes = "API endpoint to update any subsections of a section",
            value = "Update all subsections for a section"
    )
    @RequestMapping(
            value = "/section/update",
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<String> updateSectionSubSections(@ApiParam("JSON containing arraylist of subsections for a section") String payload) {
        JsonObject responseObject =  sectionService.updateSectionSubSections(payload);
        if(responseObject.has("error")){
            return new ResponseEntity<>(responseObject.toString(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(responseObject.toString(), HttpStatus.OK);
    }
    */
}
