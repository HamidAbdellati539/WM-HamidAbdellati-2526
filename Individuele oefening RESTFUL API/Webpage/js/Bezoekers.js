(function(){
	"use strict";
	/*jslint browser: true*/
	/*jslint devel: true*/
	let baseApiAddress = "https://hamidabdellati-odisee.be/wm/Individuele%20oefening%20RESTFUL%20API/API/";
	/* Vorige lijn aanpassen naar de locatie op jouw domein! */

	let alertEl = document.getElementById("bezoekersLijst");
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
	function getApiBezoekers() {
		// de producten van de server opvragen en weergeven dmv de alerter functie
		let url = baseApiAddress + "bezoekers.php";

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
					    <span>ID</span><span>Voornaam</span><span>Familienaam</span>
					    <span>Geboortedatum</span><span>Email</span>
					  </div>
					  `;
					for (var i = 0; i < list.length; i++) {
					  tLijst += `
					    <div class="rij">
					      <span>${list[i].id}</span>
					      <span>${list[i].voornaam}</span>
					      <span>${list[i].familienaam}</span>
					      <span>${list[i].geboortedatum}</span>
					      <span>${list[i].email}</span>
						  <span>
								<a href="bezoeker-detail.html?id=${list[i].id}">
								<button>Details</button>
								</a>
							</span>
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
		function postApiBezoekers() {
			let form = document.getElementById("addVisitorForm");
		
			let bezoekerData = {
				voornaam: form.elements["bezoeker_voornaam"].value,
				familienaam: form.elements["bezoeker_familienaam"].value,
				geboortedatum: form.elements["Bezoeker_geboortedatum"].value,
				email: form.elements["Bezoeker_Email"].value,
			};
		
			let url = baseApiAddress + "bezoekers.php";
		
			let opties = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(bezoekerData)
			};
		
			fetch(url, opties)
				.then(response => response.json())
				.then(responseData => {
					if (responseData.ok === false || responseData.status === 400) {
						alerter("Fout: " + responseData.message + "<br>Ontbrekende velden: ");
					} else {
						console.log("Concert toegevoegd:", responseData);
						getApiBezoekers();
					}
				})
				.catch(function (error) {
					alertEl.innerHTML = "Fout bij toevoegen concert: " + error;
				});
		}
			function deleteApiBezoekers(bezoekerId) {
				bezoekerId = document.getElementById("bezoeker_id").value;
				let url = baseApiAddress + "bezoekers.php";

				let opties = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
					body: JSON.stringify({ id: bezoekerId })
				};
			
				fetch(url, opties)
					.then(response => response.json())
					.then(responseData => {
						if (responseData.ok === false) {
							alerter("Fout bij verwijderen: " + responseData.message);
						} else {
							getApiBezoekers();
						}
					})
					.catch(function (error) {
						alertEl.innerHTML = "Fout bij verwijderen concert: " + error;
					});
				
		}
					function putApiBezoekers() {
					let form = document.getElementById("putConcertForm");
					let bezoeker_id = document.getElementById("bezoeker_id").value;
					let bezoeker_voornaam = document.getElementById("bezoeker_voornaam").value;
					let bezoeker_familienaam = document.getElementById("bezoeker_familienaam").value;
					let Bezoeker_geboortedatum = document.getElementById("Bezoeker_geboortedatum").value;
					let Bezoeker_Email = document.getElementById("bezoeker_email").value;

						let bezoekerData = {
						id: bezoeker_id,
						voornaam: bezoeker_voornaam,
						familienaam: bezoeker_familienaam,
						geboortedatum: Bezoeker_geboortedatum,
						email: bezoeker_email,
					};
				
					let url = baseApiAddress + "bezoekers.php";
				
					let opties = {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json"
						},
						body: JSON.stringify(bezoekerData)
					};
				
					fetch(url, opties)
						.then(response => response.json())
						.then(responseData => {
							if (responseData.ok === false) {
								alerter("Fout bij aanpassen: " + responseData.message);
							} else {
								getApiBezoekers();
							}
						})
						.catch(function (error) {
							alertEl.innerHTML = "Fout bij aanpassen concert: " + error;
						});
				}
	// EventListeners
	document.getElementById("btnLaadBezoeker").addEventListener("click", function(){
		getApiBezoekers();
	});
	document.getElementById("btnAddVisitor").addEventListener("click", function(e){
		postApiBezoekers();
	});
	document.getElementById("btnVerwijderBezoeker").addEventListener("click", function(e){
		deleteApiBezoekers();
	});
	document.getElementById("btnAanpassenBezoeker").addEventListener("click", function(e){
		e.preventDefault();
		putApiBezoekers();
	});
	// helper functies
	function alerter(message) {
		alertEl.innerHTML = message;
	}
})();