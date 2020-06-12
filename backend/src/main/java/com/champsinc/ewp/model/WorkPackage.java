package com.champsinc.ewp.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.ArrayList;

/**
 * Model class for work package
 * @author Dhiren Chandnani
 */
@Data
@Document(collection = "work_packages")
public class WorkPackage {

    @MongoId(value = FieldType.OBJECT_ID)
    private String id;

    ArrayList<ObjectId> sections;
    ArrayList<ObjectId> users;
    private String status;
}
