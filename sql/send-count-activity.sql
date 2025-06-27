SELECT
    _Sent.AccountID,
    _Sent.OYBAccountID,
    _Sent.JobID,
    _Sent.ListID,
    _Sent.BatchID,
    _Sent.SubscriberID,
    _Sent.SubscriberKey,
    _Sent.EventDate AS SentEventDate,
    _Sent.Domain,
    _Sent.TriggererSendDefinitionObjectID,
    _Sent.TriggeredSendCustomerKey,
    _Open.EventDate AS OpenEventDate,
    _JourneyActivity.VersionID,
    _JourneyActivity.ActivityID,
    _JourneyActivity.ActivityName,
    _JourneyActivity.ActivityExternalKey,
    _JourneyActivity.JourneyActivityObjectID,
    _JourneyActivity.ActivityType,
    _Journey.JourneyID,
    _Journey.JourneyName,
    _Journey.VersionNumber,
    _Journey.CreatedDate AS JourneyCreatedDate,
    _Journey.LastPublishedDate,
    _Journey.ModifiedDate,
    _Journey.JourneyStatus
FROM _Sent
LEFT JOIN _Open 
    ON _Sent.JobID = _Open.JobID 
    AND _Sent.ListID = _Open.ListID 
    AND _Sent.BatchID = _Open.BatchID
    AND _Sent.SubscriberID = _Open.SubscriberID
    AND _Open.IsUnique = 1
LEFT JOIN _JourneyActivity 
    ON _Sent.TriggererSendDefinitionObjectID = _JourneyActivity.JourneyActivityObjectID
LEFT JOIN _Journey 
    ON _JourneyActivity.VersionID = _Journey.VersionID