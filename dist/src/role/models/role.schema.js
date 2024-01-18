"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.RoleSchema = void 0;
const mongoose = require("mongoose");
exports.RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
});
exports.Role = mongoose.model('Role', exports.RoleSchema);
//# sourceMappingURL=role.schema.js.map