"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieResolver = void 0;
const type_graphql_1 = require("type-graphql");
const obdbSearchListing_1 = require("../utils/obdbSearchListing");
const omdbPoint_1 = require("../utils/omdbPoint");
const moviePoint_1 = require("./moviePoint");
const MoviesResponse_1 = require("./MoviesResponse");
let MovieQuery = class MovieQuery {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MovieQuery.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], MovieQuery.prototype, "page", void 0);
MovieQuery = __decorate([
    type_graphql_1.InputType()
], MovieQuery);
let MovieResolver = class MovieResolver {
    getMovies(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield obdbSearchListing_1.getOmdbSearchData({ s: options.name, page: options.page });
            return obdbSearchListing_1.formatOmdbSearchData(data);
        });
    }
    getPointMovie(imdb_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield omdbPoint_1.getOmdbPointData({ imdb_id });
            return omdbPoint_1.formatOmdbPointData(data);
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => MoviesResponse_1.MoviesResponse),
    __param(0, type_graphql_1.Arg("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MovieQuery]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "getMovies", null);
__decorate([
    type_graphql_1.Mutation(() => moviePoint_1.MoviePointResponse),
    __param(0, type_graphql_1.Arg("imdb_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "getPointMovie", null);
MovieResolver = __decorate([
    type_graphql_1.Resolver()
], MovieResolver);
exports.MovieResolver = MovieResolver;
//# sourceMappingURL=movie.js.map