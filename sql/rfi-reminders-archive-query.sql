SELECT DE.DATEADDEDTOTHEJOURNEY,
    DE.TYPEOFASSISTANCE,
    DE.CONTACTID,
    DE.EMAIL,
    DE.PREFERREDCONTACTMETHODCODE,
    DE.SECONDDUEDATENUDGE,
    DE.COUNT_VCLDESCRIPTION,
    DE.TODAY_DATE,
    DE.VALIDSOURCERECEIVEDDATE,
    DE.INDIVIDUALID,
    DE.ISHEADOFHOUSEHOLD,
    DE.COUNT_VCLDESCRIPTIONES,
    DE.IS_VERIFICATION_COMPLETED,
    DE.ISINSUFFICIENT,
    DE.PROGRAMCODE,
    DE.LANGUAGEPREFERENCE,
    DE.THIRDDUEDATENUDGE,
    DE.REJECTIONDATE,
    DE.ISEXTENDED,
    DE.DROPDOWN_COMMENTS,
    DE.LASTNAME,
    DE.CASENUMBER,
    DE.VERIFICATIONCHECKLISTDUEDATE,
    DE.FIRSTDUEDATENUDGE,
    DE.IS_CHECKLIST_DUE_DATE_EXPIRED,
    DE.FIRSTNAME,
    DE.PRIMARYPHONENUMBER,
    DE.FOURTHDUEDATENUDGE,
    DE.LOCALE,
    NEWID() AS GUID

FROM DE DE
LEFT JOIN _SENT S ON S.SUBSCRIBERKEY = DE.INDIVIDUALID
LEFT JOIN _JOB J ON S.JOBID = J.JOBID
WHERE DATEDIFF(D,DE.TODAY_DATE, S.EVENTDATE) = 0
AND J.EMAILID IN ('1234', '1235') OR
J. EMAILID IS NULL
