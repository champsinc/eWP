package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.service.JsonParserService;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Implementation of each function in the service class
 * @author Dhiren Chandnani
 */
@Service
public class JsonParserServiceImpl implements JsonParserService {

    public enum Keywords {
        type,
        editable,
        notes,
        required,
        due_date,
        special_identifier
    }

    public enum Types {
        number,
        date,
        text,
        file,
        checkitem,
        selectitem
    }

    /**
     * Function to check json string for validity
     * @return valid or invalid
     */
    @Override
    public String checkPayload(String payload) {
        JsonObject rootObject = JsonParser.parseString(payload).getAsJsonObject();
        // Check if first key is work package array and no other key exists
        if(rootObject.get("work_package").isJsonArray() && rootObject.size() == 1){
            JsonArray workPackageArray = rootObject.getAsJsonArray("work_package");
            // Parse through each section
            for (JsonElement section : workPackageArray) {
                JsonObject sectionObject = section.getAsJsonObject();
                // Check if its a section and type key exists
                if(checkTypeKey(sectionObject, "section") && sectionObject.size() == 2){
                    String sectionKeyName = getDataKeyName(sectionObject);
                    if(!sectionKeyName.equals("Extra keys")){
                        System.out.println(sectionKeyName);
                        JsonArray subSectionArray = sectionObject.getAsJsonArray(sectionKeyName);
                        // Parse through each subsection
                        for (JsonElement subSection : subSectionArray) {
                            JsonObject subSectionObject = subSection.getAsJsonObject();
                            // Check if its a subsection and type key exists
                            if((checkTypeKey(subSectionObject, "sub_section") && subSectionObject.size() <= 3)) {
                                String subSectionKeyName = getDataKeyName(subSectionObject);
                                if (!subSectionKeyName.equals("Extra keys")) {
                                    System.out.println(subSectionKeyName);
                                    JsonArray subSectionInnerArray = subSectionObject.getAsJsonArray(subSectionKeyName);
                                    // Parse through each subsection inner array
                                    for (JsonElement subSectionInnerElement : subSectionInnerArray) {
                                        JsonObject subSectionInnerObject = subSectionInnerElement.getAsJsonObject();
                                        if(!checkValidTypeValue(subSectionInnerObject.get("type").getAsString())){
                                            return "Type is not valid";
                                        }
                                        if(!checkExtraKeysPresent(subSectionInnerObject)){
                                            return "Extra keys other than valid keys are present";
                                        }
                                        if(!checkOtherKeys(subSectionInnerObject)){
                                            return "Other keys like editable/required etc. are not of valid type";
                                        }
                                        if(!checkDataByType(subSectionInnerObject)){
                                            return "Data is not according to type specified";
                                        }
                                    }
                                }
                                else{
                                    return "Extra keys other than valid keys are present";
                                }
                            }
                            else{
                                return "Either type key not specified in sub-section or extra keys are present";
                            }
                        }
                    }
                    else{
                        return "Extra keys other than valid keys are present";
                    }
                }
                else{
                    return "Either type key not specified in section or extra keys are present";
                }
            }
        }
        else{
            return "No work package key";
        }
        return "Valid";
    }


    private String getDataKeyName(JsonObject object){
        // Get keys of json object and keywords enum
        ArrayList<String> jsonObjectKeys = new ArrayList<>(object.keySet());
        List<String> keywordEnumKeys = Stream.of(Keywords.values()).map(Keywords::name).collect(Collectors.toList());
        jsonObjectKeys.removeAll(keywordEnumKeys);
        if(jsonObjectKeys.size() == 1){
            return jsonObjectKeys.get(0);
        }
        else{
            return "Extra keys";
        }
    }

    private boolean checkTypeKey(JsonObject jsonObject, String type){
        if(jsonObject.has("type")){
            return jsonObject.get("type").getAsString().equals(type);
        }
        else{
            return false;
        }
    }

    private boolean checkValidTypeValue(String type){
        List<String> typeValuesEnum = Stream.of(Types.values()).map(Types::name).collect(Collectors.toList());
        return typeValuesEnum.contains(type);
    }

    private boolean checkExtraKeysPresent(JsonObject jsonObject){
        // Get keys of json object and keywords enum
        ArrayList<String> jsonObjectKeys = new ArrayList<>(jsonObject.keySet());
        List<String> keywordEnumKeys = Stream.of(Keywords.values()).map(Keywords::name).collect(Collectors.toList());
        jsonObjectKeys.removeAll(keywordEnumKeys);
        return jsonObjectKeys.size() == 1;
    }

    private boolean checkOtherKeys(JsonObject jsonObject){
        ArrayList<String> jsonObjectKeys = new ArrayList<>(jsonObject.keySet());
        List<String> keywordEnumKeys = Stream.of(Keywords.values()).map(Keywords::name).collect(Collectors.toList());
        keywordEnumKeys.retainAll(jsonObjectKeys);
        keywordEnumKeys.remove("type");
        keywordEnumKeys.remove("due_date");
        System.out.println("KEYS:"+keywordEnumKeys);
        for (String key: keywordEnumKeys) {
            if(!jsonObject.getAsJsonPrimitive(key).isBoolean()){
                return false;
            }
        }
        return true;
    }

    private boolean checkDataByType(JsonObject jsonObject){
        String typeValue = jsonObject.get("type").getAsString();
        ArrayList<String> jsonObjectKeys = new ArrayList<>(jsonObject.keySet());
        List<String> keywordEnum = Stream.of(Keywords.values()).map(Keywords::name).collect(Collectors.toList());
        jsonObjectKeys.removeAll(keywordEnum);
        System.out.println(jsonObject.get(jsonObjectKeys.get(0)));
        try{
            switch (typeValue)
            {
                case "number": {
                    jsonObject.get(jsonObjectKeys.get(0)).getAsInt();
                    return true;
                }
                case "file": {
                    URL obj = new URL(jsonObject.get(jsonObjectKeys.get(0)).getAsString());
                    obj.toURI();
                    return true;
                }
                case "text":
                case "date": {
                    jsonObject.get(jsonObjectKeys.get(0)).getAsString();
                    return true;
                }
                case "checkitem": {
                    if(jsonObject.get(jsonObjectKeys.get(0)).getAsString().equals("checked") || jsonObject.get(jsonObjectKeys.get(0)).getAsString().equals("unchecked"))
                        return true;
                }
                case "selectitem": {
                    if(jsonObject.get(jsonObjectKeys.get(0)).getAsString().equals("selected") || jsonObject.get(jsonObjectKeys.get(0)).getAsString().equals("not-selected"))
                        return true;
                }
                default:
                    return false;
            }
        } catch(ClassCastException | MalformedURLException | URISyntaxException e){
            return false;
        }
    }
}
