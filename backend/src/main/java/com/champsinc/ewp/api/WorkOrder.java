package com.champsinc.ewp.api;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WorkOrder {
    @GetMapping("/wo/details")
    public String greeting() {
        return "Work Order Details Here";
    }
}
