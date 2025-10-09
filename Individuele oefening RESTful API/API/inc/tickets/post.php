<?php
// --- "POST" een ticket  

// Zijn de nodige parameters meegegeven in de request?
check_required_fields(["bezoeker_id", "concert_id"]);

// create prepared statement
if(!$stmt = $conn->prepare("INSERT INTO tickets (bezoeker_id, concert_id) VALUES (?, ?)")){
	die('{"error":"Prepared Statement failed on prepare","errNo":' . json_encode($conn->errno) . ',"mysqlError":' . json_encode($conn->error) . ',"status":"fail"}');
}

// bind parameters ( i = integer )
if(!$stmt->bind_param("ii", $postvars['bezoeker_id'], $postvars['concert_id'])){
	die('{"error":"Prepared Statement bind failed on bind","errNo":' . json_encode($conn->errno) . ',"mysqlError":' . json_encode($conn->error) . ',"status":"fail"}');
}

$stmt->execute();

if($conn->affected_rows == 0) {
	// add failed
	$stmt->close();
	die('{"error":"Prepared Statement failed on execute : no rows affected","errNo":' . json_encode($conn->errno) . ',"mysqlError":' . json_encode($conn->error) . ',"status":"fail"}');
}

// added
$stmt->close();

// wat was de laatst toegevoegde ID?
$id = $conn->insert_id;

// antwoord met een ok -> kijk na wat je in de client ontvangt
die('{"data":"ok","message":"Ticket added successfully","status":200, "id": ' . $id . '}');
?>
