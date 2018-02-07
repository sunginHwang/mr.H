import {HASH_DIGEST, HASH_SALT_KEY, HASH_TYPE} from "./constants";
import crypto from 'crypto';

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



