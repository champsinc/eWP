package com.champsinc.ewp.repository;

import com.champsinc.ewp.model.SubSection;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository class to define queries on work package database
 * @author Dhiren C
 */
public interface SubSectionRepository extends MongoRepository<SubSection, String> {

}
