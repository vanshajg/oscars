"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOmdbPointData = exports.getOmdbPointData = void 0;
const axios_1 = __importDefault(require("axios"));
const getOmdbPointData = ({ imdb_id }) => {
    const API_KEY = process.env.OMDB_KEY || 'ec24a15a';
    return axios_1.default.get(`http://www.omdbapi.com/?i=${imdb_id}&apikey=${API_KEY}`);
};
exports.getOmdbPointData = getOmdbPointData;
const formatOmdbPointData = (response) => {
    const data = response.data;
    if (data.Error) {
        return {
            error: { message: data.Error }
        };
    }
    if (data.Response.toLowerCase() === 'false') {
        return {
            error: { message: "something went wrong" }
        };
    }
    if (!data.Title || !data.Year || !data.imdbRating || !data.Poster || !data.Genre || !data.imdbRating ||
        !data.Language || !data.Actors || !data.imdbID || !data.Plot)
        return {
            error: { message: "something went wrong" }
        };
    return {
        movie: {
            title: data.Title,
            year: data.Year,
            movie_id: data.imdbID,
            poster: data.Poster,
            genre: data.Genre,
            rating: data.imdbRating,
            language: data.Language,
            actors: data.Actors,
            plot: data.Plot
        }
    };
};
exports.formatOmdbPointData = formatOmdbPointData;
//# sourceMappingURL=omdbPoint.js.map