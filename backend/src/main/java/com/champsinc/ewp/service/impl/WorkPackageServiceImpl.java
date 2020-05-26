package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.repository.WorkPackageRepository;
import com.champsinc.ewp.service.WorkPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkPackageServiceImpl implements WorkPackageService {
    @Autowired
    private WorkPackageRepository workPackageRepository;

    @Override
    public List<WorkPackage> findAll() {
        return workPackageRepository.findAll();
    }

    @Override
    public WorkPackage findByewpId(int ewpId){
        return workPackageRepository.findByewpId(ewpId);
    }
}
