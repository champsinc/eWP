package com.champsinc.ewp.api;
import com.champsinc.ewp.model.SubSection;
import com.champsinc.ewp.service.SubSectionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Defining the api links related to subsections
 * @author Dhiren Chandnani
 */
@RestController
@RequestMapping("/api")
@Api(tags = "Sub Section API")
public class SubSectionApi {

    @Autowired
    private SubSectionService subSectionService;

    /**
     * Api endpoint to get subsection by subSectionId
     * @param subSectionId subsection id to searched
     * @return subsection object
     */
    @ApiOperation(
            notes = "API endpoint to fetch a particular subsection by its id",
            value = "Get a subsection by its id"
    )
    @GetMapping(
            value = "/subsection/{subSectionId}",
            produces = "application/json"
    )
    public ResponseEntity<SubSection> getSubSectionById(
            @ApiParam(value = "Sub Section Id to be searched", required = true)
            @PathVariable("subSectionId")
            String subSectionId
    ) {
        Optional<SubSection> subSection = subSectionService.findById(subSectionId);
        return subSection.map(mapSubSection -> new ResponseEntity<>(mapSubSection, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.BAD_REQUEST));
    }

}
