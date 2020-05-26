package com.champsinc.ewp.api;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.repository.WorkPackageRepository;
import com.champsinc.ewp.service.WorkPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WorkOrder {
    @Autowired
    private WorkPackageService workPackageService;

    @GetMapping("/wo/details")
    public String greeting() {
        return "Work Order Details Here";
    }

    @GetMapping(value = "")
    public List<WorkPackage> getAllWorkPackages() {
        return workPackageService.findAll();
    }

    @GetMapping(value = "/{ewpId}")
    public WorkPackage getWorkPackage(@PathVariable("ewpId") int ewpId) {
        return workPackageService.findByewpId(ewpId);
    }
}
