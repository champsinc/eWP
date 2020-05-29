package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.repository.WorkPackageRepository;
import com.champsinc.ewp.service.WorkPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of each function in the service class
 * @author Dhiren Chandnani
 */
@Service
public class WorkPackageServiceImpl implements WorkPackageService {
    @Autowired
    private WorkPackageRepository workPackageRepository;

    /**
     * Function to get all work packages
     * @return list of all work packges
     */
    @Override
    public List<WorkPackage> findAll() {
        return workPackageRepository.findAll();
    }

    /**
     * Function to get work package by id
     * @return specific work package by id
     */
    @Override
    public WorkPackage findByewpId(int ewpId){
        return workPackageRepository.findByewpId(ewpId);
    }
}
