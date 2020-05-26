package com.champsinc.ewp.repository;

import com.champsinc.ewp.model.WorkPackage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkPackageRepository extends MongoRepository<WorkPackage, String> {
    WorkPackage findByewpId(int ewpId);
}
