package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.*;
import com.champsinc.ewp.repository.*;
import com.champsinc.ewp.service.JsonParserService;
import com.champsinc.ewp.util.JsonParserUtils;
import com.champsinc.ewp.util.JsonParserUtils.*;

import com.google.gson.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
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
    private UserRepository userRepository;
    @Autowired
    private WorkPackageRepository workPackageRepository;
    @Autowired
    MongoTemplate mongoTemplate;

    private long fileSize;
    private String fileType;
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
            ArrayList<Object> allDataItems = new ArrayList<>();
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
                                int itemNumber = 1;
                                // Parse through each subsection inner array
                                for (JsonElement dataItemElement : subSectionInnerArray) {
                                    JsonObject dataItemObject = dataItemElement.getAsJsonObject();
                                    JsonObject checkDataItem = checkDataItem(dataItemObject, sectionKeyName, checkSubSection.get(1));
                                    if(checkDataItem.has(JsonParserUtils.KEYWORD_ERROR)){
                                        checkDataItem.addProperty("Item number", itemNumber);
                                        return checkDataItem;
                                    }

                                    // Create data item model
                                    Object dataItemModel = createDataItemModel(dataItemElement);
                                    allDataItems.add(dataItemModel);

                                    subSectionModel.getDataitems().add(dataItemModel);
                                    itemNumber++;
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
            responseJSON.addProperty(JsonParserUtils.KEYWORD_ERROR, "Exception has occurred");
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

    private Object createDataItemModel(JsonElement subSectionInnerElement){
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonObject dataItemJsonObject = subSectionInnerElement.getAsJsonObject();
        String dataItemKeyName = getDataKeyName(dataItemJsonObject);
        ObjectId dataItemId = new ObjectId();
        String type = dataItemJsonObject.get("type").getAsString();
        switch (type){
            case "text":
            {
                TextType textType = gson.fromJson(dataItemJsonObject, TextType.class);
                textType.setId(dataItemId.toString());
                textType.setName(dataItemKeyName);
                textType.setValue(dataItemJsonObject.get(dataItemKeyName).getAsString());
                return textType;
            }
            case "number":
            {
                NumberType numberType = gson.fromJson(dataItemJsonObject, NumberType.class);
                numberType.setId(dataItemId.toString());
                numberType.setName(dataItemKeyName);
                numberType.setValue(dataItemJsonObject.get(dataItemKeyName).getAsLong());
                return numberType;
            }
            case "date":
            {
                DateType dateType = gson.fromJson(dataItemJsonObject, DateType.class);
                dateType.setId(dataItemId.toString());
                dateType.setName(dataItemKeyName);
                dateType.setValue(dataItemJsonObject.get(dataItemKeyName).getAsString());
                return dateType;
            }
            case "checkbox":
            {
                CheckboxType checkboxType = gson.fromJson(dataItemJsonObject, CheckboxType.class);
                checkboxType.setId(dataItemId.toString());
                checkboxType.setName(dataItemKeyName);
                checkboxType.setValue(dataItemJsonObject.get(dataItemKeyName).getAsString());
                return checkboxType;
            }
            case "selectbox":
            {
                SelectboxType selectboxType = gson.fromJson(dataItemJsonObject, SelectboxType.class);
                selectboxType.setId(dataItemId.toString());
                selectboxType.setName(dataItemKeyName);
                JsonArray selectItemsArray = dataItemJsonObject.getAsJsonArray(dataItemKeyName);
                ArrayList<SelectItem> allSelectItems = new ArrayList<>();
                for(JsonElement selectItem : selectItemsArray){
                    JsonObject selectItemJsonObject = selectItem.getAsJsonObject();
                    SelectItem selectItemModel = new SelectItem();
                    String selectItemName = getDataKeyName(selectItemJsonObject);
                    selectItemModel.setName(selectItemName);
                    selectItemModel.setValue(selectItemJsonObject.get(selectItemName).getAsString());
                    allSelectItems.add(selectItemModel);
                }
                selectboxType.setValue(allSelectItems);
                return selectboxType;
            }
            case "file":
            {
                FileType fileType = gson.fromJson(dataItemJsonObject, FileType.class);
                fileType.setId(dataItemId.toString());
                fileType.setName(dataItemKeyName);
                fileType.setValue(dataItemJsonObject.get(dataItemKeyName).getAsString());
                fileType.setFileSize(this.fileSize);
                fileType.setFileType(this.fileType);
                fileType.setStatus(0);
                return fileType;
            }
        }
        return null;
    }

    private SubSection createSubSectionModel(String subSectionName){
        SubSection subSectionModel = new SubSection();
        subSectionModel.setName(subSectionName);
        subSectionModel.setId(new ObjectId().toString());
        subSectionModel.setDataitems(new ArrayList<>());
        return subSectionModel;
    }

    private Section createSectionModel(){
        Section sectionModel = new Section();
        sectionModel.setId(new ObjectId().toString());
        sectionModel.setValue(new ArrayList<>());
        return sectionModel;
    }

    private void insertIntoDB(ArrayList<Object> allDataItems, ArrayList<SubSection> allSubSections, ArrayList<Section> allSections, WorkPackage workPackage){
        for (Object dataItem : allDataItems) {
            //System.out.println(dataItem);
            mongoTemplate.save(dataItem, "data_items");
        }
        for(SubSection subSection: allSubSections){
            //System.out.println(subSection);
            subSectionRepository.save(subSection);
        }
        for (Section section: allSections) {
            //System.out.println(section);
            sectionRepository.save(section);
        }
        //System.out.println(workPackage);
        workPackageRepository.save(workPackage);
    }

    protected JsonObject checkDataItem(JsonObject dataItemObject, String sectionKeyName, String subSectionKeyName){
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

    protected boolean checkValidTypeValue(String type){
        List<String> typeValuesEnum = Stream.of(Types.values()).map(Types::name).collect(Collectors.toList());
        return typeValuesEnum.contains(type);
    }

    private boolean checkExtraKeysPresent(JsonObject jsonObject){
        // Get keys of json object and keywords enum
        ArrayList<String> jsonObjectKeys = new ArrayList<>(jsonObject.keySet());
        List<String> keywordEnumKeys = Stream.of(Keywords.values()).map(Keywords::name).collect(Collectors.toList());
        // Only key-value pair should remain
        jsonObjectKeys.removeAll(keywordEnumKeys);
        return jsonObjectKeys.size() == 1;
    }

    private boolean checkOtherKeys(JsonObject jsonObject){
        ArrayList<String> jsonObjectKeys = new ArrayList<>(jsonObject.keySet());
        List<String> keywordEnumKeys = Stream.of(Keywords.values()).map(Keywords::name).collect(Collectors.toList());
        // Remove data key-value pair from jsonObject
        keywordEnumKeys.retainAll(jsonObjectKeys);
        // Remove type key from jsonObject
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

    protected boolean checkDate(String dateStr) {
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
                    // Check if allowed keys are editable, required and notes
                    return jsonObject.size() <= 5 && checkBasicAllowedKeys(jsonObjectKeys);
                }
                case "text": {
                    // Check if data key is a string
                    jsonObject.get(dataKeyName).getAsString();
                    // Check if allowed keys are editable, required and notes
                    return jsonObject.size() <= 5 && checkBasicAllowedKeys(jsonObjectKeys);
                }
                case "date": {
                    // Check if data key is a valid date
                    if(checkDate(jsonObject.get(dataKeyName).getAsString())){
                        // Check if allowed keys are editable, required and notes
                        return jsonObject.size() <= 5 && checkBasicAllowedKeys(jsonObjectKeys);
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
                case "checkbox": {
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
        if(mimeType.equals(JsonParserUtils.MIME_APPLICATION_PDF) || mimeType.equals(JsonParserUtils.MIME_IMAGE_JPEG) || mimeType.equals(JsonParserUtils.MIME_IMAGE_PNG)){
            this.fileType = mimeType;
            this.fileSize = (long)urlConnection.getContentLength()/1024;
            return true;
        }
        else{
            return false;
        }
    }

}
