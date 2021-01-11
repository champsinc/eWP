package com.champsinc.ewp.repository;

import com.champsinc.ewp.model.SubSection;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Repository class to define queries on work package database
 * @author Dhiren C
 */
public interface SubSectionRepository extends MongoRepository<SubSection, String> {
    @Query(value = "{'_id':{$in: ?0}}", fields = "{'name':1, 'dataitems':1}")
    List<SubSection> findByListOfSubSectionIds(ArrayList<ObjectId> objectIds);
}
