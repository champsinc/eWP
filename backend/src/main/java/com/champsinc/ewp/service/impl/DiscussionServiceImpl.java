package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.DiscussionItem;
import com.champsinc.ewp.model.WorkPackage;
import com.champsinc.ewp.service.DiscussionService;
import com.champsinc.ewp.util.DiscussionItemDeserializer;
import com.champsinc.ewp.util.GsonZonedDateTimeSerializer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

/**
 * Implementation of each function in the discussion service class
 * @author Dhiren Chandnani
 */
@Service
public class DiscussionServiceImpl implements DiscussionService {

    @Autowired
    MongoTemplate mongoTemplate;

    public String findByWpId(String wpId){
        JsonObject response = new JsonObject();
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(ZonedDateTime.class, new GsonZonedDateTimeSerializer());
        Gson gson = gsonBuilder.setPrettyPrinting().create();
        WorkPackage workPackage = mongoTemplate.findById(wpId, WorkPackage.class, "work_packages");
        if(workPackage != null){
            return gson.toJson(workPackage.getDiscussion());
        }
        else{
            response.addProperty("error", "No such work package exist");
            return gson.toJson(response);
        }
    }

    public JsonObject insertDiscussion(String payload){
        JsonObject response = new JsonObject();
        try {
            JsonObject discussionObject = JsonParser.parseString(payload).getAsJsonObject();
            if(discussionObject.has("type")){
                // Get current time
                ZonedDateTime timestamp = ZonedDateTime.now();
                // Create new discussion item id
                ObjectId discussionId = new ObjectId();
                // Check if work package exists
                WorkPackage workPackage = mongoTemplate.findById(discussionObject.get("wpId").getAsString(), WorkPackage.class, "work_packages");
                if(workPackage != null){
                    DiscussionItemDeserializer discussionItemDeserializer = new DiscussionItemDeserializer();
                    // Create discussion item object from payload json object
                    Object discussionItemObject = discussionItemDeserializer.deserialize(discussionObject, discussionId, timestamp);
                    if(discussionItemObject != null){
                        // Check if its new Discussion item of a work package
                        if(!discussionObject.has("parentDI")){
                            // Add new discussion item to work package at the end
                            workPackage.getDiscussion().add(discussionItemObject);
                        }
                        // Check if a discussion item needs to added to a new thread
                        else {
                            DiscussionItem parentDiscussionItem = mongoTemplate.findById(discussionObject.get("parentDI").getAsString(), DiscussionItem.class, "discussion_items");
                            if(parentDiscussionItem != null){
                                workPackage.getDiscussion().remove(parentDiscussionItem);
                                parentDiscussionItem.getThreads().add(discussionItemObject);
                                workPackage.getDiscussion().add(parentDiscussionItem);
                                mongoTemplate.save(parentDiscussionItem, "discussion_items");
                            }
                            else{
                                response.addProperty("error", "No such parent discussion item exists");
                                return response;
                            }
                        }
                        // Common
                        mongoTemplate.save(discussionItemObject, "discussion_items");
                        mongoTemplate.save(workPackage, "work_packages");
                        response.addProperty("Success", discussionId.toString());
                    }
                    else{
                        response.addProperty("error", "Not able to convert to type specified");
                    }
                }
                else{
                    response.addProperty("error", "Invalid work package id");
                }
            }
            else{
                response.addProperty("error", "No type specified");
            }
            return response;
        }
        catch (Exception e){
            e.printStackTrace();
            response.addProperty("error", "exception has occurred in insert discussion");
            return response;
        }
    }
}
