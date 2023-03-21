class MoviesApi {
    constructor(data) {
      this._beatfilmUrl = data.beatfilmUrl;
      this._headers = data.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        }

    getMovies() {
        return fetch(`${this._beatfilmUrl}`, {
            headers: this._headers,
        }).then((res) => this._checkResponse(res));
    }
}

export const moviesApi = new MoviesApi({
    beatfilmUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        "Content-Type": "application/json",
    },
});
