package com.champsinc.ewp.util;

import com.champsinc.ewp.model.data.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

public class DataItemDeserializer {

    Gson gson;

    public DataItemDeserializer(){
        this.gson = new GsonBuilder().setPrettyPrinting().create();
    }

    public Object deserialize(JsonObject dataItemObject){
        if(dataItemObject.has("type")){
            String type = dataItemObject.get("type").getAsString();
            switch (type) {
                case "text":
                {
                    return gson.fromJson(dataItemObject, TextType.class);
                }
                case "number":
                {
                    return gson.fromJson(dataItemObject, NumberType.class);
                }
                case "date":
                {
                    return gson.fromJson(dataItemObject, DateType.class);
                }
                case "file":
                {
                    return gson.fromJson(dataItemObject, FileType.class);
                }
                case "checkbox":
                {
                    return gson.fromJson(dataItemObject, CheckboxType.class);
                }
                case "selectitem":
                {
                    return gson.fromJson(dataItemObject, SelectboxType.class);
                }
            }
        }
        return null;
    }
}
