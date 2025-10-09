<?php
// --- "PUT" een ticket

// Zijn de nodige parameters meegegeven in de request?
check_required_fields(["id", "bezoeker_id", "concert_id"]);

// create prepared statement
if(!$stmt = $conn->prepare("UPDATE tickets SET bezoeker_id = ?, concert_id = ? WHERE id = ?")) {
    die('{"error":"Prepared Statement failed on prepare","errNo":' . json_encode($conn->errno) . ',"mysqlError":' . json_encode($conn->error) . ',"status":"fail"}');
}

// bind parameters ( s = string | i = integer | d = double | b = blob )
if(!$stmt->bind_param("ssi", $postvars['bezoeker_id'], $postvars['concert_id'], $postvars['id'])) {
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
die('{"data":"ok","message":"ticket updated successfully","status":200}');
?>