package com.champsinc.ewp.api;

import com.champsinc.ewp.service.JsonParserService;
import com.google.gson.JsonObject;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/parse")
@Api(tags = "JSON Parser API")
public class JsonParser {
    @Autowired
    private JsonParserService jsonParserService;

    @ApiOperation(value = "Check if work package is valid")
    @RequestMapping(
            value = "/check",
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<String> parseJson(@RequestBody String payload) {
        JsonObject jsonResponse = jsonParserService.checkPayload(payload);
        if(jsonResponse.has("error")){
            return new ResponseEntity<>(jsonResponse.toString(), HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(jsonResponse.toString(), HttpStatus.OK);
        }
    }
}
