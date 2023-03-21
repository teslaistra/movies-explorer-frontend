class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

    _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

getSavedFilms() {
    return fetch(`${this._baseUrl}/movies`, {
        headers: this._headers,
    }).then((res) => this._checkResponse(res));
}

saveFilm(film) {
    return fetch(`${this._baseUrl}/movies`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(film),
    }).then((res) => this._checkResponse(res));
}

deleteFilm(filmId) {
    return fetch(`${this._baseUrl}/movies/${filmId}`, {
        method: "DELETE",
        headers: this._headers,
    }).then((res) => this._checkResponse(res));
}

register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ name, email, password }),
    }).then((res) => this._checkResponse(res));
    }

    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        }).then((res) => this._checkResponse(res));
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._checkResponse(res));
    }

    updateHeader(){
        this._headers = {
            ...this._headers,
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        };
    }

    updateUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then((res) => this._checkResponse(res));
    }
}

export const api = new Api({
  baseUrl: "https://api.diploma.teslaistra.ru",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});