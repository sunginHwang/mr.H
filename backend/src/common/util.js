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

exports.getTodayForYYYYMMDD = () => {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1; //January is 0!
    var year = today.getFullYear();

    if(day<10)
        day='0'+day;

    if(month<10)
        month='0'+month;

    return year+"-"+month+"-"+day;
};

exports.passwordHash = async (password) => {
    return await crypto.createHmac(HASH_TYPE, HASH_SALT_KEY).update(password).digest(HASH_DIGEST);
};

// 공통 헤더 설정


exports.setResponseHeader = async(req, res, next) => {
    res.set({
        'Content-Type': 'text/html;charset=UTF-8',
        'Access-Control-Allow-Credentials' : true,
        'Access-Control-Allow-Header' : 'Origin, X-Requested-With, Content-Type, Accept, x-timebase, Link',
        'Access-Control-Allow-Methods' : 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
        'Access-Control-Export-Header' : 'Link',
        'Access-Control-Allow-Origin' : '*'
    });

    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};

