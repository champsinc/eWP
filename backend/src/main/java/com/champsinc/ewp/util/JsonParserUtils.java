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
    public static final String NO_WORK_PKG_KEY = "No work package root key";
    public static final String VALID_JSON = "JSON Validated and inserted";
    public static final String EXTRA_KEYS = "Extra keys";
    public static final String EXCEPTION_MESSAGE = "An exception has occurred while parsing json";
    public static final String KEYWORD_TRUE = "true";
    public static final String KEYWORD_FALSE = "false";
    public static final String KEYWORD_WORK_PKG = "work_package";
    public static final String KEYWORD_ERROR = "error";
    public static final String KEYWORD_SECTION = "section";
    public static final String KEYWORD_SUB_SECTION = "sub_section";
    public static final String KEYWORD_LOCATION = "location";
    public static final String KEYWORD_ROOT_NODE = "Root Node";
    public static final String KEYWORD_TYPE = "type";
    public static final String KEYWORD_CHECKED = "checked";
    public static final String KEYWORD_UNCHECKED = "unchecked";
    public static final String KEYWORD_SELECTED = "selected";
    public static final String KEYWORD_NOT_SELECTED = "not-selected";
    public static final String KEYWORD_DUE_DATE = "due_date";
    public static final String KEYWORD_SPECIAL_IDENTIFIER = "special_identifier";
    public static final String DATE_PATTERN = "MM/dd/yyyy";
    public static final String MIME_IMAGE_JPEG = "image/jpeg";
    public static final String MIME_IMAGE_PNG = "image/png";
    public static final String MIME_APPLICATION_PDF = "application/pdf";
}
