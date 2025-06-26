
Platform.Load("core", "1");

var api = new Script.Util.WSProxy();

api.setClientId({
    "ID": Platform.Function.AuthenticatedMemberID()
});

var config = {
    "CustomerKey": String(Platform.Function.GUID()).toUpperCase(),
    "Name": "MyNewDataExtension",
    "CategoryID": 0,
    "Fields": [
        {
            "Name": "FirstName",
            "FieldType": "Text",
            "MaxLength": 50
        },
        {
            "Name": "LastName",
            "FieldType": "Text",
            "MaxLength": 80
        }, 
        {
            "Name": "EmailAddress",
            "FieldType": "EmailAddress",
            "IsPrimaryKey": true,
            "IsRequired" : true
        }
    ],
    "DataRetentionPeriodLength": 4,
    "RowBasedRetention": false,
    "ResetRetentionPeriodOnImport": true,
    "DeleteAtEndOfRetentionPeriod": false,
    "DataRetentionPeriod": "Weeks"
};

var result = api.createItem("DataExtension", config); 

Write(Stringify(result));