"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOmdbSearchData = exports.getOmdbSearchData = void 0;
const axios_1 = __importDefault(require("axios"));
const getOmdbSearchData = ({ s: search_term, type = "movie", page = 1 }) => {
    const API_KEY = process.env.OMDB_KEY || 'ec24a15a';
    return axios_1.default.get(`http://www.omdbapi.com/?s=${search_term}&type=${type}&page=${page}&apikey=${API_KEY}`);
};
exports.getOmdbSearchData = getOmdbSearchData;
const formatOmdbSearchData = (response) => {
    const data = response.data;
    if (data.Error) {
        return {
            error: { message: data.Error }
        };
    }
    if (!data.Search) {
        return {
            error: { message: "Something went wrong" }
        };
    }
    return {
        movies: data.Search.map(({ Title, Year, imdbID, Poster }) => ({
            title: Title,
            year: Year,
            movie_id: imdbID,
            poster: Poster,
        }))
    };
};
exports.formatOmdbSearchData = formatOmdbSearchData;
//# sourceMappingURL=obdbSearchListing.js.map