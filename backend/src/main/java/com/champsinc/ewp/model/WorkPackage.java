package com.champsinc.ewp.model;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

/**
 * Model class for work package
 * @author Dhiren Chandnani
 */
@Data
@Document(collection = "work_packages")
@ApiModel
public class WorkPackage {

    @Id
    private String id;

    private String title;
    private ArrayList<ObjectId> sections;
    private ArrayList<ObjectId> users;
    private int status;
    @DBRef
    private ArrayList<Object> discussion;

    // private long ewpNo
    private int percentageCompleted;

}
