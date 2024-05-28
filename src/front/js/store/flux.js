const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			user: null,

			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			signup: async (email, password, confirmPassword) => {
				try {
					if (password !== confirmPassword) {
						throw new Error('Passwords do not match');
						return;
					}

					const resp = await fetch("https://bug-free-garbanzo-6997vjxrp4g6hxvxq-3001.app.github.dev/api/create_user", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email:email, password:password})
					});
					const data = await resp.json();
					console.log("User is signed up!", data);
					setStore({ token: data.token, user: data.user });
					return data;
				} catch (error) {
					console.error('Signup error:', error);
					// Handle errors (e.g., show error message)
				}
			},
			login: async (email, password) => {
				try {
					const resp = await fetch("https://bug-free-garbanzo-6997vjxrp4g6hxvxq-3001.app.github.dev/api/create_token",{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email:email, password:password})
					});
					const data = await resp.json();
					console.log("User is logged in!", data);
					sessionStorage.setItem("token", data.token);
					sessionStorage.setItem("user", JSON.stringify(data.user.email));
					setStore({ token: data.token, user: data.user });
					return data;
				} catch (error) {
					console.error('Login error:', error);
					// Handle errors (e.g., show error message)
				}
			},
			logout: () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("user");
				setStore({ token: null, user: null });
			}
		}
	};
};

export default getState;
