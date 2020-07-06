package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.Section;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.repository.SectionRepository;
import com.champsinc.ewp.repository.WorkPackageRepository;
import com.champsinc.ewp.service.SectionService;
import com.champsinc.ewp.service.WorkPackageService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Implementation of each function in the service class
 * @author Dhiren Chandnani
 */
@Service
public class WorkPackageServiceImpl implements WorkPackageService {
    @Autowired
    private WorkPackageRepository workPackageRepository;
    @Autowired
    private SectionService sectionService;

    /**
     * Function to get work package by id
     * @return specific work package by id
     */
    @Override
    public String findById(String id){
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        Optional<WorkPackage> checkWorkPackage = workPackageRepository.findById(id);
        if(checkWorkPackage.isPresent()){
            WorkPackage workPackage = checkWorkPackage.get();
            ArrayList<ObjectId> sectionIds = workPackage.getSections();
            List<Section> allSections = sectionService.findByListOfSectionIds(sectionIds);
            return gson.toJson(allSections);
        }
        else{
            JsonObject response = new JsonObject();
            response.addProperty("Error", "Unable to find work package");
            return gson.toJson(response);
        }
    }

    /**
     * Function to get all work packages
     * @return specific work package by id
     */
    @Override
    public List<WorkPackage> findAll(){
        return workPackageRepository.findAll();
    }
}
