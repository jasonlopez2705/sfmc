-- This SQL query identifies email addresses in the _SUBSCRIBERS table
-- that are associated with more than one distinct subscriber key.
-- 
-- Explanation of each part:
-- 1. SELECT EMAILADDRESS, COUNT(DISTINCT SUBSCRIBERKEY) AS CONTACTCOUNT:
--    Retrieves the email address and counts the number of distinct subscriber keys
--    associated with each email address. The count is aliased as CONTACTCOUNT.
--
-- 2. FROM _SUBSCRIBERS:
--    Specifies the source table (_SUBSCRIBERS) from which the data is being queried.
--
-- 3. WHERE EMAILADDRESS IS NOT NULL:
--    Filters out rows where the email address is NULL, ensuring only valid email addresses are considered.
--
-- 4. GROUP BY EMAILADDRESS:
--    Groups the results by email address, so the COUNT function operates on each group.
--
-- 5. HAVING COUNT(DISTINCT SUBSCRIBERKEY) > 1:
--    Filters the grouped results to include only those email addresses
--    that are associated with more than one distinct subscriber key.
--
-- Use Case:
-- This query is useful for identifying duplicate or shared email addresses
-- in the _SUBSCRIBERS table, which may indicate data quality issues or
-- the need for further investigation into subscriber records.
SELECT EMAILADDRESS,
COUNT(DISTINCT SUBSCRIBERKEY) AS CONTACTCOUNT

FROM _SUBSCRIBERS

WHERE EMAILADDRESS IS NOT NULL
GROUP BY EMAILADDRESS

HAVING COUNT(DISTINCT SUBSCRIBERKEY) > 1



-- This query retrieves the top 100 rows of grouped data based on the number of distinct subscriber keys (CONTACTCOUNT)
-- and counts how many email addresses (NUMBEROFPEOPLE) fall into each CONTACTCOUNT group.

SELECT TOP 100
    CONTACTCOUNT, -- The number of distinct subscriber keys associated with an email address
    COUNT(*) AS NUMBEROFPEOPLE -- The number of email addresses that have the same CONTACTCOUNT

FROM (
    -- Subquery: Identifies email addresses and counts the number of distinct subscriber keys (CONTACTCOUNT)
    SELECT EMAILADDRESS,
        COUNT(DISTINCT SUBSCRIBERKEY) AS CONTACTCOUNT -- Counts distinct subscriber keys for each email address

    FROM _SUBSCRIBERS -- Source table containing subscriber data

    WHERE EMAILADDRESS IS NOT NULL -- Filters out rows with NULL email addresses
    GROUP BY EMAILADDRESS -- Groups results by email address
) AS DUPES -- Aliases the subquery as DUPES

GROUP BY CONTACTCOUNT -- Groups the results by CONTACTCOUNT to aggregate the number of email addresses
ORDER BY CONTACTCOUNT ASC -- Orders the results by CONTACTCOUNT in ascending order



SELECT SUBSCRIBERKEY,
EMAILADDRESS,
'DELOITTE PERSONAL TEST EMAILS' AS SOURCE
 
FROM _SUBSCRIBERS

WHERE SUBSCRIBERKEY IN ('SIANGASLOPEZJ1@GMAIL.COM', 'NPFH13@GMAIL.COM', 
'NORWOODCM91@GMAIL.COM', 'SOUNDARYA3375@GMAIL.COM', 'EDU8RDO@GMAIL.COM', 
'HARIKA.JLPS9@GMAIL.COM', 'REAGANJHAY@GMAIL.COM', 'HIMANI.GUPTA18@GMAIL.COM', 
'JCARR731@VERIZON.NET', 'T.W.HORNER106@GMAIL.COM', 'T.W.HORNER123@GMAIL.COM', 'M.SACKETT1@GMAIL.COM',
'CHASEVAUGHAN11@GMAIL.COM', 'MIR46@YAHOO.COM', 'HOOSIERZIHAO@GMAIL.COM', 'ZIHAO.TAN93@GMAIL.COM')
OR EMAILADDRESS IN ('SIANGASLOPEZJ1@GMAIL.COM', 'NPFH13@GMAIL.COM', 
'NORWOODCM91@GMAIL.COM', 'SOUNDARYA3375@GMAIL.COM', 'EDU8RDO@GMAIL.COM', 
'HARIKA.JLPS9@GMAIL.COM', 'REAGANJHAY@GMAIL.COM', 'HIMANI.GUPTA18@GMAIL.COM', 
'JCARR731@VERIZON.NET', 'T.W.HORNER106@GMAIL.COM', 'T.W.HORNER123@GMAIL.COM', 'M.SACKETT1@GMAIL.COM',
'CHASEVAUGHAN11@GMAIL.COM', 'MIR46@YAHOO.COM', 'HOOSIERZIHAO@GMAIL.COM', 'ZIHAO.TAN93@GMAIL.COM')
AND DATEJOINED < DATEADD(DAY, -14, GETDATE()) -- FILTERS OUT RECORDS OLDER THAN 14 DAYS
AND NOT EXISTS (
    -- SUBQUERY: CHECKS IF THE SUBSCRIBER KEY AND EMAIL ADDRESS EXIST IN THE CONTACTDELETE_TESTRECORDS TABLE
    SELECT 1 FROM [CONTACTDELETE_TESTRECORDS]
    WHERE CONTACTDELETE_TESTRECORDS.SUBSCRIBERKEY = _SUBSCRIBERS.SUBSCRIBERKEY
    AND CONTACTDELETE_TESTRECORDS.EMAILADDRESS = _SUBSCRIBERS.EMAILADDRESS
)
GROUP BY SUBSCRIBERKEY, EMAILADDRESS -- GROUPS THE RESULTS BY SUBSCRIBER KEY AND EMAIL ADDRESS

