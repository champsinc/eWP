package com.champsinc.ewp.service;

import com.champsinc.ewp.model.Section;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

/**
 * Service interface to define work package queries
 * @author Dhiren Chandnani
 */
public interface SectionService {
    List<Section> findByListOfSectionIds(ArrayList<ObjectId> objectIds);
}
