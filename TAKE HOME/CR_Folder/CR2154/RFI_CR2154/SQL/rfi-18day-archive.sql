SELECT
RFI.IndividualID,
RFI.First_DueDate_Flag,
RFI.LastName,
RFI.CaseNumber,
RFI.PreferredContactMethodCode,
RFI.DropDown_Comments,
RFI.TypeOfAssistance,
RFI.Is_Checklist_Due_Date_Expired,
RFI.Initial_VerificationCheckListDueDate,
RFI.IsInsufficient,
RFI.ProgramCode,
RFI.RejectionDate,
RFI.Today_Date,
RFI.LanguagePreference,
RFI.DateAddedtotheJourney,
RFI.IsExtended,
RFI.PrimaryPhoneNumber,
RFI.Locale,
RFI.VerificationCheckListDueDate,
RFI.Email,
RFI.IsHeadOfHousehold,
RFI.ValidSourceReceivedDate,
RFI.FirstName,
RFI.Is_Verification_Completed,
NEWID() AS GUID

FROM TEST_18DAY_REMINDER_ENTRY RFI
LEFT JOIN _SENT S ON S.SUBSCRIBERKEY = RFI.INDIVIDUALID
LEFT JOIN _JOB J ON S.JOBID = J.JOBID
WHERE DATEDIFF(D,RFI.TODAY_DATE, S.EVENTDATE) = 0
AND J.EMAILID IN ('101119', '101122') OR
J. EMAILID IS NULL