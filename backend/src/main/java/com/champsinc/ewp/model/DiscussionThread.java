package com.champsinc.ewp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.ZonedDateTime;
import java.util.ArrayList;

/**
 * Model class for subsections
 * @author Dhiren Chandnani
 */
@Data
@Document(collection = "threads")
public class DiscussionThread {
    @Id
    String id;
    @DBRef
    ArrayList<Object> discussions;
    ZonedDateTime lastUpdated;
}
