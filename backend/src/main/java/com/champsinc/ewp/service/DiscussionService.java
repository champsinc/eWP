package com.champsinc.ewp.service;


import com.google.gson.JsonObject;

/**
 * Service interface for discussion section
 * @author Dhiren Chandnani
 */
public interface DiscussionService {
    String findByWpId(String wpId);
    JsonObject insertDiscussion(String payload);
}
