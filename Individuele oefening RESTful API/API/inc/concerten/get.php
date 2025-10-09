<?php
// --- "GET" bezoeker(s)

// check of er een ID is opgegeven
if (isset($_GET['id'])) {
    // 1 specifieke bezoeker opvragen + concerten (via JOIN op tickets)
    $stmt = $conn->prepare("
        SELECT 
            c.id AS concert_id,
            c.artiest,
            c.datum,
            c.uur,
            c.venue,
			c.kostprijs,
            b.id AS bezoeker_id,
            b.voornaam,
            b.familienaam,
            b.geboortedatum,
            t.aankoop_datum
        FROM concerten c
        LEFT JOIN tickets t ON c.id = t.concert_id
        LEFT JOIN bezoekers b ON t.bezoeker_id = b.id
        WHERE c.id = ?
    ");

    if(!$stmt){
        die('{"error":"Prepared Statement failed on prepare","errNo":' . json_encode($conn->errno) . ',"mysqlError":' . json_encode($conn->error) . ',"status":"fail"}');
    }

    $stmt->bind_param("i", $_GET['id']);
    $stmt->execute();
    $result = $stmt->get_result();

    $response['data'] = getJsonObjFromResult($result);
    $stmt->close();
    deliver_JSONresponse($response);
    exit;
}

// --- "GET" alle concerten  

$sql="select id, artiest, datum, uur, venue, kostprijs FROM concerten";

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