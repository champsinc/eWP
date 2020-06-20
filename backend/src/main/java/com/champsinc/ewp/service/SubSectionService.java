package com.champsinc.ewp.service;

import com.champsinc.ewp.model.SubSection;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

/**
 * Service interface to define work package queries
 * @author Dhiren Chandnani
 */
public interface SubSectionService {
    List<SubSection> findAll();
    List<SubSection> findByListOfSubSectionIds(ArrayList<ObjectId> objectIds);
}
