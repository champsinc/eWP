package com.champsinc.ewp.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model class for work package
 * @author Dhiren Chandnani
 */
@Getter
@Setter
@Document(collection = "work_package")
public class WorkPackage {
    @Id
    private String _id;

    private int ewpId;
    private String title;
    private String description;
    private String dueDate;
}
