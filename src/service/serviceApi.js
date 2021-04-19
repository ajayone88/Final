const serviceApi = () => {
  const URI = "/api/v1/";
  const signUp = (data, baseUrl = URI) => {
    const inputData = JSON.stringify(data);
    return fetch(baseUrl + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: inputData,
    });
  };

  const login = (data, baseUrl = URI) => {
    const token = data.username + ":" + data.password;
    const hash = window.btoa(token);
    return fetch(baseUrl + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Authorization: "Basic " + hash,
      },
    });
  };

  const logout = (data, baseUrl = URI) => {
    return fetch(baseUrl + "auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Authorization: "Bearer " + data,
      },
    });
  };

  const getMovies = (queryParms, baseUrl = URI) => {
    return fetch(baseUrl + "movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      params: queryParms,
    });
  };

  const getMovie = (data, baseUrl = URI) => {
    return fetch(baseUrl + `movies/${data.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  };

  const getGenres = (baseUrl = URI) => {
    return fetch(baseUrl + "genres", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  };

  const getArtists = (queryParms, baseUrl = URI) => {
    return fetch(baseUrl + "artists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      params: queryParms,
    });
  };

  return {
    signUp,
    login,
    logout,
    getMovies,
    getMovie,
    getGenres,
    getArtists,
  };
};

export default serviceApi;
