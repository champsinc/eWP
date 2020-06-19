package com.champsinc.ewp.service;

import com.champsinc.ewp.model.SubSection;
import java.util.List;

/**
 * Service interface to define work package queries
 * @author Dhiren Chandnani
 */
public interface SubSectionService {
    List<SubSection> findAll();
}
