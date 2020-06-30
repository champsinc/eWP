package com.champsinc.ewp.repository;

import com.champsinc.ewp.model.DataItem;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository class to define queries on work package database
 * @author Dhiren C
 */
public interface DataItemRepository extends MongoRepository<DataItem, String> {

}
