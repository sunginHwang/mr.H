import {ACCESS_HEADER_TOKEN, HASH_DIGEST, HASH_SALT_KEY, HASH_TYPE} from "./constants";
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import {SECRET_TOKEN_KEY} from "./tokenKeyInfo";

exports.isEmptyJson = (Json) => {
    let result = false;
    
    if(Json === undefined || Json === null)
        result = true;
    else
        result = Json.length === 0 ?  true :  false;

    return result;
};

exports.passwordHash = async (password) => {
    return await crypto.createHmac(HASH_TYPE, HASH_SALT_KEY).update(password).digest(HASH_DIGEST);
};

// 공통 헤더 설정


exports.setResponseHeader = async(req, res, next) => {
    res.set({
        'Content-Type': 'text/html;charset=UTF-8',
    });
    next();
};

