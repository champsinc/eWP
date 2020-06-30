package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.*;
import com.champsinc.ewp.repository.DataItemRepository;
import com.champsinc.ewp.repository.SectionRepository;
import com.champsinc.ewp.repository.SubSectionRepository;
import com.champsinc.ewp.repository.WorkPackageRepository;
import com.champsinc.ewp.service.SectionService;
import com.champsinc.ewp.service.SubSectionService;
import com.champsinc.ewp.service.WorkPackageService;
import com.champsinc.ewp.util.JsonParserUtils;
import com.google.gson.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
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
    @Autowired
    SubSectionService subSectionService;
    @Autowired
    JsonParserServiceImpl jsonParserService;
    @Autowired
    DataItemRepository dataItemRepository;

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

    /**
     * Function to get all work packages
     * @return specific work package by id
     */
    @Override
    public List<Section> findAll(){
        return sectionRepository.findAll();
    }

    /**
     * Function to get all work packages
     * @return specific work package by id
     */
    @Override
    public String findSubSectionBySectionId(String sectionId){
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        Optional<Section> checkSection =  sectionRepository.findById(sectionId);
        if(checkSection.isPresent()){
            Section section = checkSection.get();
            ArrayList<ObjectId> subSectionIds = section.getValue();
            List<SubSection> allSubSections = subSectionService.findByListOfSubSectionIds(subSectionIds);
            return gson.toJson(allSubSections);
        }
        else{
            JsonObject response = new JsonObject();
            response.addProperty("Error", "Unable to find section");
            return gson.toJson(response);
        }
    }

    /**
     * Function to get all work packages
     * @return specific work package by id
     */
    @Override
    public JsonObject updateSectionSubSections(String payload){
        JsonObject response = new JsonObject();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        ArrayList<DataItem> allDataItems = new ArrayList<>();
        try {
            JsonObject rootObject = JsonParser.parseString(payload).getAsJsonObject();
            if (rootObject.has("sectionId")) {
                String sectionId = rootObject.get("sectionId").getAsString();
                Optional<Section> section = sectionRepository.findById(sectionId);
                if (section.isPresent()) {
                    if (rootObject.has("sub_sections")) {
                        JsonArray subSectionArray = rootObject.getAsJsonArray("sub_sections");
                        for (JsonElement subSection : subSectionArray) {
                            JsonObject subSectionObject = subSection.getAsJsonObject();
                            String subSectionId = subSectionObject.get("id").getAsString();
                            if (subSectionService.findById(subSectionId).isPresent()) {
                                JsonArray dataItemArray = subSectionObject.getAsJsonArray("value");
                                // Parse through each subsection inner array
                                for (JsonElement dataItemElement : dataItemArray) {
                                    JsonObject dataItemObject = dataItemElement.getAsJsonObject();
                                    Optional<DataItem> dataItemFromDB = dataItemRepository.findById(dataItemObject.get("id").getAsString());
                                    if(dataItemFromDB.isPresent()) {
                                        DataItem dataItemFromJson = gson.fromJson(dataItemObject, DataItem.class);
                                        allDataItems.add(dataItemFromJson);
                                    }
                                    else{
                                        response.addProperty("Error", "No such data item exists");
                                    }
                                }
                            } else {
                                response.addProperty("Error", "No such subsection exists");
                            }
                        }
                        updateDataItem(allDataItems);
                        response.addProperty("Success", "Data items updated successfully");
                    } else {
                        response.addProperty("error", "No such section exists");
                    }
                } else {
                    response.addProperty("error", "No such section exists");
                }
            } else {
                response.addProperty("error", "No Section id key present");
            }
            return response;
        }
        catch (Exception e){
            e.printStackTrace();
            StackTraceElement[] elements = e.getStackTrace();
            response.addProperty("error", "exception has occurred");
            response.addProperty("message", gson.toJson(elements));
            return response;
        }
    }

    private void updateDataItem(ArrayList<DataItem> allDataItems){
        for (DataItem dataItem : allDataItems) {
            //dataItemRepository.save(dataItem);
            System.out.println(dataItem);
        }
    }

}
