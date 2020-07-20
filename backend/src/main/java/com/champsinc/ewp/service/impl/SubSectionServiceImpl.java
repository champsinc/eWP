package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.Section;
import com.champsinc.ewp.model.SubSection;
import com.champsinc.ewp.repository.SubSectionRepository;
import com.champsinc.ewp.service.SubSectionService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of each function in the service class
 * @author Dhiren Chandnani
 */
@Service
public class SubSectionServiceImpl implements SubSectionService {
    @Autowired
    SubSectionRepository subSectionRepository;
    @Autowired
    MongoTemplate mongoTemplate;

    /**
     * Function to get all subsections
     * @return list of all subsections
     */
    @Override
    public List<SubSection> findAll(){
        return subSectionRepository.findAll();
    }

    /**
     * Function to get subsections by list of its ids
     * @return list of subsections by ids
     */
    @Override
    public List<SubSection> findByListOfSubSectionIds(ArrayList<ObjectId> objectIds){
        Query query = new Query(Criteria.where("_id").in(objectIds));
        return mongoTemplate.find(query, SubSection.class, "sub_sections");
    }

    /**
     * Function to get a subsection by id
     * @return specific subsection by id
     */
    @Override
    public SubSection findById(String subSectionId){
        Query query = new Query(Criteria.where("_id").is(subSectionId));
        return mongoTemplate.findOne(query, SubSection.class, "sub_sections");
    }
}
