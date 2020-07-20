package com.champsinc.ewp.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "discussion_items")
public class LogDiscussion extends DiscussionItem {
    private String value;
    private ObjectId sectionId;
    private ObjectId subSectionId;
}
