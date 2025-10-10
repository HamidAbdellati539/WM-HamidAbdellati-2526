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
					    <span>ID</span><span>voornaam</span><span>familienaam</span><span>geboortedatum</span><span>email</span>
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

	// EventListeners
	document.getElementById("btnLaadBezoeker").addEventListener("click", function(){
		getApiBezoekers();
	});

	// helper functies
	function alerter(message) {
		alertEl.innerHTML = message;
	}
})();