package com.champsinc.ewp.model;

import lombok.Data;
import org.bson.types.BSONTimestamp;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.ZonedDateTime;

/**
 * Model class for subsections
 * @author Dhiren Chandnani
 */
@Data
@Document(collection = "discussion_items")
public class DiscussionItem {
    @Id
    private String id;
    private String type;
    private String wpId;
    private ZonedDateTime timestamp;
    private String byUser;
}
