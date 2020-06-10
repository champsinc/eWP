package com.champsinc.ewp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model class for subsections
 * @author Dhiren Chandnani
 */
@Data
@Document(collection = "sub_sections")
public class SubSection {
    @Id
    private String id;

    private String key;
    private String type;
    private String value;
    private boolean editable;
    private boolean notes;
    private boolean required;
    private String due_date;
    private boolean special_identifier;
}
