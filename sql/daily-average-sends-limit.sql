/*
    ------------------------------------------------------------------------------
    Script Name: daily-average-sends-limit.sql
    Description:
        This script calculates the average daily send count and standard deviation 
        for each automation over the past 30 days, and determines a recommended 
        send limit (mean + 2*stddev) for each automation in Salesforce Marketing Cloud.

    Steps:
        1. DAILYSENDS CTE:
            - Joins _JOB, _SENT, _AUTOMATIONINSTANCE, and _AUTOMATIONACTIVITYINSTANCE 
              to aggregate the number of sends per automation per day for the last 30 days.
        2. STATS CTE:
            - Calculates the average daily sends and standard deviation for each automation.
        3. Final SELECT:
            - Outputs the automation name, average daily sends, standard deviation, 
              and the calculated send limit (mean + 2*stddev) for each automation.

    Usage:
        - Use this script to monitor and set thresholds for daily send volumes 
          per automation to help prevent over-sending.

    Notes:
        - Requires access to _JOB, _SENT, _AUTOMATIONINSTANCE, and _AUTOMATIONACTIVITYINSTANCE data views.
        - The send limit is calculated as AVGDAILYSENDS + 2 * STDDEVSENDS.
    ------------------------------------------------------------------------------
*/
WITH DAILYSENDS AS (
    SELECT
    A.AUTOMATIONNAME,
    CAST(S.EVENTDATE AS DATE) AS SENDDATE,
    COUNT(*) AS DAILYSENDCOUNT
    FROM _JOB J
    INNER JOIN _SENT S ON S.JOBID = J.JOBID
    INNER JOIN (
        SELECT
        J.JOBID,
        A.AUTOMATIONINSTANCEID,
        A.AUTOMATIONNAME
        FROM _AUTOMATIONINSTANCE A
        INNER JOIN _AUTOMATIONACTIVITYINSTANCE AA ON A.AUTOMATIONINSTANCEID = AA.AUTOMATIONINSTANCEID
        INNER JOIN _JOB J ON J.TRIGGEREDSENDCUSTOMERKEY = AA.ACTIVITYID
        ) A ON J.JOBID = A.JOBID
    WHERE S.EVENTDATE >= DATEADD(DAY, -30, GETDATE())
    GROUP BY A.AUTOMATIONNAME, CAST(S.EVENTDATE AS DATE)
),

STATS AS (
    SELECT
    AUTOMATIONNAME,
    AVG(DAILYSENDCOUNT) AS AVGDAILYSENDS,
    STDEVP(DAILYSENDCOUNT) AS STDEVSENDS
    FROM DAILYSENDS
    GROUP BY AUTOMATIONNAME
)

SELECT 
AUTOMATIONNAME,
CAST(AVGDAILYSENDS AS DECIMAL(10,2)) AS AVGDAILYSENDS,
CAST(STDDEVSENDS AS DECIMAL(10,2)) AS STDDEVSENDS,
CAST((AVGDAILYSENDS + 2 * STDDEVSENDS) AS DECIMAL(10,2)) AS SENDLIMIT
FROMT STATS