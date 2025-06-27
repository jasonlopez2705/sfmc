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

        function journeyHistoryReturn(authToken,endPointURL,page,pageSize) {
            var endPoint = endPointURL + 'interaction/v1/interactions/journeyhistory/search?$page=' + page + '&$pageSize=' + pageSize;
            var contentType = 'application/json';
            var payload = '';
            var headers = ['Authorization'];
            var headervalues = ["Bearer " + authToken];

            var results = HTTP.Post(endPoint, contentType, payload, headers, headervalues);


            return results.Response;
        }

        function journeyHistoryUpsert(items, deUpsert) {

            var successful = 0

            for(i=0; i < items.length; i++) {

                var id         = items[i].id;
                var mid       = items[i].mid; 
                var eventId   = items[i].eventId;
                var definitionId  = items[i].definitionId;
                var definitionName  = items[i].definitionName;
                var eventName   = items[i].eventName;
                var contactKey   = items[i].contactKey;
                var transactionTime = items[i].transactionTime;
                var status       = items[i].status;

                var filterNames = ['ID','MID','ContactKey','EventID','DefinitionID','DefinitionName','EventName','TransactionTime','Status']
                var filterValues = [id,mid,contactKey,eventId,definitionId,definitionName,eventName,transactionTime,status]

                var columnNames = ['LastUpdated']
                var columnValues = [Now()]

                var journeyRows = Platform.Function.UpsertData(deUpsert,filterNames,filterValues,columnNames,columnValues)
                if(journeyRows = 1) { successful += 1 }
            }
            return successful;
        }

        function decryptSymmetric(str) {

            Variable.SetValue("@ToDecrypt", str);

            var scr = Platform.Function.TreatAsContent("\%\%=ContentBlockByKey('decryption-amp-block')=\%\%");

            return scr;
        }    

        page = 1; // set the page number for pagination
        pageSize = 10; // set the page size for pagination

        var accessTokenDE = DataExtension.Init("api-access-token"); // grab the external key of the DE here
        var simplefilter = {
            Property: "id",
            SimpleOperator: "equals",
            Value: "Jason - Personal API - PROD"
        }; // create a simple filter to retrieve the access token row by id

        var row = accessTokenDE.Rows.Retrieve(simplefilter); // retrieve the access token row from the DE using the simple filter
      
        var authToken = "";
        var endPointURL = "";

        if (row && row.length > 0) {
            if (row[0].accessToken) {
            authToken = decryptSymmetric(row[0].accessToken); // decrypt the access token from the DE
            } else {
            throw new Error("Access token not found for id: " + id);
            }
            if (row[0].restInstanceURI) {
            endPointURL = decryptSymmetric(row[0].restInstanceURI); // decrypt the restInstanceURI from the DE
            } else {
            throw new Error("restInstanceURI not found for id: " + id);
            }
        } else {
            throw new Error("Access token row not found for id: " + id);
        }
            
        var response = journeyHistoryReturn(authToken, endPointURL, page, pageSize); // call the function to get the journey history data
      
        var jsonStr = Stringify(response); // used for debugging
        var items = Platform.Function.ParseJSON(response[0]).items; // parse the JSON response from the API

        var deUpsert = "journey-history"; // grab the external key of the DE here     
      
        var journeyHistoryDE = DataExtension.Init(deUpsert); // initialize the DE using the variable containing the external key here

        //var successful = journeyHistoryUpsert(items, journeyHistoryDE); // upsert the data into the DE

        //log("Journey History Upserted Successfully: " + successful + " records"); // log the success message
        
        log(items);
      
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