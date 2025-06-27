Platform.Load("core", "1");

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

// function to get folder ID ny name
function getFolderID(folderName, parentID){
    var retrieveRequest = Platform.Function.CreateObject("RetrieveRequest"); // create an API RetrieveRequest object
    Platform.Function.SetObjectProperty(retrieveRequest, "ObjectType", "DataFolder"); // set the object type to DataFolder
    Platform.Function.AddObjectArrayItem(retrieveRequest, "Properties", "ID"); // creates an array of properties to retrieve by adding the ID property
    Platform.Function.AddObjectArrayItem(retrieveRequest, "Properties", "Name"); // add the Name property to the array
    Platform.Function.AddObjectArrayItem(retrieveRequest, "Properties", "ParentFolder.ID"); // add the ParentFolder.ID property to the array

    // filters objects to retrieve only the folder we are looking for
    var filterPart1 = Platform.Function.CreateObject("SimpleFilterPart"); // create a simple filter part API object
    Platform.Function.SetObjectProperty(filterPart1, "Property", "Name"); // sets the property to filter by to Name
    Platform.Function.SetObjectProperty(filterPart1, "SimpleOperator", "equals"); // sets the operator to equals
    Platform.Function.AddObjectArrayItem(filterPart1, "Value", folderName); // adds the folder name to the filter part

    var filterPart2 = Platform.Function.CreateObject("SimpleFilterPart");
    Platform.Function.SetObjectProperty(filterPart2, "Property", "ParentFolder.ID");
    Platform.Function.SetObjectProperty(filterPart2, "SimpleOperator", "equals");
    Platform.Function.AddObjectArrayItem(filterPart2, "Value", parentID);

    var complexFilter = Platform.Function.CreateObject("ComplexFilterPart");
    Platform.Function.SetObjectProperty(complexFilter, "LeftOperand", filterPart1);
    Platform.Function.SetObjectProperty(complexFilter, "LogicalOperator", "AND");
    Platform.Function.SetObjectProperty(complexFilter, "RightOperand", filterPart2);

    Platform.Function.SetObjectProperty(retrieveRequest, "Filter", complexFilter);

    var results = Platform.Function.InvokeRetrieve(retrieveRequest);
    return results && results.length > 0 ? results[0].ID : null;
} 

function createDataExtension(deName, folderId, fields){
    var de = Platform.Function.CreateObject("DataExtension");
    Platform.Function.SetObjectProperty(de, "Name", deName);
    Platform.Function.SetObjectProperty(de, "CustomerKey", deName); 
    Platform.Function.SetObjectProperty(de, "Description", "Created by SSJS function");
    Platform.Function.SetObjectProperty(de, "CategoryID", folderId);
    Platform.Function.SetObjectProperty(de, "IsSendable", false);
    Platform.Function.SetObjectProperty(de, "IsTestable", false);

    for (var i = 0; i < fields.length; i++) {
        var column = Platform.Funciton.CreateObject("DataExtensionField");
        Platform.Function.SetObjectProperty(column, "Name", fields[i].Name);
        Platform.Function.SetObjectProperty(column, "FieldType", fields[i].FieldType);
        if (fields[i].MaxLength) {
            Platform.Function.SetObjectProperty(column, "MaxLength", fields[i].MaxLength);
        }
        if (fields[i].IsPrimaryKey) {
            Platform.Function.SetObjectProperty(column, "IsPrimaryKey", fields[i].IsPrimaryKey);
        }
        if (fields[i].IsRequired) {
            Platform.Function.SetObjectProperty(column, "IsRequired", fields[i].IsRequired);
        }
        Platform.Function.AddObjectArrayItem(de, "Fields", column);
    }

    var status = Platform.Function.InvokeCreate(de);
    return status;
}

try { 
    // here we have any code we want debugged
    var rootfolderId = getFolderID("yJason_Test", "0");
    if(!rootfolderId){
        throw new Error("Root folder not found!");
    }

    var deCopiesFolderId = getFolderID("Data Extension Copies", rootfolderId);
    if(!deCopiesFolderId){
        throw new Error("Data Extension Copies folder not found!");
    }

    var createFunctionFolderId = getFolderID("CREATE Function", deCopiesFolderId);
    if(!createFunctionFolderId){
        throw new Error("CREATE Function folder not found!");
    }

    var fields = [
        { Name: "Field1", FieldType: "Text", MaxLength: 50, IsPrimaryKey: true, IsRequired: true },
        { Name: "Field2", FieldType: "Number", IsPrimaryKey: false, IsRequired: false },
        { Name: "Field3", FieldType: "Date", IsPrimaryKey: false, IsRequired: false }
    ];

    var deName = "NewDataExtension_" + Platform.Function.GUID();
    var creationResult = createDataExtension(deName, createFunctionFolderId);
    
    if(creationResult.Status == "OK"){
        log("Data Extension created successfully: " + deName);
    }
    else{
        log("Error creating Data Extension: " + creationResult.Status + " - " + creationResult.Message);
    }

}catch (e) {
    // here is my code and I'm about to log something on the screen
    log(e);
}
