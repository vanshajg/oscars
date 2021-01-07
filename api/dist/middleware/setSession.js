"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSession = void 0;
const uuid_1 = require("uuid");
const setSession = (req, _res, next) => {
    if (!req.session.identity) {
        req.session.identity = uuid_1.v4();
    }
    next();
};
exports.setSession = setSession;
//# sourceMappingURL=setSession.js.map