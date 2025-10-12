document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const bezoekerID = params.get("id");

	if (!bezoekerID) {
		return;
	}

	haalConcertDetailOp(bezoekerID);
});

function haalConcertDetailOp(id) {
	let baseApiAddress = "https://hamidabdellati-odisee.be/wm/Individuele%20oefening%20RESTFUL%20API/API/";
	let url = baseApiAddress + "bezoekers.php?id=" + id;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			if (data.ok === false) {
				document.getElementById("bezoekerDetail").innerHTML = "<p>Fout: " + data.message + "</p>";
				return;
			}

			const bezoeker = data.data[0];

			let html = `
				<h2>Concert Detail</h2>
				<p><strong>ID:</strong> ${bezoeker.bezoeker_id}</p>
				<p><strong>Voornaam:</strong> ${bezoeker.voornaam}</p>
				<p><strong>Familienaam:</strong> ${bezoeker.familienaam}</p>
				<p><strong>Geboortedatum:</strong> ${bezoeker.geboortedatum}</p>
				<p><strong>Email:</strong> ${bezoeker.email}</p>
				<br>
				<a href="Bezoekers.html"><button>Terug naar overzicht</button></a>
			`;
			document.getElementById("bezoekerDetail").innerHTML = html;
		})
		.catch(error => {
			document.getElementById("bezoekerDetail").innerHTML = "<p>Fout bij ophalen concertgegevens: " + error + "</p>";
		});
}
