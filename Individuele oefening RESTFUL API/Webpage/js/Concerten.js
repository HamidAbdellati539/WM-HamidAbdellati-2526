(function(){
	"use strict";
	/*jslint browser: true*/
	/*jslint devel: true*/
	let baseApiAddress = "https://hamidabdellati-odisee.be/wm/Individuele%20oefening%20RESTFUL%20API/API/";
	/* Vorige lijn aanpassen naar de locatie op jouw domein! */

	let alertEl = document.getElementById("concertenLijst");
	let opties = {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "omit" // include, *same-origin, omit
		/* Opgelet : volgende headers niet toevoegen :
		    JSON triggert de pre-flight mode, waardoor de toegang op
		    deze manier niet meer zal lukken. Tenzij daar in de API expliciet
        rekening is met gehouden ...
		*/
		/*, headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		}*/
	};
	function getApiConcerten() {
		// de producten van de server opvragen en weergeven dmv de alerter functie
		let url = baseApiAddress + "concerten.php";

		// Deze request werkt via GET
		opties.method = "GET";
		// Een GET of HEAD method geef je geen body mee		
		opties.body = null;

		// test de api
		fetch(url, opties)
			.then(function(response) {
				return response.json();
			})
			.then(function(responseData){
				// de verwerking van de data
				var list = responseData.data;

				if (list.length > 0) {
					// er zit minstens 1 item in list, we geven dit ook onmiddelijk weer
					var tLijst = `
					  <div class="rij kOdd">
					    <span>ID</span><span>Artiest</span><span>Datum</span>
					    <span>Uur</span><span>Venue</span><span>Kostprijs</span>
					  </div>
					  `;
					for (var i = 0; i < list.length; i++) {
					  tLijst += `
					    <div class="rij">
					      <span>${list[i].id}</span>
					      <span>${list[i].artiest}</span>
					      <span>${list[i].datum}</span>
					      <span>${list[i].uur}</span>
					      <span>${list[i].venue}</span>
					      <span>${list[i].kostprijs}</span>
					    </div>`;
					}
					tLijst += "<br>";

					alerter(tLijst);
				} else {
					alerter("Servertijd kon niet opgevraagd worden");
				}

			})
			.catch(function(error) {
				// verwerk de fout
				alertEl.innerHTML = "fout : " + error;
			});
		}
		function postApiConcerten() {
			let form = document.getElementById("addConcertForm");
		
			let concertData = {
				artiest: form.elements["Concert_artiest"].value,
				datum: form.elements["Concert_datum"].value,
				uur: form.elements["Concert_uur"].value,
				venue: form.elements["Concert_venue"].value,
				kostprijs: form.elements["Concert_kostprijs"].value
			};
		
			let url = baseApiAddress + "concerten.php";
		
			let opties = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(concertData)
			};
		
			fetch(url, opties)
				.then(response => response.json())
				.then(responseData => {
					if (responseData.ok === false || responseData.status === 400) {
						alerter("Fout: " + responseData.message + "<br>Ontbrekende velden: ");
					} else {
						console.log("Concert toegevoegd:", responseData);
						getApiConcerten();
					}
				})
				.catch(function (error) {
					alertEl.innerHTML = "Fout bij toevoegen concert: " + error;
				});
		}
			function deleteApiConcerten(concertId) {

				concertId = document.getElementById("concert_id").value;
				let url = baseApiAddress + "concerten.php";

				let opties = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
					body: JSON.stringify({ id: concertId })
				};
			
				fetch(url, opties)
					.then(response => response.json())
					.then(responseData => {
						if (responseData.ok === false || responseData.status === 400) {
							alerter("Fout bij verwijderen: " + responseData.message);
						} else {
							alerter("Concert succesvol verwijderd!");
							getApiConcerten(); // Herlaad de lijst
						}
					})
					.catch(function (error) {
						alertEl.innerHTML = "Fout bij verwijderen concert: " + error;
					});
				
		}
				function putApiConcerten() {
					let form = document.getElementById("putConcertForm");
				
					concert_id = document.getElementById("concert_id").value;
					concert_artiest = document.getElementById("concert_artiest").value;
					concert_datum = document.getElementById("concert_datum").value;
					concert_uur = document.getElementById("concert_uur").value;
					concert_venue = document.getElementById("concert_venue").value;
					concert_kostprijs = document.getElementById("concert_kostprijs").value;


						let concertData = {
						id: concert_id,
						artiest: concert_artiest,
						datum: concert_datum,
						uur: concert_uur,
						venue: concert_venue,
						kostprijs: concert_kostprijs
					};
				
					let url = baseApiAddress + "concerten.php";
				
					let opties = {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json"
						},
						body: JSON.stringify(concertData)
					};
				
					fetch(url, opties)
						.then(response => response.json())
						.then(responseData => {
							if (responseData.ok === false || responseData.status === 400) {
								alerter("Fout bij aanpassen: " + responseData.message);
							} else {
								alerter("Concert succesvol aangepast!");
								getApiConcerten();
							}
						})
						.catch(function (error) {
							alertEl.innerHTML = "Fout bij aanpassen concert: " + error;
						});
				}
	
	// EventListeners
	document.getElementById("btnLaadConcert").addEventListener("click", function(){
		getApiConcerten();
	});
	document.getElementById("btnNieuwConcert").addEventListener("click", function(e){
		e.preventDefault();
		postApiConcerten();
	});
		document.getElementById("btnVerwijderConcert").addEventListener("click", function(e){
		e.preventDefault();
		deleteApiConcerten();
	});
		document.getElementById("btnAanpassenConcert").addEventListener("click", function(e){
		e.preventDefault();
		putApiConcerten();
	});

	// helper functies
	function alerter(message) {
		alertEl.innerHTML = message;
	}
})();