package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.DiscussionThread;
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
import java.util.ArrayList;

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
                        // Add discussion item to new thread
                        if(discussionObject.get("firstThread").getAsBoolean()){
                            // If its new thread value of thread attribute will be the parent discussion item
                            Object discussionItem = mongoTemplate.findById(discussionObject.get("thread").getAsString(), Object.class, "discussion_items");
                            if(discussionItem != null){
                                DiscussionThread discussionThread = new DiscussionThread();
                                ArrayList<Object> discussionThreadList = new ArrayList<>();
                                // Add parent DI
                                discussionThreadList.add(discussionItem);
                                // Add new DI
                                discussionThreadList.add(discussionItemObject);
                                discussionThread.setDiscussions(discussionThreadList);
                                discussionThread.setLastUpdated(timestamp);
                                // Remove parent DI from work package
                                workPackage.getDiscussion().remove(discussionItem);
                                // Add thread to work package at the end
                                workPackage.getDiscussion().add(discussionThread);
                                mongoTemplate.save(discussionThread, "threads");
                            }
                            else{
                                response.addProperty("error", "No such discussion item exists");
                                return response;
                            }
                        }
                        // Add discussion item to already existing thread
                        else{
                            // If thread already exist, value of thread attribute will be the thread id
                            DiscussionThread discussionThread = mongoTemplate.findById(discussionObject.get("thread").getAsString(), DiscussionThread.class, "threads");
                            if(discussionThread != null){
                                // Remove thread object from the work package
                                workPackage.getDiscussion().remove(discussionThread);
                                // Append it at the end
                                workPackage.getDiscussion().add(discussionThread);
                                // Add new DI to existing thread object
                                discussionThread.getDiscussions().add(discussionItemObject);
                                discussionThread.setLastUpdated(timestamp);
                                mongoTemplate.save(discussionThread, "threads");
                            }
                            else{
                                response.addProperty("error", "No such discussion thread exists");
                                return response;
                            }
                        }
                        // If its the first data item in a work package no thread or firstthread attribute should be present
                        if(!discussionObject.has("thread") && !discussionObject.has("firstThread")){
                            workPackage.getDiscussion().add(discussionItemObject);
                        }
                        else{
                            response.addProperty("error", "Discussion thread has either thread or first thread missing");
                            return response;
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
