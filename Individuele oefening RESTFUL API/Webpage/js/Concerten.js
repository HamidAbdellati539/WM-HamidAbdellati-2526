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

	// EventListeners
	document.getElementById("btnLaadConcert").addEventListener("click", function(){
		getApiConcerten();
	});

	// helper functies
	function alerter(message) {
		alertEl.innerHTML = message;
	}
})();