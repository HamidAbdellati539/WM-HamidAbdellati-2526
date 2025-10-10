document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const concertId = params.get("id");

	if (!concertId) {
		return;
	}

	haalConcertDetailOp(concertId);
});

function haalConcertDetailOp(id) {
	let baseApiAddress = "https://hamidabdellati-odisee.be/wm/Individuele%20oefening%20RESTFUL%20API/API/";
	let url = baseApiAddress + "concerten.php?id=" + id;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			if (data.ok === false) {
				document.getElementById("concertDetail").innerHTML = "<p>Fout: " + data.message + "</p>";
				return;
			}

			const concert = data.data[0];
			console.log("Concert object:", concert);

			let html = `
				<h2>Concert Detail</h2>
				<p><strong>ID:</strong> ${concert.concert_id}</p>
				<p><strong>Artiest:</strong> ${concert.artiest}</p>
				<p><strong>Datum:</strong> ${concert.datum}</p>
				<p><strong>Uur:</strong> ${concert.uur}</p>
				<p><strong>Venue:</strong> ${concert.venue}</p>
				<p><strong>Kostprijs:</strong> €${concert.kostprijs}</p>
				<br>
				<a href="Concerten.html"><button>Terug naar overzicht</button></a>
			`;
			document.getElementById("concertDetail").innerHTML = html;
		})
		.catch(error => {
			document.getElementById("concertDetail").innerHTML = "<p>Fout bij ophalen concertgegevens: " + error + "</p>";
		});
}
