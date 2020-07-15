package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.discussion.DiscussionItem;
import com.champsinc.ewp.service.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of each function in the discussion service class
 * @author Dhiren Chandnani
 */
@Service
public class DiscussionServiceImpl implements DiscussionService {

    @Autowired
    MongoTemplate mongoTemplate;

    public String findByWpId(String wpId){
        String id = "5f0f6c18618ba93990ad127c";
        DiscussionItem discussionItem = new DiscussionItem();
        //DiscussionItem discussionItem = mongoTemplate.findById(id, DiscussionItem.class);
        //ZonedDateTime time = discussionItem.getTime();
        //discussionItem.setTime(ZonedDateTime.now());
        //discussionItem.setType("Hellllooo");
        Query query = new Query().with(Sort.by(Sort.Direction.ASC, "time"));
        List<DiscussionItem> discussionItemList = mongoTemplate.find(query, DiscussionItem.class);
        //mongoTemplate.save(discussionItem);
        return discussionItemList.toString();
        //return "Ok";
    }
}
