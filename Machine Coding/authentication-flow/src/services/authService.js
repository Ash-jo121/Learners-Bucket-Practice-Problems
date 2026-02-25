const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api/auth/";

const api = {
  // JWT Login
  login: async (email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (email && password) {
      return {
        data: {
          userDetails: { id: 1, email, username: "John Doe" },
          accessToken: "mock_jwt_access_token_" + Date.now(),
          refreshToken: "mock_jwt_refresh_token_" + Date.now(),
        },
      };
    }
    throw new Error("Invalid credentials");
  },

  // OAuth Login (Google/GitHub simulation)
  oauthLogin: async (provider) => {
    // In real app, redirect to OAuth provider
    // window.location.href = `https://oauth-provider.com/authorize?client_id=...`;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      data: {
        userDetails: {
          id: 2,
          email: `user@${provider}.com`,
          username: `${provider} User`,
        },
        accessToken: `mock_oauth_token_${provider}_` + Date.now(),
        refreshToken: `mock_oauth_refresh_${provider}_` + Date.now(),
      },
    };
  },

  // Refresh Token
  refreshToken: async (refreshToken) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      accessToken: "mock_new_access_token_" + Date.now(),
    };
  },

  // Protected API call
  getUserProfile: async (token) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    };
  },
};

class AuthService {
  login(email, password) {
    return api.login(email, password).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.userDetails;
  }

  getAuthToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.accessToken;
  }

  signup(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
