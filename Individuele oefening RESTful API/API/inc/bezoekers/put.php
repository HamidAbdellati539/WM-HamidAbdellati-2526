<?php
// --- "PUT" een bezoeker

// Zijn de nodige parameters meegegeven in de request?
check_required_fields(["id", "voornaam", "familienaam", "geboortedatum", "email"]);

// create prepared statement
if(!$stmt = $conn->prepare("UPDATE bezoekers SET voornaam = ?, familienaam = ?, geboortedatum = ?, email = ? WHERE id = ?")) {
    die('{"error":"Prepared Statement failed on prepare","errNo":' . json_encode($conn->errno) . ',"mysqlError":' . json_encode($conn->error) . ',"status":"fail"}');
}

// bind parameters ( s = string | i = integer | d = double | b = blob )
if(!$stmt->bind_param("ssssi", $postvars['voornaam'], $postvars['familienaam'], $postvars['geboortedatum'], $postvars['email'], $postvars['id'])) {
    die('{"error":"Prepared Statement bind failed on bind","errNo":' . json_encode($conn->errno) . ',"mysqlError":' . json_encode($conn->error) . ',"status":"fail"}');
}

// statement uitvoeren
$stmt->execute();

if($conn->affected_rows == 0) {
    // update failed
    $stmt->close();
    die('{"error":"Prepared Statement failed on execute : no rows affected","errNo":' . json_encode($conn->errno) . ',"mysqlError":' . json_encode($conn->error) . ',"status":"fail"}');
}

// updated
$stmt->close();
die('{"data":"ok","message":"bezoeker updated successfully","status":200}');
?>