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
exports.MoviesResponse = void 0;
const type_graphql_1 = require("type-graphql");
const movieObj_1 = require("./movieObj");
const Error_1 = require("./Error");
let MoviesResponse = class MoviesResponse {
};
__decorate([
    type_graphql_1.Field(() => Error_1.Error, { nullable: true }),
    __metadata("design:type", Error_1.Error)
], MoviesResponse.prototype, "error", void 0);
__decorate([
    type_graphql_1.Field(() => [movieObj_1.Movie], { nullable: true }),
    __metadata("design:type", Array)
], MoviesResponse.prototype, "movies", void 0);
MoviesResponse = __decorate([
    type_graphql_1.ObjectType()
], MoviesResponse);
exports.MoviesResponse = MoviesResponse;
//# sourceMappingURL=MoviesResponse.js.map