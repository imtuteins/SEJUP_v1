import clientAxios from "../config/axios";

class AuthService {
	constructor() {
		this.user = null;
		this.isAuthenticated = false;
		this.error = null;
		this.isLoading = false;
		this.isCheckingAuth = true;
		this.message = null;
		this.token = localStorage.getItem("token") || null;
	}

	async register(username, password) {
		this.isLoading = true;
		this.error = null;
		try {
			const response = await clientAxios.post(`/auth/register`, {
				username, password, role
			});
			this.user = response.data.user;
			this.isAuthenticated = true;
			this.isLoading = false;
		} catch (error) {
			this.error = error.response.data.message || "Error signing up";
			this.isLoading = false;
			throw error;
		}
	}

	async login(username, password) {
	this.isLoading = true;
	this.error = null;

	try {
		const response = await clientAxios.post(`/auth/login`, { username, password });

		const token = response.data;  
		const expiresIn = 20 * 60 * 1000;
		const expirationTime = Date.now() + expiresIn;

		localStorage.setItem("token", token);
		localStorage.setItem("tokenExpiration", expirationTime);

		localStorage.setItem("username", username);


		this.isAuthenticated = true;
		this.token = token;
		this.user = { username }; // mínimo esto
		this.isLoading = false;

		return this.user; 

	} catch (error) {
		this.error = error.response?.data || "Error iniciando sesión";
		this.isLoading = false;
		throw error;
	}
	}


  async loginWithGoogle(tokenGoogle) {
    try {
      const response = await clientAxios.post("/auth/google", { tokenGoogle });

      const jwt = response.data.jwt;
      const email = response.data.email;

      localStorage.setItem("token", jwt);
      localStorage.setItem("username", email);
      localStorage.setItem("role", "CLIENTE"); // Google solo crea clientes

      return {
        username: email,
        rol: "CLIENTE"
      };

    } catch (error) {
      console.error("Error Google Login", error);
      throw error;
    }
  }


	async logout(navigate) {
		this.isLoading = true;
		this.error = null;
		try {
			localStorage.removeItem("token");
			localStorage.removeItem("tokenExpiration");
			localStorage.removeItem('username');
			this.user = null;
			this.isAuthenticated = false;
			this.isLoading = false;
			this.token = null;
			navigate("/login");
		} catch (error) {
			this.error = "Error logging out";
			this.isLoading = false;
			throw error;
		}
	}

	checkAuth() {
		const token = localStorage.getItem("token");
		const expirationTime = localStorage.getItem("tokenExpiration");

		if (token && expirationTime) {
			if (Date.now() >= Number(expirationTime)) {
				localStorage.removeItem("token");
				localStorage.removeItem("tokenExpiration");
				localStorage.removeItem('username');

				this.isAuthenticated = false;
				this.token = null;
				window.location.reload();
			} else {
				this.isAuthenticated = true;
				this.token = token;
			}
		} else {
			this.isAuthenticated = false;
			this.token = null;
		}
	}
}

export default new AuthService();