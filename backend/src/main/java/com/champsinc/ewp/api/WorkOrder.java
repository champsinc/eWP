package com.champsinc.ewp.api;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.service.WorkPackageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Defining the api links related to work orders
 * @author Dhiren Chandnani
 */
@RestController
@RequestMapping("/api")
@Api(tags = "Work Order API")
public class WorkOrder {

    @Autowired
    private WorkPackageService workPackageService;

    /**
     * Api endpoint to get all work orders
     * @return list of all work orders
     */
    @ApiOperation(value = "Get all work orders")
    @GetMapping(value = "/wo/all")
    public List<WorkPackage> getAllWorkPackages() {
        return workPackageService.findAll();
    }

    /**
     * Api endpoint to get all work orders
     * @param ewpId id of the work order to be fetched
     * @return a particular work order
     */
    @ApiOperation(value = "Get work order by eWP ID")
    @GetMapping(value = "/wo/{ewpId}")
    public WorkPackage getWorkPackage(@PathVariable("ewpId") int ewpId) {
        return workPackageService.findByewpId(ewpId);
    }
}
