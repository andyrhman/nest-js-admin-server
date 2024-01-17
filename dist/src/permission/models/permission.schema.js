"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const mongoose = require("mongoose");
exports.Permission = new mongoose.Schema({
    name: { type: String, required: true }
});
//# sourceMappingURL=permission.schema.js.map