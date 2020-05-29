package com.champsinc.ewp.repository;

import com.champsinc.ewp.model.WorkPackage;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository class to define queries on work package database
 * @author Dhiren C
 */
public interface WorkPackageRepository extends MongoRepository<WorkPackage, String> {
    WorkPackage findByewpId(int ewpId);
}
