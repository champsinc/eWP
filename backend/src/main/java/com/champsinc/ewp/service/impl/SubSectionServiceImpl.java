package com.champsinc.ewp.service.impl;

import com.champsinc.ewp.model.SubSection;
import com.champsinc.ewp.repository.SubSectionRepository;
import com.champsinc.ewp.service.SubSectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of each function in the service class
 * @author Dhiren Chandnani
 */
@Service
public class SubSectionServiceImpl implements SubSectionService {
    @Autowired
    SubSectionRepository subSectionRepository;

    /**
     * Function to get all work packages
     * @return specific work package by id
     */
    @Override
    public List<SubSection> findAll(){
        return subSectionRepository.findAll();
    }

}
