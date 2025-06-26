Platform.Load("Core", "1");
//AUTHENTICATE
var url = "";
var contentType = "application/json";
var payload =
    '{"grant_type": "client_credentials","client_id": "","client_secret": "","account_id":""}';

var accessTokenResult = HTTP.Post(url, contentType, payload);
var accessToken = Platform.Function.ParseJSON(accessTokenResult["Response"][0]).access_token;

if (accessToken != "") {
    //EXECUTE
    try {
        var deleteUrl =
            "";
        var payload1 =
            '{"deleteOperationType": "ContactAndAttributes","targetList": {"listType": {"listTypeID": 3},"listKey": ""},"deleteListWhenCompleted": false,"deleteListContentsWhenCompleted": false}';
        var headerNames = ["Authorization"];
        var s1 = "Bearer ";
        var headerValues = [s1.concat(accessToken)];
        var result = HTTP.Post(deleteUrl, contentType, payload1, headerNames, headerValues);
    } catch (ex) {
        Write("Exception Error: " + Stringify(ex));
    }
}
