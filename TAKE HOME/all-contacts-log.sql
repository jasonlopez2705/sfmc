-- Select the current count of all contacts and calculate the change in contact count compared to the previous record
SELECT 
    CURR.ALL_CONTACTS, -- Current count of all contacts
    CURR.ALL_CONTACTS - ISNULL(PREV.ALL_CONTACTS, 0) AS CONTACTCHANGE -- Difference between current and previous contact counts

FROM (
    -- Subquery to get the current count of all contacts from the ALL_CONTACTS_MIRROR_DE table
    SELECT COUNT(SUBSCRIBERKEY) AS ALL_CONTACTS
    FROM ALL_CONTACTS_MIRROR_DE
    ) CURR
LEFT JOIN (
    -- Subquery to get the most recent count of all contacts from the ALL_CONTACTS_LOG table
    SELECT TOP 1 ALL_CONTACTS
    FROM ALL_CONTACTS_LOG
    ORDER BY TIMESTAMP DESC -- Order by timestamp to get the latest record
    ) PREV ON 1 = 1 -- Perform a cross join to include the previous record



SELECT CURR.ALL_CONTACTS,
CURR.ALL_CONTACTS - ISNULL(PREV.ALL_CONTACTS, 0) AS CONTACTCHANGE,
DATEADD(HOUR, DATEDIFF(HOUR,0,GETDATE()), 0) AS TIMESTAMP,
NEWID() AS GUID

FROM (
    SELECT COUNT(SUBSCRIBERKEY) AS ALL_CONTACTS
    FROM ALL_CONTACTS_MIRROR_DE
    ) CURR
LEFT JOIN (
    SELECT TOP 1 ALL_CONTACTS
    FROM ALL_CONTACTS_LOG
    ORDER BY TIMESTAMP DESC
    ) PREV ON 1 = 1
