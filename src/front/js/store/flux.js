const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			contacts: [],
			currentContacts: {},
			characters: [],
			starships: [],
			planets: [],

			character: {},
			planet: {},
			starship: {},
			favorites: [],


		},
		actions: {

			setCurrentContact: (contact) => { setStore({ currentContacts: contact }) },

			getContacts: async () => {
				const host = 'https://playground.4geeks.com/contact';
				const user = 'Sartorius11';

				const uri = `${host}/agendas/${user}/contacts`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.error('Error', response.status, response.statusText);
					return;
				}
				const data = await response.json();

				setStore({ contacts: data.contacts })
			},
			addContacts: async (dataToSend) => {
				const host = 'https://playground.4geeks.com/contact';
				const user = 'Sartorius11';
				const uri = `${host}/agendas/${user}/contacts`;

				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.error('Error', response.status, response.statusText);
					return;
				}
				getActions().getContacts();

			},

			deleteContact: async (id) => {
				const host = 'https://playground.4geeks.com/contact';
				const user = 'Sartorius11';
				const uri = `${host}/agendas/${user}/contacts/${id}`;
				const options = { method: "DELETE" };
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.error('Error', response.status, response.statusText);
					return;
				}

				// Actualizar la lista después de eliminar
				getActions().getContacts();
			},
			updateContact: async (contact, id) => {
				// PUT Method
				const host = 'https://playground.4geeks.com/contact';
				const user = 'Sartorius11';
				const dataToSend = contact;
				const uri = `${host}/agendas/${user}/contacts/${id}`;
				const options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(dataToSend),
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error:", response.status, response.statusText);
					return;
				}
				getActions().getContacts();
				setStore({ currentContacts: {} });
			},
			getCharacters: async () => {


				const uri = `${process.env.STARWARS_URL}people/`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.error('Error', response.status, response.statusText);
					return;
				}
				const data = await response.json();

				setStore({ characters: data.results })
			},

			getStarships: async () => {

				const uri = `${process.env.STARWARS_URL}starships`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.error('Error', response.status, response.statusText);
					return;
				}
				const data = await response.json();

				setStore({ starships: data.results });
			},
			getPlanets: async () => {


				const uri = `${process.env.STARWARS_URL}planets/`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.error('Error', response.status, response.statusText);
					return;
				}
				const data = await response.json();

				setStore({ planets: data.results })
			},
			getCharacter: async (uid) => {
				const uri = `${process.env.STARWARS_URL}people/${uid}`;
				const options = { method: "GET" };
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error:", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				setStore({ character: data.result.properties });
			},

			getStarship: async (uid) => {
				const uri = `${process.env.STARWARS_URL}starships/${uid}`;
				const options = { method: "GET" };
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error:", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				console.log(data);
				setStore({ starship: data.result.properties });
			},
			getPlanet: async (uid) => {
				const uri = `${process.env.STARWARS_URL}planets/${uid}`;

				const options = { method: "GET" };
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error:", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				setStore({ planet: data.result.properties });
			},
		}
	};
};


export default getState;