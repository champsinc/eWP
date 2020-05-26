package com.champsinc.ewp.service;

import com.champsinc.ewp.model.WorkPackage;

import java.util.List;

public interface WorkPackageService {
    List<WorkPackage> findAll();
    WorkPackage findByewpId(int ewpId);
}
