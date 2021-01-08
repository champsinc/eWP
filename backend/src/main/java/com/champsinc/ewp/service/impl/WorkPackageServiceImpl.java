package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.Section;
import com.champsinc.ewp.model.User;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.repository.WorkPackageRepository;
import com.champsinc.ewp.service.SectionService;
import com.champsinc.ewp.service.UserService;
import com.champsinc.ewp.service.WorkPackageService;
import com.champsinc.ewp.util.JsonParserUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

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
    @Autowired
    private UserService userService;

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
            JsonArray responseDataArray = new JsonArray();
            ArrayList<ObjectId> sectionIds = workPackage.getSections();
            List<Section> allSections = sectionService.findByListOfSectionIds(sectionIds);
            JsonObject responseJson = new JsonObject();
            for(Section section: allSections){
                JsonObject sectionObject = JsonParser.parseString(gson.toJson(section)).getAsJsonObject();
                String subSectionData = sectionService.findSubSectionBySectionId(section.getId());
                JsonArray subSectionObject = JsonParser.parseString(subSectionData).getAsJsonArray();
                sectionObject.add("section_data", subSectionObject);
                responseDataArray.add(sectionObject);
            }
            responseJson.add("all_data", responseDataArray);
            ArrayList<ObjectId> userIds = workPackage.getUsers();
            JsonArray responseUserArray = new JsonArray();
            for(ObjectId userId : userIds){
                User user = userService.findUserById(userId.toString());
                if(user != null){
                    JsonObject userObject = new JsonObject();
                    userObject.addProperty("name", user.getName());
                    userObject.addProperty("role", user.getRole());
                    responseUserArray.add(userObject);
                }
            }
            responseJson.add("user_data", responseUserArray);
            return gson.toJson(responseJson);
        }
        else{
            JsonObject response = new JsonObject();
            response.addProperty("Error", "Unable to find work package");
            return gson.toJson(response);
        }
    }

    /**
     * Function to get change work package status
     * @return specific work package by id
     */
    @Override
    public String changeWorkPackageStatus(String statusDetails){
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonObject responseJSON = new JsonObject();
        JsonObject requestJson = gson.fromJson(statusDetails, JsonObject.class);
//        try{
            String ewpId = requestJson.get("ewpId").getAsString();
            Optional<WorkPackage> checkWorkPackage = workPackageRepository.findById(ewpId);
            if(checkWorkPackage.isPresent()) {
                WorkPackage workPackage = checkWorkPackage.get();
                if(workPackage.getStatus() != 2){
//                    workPackage.setStatus(2);
//                    workPackageRepository.save(workPackage);
//                    String url = "https://ewpackage.gq/send_to_champs.php";
                    String url = "http://localhost/champs/send_to_champs.php";

                    // web client
                    WebClient webClient = WebClient.create(url);
                    MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
                    formData.add("data", findById(ewpId));
                    formData.add("email", requestJson.get("email").getAsString());
                    String sendRequest = webClient.post()
                            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                            .body(BodyInserters.fromFormData(formData))
                            .exchange()
                            .block()
                            .bodyToMono(String.class)
                            .block();
                    System.out.println(sendRequest);
                    return "Success1";
                }
                else{
                    return "Status is already completed";
                }
            }
            return "No such work package";
//        } catch (Exception e){
//            responseJSON.addProperty("error", "Invalid json");
//            return gson.toJson(responseJSON);
//        }
    }

    /**
     * Function to change work package percentage
     * @return update on success or failure
     */
    @Override
    public String changeWorkPackagePercentage(String percentageDetails){
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonObject responseJSON = new JsonObject();
        JsonObject requestJson = gson.fromJson(percentageDetails, JsonObject.class);
        try{
            int percentValue = requestJson.get("percent").getAsInt();
            if(percentValue >= 0 && percentValue <= 100){
                String workPackageId = requestJson.get("id").getAsString();
                Optional<WorkPackage> optDbWorkPackage = workPackageRepository.findById(workPackageId);
                if(optDbWorkPackage.isPresent()){
                    WorkPackage dbWorkPackage = optDbWorkPackage.get();
                    dbWorkPackage.setPercentageCompleted(percentValue);
                    workPackageRepository.save(dbWorkPackage);
                    responseJSON.addProperty("success", "Percentage value updated successfully");
                }
                else{
                    responseJSON.addProperty("error", "No such work package present");
                }
            }
            else{
                responseJSON.addProperty("error", "Percentage value not between 0 and 100");
            }
            return gson.toJson(responseJSON);
        } catch (Exception e){
            responseJSON.addProperty("error", "Invalid json");
            return gson.toJson(responseJSON);
        }
    }
}
