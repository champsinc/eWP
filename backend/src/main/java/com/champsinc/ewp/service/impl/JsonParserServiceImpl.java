package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.*;
import com.champsinc.ewp.repository.*;
import com.champsinc.ewp.service.JsonParserService;
import com.champsinc.ewp.util.JsonParserUtils;
import com.champsinc.ewp.util.JsonParserUtils.*;

import com.google.gson.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
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
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WorkPackageRepository workPackageRepository;
    /**
     * Function to check json string for validity
     * @return valid or invalid
     */
    @Override
    public JsonObject checkPayload(String payload) {
        JsonObject responseJSON = new JsonObject();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try {
            WorkPackage workPackageModel = createWorkPackageModel();
            // Keep track of all section objects
            ArrayList<Section> allSections = new ArrayList<>();
            // Keep track of all section objects
            ArrayList<SubSection> allSubSections = new ArrayList<>();
            // Keep track of all dataItem objects
            ArrayList<DataItem> allDataItems = new ArrayList<>();
            JsonObject rootObject = JsonParser.parseString(payload).getAsJsonObject();
            // Check if first key is work package array and no other key exists
            if (rootObject.get(JsonParserUtils.KEYWORD_WORK_PKG).isJsonArray() && rootObject.size() <= 4) {
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
                                    subSectionModel.getDataitems().add(dataItemModel);
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
                    workPackageModel.getSections().add(new ObjectId(sectionModel.getId()));
                }
            } else {
                return sendResponse(JsonParserUtils.NO_WORK_PKG_KEY, null, null);
            }
            if(rootObject.has("user") && rootObject.has("status") && rootObject.has("title")){
                User user = userRepository.findByEmail(rootObject.get("user").getAsString());
                if(user != null){
                    workPackageModel.getUsers().add(new ObjectId(user.getId()));
                    workPackageModel.setTitle(rootObject.get("title").getAsString());
                    insertIntoDB(allDataItems, allSubSections, allSections, workPackageModel);
                    responseJSON.addProperty("Success", JsonParserUtils.VALID_JSON);
                }
                else{
                    responseJSON.addProperty(JsonParserUtils.KEYWORD_ERROR, "No such user present");
                }
            }
            else{
                responseJSON.addProperty(JsonParserUtils.KEYWORD_ERROR, "No user key, title or status present");
            }
            return responseJSON;
        } catch (Exception e){
            e.printStackTrace();
            StackTraceElement[] elements = e.getStackTrace();
            responseJSON.addProperty(JsonParserUtils.KEYWORD_ERROR, JsonParserUtils.EXCEPTION_MESSAGE);
            responseJSON.addProperty("message", gson.toJson(elements));
            return responseJSON;
        }
    }

    private WorkPackage createWorkPackageModel() {
        WorkPackage workPackageModel = new WorkPackage();
        workPackageModel.setId(new ObjectId().toString());
        workPackageModel.setSections(new ArrayList<>());
        workPackageModel.setStatus(1);
        workPackageModel.setSections(new ArrayList<>());
        workPackageModel.setUsers(new ArrayList<>());
        return workPackageModel;
    }

    private DataItem createDataItemModel(JsonElement subSectionInnerElement){
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonObject subSectionInnerObject = subSectionInnerElement.getAsJsonObject();
        String subSectionDataKeyName = getDataKeyName(subSectionInnerObject);
        ObjectId dataItemId = new ObjectId();
        DataItem dataItemModel = gson.fromJson(subSectionInnerElement, DataItem.class);
        dataItemModel.setId(dataItemId.toString());
        dataItemModel.setName(subSectionDataKeyName);
        if(dataItemModel.getType().equals(JsonParserUtils.KEYWORD_SELECTBOX)){
            dataItemModel.setValue(subSectionInnerObject.get(subSectionDataKeyName).toString());
        }
        else{
            dataItemModel.setValue(subSectionInnerObject.get(subSectionDataKeyName).getAsString());
        }
        return dataItemModel;
    }

    private SubSection createSubSectionModel(String subSectionName){
        SubSection subSectionModel = new SubSection();
        subSectionModel.setName(subSectionName);
        subSectionModel.setId(new ObjectId().toString());
        subSectionModel.setValue(new ArrayList<>());
        subSectionModel.setDataitems(new ArrayList<>());
        return subSectionModel;
    }

    private Section createSectionModel(){
        Section sectionModel = new Section();
        sectionModel.setId(new ObjectId().toString());
        sectionModel.setValue(new ArrayList<>());
        return sectionModel;
    }

    private void insertIntoDB(ArrayList<DataItem> allDataItems, ArrayList<SubSection> allSubSections, ArrayList<Section> allSections, WorkPackage workPackage){
        for (DataItem dataItem : allDataItems) {
            dataItemRepository.save(dataItem);
        }
        for(SubSection subSection: allSubSections){
            subSectionRepository.save(subSection);
        }
        for (Section section: allSections) {
            sectionRepository.save(section);
        }
        workPackageRepository.save(workPackage);
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
        // Check if its a sub section and type key exists
        if (checkTypeKey(subSectionObject, JsonParserUtils.KEYWORD_SUB_SECTION) && subSectionObject.size() <= 3) {
            String subSectionKeyName = getDataKeyName(subSectionObject);
            if (!subSectionKeyName.equals(JsonParserUtils.EXTRA_KEYS) && checkSpecialIdentifier(subSectionObject)) {
                responseList.add(JsonParserUtils.KEYWORD_TRUE);
                responseList.add(subSectionKeyName);
            }
            else{
                responseList.add(JsonParserUtils.KEYWORD_FALSE);
                responseList.add(sectionKeyName);
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

    private boolean checkBasicAllowedKeys(ArrayList<String> basicKeys){
        basicKeys.removeAll(JsonParserUtils.basicAllowedKeys);
        return basicKeys.size() == 2;
    }

    private boolean checkFileAllowedKeys(ArrayList<String> fileKeys){
        fileKeys.removeAll(JsonParserUtils.fileAllowedKeys);
        return fileKeys.size() == 2;
    }

    private boolean checkDataByType(JsonObject jsonObject){
        String typeValue = jsonObject.get(JsonParserUtils.KEYWORD_TYPE).getAsString();
        ArrayList<String> jsonObjectKeys = new ArrayList<>(jsonObject.keySet());
        String dataKeyName = getDataKeyName(jsonObject);
        try{
            switch (typeValue)
            {
                case "number": {
                    // Check if data key is a number
                    jsonObject.get(dataKeyName).getAsInt();
                    // Check if allowed keys are only editable and required
                    return jsonObject.size() <= 4 && checkBasicAllowedKeys(jsonObjectKeys);
                }
                case "text": {
                    // Check if data key is a string
                    jsonObject.get(dataKeyName).getAsString();
                    // Check if allowed keys are only editable and required
                    return jsonObject.size() <= 4 && checkBasicAllowedKeys(jsonObjectKeys);
                }
                case "date": {
                    // Check if data key is a valid date
                    if(checkDate(jsonObject.get(dataKeyName).getAsString())){
                        // Check if allowed keys are only editable and required
                        return jsonObject.size() <= 4 && checkBasicAllowedKeys(jsonObjectKeys);
                    }
                    return false;
                }
                case "file": {
                    String url = jsonObject.get(dataKeyName).getAsString();
                    // Check if file url is valid and allowed keys are editable, required, due_date and notes
                    if(checkFileURL(url) && checkFileAllowedKeys(jsonObjectKeys)){
                        // Check if editable is true then due date should be present
                        if(jsonObject.get(JsonParserUtils.KEYWORD_EDITABLE).getAsBoolean()) {
                            return jsonObject.has(JsonParserUtils.KEYWORD_DUE_DATE);
                        }
                        else{
                            return !jsonObject.has(JsonParserUtils.KEYWORD_DUE_DATE);
                        }
                    }
                    return false;
                }
                case "checkitem": {
                    String checkItemValue = jsonObject.get(dataKeyName).getAsString();
                    if(checkItemValue.equals(JsonParserUtils.KEYWORD_CHECKED) || checkItemValue.equals(JsonParserUtils.KEYWORD_UNCHECKED))
                        return true;
                }
                case "selectbox": {
                    int selectedFlag = 0;
                    // parse through selectbox array
                    JsonArray selectboxArray = jsonObject.getAsJsonArray(dataKeyName);
                    for (JsonElement selectboxElement : selectboxArray) {
                        JsonObject selectboxObject = selectboxElement.getAsJsonObject();
                        if(selectboxObject.get(JsonParserUtils.KEYWORD_TYPE).getAsString().equals("selectitem")){
                            selectboxObject.remove(JsonParserUtils.KEYWORD_TYPE);
                            String selectboxObjectValue = selectboxObject.get(getDataKeyName(selectboxObject)).getAsString();
                            if(selectboxObjectValue.equals(JsonParserUtils.KEYWORD_SELECTED)){
                                if(selectedFlag == 1){
                                    return false;
                                }
                                selectedFlag = 1;
                            }
                            else if(!selectboxObjectValue.equals(JsonParserUtils.KEYWORD_NOT_SELECTED)){
                                return false;
                            }
                        }
                        else{
                            return false;
                        }
                    }
                    return selectedFlag == 1;
                }
                default:
                    return false;
            }
        } catch(ClassCastException | IllegalStateException e){
            return false;
        }
    }

    private boolean checkFileURL(String url){
        URLConnection urlConnection;
        try{
            urlConnection = new URL(url).openConnection();
        }
        catch (IOException io){
            return false;
        }
        String mimeType = urlConnection.getContentType();
        return mimeType.equals(JsonParserUtils.MIME_APPLICATION_PDF) || mimeType.equals(JsonParserUtils.MIME_IMAGE_JPEG) || mimeType.equals(JsonParserUtils.MIME_IMAGE_PNG);
    }
}
