package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.Section;
import com.champsinc.ewp.model.SubSection;
import com.champsinc.ewp.model.DataItem;
import com.champsinc.ewp.repository.DataItemRepository;
import com.champsinc.ewp.repository.SectionRepository;
import com.champsinc.ewp.repository.SubSectionRepository;
import com.champsinc.ewp.service.JsonParserService;
import com.champsinc.ewp.util.JsonParserUtils;
import com.champsinc.ewp.util.JsonParserUtils.*;

import com.google.gson.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLConnection;
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
    @Autowired
    private SectionRepository sectionRepository;
    @Autowired
    private SubSectionRepository subSectionRepository;
    @Autowired
    private DataItemRepository dataItemRepository;
    /**
     * Function to check json string for validity
     * @return valid or invalid
     */
    @Override
    public JsonObject checkPayload(String payload) {
        JsonObject responseJSON = new JsonObject();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try {
            // Keep track of all section objects
            ArrayList<Section> allSections = new ArrayList<>();
            // Keep track of all section objects
            ArrayList<SubSection> allSubSections = new ArrayList<>();
            // Keep track of all dataItem objects
            ArrayList<DataItem> allDataItems = new ArrayList<>();
            JsonObject rootObject = JsonParser.parseString(payload).getAsJsonObject();
            // Check if first key is work package array and no other key exists
            if (rootObject.get(JsonParserUtils.KEYWORD_WORK_PKG).isJsonArray() && rootObject.size() == 1) {
                JsonArray workPackageArray = rootObject.getAsJsonArray(JsonParserUtils.KEYWORD_WORK_PKG);
                // Parse through each section
                for (JsonElement section : workPackageArray) {
                    JsonObject sectionObject = section.getAsJsonObject();
                    // Create section model
                    Section sectionModel = createSectionModel();
                    // Validate section
                    ArrayList<String> checkSection = checkSection(sectionObject);
                    if(checkSection.size() == 2){
                        String sectionKeyName = checkSection.get(1);
                        // Add key(section name) to section model
                        sectionModel.setName(sectionKeyName);
                        JsonArray subSectionArray = sectionObject.getAsJsonArray(sectionKeyName);
                        // Parse through each subsection
                        for (JsonElement subSection : subSectionArray) {
                            JsonObject subSectionObject = subSection.getAsJsonObject();
                            ArrayList<String> checkSubSection = checkSubSection(subSectionObject, sectionKeyName);
                            // Create section values object
                            SubSection subSectionModel = createSubSectionModel(getDataKeyName(subSectionObject));
                            if(checkSubSection.size() == 2){
                                JsonArray subSectionInnerArray = subSectionObject.getAsJsonArray(checkSubSection.get(1));
                                // Parse through each subsection inner array
                                for (JsonElement dataItemElement : subSectionInnerArray) {
                                    JsonObject dataItemObject = dataItemElement.getAsJsonObject();
                                    JsonObject checkDataItem = checkDataItem(dataItemObject, sectionKeyName, checkSubSection.get(1));
                                    if(checkDataItem.has(JsonParserUtils.KEYWORD_ERROR)){
                                        return checkDataItem;
                                    }
                                    // Create sub section model
                                    DataItem dataItemModel = createDataItemModel(dataItemElement);
                                    allDataItems.add(dataItemModel);
                                    subSectionModel.getValue().add(new ObjectId(dataItemModel.getId()));
                                }
                            }
                            else{
                                return sendResponse(checkSubSection.get(2), null, checkSubSection.get(1));
                            }
                            allSubSections.add(subSectionModel);
                            sectionModel.getValue().add(new ObjectId(subSectionModel.getId()));
                        }
                    }
                    else {
                        return sendResponse(checkSection.get(2), null, checkSection.get(1));
                    }
                    allSections.add(sectionModel);
                }
            } else {
                return sendResponse(JsonParserUtils.NO_WORK_PKG_KEY, null, null);
            }
            insertIntoDB(allDataItems, allSubSections, allSections);
            responseJSON.addProperty("Success", JsonParserUtils.VALID_JSON);
            return responseJSON;
        } catch (Exception e){
            StackTraceElement[] elements = e.getStackTrace();
            responseJSON.addProperty(JsonParserUtils.KEYWORD_ERROR, JsonParserUtils.EXCEPTION_MESSAGE);
            responseJSON.addProperty("message", gson.toJson(elements));
            return responseJSON;
        }
    }

    private DataItem createDataItemModel(JsonElement subSectionInnerElement){
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonObject subSectionInnerObject = subSectionInnerElement.getAsJsonObject();
        String subSectionDataKeyName = getDataKeyName(subSectionInnerObject);
        ObjectId dataItemId = new ObjectId();
        DataItem dataItemModel = gson.fromJson(subSectionInnerElement, DataItem.class);
        dataItemModel.setId(dataItemId.toString());
        dataItemModel.setName(subSectionDataKeyName);
        dataItemModel.setValue(subSectionInnerObject.get(subSectionDataKeyName).getAsString());
        return dataItemModel;
    }

    private SubSection createSubSectionModel(String subSectionName){
        SubSection subSectionModel = new SubSection();
        subSectionModel.setName(subSectionName);
        subSectionModel.setId(new ObjectId().toString());
        subSectionModel.setValue(new ArrayList<>());
        return subSectionModel;
    }

    private Section createSectionModel(){
        Section sectionModel = new Section();
        sectionModel.setId(new ObjectId().toString());
        sectionModel.setValue(new ArrayList<>());
        return sectionModel;
    }

    private void insertIntoDB(ArrayList<DataItem> allDataItems, ArrayList<SubSection> allSubSections, ArrayList<Section> allSections){
        for (DataItem dataItem : allDataItems) {
            dataItemRepository.save(dataItem);
        }
        for(SubSection subSection: allSubSections){
            subSectionRepository.save(subSection);
        }
        for (Section section: allSections) {
            sectionRepository.save(section);
        }
    }

    private JsonObject checkDataItem(JsonObject dataItemObject, String sectionKeyName, String subSectionKeyName){
        JsonObject subSectionInnerResponse = new JsonObject();
        if(!checkValidTypeValue(dataItemObject.get(JsonParserUtils.KEYWORD_TYPE).getAsString()))
            return sendResponse(JsonParserUtils.NOT_VALID_TYPE, subSectionKeyName, sectionKeyName);
        if(!checkExtraKeysPresent(dataItemObject))
            return sendResponse(JsonParserUtils.EXTRA_KEYS_INNER, subSectionKeyName, sectionKeyName);
        if (!checkOtherKeys(dataItemObject))
            return sendResponse(JsonParserUtils.OTHER_KEYS_NOT_VALID, subSectionKeyName, sectionKeyName);
        if (!checkDataByType(dataItemObject))
            return sendResponse(JsonParserUtils.DATA_TYPE_INVALID, subSectionKeyName, sectionKeyName);
        return subSectionInnerResponse;
    }

    private ArrayList<String> checkSection(JsonObject sectionObject){
        ArrayList<String> responseList = new ArrayList<>();
        // Check if its a section and type key exists
        if (checkTypeKey(sectionObject, JsonParserUtils.KEYWORD_SECTION) && sectionObject.size() == 2) {
            String sectionKeyName = getDataKeyName(sectionObject);
            if (!sectionKeyName.equals(JsonParserUtils.EXTRA_KEYS)) {
                responseList.add(JsonParserUtils.KEYWORD_TRUE);
                responseList.add(sectionKeyName);
            }
            else{
                responseList.add(JsonParserUtils.KEYWORD_FALSE);
                responseList.add(sectionKeyName);
                responseList.add(JsonParserUtils.EXTRA_KEYS_SECTION);
            }
        }
        else{
            responseList.add(JsonParserUtils.KEYWORD_FALSE);
            responseList.add(getDataKeyName(sectionObject));
            responseList.add(JsonParserUtils.NO_TYPE_KEY_SECTION);
        }
        return responseList;
    }

    private JsonObject sendResponse(String error, String subSection, String section){
        JsonObject responseJSON = new JsonObject();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        if(section == null && subSection == null){
            responseJSON.addProperty(JsonParserUtils.KEYWORD_ERROR, error);
            responseJSON.addProperty(JsonParserUtils.KEYWORD_LOCATION, JsonParserUtils.KEYWORD_ROOT_NODE);
        }
        else{
            JsonObject locationJSON = new JsonObject();
            responseJSON.addProperty(JsonParserUtils.KEYWORD_ERROR, error);
            locationJSON.addProperty(JsonParserUtils.KEYWORD_SUB_SECTION, subSection);
            locationJSON.addProperty(JsonParserUtils.KEYWORD_SECTION, section);
            responseJSON.add(JsonParserUtils.KEYWORD_LOCATION, gson.toJsonTree(locationJSON));
        }
        return responseJSON;
    }

    private ArrayList<String> checkSubSection(JsonObject subSectionObject, String sectionKeyName){
        ArrayList<String> responseList = new ArrayList<>();
        // Check if its a section and type key exists
        if (checkTypeKey(subSectionObject, JsonParserUtils.KEYWORD_SUB_SECTION) && subSectionObject.size() <= 3) {
            String subSectionKeyName = getDataKeyName(subSectionObject);
            if (!subSectionKeyName.equals(JsonParserUtils.EXTRA_KEYS) && checkSpecialIdentifier(subSectionObject)) {
                responseList.add(JsonParserUtils.KEYWORD_TRUE);
                responseList.add(subSectionKeyName);
            }
            else{
                responseList.add(JsonParserUtils.KEYWORD_FALSE);
                responseList.add(subSectionKeyName);
                responseList.add(JsonParserUtils.EXTRA_KEYS_SUB_SECTION);
            }
        }
        else{
            responseList.add(JsonParserUtils.KEYWORD_FALSE);
            responseList.add(sectionKeyName);
            responseList.add(JsonParserUtils.NO_TYPE_KEY_SUB_SECTION);
        }
        return responseList;
    }

    private boolean checkSpecialIdentifier(JsonObject subSectionObject){
        if(subSectionObject.size() == 3)
            return subSectionObject.getAsJsonPrimitive(JsonParserUtils.KEYWORD_SPECIAL_IDENTIFIER).isBoolean();
        else
            return true;
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
        if(jsonObject.has(JsonParserUtils.KEYWORD_TYPE)){
            return jsonObject.get(JsonParserUtils.KEYWORD_TYPE).getAsString().equals(type);
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
        keywordEnumKeys.remove(JsonParserUtils.KEYWORD_TYPE);
        if(keywordEnumKeys.size()>0){
            for (String key: keywordEnumKeys) {
                if(key.equals(JsonParserUtils.KEYWORD_DUE_DATE)){
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
        SimpleDateFormat dateFormatter = new SimpleDateFormat(JsonParserUtils.DATE_PATTERN);
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
        String typeValue = jsonObject.get(JsonParserUtils.KEYWORD_TYPE).getAsString();
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
                    String url = jsonObject.get(jsonObjectKeys.get(0)).getAsString();
                    URLConnection urlConnection = new URL(url).openConnection();
                    String mimeType = urlConnection.getContentType();
                    return mimeType.equals(JsonParserUtils.MIME_APPLICATION_PDF) || mimeType.equals(JsonParserUtils.MIME_IMAGE_JPEG) || mimeType.equals(JsonParserUtils.MIME_IMAGE_PNG);
                }
                case "text": {
                    jsonObject.get(jsonObjectKeys.get(0)).getAsString();
                    return true;
                }
                case "date": {
                    return checkDate(jsonObject.get(jsonObjectKeys.get(0)).getAsString());
                }
                case "checkitem": {
                    if(jsonObject.get(jsonObjectKeys.get(0)).getAsString().equals(JsonParserUtils.KEYWORD_CHECKED) || jsonObject.get(jsonObjectKeys.get(0)).getAsString().equals(JsonParserUtils.KEYWORD_UNCHECKED))
                        return true;
                }
                case "selectitem": {
                    if(jsonObject.get(jsonObjectKeys.get(0)).getAsString().equals(JsonParserUtils.KEYWORD_SELECTED) || jsonObject.get(jsonObjectKeys.get(0)).getAsString().equals(JsonParserUtils.KEYWORD_NOT_SELECTED))
                        return true;
                }
                default:
                    return false;
            }
        } catch(ClassCastException | IOException e){
            return false;
        }
    }
}
