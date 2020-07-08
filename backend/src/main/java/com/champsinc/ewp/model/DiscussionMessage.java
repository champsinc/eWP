package com.champsinc.ewp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model class for subsections
 * @author Dhiren Chandnani
 */
@Data
@Document(collection = "discussions")
public class DiscussionMessage {
    @Id
    private String id;

    private String type;

}
