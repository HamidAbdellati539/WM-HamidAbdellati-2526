<?php
// --- "PUT" een concert

// Zijn de nodige parameters meegegeven in de request?
check_required_fields(["id", "artiest", "datum", "uur", "venue", "kostprijs"]);

// create prepared statement
if(!$stmt = $conn->prepare("UPDATE concerten SET artiest = ?, datum = ?, uur = ?, venue = ?, kostprijs = ? WHERE id = ?")) {
    die('{"error":"Prepared Statement failed on prepare","errNo":' . json_encode($conn->errno) . ',"mysqlError":' . json_encode($conn->error) . ',"status":"fail"}');
}

// bind parameters ( s = string | i = integer | d = double | b = blob )
if(!$stmt->bind_param("ssssdi", $postvars['artiest'], $postvars['datum'], $postvars['uur'], $postvars['venue'], $postvars['kostprijs'], $postvars['id'])) {
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
die('{"data":"ok","message":"Concert updated successfully","status":200}');
?>