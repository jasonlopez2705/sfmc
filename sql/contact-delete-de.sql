SELECT RecordID AS SUBSCRIBERKEY,
EMAIL AS EMAILADDRESS,
MIN(DATEJOINED) AS DATEJOINED

FROM 
LEFT JOIN _SUBSCRIBERS S
ON RecordID = S.SUBSCRIBERKEY

GROUP BY RecordID, EMAIL