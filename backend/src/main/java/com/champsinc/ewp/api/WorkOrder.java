package com.champsinc.ewp.api;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.repository.WorkPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WorkOrder {
    @Autowired
    private WorkPackageRepository repository;

    @GetMapping("/wo/details")
    public String greeting() {
        return "Work Order Details Here";
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<WorkPackage> getAllWorkPackages() {
        return repository.findAll();
    }

    @RequestMapping(value = "/{ewpId}", method = RequestMethod.GET)
    public WorkPackage getPetByEwpId(@PathVariable("ewpId") int ewpId) {
        return repository.findByewpId(ewpId);
    }
}
