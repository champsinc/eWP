package com.champsinc.ewp.service;

import com.google.gson.JsonObject;

/**
 * Service interface to define json parser
 * @author Dhiren Chandnani
 */
public interface JsonParserService {
    JsonObject checkPayload(String payload);
}
