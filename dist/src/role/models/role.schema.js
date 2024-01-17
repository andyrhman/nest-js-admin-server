"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose = require("mongoose");
exports.Role = new mongoose.Schema({
    name: { type: String, required: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
});
//# sourceMappingURL=role.schema.js.map