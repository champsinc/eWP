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
@Document(collection = "discussion_items")
public class DiscussionItem {
    @Id
    private String id;
    private String type;
    private String wpId;
    private ZonedDateTime timestamp;

    @DBRef
    ArrayList<Object> threads;

    // User details
    private String senderUserId;
    private String avatarURL; // avatar url of user
    private String senderName;
}
