package com.champsinc.ewp.model;

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
@Document(collection = "sub_sections")
public class SubSection {

    @Id
    private String id;

    private String key;
    private ArrayList<ObjectId> value;
}
