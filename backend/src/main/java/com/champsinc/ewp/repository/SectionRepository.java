package com.champsinc.ewp.repository;

import com.champsinc.ewp.model.Section;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository class to define queries on work package database
 * @author Dhiren C
 */
public interface SectionRepository extends MongoRepository<Section, String> {

}
