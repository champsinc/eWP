package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.service.JsonParserService;
import com.champsinc.ewp.util.JsonParserUtils;
import com.champsinc.ewp.util.JsonParserUtils.*;

import com.google.gson.*;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Implementation of each function in the service class
 * @author Dhiren Chandnani
 */
@Service
public class JsonParserServiceImpl implements JsonParserService {

    /**
     * Function to check json string for validity
     * @return valid or invalid
     */
    @Override
    public JsonObject checkPayload(String payload) {
        JsonObject responseJSON = new JsonObject();
        JsonObject locationJSON = new JsonObject();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        try {
            JsonObject rootObject = JsonParser.parseString(payload).getAsJsonObject();
            // Check if first key is work package array and no other key exists
            if (rootObject.get("work_package").isJsonArray() && rootObject.size() == 1) {
                JsonArray workPackageArray = rootObject.getAsJsonArray("work_package");
                // Parse through each section
                for (JsonElement section : workPackageArray) {
                    JsonObject sectionObject = section.getAsJsonObject();
                    // Check if its a section and type key exists
                    if (checkTypeKey(sectionObject, "section") && sectionObject.size() == 2) {
                        String sectionKeyName = getDataKeyName(sectionObject);
                        if (!sectionKeyName.equals(JsonParserUtils.EXTRA_KEYS)) {
                            JsonArray subSectionArray = sectionObject.getAsJsonArray(sectionKeyName);
                            // Parse through each subsection
                            for (JsonElement subSection : subSectionArray) {
                                JsonObject subSectionObject = subSection.getAsJsonObject();
                                // Check if its a subsection and type key exists
                                if ((checkTypeKey(subSectionObject, "sub_section") && subSectionObject.size() <= 3)) {
                                    String subSectionKeyName = getDataKeyName(subSectionObject);
                                    if (!subSectionKeyName.equals(JsonParserUtils.EXTRA_KEYS)) {
                                        JsonArray subSectionInnerArray = subSectionObject.getAsJsonArray(subSectionKeyName);
                                        // Parse through each subsection inner array
                                        for (JsonElement subSectionInnerElement : subSectionInnerArray) {
                                            JsonObject subSectionInnerObject = subSectionInnerElement.getAsJsonObject();
                                            if (!checkValidTypeValue(subSectionInnerObject.get("type").getAsString())) {
                                                responseJSON.addProperty("error", JsonParserUtils.NOT_VALID_TYPE);
                                                locationJSON.addProperty("sub_section", subSectionKeyName);
                                                locationJSON.addProperty("section", sectionKeyName);
                                                responseJSON.add("location", gson.toJsonTree(locationJSON));
                                                return responseJSON;
                                            }
                                            if (!checkExtraKeysPresent(subSectionInnerObject)) {
                                                responseJSON.addProperty("error", JsonParserUtils.EXTRA_KEYS_INNER);
                                                locationJSON.addProperty("sub_section", subSectionKeyName);
                                                locationJSON.addProperty("section", sectionKeyName);
                                                responseJSON.add("location", gson.toJsonTree(locationJSON));
                                                return responseJSON;
                                            }
                                            if (!checkOtherKeys(subSectionInnerObject)) {
                                                responseJSON.addProperty("error", JsonParserUtils.OTHER_KEYS_NOT_VALID);
                                                locationJSON.addProperty("sub_section", subSectionKeyName);
                                                locationJSON.addProperty("section", sectionKeyName);
                                                responseJSON.add("location", gson.toJsonTree(locationJSON));
                                                return responseJSON;
                                            }
                                            if (!checkDataByType(subSectionInnerObject)) {
                                                responseJSON.addProperty("error", JsonParserUtils.DATA_TYPE_INVALID);
                                                locationJSON.addProperty("sub_section", subSectionKeyName);
                                                locationJSON.addProperty("section", sectionKeyName);
                                                responseJSON.add("location", gson.toJsonTree(locationJSON));
                                                return responseJSON;
                                            }
                                        }
                                    } else {
                                        responseJSON.addProperty("error", JsonParserUtils.EXTRA_KEYS_SUB_SECTION);
                                        locationJSON.addProperty("sub_section", subSectionKeyName);
                                        locationJSON.addProperty("section", sectionKeyName);
                                        responseJSON.add("location", gson.toJsonTree(locationJSON));
                                        return responseJSON;
                                    }
                                } else {
                                    responseJSON.addProperty("error", JsonParserUtils.NO_TYPE_KEY_SUB_SECTION);
                                    locationJSON.addProperty("section", sectionKeyName);
                                    responseJSON.add("location", gson.toJsonTree(locationJSON));
                                    return responseJSON;
                                }
                            }
                        } else {
                            responseJSON.addProperty("error", JsonParserUtils.EXTRA_KEYS_SECTION);
                            locationJSON.addProperty("section", sectionKeyName);
                            responseJSON.add("location", gson.toJsonTree(locationJSON));
                            return responseJSON;
                        }
                    } else {
                        responseJSON.addProperty("error", JsonParserUtils.NO_TYPE_KEY_SECTION);
                        locationJSON.addProperty("section", getDataKeyName(sectionObject));
                        responseJSON.add("location", gson.toJsonTree(locationJSON));
                        return responseJSON;
                    }
                }
            } else {
                responseJSON.addProperty("error", JsonParserUtils.NO_WORK_PCKG_KEY);
                responseJSON.addProperty("location", "Root node");
                return responseJSON;
            }
            responseJSON.addProperty("Success", JsonParserUtils.VALID_JSON);
            return responseJSON;
        } catch (Exception e){
            responseJSON.addProperty("error", JsonParserUtils.EXCEPTION_MESSAGE);
            responseJSON.addProperty("message", e.getMessage());
            return responseJSON;
        }
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
            return JsonParserUtils.EXTRA_KEYS;
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
        if(keywordEnumKeys.size()>0){
            for (String key: keywordEnumKeys) {
                if(key.equals("due_date")){
                    return checkDate(jsonObject.get(key).getAsString());
                }
                if(!jsonObject.getAsJsonPrimitive(key).isBoolean()){
                    return false;
                }
            }
        }
        return true;
    }

    private boolean checkDate(String dateStr) {
        SimpleDateFormat dateFormatter = new SimpleDateFormat("MM/dd/yyyy");
        Date checkDate;
        try {
            checkDate = dateFormatter.parse(dateStr);
        } catch(ParseException pe){
            return false;
        }
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(checkDate);
        int year = calendar.get(Calendar.YEAR);
        return year > 2000;
    }

    private boolean checkDataByType(JsonObject jsonObject){
        String typeValue = jsonObject.get("type").getAsString();
        ArrayList<String> jsonObjectKeys = new ArrayList<>(jsonObject.keySet());
        List<String> keywordEnum = Stream.of(Keywords.values()).map(Keywords::name).collect(Collectors.toList());
        jsonObjectKeys.removeAll(keywordEnum);
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
                case "text": {
                    jsonObject.get(jsonObjectKeys.get(0)).getAsString();
                    return true;
                }
                case "date": {
                    return checkDate(jsonObject.get(jsonObjectKeys.get(0)).getAsString());
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
