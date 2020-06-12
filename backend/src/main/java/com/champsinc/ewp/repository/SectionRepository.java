package com.champsinc.ewp.repository;

import com.champsinc.ewp.model.Section;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.ArrayList;
import java.util.List;

/**
 * Repository class to define queries on work package database
 * @author Dhiren C
 */
public interface SectionRepository extends MongoRepository<Section, String> {

    @Query(value = "{'_id':{$in: ?0}}", fields = "{'name':1}")
    List<Section> findByListOfSectionIds(ArrayList<ObjectId> objectIds);
}
