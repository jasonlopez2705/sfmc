SELECT
    _Open.SubscriberKey,
    _Open.EventDate AS OpenEventDate,
    _Open.Domain,
    _Click.EventDate AS ClickEventDate,
    _Click.URL,
    _Click.LinkName,
    _Click.LinkContent,
    _JourneyActivity.ActivityID,
    _JourneyActivity.ActivityName,
    _JourneyActivity.ActivityExternalKey,
    _Journey.JourneyName,
    _Journey.VersionNumber
FROM _Open
LEFT JOIN _Click 
    ON _Open.JobID = _Click.JobID 
    AND _Open.ListID = _Click.ListID 
    AND _Open.BatchID = _Click.BatchID
    AND _Open.SubscriberID = _Click.SubscriberID
    AND _Click.IsUnique = 1
LEFT JOIN _JourneyActivity 
    ON _Open.TriggererSendDefinitionObjectID = _JourneyActivity.JourneyActivityObjectID
LEFT JOIN _Journey 
    ON _JourneyActivity.VersionID = _Journey.VersionID
WHERE _OPEN.ISUNIQUE = 1
AND _JOURNEY.VERSIONID = '055df988-f893-4150-8525-6841d8a4c762'
AND _Open.EventDate >= DATEADD(DAY, -1, GETDATE())


/* This query retrieves the click count activity for subscribers who opened an email in the last 7 days.
   It joins the _Open and _Click data views to get click events related to the opens, 
   along with journey activity and journey details. The results include subscriber key, 
   open event date, click event date, URL clicked, link name, link content, activity ID, 
   activity name, activity external key, journey name, and version number. */