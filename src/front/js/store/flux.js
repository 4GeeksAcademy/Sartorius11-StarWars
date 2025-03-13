const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			selectedItem: {},
			category: "",
			contacts: [],
			characters: [],
			planets: [],
			vehicles: [],
			starships: [],
			favorites: [],
			posts: [],
			user: "",
			isLogged: false,
			isAdmin: false,
			alert: { text: '', visible: false, background: 'primary' },

		},
		actions: {

			setUser: (newUser) => { setStore({ user: newUser }) },
			setAlert: (newAlert) => { setStore({ alert: newAlert }) },
			setIsLogged: (value) => { setStore({ isLogged: value }) },
			setIsAdmin: (value) => { setStore({ isAdmin: value }) },
			isUserLogged: () => {
				const data = JSON.parse(localStorage.getItem('user'))
				console.log(data);

				if (data) {
					setStore({
						user: data.first_name,
						isAdmin: data.is_admin,
						isLogged: true,
					})
				}
			},
			logout: () => {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				getActions().setAlert({ text: '', visible: false, background: 'primary' });
				setStore({
					user: '',
					isLogged: false,
					isAdmin: false
				})
			},
			login: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/login`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};
				// console.log(dataToSend);
				const response = await fetch(uri, options)
				if (!response.ok) {
					// Tratar el error
					console.log('error', response.status, response.statusText)
					return
				}
				const data = await response.json();
				console.log("esto es login", data);
				setStore({
					user: data.results,
					isAdmin: data.results.is_admin,
					isLogged: true,
					alert: { text: data.message, visible: true, background: 'success' },
				})
				localStorage.setItem('token', data.access_token)
				localStorage.setItem('user', JSON.stringify(data.results))
			},
			register: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/register`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};
				// console.log(dataToSend);
				const response = await fetch(uri, options)
				if (!response.ok) {
					// Tratar el error
					console.log('error', response.status, response.statusText)
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({
					user: data.results,
					isAdmin: data.results.is_admin,
					isLogged: true,
					alert: { text: data.message, visible: true, background: 'success' },
				})
				localStorage.setItem('token', data.access_token)
				localStorage.setItem('user', JSON.stringify(data.results))
			},




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
				// localStorage.setItem("hola", 'ciao')
				const uri = `${process.env.STARWARS_URL}starships/`;
				console.log(uri)
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
			addToFavorites: async (item) => {

				const store = getStore()
				if (!getStore().favorites.includes(item)) {
					setStore({ ...store, favorites: [...store.favorites, item] });
				}
			},


			setFavorites: (item) => {
				const favorites = getStore().favorites

				if (favorites.includes(item)) {
					setStore({ favorites: favorites.filter((value) => item != value) })
				} else {
					setStore({ favorites: [...favorites, item] })
				}
			}
		}
	};
};


export default getState;