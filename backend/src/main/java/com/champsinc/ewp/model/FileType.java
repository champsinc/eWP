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
public class FileType extends DataItem {
    private String value;
    private long fileSize;
    private String fileType;
    private String due_date;
    private int status;
}
