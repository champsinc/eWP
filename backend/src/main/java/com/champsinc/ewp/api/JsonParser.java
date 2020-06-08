package com.champsinc.ewp.api;

import com.champsinc.ewp.service.JsonParserService;
import com.champsinc.ewp.service.WorkPackageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
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
            consumes = "application/json"
    )
    public String parseJson(@RequestBody String payload) {
        return jsonParserService.checkPayload(payload);
    }
}
