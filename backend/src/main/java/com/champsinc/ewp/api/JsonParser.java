package com.champsinc.ewp.api;

import com.champsinc.ewp.service.JsonParserService;
import com.google.gson.JsonObject;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Api(tags = "JSON Parser API")
public class JsonParser {
    @Autowired
    private JsonParserService jsonParserService;

    /**
     * Api endpoint to check if work package is valid
     * @param payload Json payload of the work package
     * @return Json object with success or error
     */
    @ApiOperation(
            notes = "This API endpoint is used to check if a work package exported from the CMMS is according to our schema (https://github.com/champsinc/eWP/wiki/Schema-Documentation). " +
                    "The JSON should also include the users and the status of the work package as well",
            value = "Check if a work package is valid")
    @RequestMapping(
            value = "/parse/check",
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<String> parseJson(
            @ApiParam(value = "The work package json to be validated", required = true)
            @RequestBody String payload
    ) {
        JsonObject jsonResponse = jsonParserService.checkPayload(payload);
        if(jsonResponse.has("error")){
            return new ResponseEntity<>(jsonResponse.toString(), HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(jsonResponse.toString(), HttpStatus.OK);
        }
    }
}
