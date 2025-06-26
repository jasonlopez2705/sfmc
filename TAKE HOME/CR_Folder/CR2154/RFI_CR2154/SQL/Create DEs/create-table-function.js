Platform.Load("Core", "1.1.1")
/**
*   @param {String} deName - Name (and CustomerKey) for the Data Extension.
*   @param {Number} folderId - The CategoryID (folder) where the DE will be created.
*   @param {Array} fields - Array of field definitions. Each field should be an object with properties:
*                           Name, FieldType, (optional) MaxLength, (optional) IsPrimaryKey, (optional) IsRequired.
*   @returns {String} - The result of the create opeartion.
*/

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

// debugging for createDataExtension function
// if(SETTINGS["DEBUG"]){
//     function testDECreation(Name, FieldType, MaxLength, IsPrimaryKey, IsRequired) {
//         var field = Platform.Function.CreateObject("DataExtensionField");
//         if(!field) {
//             Write("Failed to create Data Extension object.<br>");
//             return;
//         }
//         Platform.Function.SetObjectProperty(field, "Name", Name);
//         Platform.Function.SetObjectProperty(field, "FieldType", FieldType);
//         Platform.Function.SetObjectProperty(field, "MaxLength", MaxLength);
//         Platform.Function.SetObjectProperty(field, "IsPrimaryKey", IsPrimaryKey ? "true" : "false");
//         Platform.Function.SetObjectProperty(field, "IsRequired", IsRequired ? "true" : "false");
//         Write("Property set on DE Object.<br>");
//     }
// }

function createDataExtension(deName, folderId, fields) {
    var de = Platform.Function.CreateObject("DataExtension"); // creates a new api object var de
    if (!de) {
        Write("Error: Failed to create DataExtension onject.<br>");
        return;
    }

    // set DE properties
    Platform.Function.SetObjectProperty(de, "Name", deName); // sets the value of the property "Name" to deName for the api object de
    Platform.Function.SetObjectProperty(de, "CustomerKey", deName); // sets the value of the property "CustomerKey" to deName for the api object de
    Platform.Function.SetObjectProperty(de, "CategoryID", folderId); // sets the value of the property "CategoryID" to folderId for the api object de
    Platform.Function.SetObjectProperty(de, "IsSendable", "false"); // sets the value of the property "IsSendable" to "false" for the api object de
    Platform.Function.SetObjectProperty(de, "IsTestable", "false"); // sets the value of the property "IsTestable" to "false" for the api object de

    for (var i = 0; i < fields.length; i++) {
        var field = Platform.Function.CreateObject("DataExtensionField"); // creates a new api object var field
        if (!field) {
            Write("Error: Failed to create DataExtensionField object for field: " + fields[i].Name + "<br>");
            continue;
        }
        Platform.Function.SetObjectProperty(field, "Name", fields[i].Name); // sets the value of the property "Name" to the corerspondending i Name for the api object field
        Platform.Function.SetObjectProperty(field, "FieldType", fields[i].FieldType); // sets the value of the property "FieldType" to the corerspondending i FieldType for the api object field
        if (fields[i].MaxLength) {
            Platform.Function.SetObjectProperty(field, "MaxLength", fields[i].MaxLength); // sets the value of the property "MaxLength" to the correspondeing i MaxLength for the api object field
        }
        Platform.Function.SetObjectProperty(field, "IsPrimaryKey", fields[i].IsPrimaryKey ? "true" : "false"); // sets the value of the property "IsPrimaryKey" to the corresponding i inline if statement check for IsPrimaryKey
        Platform.Function.SetObjectProperty(field, "IsRequired", fields[i].IsRequired ? "true" : "false"); // sets the value of the property "IsRequired" to the corresponding i inline if statement check for IsRequired
        Platform.Function.AddObjectArrayItem(de, "Fields", field); // creates an array of field for the api object de
    }
    var status = Platform.Function.InvokeCreate(de); // sets status to function that invokes create method for de
    return status; // returns status of create method
}

try { 
    // code you want debugged
    var deName = "MyNewDe_" + Platform.Function.GUID();
    var folderId = 408480; // folderId of folder the DE will be created in
    // fields to be entered into new DE
    var fields = [
    { Name: "CustomerID", FieldType: "Text", MaxLength: 50, IsPrimaryKey: true, IsRequired: true },
    { Name: "OrderID", FieldType: "Text", MaxLength: 50, IsPrimaryKey: false, IsRequired: true }
    ];

    var creationResult = createDataExtension(deName, folderId, fields);

    Write("Data Extension creation result: " + creationResult);
}catch (e) {
    // here is my code and I'm about to log something on the screen
    log(e);
}