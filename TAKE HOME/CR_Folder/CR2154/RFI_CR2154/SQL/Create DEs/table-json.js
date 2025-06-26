[
    {
        TableName: "Test_RFIs_Pending_DE_ExludeVCL",
        Fields: [
            { Name: "ValidSourceReceivedDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "TypeOfAssistance", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "CaseNumber", FieldType: "VARCHAR", MaxLength: 100, IsPrimaryKey: false, IsRequired: true },
            { Name: "ProgramCode", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "VerificationCheckListDueDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "VCLDescriptionEs", FieldType: "VARCHAR", MaxLength: 500, IsPrimaryKey: false, IsRequired: true },
            { Name: "VCLDescription", FieldType: "VARCHAR", MaxLength: 500, IsPrimaryKey: false, IsRequired: true }
        ]
    },
    {
        TableName: "TEST_Final_RFIs_Pending_DE",
        Fields: [
            { Name: "ValidSourceReceivedDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "TypeOfAssistance", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "ProgramCode", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "CaseNumber", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "VerificationCheckListDueDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "Initial_VerificationCheckListDueDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "First_DueDate+Flag", FieldType: "BOOLEAN", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "IsInsufficient", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "DropDown_Comments", FieldType: "VARCHAR", MaxLength: 500, IsPrimaryKey: false, IsRequired: false },
            { Name: "IsExtended", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "RejectionDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "Today_Date", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "VCLDescriptionEs", FieldType: "VARCHAR", MaxLength: 500, IsPrimaryKey: false, IsRequired: true },
            { Name: "VCLDescription", FieldType: "VARCHAR", MaxLength: 500, IsPrimaryKey: false, IsRequired: true }
        ]
    },
    {
        TableName: "TEST_VCLDescription_Logic_DE",
        Fields: [
            { Name: "IndividualID", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: true, IsRequired: true },
            { Name: "VerificationCheckListDueDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: true, IsRequired: true },
            { Name: "VCLDescription", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "VCLDescriptionEs", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true }
        ]
    },
    {
        TableName: "TEST_Final_RFI_Reminders_Entry_DE",
        Fields: [
            { Name: "IndividualID", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: true, IsRequired: true },
            { Name: "CaseNumber", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: true, IsRequired: true },
            { Name: "ProgramCode", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: true, IsRequired: true },
            { Name: "FirstName", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "LastName", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "Email", FieldType: "EMAIL", MaxLength: 254, IsPrimaryKey: false, IsRequired: false },
            { Name: "PreferredContactMethodCode", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "ContactId", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "VerificationCheckListDueDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "ValidSourceReceivedDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "Is_Checklist_Due_Date_Expired", FieldType: "BOOLEAN", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "Is_Verification_Completed", FieldType: "BOOLEAN", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "DateAddedtotheJourney", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "PrimaryPhoneNumber", FieldType: "PHONE", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "Locale", FieldType: "Locale", MaxLength: 5, IsPrimaryKey: false, IsRequired: true },
            { Name: "TypeOfAssistance", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "LanguagePreference", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "Count_VCLDescriptionEs", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "Count_VCLDescription", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "IsInsufficient", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "DropDown_Comments", FieldType: "VARCHAR", MaxLength: 500, IsPrimaryKey: false, IsRequired: false },
            { Name: "IsExtended", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "RejectionDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "FirstDueDateNudge", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "SecondDueDateNudge", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "ThirdDueDateNudge", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "FourthDueDateNudge", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "Today_Date", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "IsHeadOfHousehold", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true }
        ]
    },
    {
        TableName: "RFI_Reminders_Staging",
        Fields: [
            { Name: "CaseNumber", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: true, IsRequired: true },
            { Name: "FirstName", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "LastName", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "Email", FieldType: "EMAIL", MaxLength: 254, IsPrimaryKey: false, IsRequired: false },
            { Name: "IsHeadOfHousehold", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "PreferredContactMethodCode", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "ContactId", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "VerificationCheckListDueDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "ValidSourceReceivedDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "IndividualID", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "Is_Verification_Completed", FieldType: "BOOLEAN", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "Is_Checklist_Due_Date_Expired", FieldType: "BOOLEAN", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "ProgramCode", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "PrimaryPhoneNumber", FieldType: "PHONE", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "Locale", FieldType: "LOCALE", MaxLength: 5, IsPrimaryKey: false, IsRequired: true },
            { Name: "TypeOfAssistance", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "LanguagePreference", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "Initial_VerificationCheckListDueDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "First_DueDate_Flag", FieldType: "BOOLEAN", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "IsInsufficient", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "DropDown_Comments", FieldType: "VARCHAR", MaxLength: 500, IsPrimaryKey: false, IsRequired: false },
            { Name: "IsExtended", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "RejectionDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "FirstDueDateNudge", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "SecondDueDateNudge", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "ThirdDueDateNudge", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "FourthDueDateNudge", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "Today_Date", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true }
        ]
    },
    {
        TableName: "TEST_Final_RFI_Reminders_DE",
        Fields: [
            { Name: "CaseNumber", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: true, IsRequired: true },
            { Name: "FirstName", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "LastName", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "Email", FieldType: "EMAIL", MaxLength: 254, IsPrimaryKey: false, IsRequired: false },
            { Name: "IsHeadOfHousehold", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "PreferredContactMethodCode", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "VerificationCheckListDueDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "ValidSourceReceivedDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "IndividualID", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: true, IsRequired: true },
            { Name: "ProgramCode", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: true, IsRequired: true },
            { Name: "PrimaryPhoneNumber", FieldType: "PHONE", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "Locale", FieldType: "LOCALE", MaxLength: 5, IsPrimaryKey: false, IsRequired: true },
            { Name: "TypeOfAssistance", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "LanguagePreference", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "Initial_VerificationCheckListDueDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "First_DueDate_Flag", FieldType: "BOOLEAN", MaxLength: null, IsPrimaryKey: false, IsRequired: true },
            { Name: "IsInsufficient", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "DropDown_Comments", FieldType: "VARCHAR", MaxLength: 500, IsPrimaryKey: false, IsRequired: false },
            { Name: "IsExtended", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: false },
            { Name: "RejectionDate", FieldType: "DATE", MaxLength: null, IsPrimaryKey: false, IsRequired: false },
            { Name: "Today_Date", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true },
            { Name: "ContactId", FieldType: "VARCHAR", MaxLength: 50, IsPrimaryKey: false, IsRequired: true }
        ]
    }
]
