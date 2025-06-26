CREATE TABLE Test_RFIs_Pending_DE_ExludeVCL (
    ValidSourceReceivedDate DATE NULL,
    TypeOfAssistance VARCHAR(50) NOT NULL,
    CaseNumber VARCHAR(100) NOT NULL,
    ProgramCode VARCHAR(50) NOT NULL,
    VerificationCheckListDueDate DATE NOT NULL,
    VCLDescriptionEs VARCHAR(500) NOT NULL,
    VCLDescription VARCHAR(500) NOT NULL
);

CREATE TABLE TEST_Final_RFIs_Pending_DE (
    ValidSourceReceivedDate DATE NULL,
    TypeOfAssistance VARCHAR(50) NOT NULL,
    ProgramCode VARCHAR(50) NOT NULL,
    CaseNumber VARCHAR(50) NOT NULL,
    VerificationCheckListDueDate DATE NOT NULL,
    Initial_VerificationCheckListDueDate DATE NULL,
    First_DueDate+Flag BOOLEAN NOT NULL DEFAULT 0, -- Flag to indicate if it's the first due date
    IsInsufficient VARCHAR(50) NULL,
    DropDown_Comments VARCHAR(500) NULL,
    IsExtended VARCHAR(50) NULL,
    RejectionDate DATE NULL,
    Today_Date DATE NOT NULL DEFAULT CURRENT_DATE, -- Current date for comparison
    VCLDescriptionEs VARCHAR(500) NOT NULL,
    VCLDescription VARCHAR(500) NOT NULL
);

CREATE TABLE TEST_VCLDescription_Logic_DE (
    IndividualID VARCHAR(50) PRIMARY KEY,
    VerificationCheckListDueDate DATE PRIMARY KEY,
    VCLDescription VARCHAR(50) NOT NULL,
    VCLDescriptionEs VARCHAR(50) NOT NULL
);

CREATE TABLE TEST_Final_RFI_Reminders_Entry_DE (
    IndividualID VARCHAR(50) PRIMARY KEY,
    CaseNumber VARCHAR(50) PRIMARY KEY,
    ProgramCode VARCHAR(50) PRIMARY KEY,
    FirstName VARCHAR(50) NULL,
    LastName VARCHAR(50) NULL,
    Email EMAIL(254) NULL,
    PreferredContactMethodCode VARCHAR(50) NULL,
    ContactId VARCHAR(50) NOT NULL,
    VerificationCheckListDueDate DATE NOT NULL,
    ValidSourceReceivedDate DATE NULL,
    Is_Checklist_Due_Date_Expired BOOLEAN NOT NULL,
    Is_Verification_Completed BOOLEAN NOT NULL,
    DateAddedtotheJourney DATE NOT NULL DEFAULT CURRENT_DATE,
    PrimaryPhoneNumber PHONE(50) NULL,
    Locale Locale(5) NOT NULL,
    TypeOfAssistance VARCHAR(50) NOT NULL,
    LanguagePreference VARCHAR(50) NULL DEFAULT 'English',
    Count_VCLDescriptionEs VARCHAR(50) NULL,
    Count_VCLDescription VARCHAR(50) NULL,
    IsInsufficient VARCHAR(50) NULL,
    DropDown_Comments VARCHAR(500) NULL,
    IsExtended VARCHAR(50) NULL,
    RejectionDate DATE NULL,
    FirstDueDateNudge DATE NOT NULL,
    SecondDueDateNudge DATE NOT NULL,
    ThirdDueDateNudge DATE NOT NULL,
    FourthDueDateNudge DATE NOT NULL,
    Today_Date DATE NOT NULL,
    IsHeadOfHousehold VARCHAR(50) NOT NULL
);

CREATE TABLE RFI_Reminders_Staging (
    CaseNumber VARCHAR(50) PRIMARY KEY,
    FirstName VARCHAR(50) NULL,
    LastName VARCHAR(50) NULL,
    Email EMAIL(254) NULL,
    IsHeadOfHousehold VARCHAR(50) NOT NULL,
    PreferredContactMethodCode VARCHAR(50) NULL,
    ContactId VARCHAR(50) NOT NULL,
    VerificationCheckListDueDate DATE NOT NULL,
    ValidSourceReceivedDate DATE NULL,
    IndividualID VARCHAR(50) NOT NULL,
    Is_Verification_Completed BOOLEAN NULL,
    Is_Checklist_Due_Date_Expired BOOLEAN NULL,
    ProgramCode VARCHAR(50) NOT NULL,
    PrimaryPhoneNumber PHONE(50) NULL,
    Locale LOCALE(5) NOT NULL,
    TypeOfAssistance VARCHAR(50) NULL,
    LanguagePreference VARCHAR(50) NULL DEFAULT 'English',
    Initial_VerificationCheckListDueDate DATE NULL,
    First_DueDate_Flag BOOLEAN NOT NULL,
    IsInsufficient VARCHAR(50) NULL,
    DropDown_Comments VARCHAR(500) NULL,
    IsExtended VARCHAR(50) NULL,
    RejectionDate DATE NULL,
    FirstDueDateNudge DATE NOT NULL,
    SecondDueDateNudge DATE NOT NULL,
    ThirdDueDateNudge DATE NOT NULL,
    FourthDueDateNudge DATE NOT NULL,
    Today_Date DATE NOT NULL
);

CREATE TABLE TEST_Final_RFI_Reminders_DE (
    CaseNumber VARCHAR(50) PRIMARY KEY,
    FirstName VARCHAR(50) NULL,
    LastName VARCHAR(50) NULL,
    Email EMAIL(254) NULL,
    IsHeadOfHousehold VARCHAR(50) NOT NULL DEFAULT 'Y',
    PreferredContactMethodCode VARCHAR(50) NULL,
    VerificationCheckListDueDate DATE NOT NULL,
    ValidSourceReceivedDate DATE NULL,
    IndividualID VARCHAR(50) PRIMARY KEY,
    ProgramCode VARCHAR(50) PRIMARY KEY,
    PrimaryPhoneNumber PHONE(50) NULL,
    Locale LOCALE(5) NOT NULL,
    TypeOfAssistance VARCHAR(50) NOT NULL,
    LanguagePreference VARCHAR(50) NULL,
    Initial_VerificationCheckListDueDate DATE NULL,
    First_DueDate_Flag BOOLEAN NOT NULL,
    IsInsufficient VARCHAR(50) NULL,
    DropDown_Comments VARCHAR(500) NULL,
    IsExtended VARCHAR(50) NULL,
    RejectionDate DATE NULL,
    Today_Date VARCHAR(50) NOT NULL,
    ContactId VARCHAR(50) NOT NULL
);