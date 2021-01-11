package com.champsinc.ewp.repository;

import com.champsinc.ewp.model.Section;
import com.champsinc.ewp.model.WorkPackage;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.ArrayList;
import java.util.List;

/**
 * Repository class to define queries on work package database
 * @author Dhiren C
 */
public interface WorkPackageRepository extends MongoRepository<WorkPackage, String> {

    @Query(value = "{'users':?0}", fields = "{'title':1, 'status':1, 'percentageCompleted':1, 'users':1}")
    List<WorkPackage> findByUserId(ObjectId userId);
}
