<?php
// --- "GET" alle tickets  

$sql = "
SELECT 
  t.id,
  t.bezoeker_id,
  t.concert_id,
  t.aankoop_datum,
  CONCAT(b.voornaam, ' ', b.familienaam) AS bezoeker_naam,
  c.artiest AS concert_artiest
FROM tickets t
JOIN bezoekers b ON t.bezoeker_id = b.id
JOIN concerten c ON t.concert_id = c.id
";

// geen prepared statement nodig, aangezien we geen parameters
// van de gebruiker verwerken.

$result = $conn -> query($sql);

if (!$result) {
	$response['code'] = 7;
	$response['status'] = $api_response_code[$response['code']]['HTTP Response'];
	$response['data'] = $conn->error;
	deliver_response($response);
}

// Vorm de resultset om naar een structuur die we makkelijk kunnen 
// doorgeven en stop deze in $response['data']
$response['data'] = getJsonObjFromResult($result); // -> fetch_all(MYSQLI_ASSOC)
// maak geheugen vrij op de server door de resultset te verwijderen
$result->free();
// sluit de connectie met de databank
$conn->close();
// Return Response to browser
deliver_JSONresponse($response);
//deliver_response($response);

exit;
?>