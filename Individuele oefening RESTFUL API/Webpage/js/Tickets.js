(function(){
	"use strict";
	/*jslint browser: true*/
	/*jslint devel: true*/
	let baseApiAddress = "https://hamidabdellati-odisee.be/wm/Individuele%20oefening%20RESTFUL%20API/API/";
	/* Vorige lijn aanpassen naar de locatie op jouw domein! */

	let alertEl = document.getElementById("ticketsLijst");
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
	function getApiTickets() {
		// de producten van de server opvragen en weergeven dmv de alerter functie
		let url = baseApiAddress + "tickets.php";

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
					    <span>ID</span><span>Bezoeker_ID</span><span>Concert_ID</span>
					  </div>
					  `;
					for (var i = 0; i < list.length; i++) {
					  tLijst += `
					    <div class="rij">
					      <span>${list[i].id}</span>
					      <span>${list[i].bezoeker_id}</span>
					      <span>${list[i].concert_id}</span>
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
			function postApiTickets() {
			let form = document.getElementById("addTicketForm");
		
			let ticketData = {
				bezoeker_id: form.elements["Ticket_bezoekerID"].value,
				concert_id: form.elements["Ticket_concertID"].value,
			};
		
			let url = baseApiAddress + "tickets.php";
		
			let opties = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(ticketData)
			};
		
			fetch(url, opties)
				.then(response => response.json())
				.then(responseData => {
					if (responseData.ok === false) {
						alerter("Fout: " + responseData.message);
					}
				})
				.catch(function (error) {
					alertEl.innerHTML = "Fout bij toevoegen concert: " + error;
				});
		}
				function deleteApiTickets(ticketID) {
				ticketID = document.getElementById("Ticket_ID").value;
				let url = baseApiAddress + "tickets.php";

				let opties = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
					body: JSON.stringify({ id: ticketID })
				};
			
				fetch(url, opties)
					.then(response => response.json())
					.then(responseData => {
						if (responseData.ok === false || responseData.status === 400) {
							alerter("Fout bij verwijderen: " + responseData.message);
						}
					})
					.catch(function (error) {
						alertEl.innerHTML = "Fout bij verwijderen concert: " + error;
					});
				
		}
				function putApiTickets() {
					let form = document.getElementById("putTicketForm");
				
					let Ticket_ID = document.getElementById("Ticket_ID").value;
					let Ticket_bezoekerID = document.getElementById("Ticket_bezoekerID").value;
					let Ticket_concertID = document.getElementById("Ticket_concertID").value;


						let ticketData = {
						id: Ticket_ID,
						bezoeker_id: Ticket_bezoekerID,
						concert_id: Ticket_concertID,
					};
				
					let url = baseApiAddress + "tickets.php";
				
					let opties = {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json"
						},
						body: JSON.stringify(ticketData)
					};
				
					fetch(url, opties)
						.then(response => response.json())
						.then(responseData => {
							if (responseData.ok === false) {
								alerter("Fout bij aanpassen: " + responseData.message);
							}
						})
						.catch(function (error) {
							alertEl.innerHTML = "Fout bij aanpassen concert: " + error;
						});
				}
	// EventListeners
	document.getElementById("btnLaadTickets").addEventListener("click", function(){
		getApiTickets();
	});
	document.getElementById("btnAddTicket").addEventListener("click", function(e){
		postApiTickets();
	});
	document.getElementById("btnDeleteTicket").addEventListener("click", function(e){
		deleteApiTickets();
	});
	document.getElementById("btnPutTicket").addEventListener("click", function(e){
		putApiTickets();
	});
	// helper functies
	function alerter(message) {
		alertEl.innerHTML = message;
	}
})();