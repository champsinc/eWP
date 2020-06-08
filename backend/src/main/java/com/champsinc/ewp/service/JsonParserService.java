package com.champsinc.ewp.service;

import com.champsinc.ewp.model.WorkPackage;
import com.google.gson.JsonObject;
import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * Service interface to define json parser
 * @author Dhiren Chandnani
 */
public interface JsonParserService {
    JsonObject checkPayload(String payload);
}
