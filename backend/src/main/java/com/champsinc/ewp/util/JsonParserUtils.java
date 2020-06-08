package com.champsinc.ewp.util;

public class JsonParserUtils {

    public enum Keywords {
        type,
        editable,
        notes,
        required,
        due_date,
        special_identifier
    }

    public enum Types {
        number,
        date,
        text,
        file,
        checkitem,
        selectitem
    }

    public static final String NOT_VALID_TYPE = "Type is not valid";
    public static final String EXTRA_KEYS_INNER = "Extra keys other than valid keys are present";
    public static final String EXTRA_KEYS_SUB_SECTION = "Extra keys other than valid keys are present in subsection";
    public static final String EXTRA_KEYS_SECTION = "Extra keys other than valid keys are present in section";
    public static final String OTHER_KEYS_NOT_VALID = "Other keys like editable/required etc. are not of valid type";
    public static final String DATA_TYPE_INVALID = "Data is not according to type specified";
    public static final String NO_TYPE_KEY_SUB_SECTION = "Either type key not specified in sub-section or extra keys are present";
    public static final String NO_TYPE_KEY_SECTION = "Either type key not specified in section or extra keys are present";
    public static final String NO_WORK_PCKG_KEY = "No work package root key";
    public static final String VALID_JSON = "Valid JSON";
    public static final String EXTRA_KEYS = "Extra keys";
}
