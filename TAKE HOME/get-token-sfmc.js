Platform.Load("core", "1");

var errorMapping = {
    // SSJS errors
    "syntaxerror": "Syntax Error",
    "referenceerrpr": "Reference Error",
    "typeerror": "Type Error",
    "object expected": "Object Expected Error",
    "execution exceeded": "Timeout Error",

    // DE & SQL errors
    "lookuprows|dataextension.init": "Data Extension Error",
    "invalid sql query|syntax error near": "SQL Query Error",
    "duplicate key": "Duplicate Primary Key Error",
    "cannot insert null": "NULL Constraint Violation",
    
    // API & http errors
    "401|UNAUTHORIZED": "API Authentication Error",
    "403|forbidden": "API Permission Error",
    "500|internal server error": "SFMC Internal Error",
    "request timed out": "API Timeout Error",

    // automation & email errors
    "automation failed": "Automation Error",
    "invalid send classification": "Send Classification Error",
    "subscriber does not exist": "Subscriber Not Found Error",
    "email send job failed": "Email Send Error",
    
    // general SFMC errors
    "session has expired": "Session Expired",
    "expected .* but received .*": "Invalid Data Type Error",
    "permission denied": "Permission Error"
};

// setting DEBUG to false turns off all messages
var SETTINGS = {
    "DEBUG" : true
}

// function to log messages
function log(message){
    if(SETTINGS["DEBUG"]){
        //if we pass an object, we first use Stringify before printing
        if(typeof(message) == "object"){
            Write(Stringify(message) + "<br><br>") // we also print a couple of line breaks
        }else{
            Write(message + "<br><br>")
        }
    } 
}

function debugDetails(logId, timeStamp, errorType, error) {
    if(SETTINGS["DEBUG"]){
        // function to stringify an object
        var debugInfo = {
            LogID: logId,
            Timestamp: timeStamp,
            ErrorType: errorType,
            ErrorMessage: error.message || Stringify(error)
        };

        return debugInfo; // return the JSON for further use if needed
    }
}

//function to get error type
function getErrorType(errorMessage){
    if (!errorMessage) return "Unknown Error";

    var message = errorMessage.toLowerCase(); // convert the error message to lowercase

    for (var pattern in errorMapping) {
        var regex = new RegExp(pattern, "i"); // create a regex pattern for the error mapping
        if (regex.test(message)) {
            return errorMapping[pattern]; // return the error type from the mapping
        }
    }
    return "Unknown Error"; // return unknown error if the error message does not match any pattern
}

// function to get the next up log ID
function getNextLogId(deName) {
    var logIdQuery = DataExtension.Init(deName).Rows.Retrieve(); // initialize the DE using the variable containing the external key here

    if (!logIdQuery || logIdQuery.length === 0) {
        // if the DE is empty, we return 1
        return 1;
    }

    var maxLogId = 0; // initialize the max log ID to 0
    for (var i = 0; i < logIdQuery.length; i++) {
        // loop through the DE to get the max log ID
        var currentLogId = parseInt(logIdQuery[i].LogID); // parse the log ID to an integer
        if (currentLogId > maxLogId) {
            // if the current log ID is greater than the max log ID, we set the max log ID to the current log ID
            maxLogId = currentLogId;
        }
    }

    return maxLogId + 1; // return the next log ID to be used
}

try { 
    // here we have any code we want debugged
    try {      

        function storeToken(result) {

            var rows = Platform.Function.UpsertData(
                config.storage.de,
                ["id"], [config.storage.id],
                ["accessToken", "restInstanceURI", "expirationDate", "expiresIn", "tokenTime"],
                [encryptSymmetric(result.token), encryptSymmetric(result.url), result.expires, result.expires_in, result.token_time]
            );

            if(rows > 0) {
                
                return rows; 
                
            } else {
                
                throw "Token storage failed"
                
            }
        }      
      
        function requestToken() {

            var request = HTTP.Post(config.endpoint, "application/json", Stringify(config.credentials[config.bu]));

            if (request.StatusCode == 200) { 

                var result = Platform.Function.ParseJSON(request.Response[0]);

                var parsedDate = new Date(config.localDate);

                var expirationDate = new Date(parsedDate.getTime() + (result.expires_in * 1000));

                var expiresIn = result.expires_in;

                return {
                    "token": result.access_token,
                    "url": result.rest_instance_url,
                    "expires": expirationDate,
                    "expires_in": expiresIn,
                    "token_time": parsedDate
                }
            } else {
                throw "Couldn't request the token. Status: " + request.StatusCode;  
            }
        }
      
        function retrieveToken() {

            // Retrieve the stored token from the Data Extension using the configured DE name and row key
            var request = Platform.Function.LookupRows(config.storage.de, "id", config.storage.id);

            var result = request[0];

            if(result != null && (new Date(config.localDate) < new Date(result.expirationDate))) {
                return {
                    "token": decryptSymmetric(result.accessToken),
                    "url": decryptSymmetric(result.restInstanceURI),
                    "expires": result.expirationDate
                }
            } else {

                var result = requestToken();

                var upsert = storeToken(result);

                if(upsert > 0) {
                    return result;
                } else {
                    throw "Token not saved"
                }
            }
        }
      
        function encryptSymmetric(str) {

            Variable.SetValue("@ToEncrypt", str);

            var scr = Platform.Function.TreatAsContent("\%\%=ContentBlockByKey('encryption-amp-block')=\%\%");

            return scr;
        }
        
        function decryptSymmetric(str) {

            Variable.SetValue("@ToDecrypt", str);

            var scr = Platform.Function.TreatAsContent("\%\%=ContentBlockByKey('decryption-amp-block')=\%\%");

            return scr;
        }      

        var oAuthDE = DataExtension.Init("oauth-secret-store"); // 
        
        var complexFilter = {
            LeftOperand: {
                Property: "MID",
                SimpleOperator: "equals",
                Value: Platform.Function.AuthenticatedMemberID()
            },
            LogicalOperator: "AND",
            RightOperand: {
                Property: "PackageName",
                SimpleOperator: "equals",
                Value: 'Jason - Personal API - PROD'
            },
            LogicalOperator: "AND",
            RightOperand: {
                Property: "Environment",
                SimpleOperator: "equals",
                Value: 'PROD'
            }
        }

        var accessTokenRow = oAuthDE.Rows.Retrieve(complexFilter);
    
        var credentials = {};
        credentials[accessTokenRow[0].MID] = {
            "grant_type": "client_credentials",
            "client_id": accessTokenRow[0].ClientId,
            "client_secret": decryptSymmetric(accessTokenRow[0].ClientSecret)
        };

        var config = {
            endpoint: decryptSymmetric(accessTokenRow[0].AuthBaseURI) + "v2/token",
            credentials: credentials,
            storage: {
                de: "APIAccessToken",
                id: accessTokenRow[0].PackageName
            },
            bu: Platform.Function.AuthenticatedMemberID(),
            localDate: DateTime.SystemDateToLocalDate(Now())
        };
        
      
       var auth = retrieveToken();
      
       log(auth);

    }catch (e) {
        var errorLogging = "error-log"; // grab the external key of the DE here
        var errorLogDE = DataExtension.Init(errorLogging); // initialize the DE using the variable containing the external key here

        var newLogId = getNextLogId(errorLogging); // get the next log ID
        var currentDate = Platform.Function.Now(); // get the current date
        var errorType = getErrorType(e.message); // get the error type


        var debugJson = debugDetails(newLogId, currentDate, errorType, e); // get the debug JSON for the code

        Write(Stringify(debugJson)+"<br></br>"); // print the debug JSON to the screen if DEBUG is true

        errorLogDE.Rows.Add(debugJson); // add the debug JSON to the DE
        log("Error logged successfully with LogID: " + newLogId); // log the success message
    }
}catch (e) {
    // here is my code and I'm about to log something on the screen
    log(e);
}