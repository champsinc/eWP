package com.champsinc.ewp.org;
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
 * Defining the api links related to champs connect server
 * @author Dhiren Chandnani
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/connect")
@Api(tags = "Work Package API")
public class ChampsConnectApi {

    /**
     * Api endpoint to connect to champs database
     * @return list of all work orders
     */
    @ApiOperation(value = "Connect to champs db")
    @GetMapping(
            value = "/champs",
            produces = "application/json"
    )
    public ResponseEntity<String> connect(@PathVariable("wokey") String wokey) {

        return null;

    }
}
