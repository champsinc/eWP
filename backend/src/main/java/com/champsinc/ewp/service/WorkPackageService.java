package com.champsinc.ewp.service;

import com.champsinc.ewp.model.WorkPackage;
import com.google.gson.JsonObject;

import java.util.List;

/**
 * Service interface to define work package queries
 * @author Dhiren Chandnani
 */
public interface WorkPackageService {
    String findById(String id);
    String changeWorkPackageStatus(String ewpId);
    String changeWorkPackagePercentage(String percentageDetails);
}
