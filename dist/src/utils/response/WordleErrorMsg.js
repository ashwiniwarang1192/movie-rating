"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WordleErrorMsg = {
    DEFAULT_ERROR: 'Error while processing request!',
    EMPTY_RESULTS: 'No Data found!',
    INVALID_INPUT: 'Invalid Data in Request',
    INVALID_PARENT_ID: 'Invalid Parent ID in Request',
    INACTIVE_PARENT_PRESENT: 'Parent is inactive, Please make it active first!',
    NOT_ENOUGH_DATA: 'Insufficient data in request',
    EMPTY_POST_ID: 'Empty Post ID in request',
    INVALID_POST_ID: 'Invalid Post ID in request',
    INVALID_PAGE_ID: 'Invalid Page ID in request',
    ACTIVE_CHILD_PRESENT: 'Active child present, Please make it inactive first',
    EMPTY_DATA: 'Empty data in request',
    INVALID_DATA_IN_DB: 'Data is in Invalid format in DB',
    INVALID_VALUES_IN_PARAM: 'Invalid values sent in request params',
    DB_ERROR: 'Error while executing query in DB',
    INVALID_COLLECTION_NAME: 'Invalid collection name provided',
    POST_AND_PARENT_ID_SAME: 'Post ID and Parent ID cannot be same',
    INVALID_MENU_ORDER: 'Inconsistent Menu Order of Post and its parent!',
    INVALID_PARAMS: 'Invalid parameter in request',
    FILE_SIZE_EXCEEDED: 'Invalid File, Size should not exceed 1mb.',
    EXTENTION_NOT_ALLOWED: 'File Upload extension is not allowed',
    CHILD_PRESENT_FOR_POST: 'Child Post(s) is present for this post, Please delete it first.',
    INVALID_EMAIL_ID: 'Invalid Email id in Request',
};
exports.default = WordleErrorMsg;
