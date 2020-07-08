package com.champsinc.ewp.model;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * Model class for sections
 * @author Dhiren Chandnani
 */
@Data
@Document(collection = "sub_sections")
@ApiModel
public class SubSection {

    @Id
    private String id;

    private String name;
    @DBRef
    private List<Object> dataitems;
}
