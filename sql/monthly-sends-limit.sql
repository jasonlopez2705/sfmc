SELECT STATSEMAILID AS EMAILID,
STATSEMAILNAME AS EMAILNAME,
STATSMONTHLYAVERAGESENDS AS MONTHLYAVERAGESENDS,
STATSMONTHLYSENDSSTDEV AS MONTHLYSENDSSTDEV
FROM (
    SELECT
        JOBEMAILID AS STATSEMAILID,
        JOBEMAILNAME AS STATSEMAILNAME,
        AVG(SENTSENDSTHISMONTH) AS STATSMONTHLYAVERAGESENDS,
        STDEVP(SENTSENDSTHISMONTH) AS STATSMONTHLYSENDSSTDEV
    FROM (
        SELECT
            J.EMAILID AS JOBEMAILID,
            J.EMAILNAME AS JOBEMAILNAME,
            DATEPART(YEAR, S.EVENTDATE) AS SENTSENDYEAR,
            DATEPART(MONTH, S.EVENTDATE) AS SENTSENDMONTH,
            COUNT(*) AS SENTSENDSTHISMONTH
        FROM _SENT S
        LEFT JOIN _JOB J ON S.JOBID = J.JOBID
        WHERE DATEDIFF(YY, S.EVENTDATE, GETDATE()) = 0
        GROUP BY
            J.EMAILID,
            J.EMAILNAME,
            DATEPART(YEAR, S.EVENTDATE),
            DATEPART(MONTH, S.EVENTDATE)
        )AS STATS
    GROUP BY JOBEMAILID,
    JOBEMAILNAME)AS MONTHLYSENDS