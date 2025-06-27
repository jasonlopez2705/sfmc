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
        function encryptSymmetric(str) {

            Variable.SetValue("@ToEncrypt", str); 

            var scr = Platform.Function.TreatAsContent("\%\%=ContentBlockByKey('encryption-amp-block')=\%\%");

            return scr;
        }

        var deName = "oauth-secret-store";

        var de = DataExtension.Init(deName);

        var rows = de.Rows.Retrieve();
        if (rows.length > 0) {
            var lastRow = rows[rows.length - 1];

            var clientId = lastRow.ClientId;
            var clientSecret = lastRow.ClientSecret;
            var authUrl = lastRow.AuthBaseURI;
            var packageName = lastRow.PackageName;
            var environment = lastRow.Environment;
            var isActive = lastRow.IsActive;
            var lastUpdated = lastRow.LastUpdated;
            var useSoap = lastRow.UseSOAP;
            var soapEndpoint = lastRow.SOAPEndpoint;
            var mid = lastRow.MID;
            var restUrl = lastRow.RESTBaseURI;
            var soapUrl = lastRow.SOAPBaseURI;

            var encryptedClientSecret = encryptSymmetric(clientSecret);
            var encryptedAuthUrl = encryptSymmetric(authUrl);
            var encryptedRestUrl = encryptSymmetric(restUrl);
            var encryptedSoapUrl = encryptSymmetric(soapUrl);
            var encryptedSoapEndpoint = encryptSymmetric(soapEndpoint);


            var deleted = de.Rows.Remove(["ClientSecret"], [clientSecret]);

            if (deleted) {
                var newRow = {
                    "ClientId": clientId,
                    "ClientSecret": encryptedClientSecret,
                    "AuthBaseURI": encryptedAuthUrl,
                    "PackageName": packageName,
                    "Environment": environment,
                    "IsActive": isActive,
                    "LastUpdated": lastUpdated,
                    "UseSOAP": useSoap,
                    "SOAPEndpoint": encryptedSoapEndpoint,
                    "MID": mid,
                    "RESTBaseURI": encryptedRestUrl,
                    "SOAPBaseURI": encryptedSoapUrl
                };

                var inserted = de.Rows.Add(newRow);

            } else {
                Platform.Function.RaiseError(
                    "Failed to delete the last row from the rows Extension: " + deName,
                    true,
                    "Unable to delete the last row using the old ClientSecret as the key",
                    100
                );
            }

        } else {
            Platform.Function.RaiseError(
                "No rows found in the Data Extension: " + deName,
                true,
                "Unable to run the script as there are no rows in the Data Extension",
                100
            );
        }   
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
