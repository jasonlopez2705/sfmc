/*
    Query: Click URL Journey Tracking

    Description:
    This query retrieves detailed information about email click events related to a specific journey ("NOSE_Intake_Journey_Final") 
    and a specific URL ("https://kynect.ky.gov/benefits/s/appointment-summary") within the last month. 
    It joins click event data with job, journey activity, and journey metadata to provide context for each click.

    Output Columns:
    - SubscriberKey: Unique identifier for the subscriber who clicked the email.
    - ClickEventDate: Timestamp of the click event.
    - URL: The URL that was clicked.
    - EmailID: Identifier of the email sent.
    - EmailName: Name of the email sent.
    - ActivityID: Identifier of the journey activity.
    - ActivityName: Name of the journey activity.
    - ActivityExternalKey: External key for the journey activity.
    - JourneyID: Identifier of the journey.
    - JourneyName: Name of the journey.
    - VersionNumber: Version of the journey.
    - JourneyStatus: Status of the journey.
    - ClickDate: Date part of the click event.
    - ClickTime: Time part of the click event.

    Filters:
    - Only includes click events from the last month.
    - Only includes clicks from the specified journey and URL.

    Joins:
    - _Click is joined with _Job on JobID to get email details.
    - _Click is joined with _JourneyActivity on TriggererSendDefinitionObjectID to get activity details.
    - _JourneyActivity is joined with _Journey on VersionID to get journey details.
*/
SELECT
    _Click.SubscriberKey,
    _Click.EventDate AS ClickEventDate,
    _Click.URL,
    _Job.EmailID,
    _Job.EmailName,
    _JourneyActivity.ActivityID,
    _JourneyActivity.ActivityName,
    _JourneyActivity.ActivityExternalKey,
    _Journey.JourneyID,
    _Journey.JourneyName,
    _Journey.VersionNumber,
    _Journey.JourneyStatus,
CONVERT(DATE, _Click.EventDate) AS ClickDate,
CONVERT(TIME, _Click.EventDate) AS ClickTime
FROM _Click
LEFT JOIN _Job 
    ON _Click.JobID = _Job.JobID
LEFT JOIN _JourneyActivity 
    ON _Click.TriggererSendDefinitionObjectID = _JourneyActivity.JourneyActivityObjectID
LEFT JOIN _Journey 
    ON _JourneyActivity.VersionID = _Journey.VersionID
WHERE
    _Click.EventDate >= DATEADD(month, -1, GETDATE())
AND _Journey.JourneyName = 'NOSE_Intake_Journey_Final'
AND _Click.URL = 'https://kynect.ky.gov/benefits/s/appointment-summary'