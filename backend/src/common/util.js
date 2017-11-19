
exports.isEmptyJson = (Json) => {
    let result = false;
    
    if(Json === undefined || Json === null)
        result = true;
    else
        result = Json.length === 0 ?  true :  false;

    return result;
};


