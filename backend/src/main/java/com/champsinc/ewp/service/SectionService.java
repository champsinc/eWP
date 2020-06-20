package com.champsinc.ewp.service;

import com.champsinc.ewp.model.Section;
import com.champsinc.ewp.model.SubSection;
import com.google.gson.JsonObject;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

/**
 * Service interface to define work package queries
 * @author Dhiren Chandnani
 */
public interface SectionService {
    List<Section> findByListOfSectionIds(ArrayList<ObjectId> objectIds);
    List<Section> findAll();
    String findSubSectionBySectionId(String sectionId);
    JsonObject updateSectionSubSections(String payload);
}
