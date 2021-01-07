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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviePointResponse = void 0;
const type_graphql_1 = require("type-graphql");
const Error_1 = require("./Error");
let MoviePoint = class MoviePoint {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MoviePoint.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MoviePoint.prototype, "year", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MoviePoint.prototype, "movie_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MoviePoint.prototype, "poster", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MoviePoint.prototype, "genre", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MoviePoint.prototype, "rating", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MoviePoint.prototype, "language", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MoviePoint.prototype, "actors", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MoviePoint.prototype, "plot", void 0);
MoviePoint = __decorate([
    type_graphql_1.ObjectType()
], MoviePoint);
let MoviePointResponse = class MoviePointResponse {
};
__decorate([
    type_graphql_1.Field(() => Error_1.Error, { nullable: true }),
    __metadata("design:type", Error_1.Error)
], MoviePointResponse.prototype, "error", void 0);
__decorate([
    type_graphql_1.Field(() => MoviePoint, { nullable: true }),
    __metadata("design:type", MoviePoint)
], MoviePointResponse.prototype, "movie", void 0);
MoviePointResponse = __decorate([
    type_graphql_1.ObjectType()
], MoviePointResponse);
exports.MoviePointResponse = MoviePointResponse;
//# sourceMappingURL=moviePoint.js.map