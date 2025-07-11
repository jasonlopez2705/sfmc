SELECT 
CASE
    WHEN SUBSCRIBERKEY LIKE '%@%' THEN 'EMAIL ADDRESS'
    WHEN SUBSCRIBERKEY LIKE '003%' THEN 'SALESFORCE CONTACTID'
    WHEN SUBSCRIBERKEY LIKE '005%' THEN 'SALESFORCE USERID'
    WHEN LEN(SUBSCRIBERKEY) = 7 AND LEFT(SUBSCRIBERKEY, 1) = 'U' THEN 'UI OUTREACH IDENTIFIER'
    WHEN LEN(SUBSCRIBERKEY) = 7 THEN 'IEES IDENTIFIER'
    WHEN LEN(SUBSCRIBERKEY) = 8 AND SUBSCRIBERKEY NOT LIKE '%[^0-9]%' THEN 'ELECTRONICSTAGINGID'
    WHEN LEN(SUBSCRIBERKEY) = 9 AND LEFT(SUBSCRIBERKEY, 1) = '1' AND SUBSCRIBERKEY NOT LIKE '%[^0-9]%' THEN 'INDIVIDUALID'
    WHEN SUBSCRIBERKEY LIKE '%-%' AND LEN(SUBSCRIBERKEY) = 36 THEN 'UUID (36-CHAR)'
    ELSE 'OTHER OR CUSTOM FORMAT'
END AS SUBSCRIBERKEYTYPE,
COUNT(*) AS SUBSCRIBERKEYCOUNT

FROM ALL_CONTACTS_MIRROR_DE

GROUP BY 
CASE
    WHEN SUBSCRIBERKEY LIKE '%@%' THEN 'EMAIL ADDRESS'
    WHEN SUBSCRIBERKEY LIKE '003%' THEN 'SALESFORCE CONTACTID'
    WHEN SUBSCRIBERKEY LIKE '005%' THEN 'SALESFORCE USERID'
    WHEN LEN(SUBSCRIBERKEY) = 7 AND LEFT(SUBSCRIBERKEY, 1) = 'U' THEN 'UI OUTREACH IDENTIFIER'
    WHEN LEN(SUBSCRIBERKEY) = 7 THEN 'IEES IDENTIFIER'
    WHEN LEN(SUBSCRIBERKEY) = 8 AND SUBSCRIBERKEY NOT LIKE '%[^0-9]%' THEN 'ELECTRONICSTAGINGID'
    WHEN LEN(SUBSCRIBERKEY) = 9 AND LEFT(SUBSCRIBERKEY, 1) = '1'  AND SUBSCRIBERKEY NOT LIKE '%[^0-9]%' THEN 'INDIVIDUALID'
    WHEN SUBSCRIBERKEY LIKE '%-%' AND LEN(SUBSCRIBERKEY) = 36 THEN 'UUID (36-CHAR)'
    ELSE 'OTHER OR CUSTOM FORMAT'
END






