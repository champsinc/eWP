package com.champsinc.ewp.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "discussion_items")
public class TextDiscussion extends DiscussionItem {
    private String value;
}
