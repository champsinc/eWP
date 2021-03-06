package com.champsinc.ewp.util;

import com.champsinc.ewp.model.FileDiscussion;
import com.champsinc.ewp.model.LogDiscussion;
import com.champsinc.ewp.model.RequestDiscussion;
import com.champsinc.ewp.model.TextDiscussion;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.bson.types.ObjectId;

import java.time.ZonedDateTime;
import java.util.ArrayList;

public class DiscussionItemDeserializer {
    Gson gson;
    ObjectId id;

    public DiscussionItemDeserializer(){
        this.gson = new GsonBuilder().setPrettyPrinting().create();
        this.id = new ObjectId();
    }

    public Object deserialize(JsonObject discussionItemObject, ObjectId discussionId, ZonedDateTime timestamp){
        if(discussionItemObject.has("type")){
            String type = discussionItemObject.get("type").getAsString();
            switch (type) {
                case "log":
                {
                    LogDiscussion logDiscussion = gson.fromJson(discussionItemObject, LogDiscussion.class);
                    logDiscussion.setId(discussionId.toString());
                    logDiscussion.setTimestamp(timestamp);
                    if(!discussionItemObject.has("threads") && !(discussionItemObject.has("parentDI"))){
                        logDiscussion.setThreads(new ArrayList<>());
                    }
                    return logDiscussion;
                }
                case "request":
                {
                    RequestDiscussion requestDiscussion = gson.fromJson(discussionItemObject, RequestDiscussion.class);
                    requestDiscussion.setId(discussionId.toString());
                    requestDiscussion.setTimestamp(timestamp);
                    if(!discussionItemObject.has("threads") && !(discussionItemObject.has("parentDI"))){
                        requestDiscussion.setThreads(new ArrayList<>());
                    }
                    return requestDiscussion;
                }
                case "text":
                {
                    TextDiscussion textDiscussion = gson.fromJson(discussionItemObject, TextDiscussion.class);
                    textDiscussion.setId(discussionId.toString());
                    textDiscussion.setTimestamp(timestamp);
                    if(!discussionItemObject.has("threads") && !(discussionItemObject.has("parentDI"))){
                        textDiscussion.setThreads(new ArrayList<>());
                    }
                    return textDiscussion;
                }
                case "file":
                {
                    FileDiscussion fileDiscussion = gson.fromJson(discussionItemObject, FileDiscussion.class);
                    fileDiscussion.setId(discussionId.toString());
                    fileDiscussion.setTimestamp(timestamp);
                    if(!discussionItemObject.has("threads") && !(discussionItemObject.has("parentDI"))){
                        fileDiscussion.setThreads(new ArrayList<>());
                    }
                    return fileDiscussion;
                }
            }
        }
        return null;
    }
}
