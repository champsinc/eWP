package com.champsinc.ewp.model.data;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model class for subsections
 * @author Dhiren Chandnani
 */
@Data
public class SelectItem {
    private String name;
    private String value;
}
