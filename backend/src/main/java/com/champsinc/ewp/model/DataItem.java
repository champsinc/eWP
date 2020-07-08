package com.champsinc.ewp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model class for subsections
 * @author Dhiren Chandnani
 */
@Data
@Document(collection = "data_items")
public class DataItem {
    @Id
    private String id;

    private String name;
    private String type;
    private boolean editable;
    private boolean notes;

    private String value;
    private boolean required;
    private String due_date;
    private boolean special_identifier;
    private int fileStatus;
    private int fileSize;
    private String fileType;

}
