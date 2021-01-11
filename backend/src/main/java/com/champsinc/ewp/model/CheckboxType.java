package com.champsinc.ewp.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model class for subsections
 * @author Dhiren Chandnani
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "data_items")
public class CheckboxType extends DataItem {
    private String value;
}
