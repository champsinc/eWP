package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.Section;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.repository.SectionRepository;
import com.champsinc.ewp.repository.WorkPackageRepository;
import com.champsinc.ewp.service.SectionService;
import com.champsinc.ewp.service.WorkPackageService;
import com.google.gson.JsonObject;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Implementation of each function in the service class
 * @author Dhiren Chandnani
 */
@Service
public class SectionServiceImpl implements SectionService {
    @Autowired
    SectionRepository sectionRepository;

    /**
     * Function to get work package by id
     * @return specific work package by id
     */
    @Override
    public List<Section> findByListOfSectionIds(ArrayList<ObjectId> objectIds){
        /*
        System.out.println(objectIds.toString());
        Query query = new Query(Criteria.where("_id").in(objectIds));
        query.fields().include("name");
        System.out.println(query.toString());
        return mongoTemplate.find(query, Section.class);
        */
        return sectionRepository.findByListOfSectionIds(objectIds);
    }

}
