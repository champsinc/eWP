package com.champsinc.ewp.model;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

/**
 * Model class for sections
 * @author Dhiren Chandnani
 */
@Data
@Document(collection = "sections")
@ApiModel(value = "Defines a section")
public class Section {

    @Id
    private String id;

    private String name;
    private ArrayList<ObjectId> value;

}
