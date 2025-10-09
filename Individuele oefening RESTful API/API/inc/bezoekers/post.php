<?php
// --- "POST" een bezoeker  

// Zijn de nodige parameters meegegeven in de request?
check_required_fields(["voornaam", "familienaam","geboortedatum", "email"]);

// create prepared statement
if(!$stmt = $conn->prepare("insert into bezoekers (voornaam, familienaam, geboortedatum, email) values (?,?,?,?)")){
	die('{"error":"Prepared Statement failed on prepare","errNo":' . json_encode($conn -> errno) .',"mysqlError":' . json_encode($conn -> error) .',"status":"fail"}');
}

// bind parameters ( s = string | i = integer | d = double | b = blob )
if(!$stmt -> bind_param("ssss", htmlentities($postvars['voornaam']), $postvars['familienaam'], $postvars['geboortedatum'], $postvars['email'])){
	die('{"error":"Prepared Statement bind failed on bind","errNo":' . json_encode($conn -> errno) .',"mysqlError":' . json_encode($conn -> error) .',"status":"fail"}');
}
$stmt -> execute();

if($conn->affected_rows == 0) {
	// add failed
	$stmt -> close();
	die('{"error":"Prepared Statement failed on execute : no rows affected","errNo":' . json_encode($conn -> errno) .',"mysqlError":' . json_encode($conn -> error) .',"status":"fail"}');
}
// added
$stmt -> close();

// wat was de laatst toegevoegde ID?
$id = $conn -> insert_id;

// antwoord met een ok -> kijk na wat je in de client ontvangt
die('{"data":"ok","message":"Record added successfully","status":200, "id": ' . $id . '}');
?>