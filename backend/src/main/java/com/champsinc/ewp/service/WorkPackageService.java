package com.champsinc.ewp.service;

import com.champsinc.ewp.model.WorkPackage;

import java.util.List;

/**
 * Service interface to define work package queries
 * @author Dhiren Chandnani
 */
public interface WorkPackageService {
    List<WorkPackage> findAll();
    WorkPackage findByewpId(int ewpId);
}
