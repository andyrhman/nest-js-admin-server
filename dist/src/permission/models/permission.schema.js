"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = exports.PermissionSchema = void 0;
const mongoose = require("mongoose");
exports.PermissionSchema = new mongoose.Schema({
    name: { type: String, required: true }
});
exports.Permission = mongoose.model('Permission', exports.PermissionSchema);
//# sourceMappingURL=permission.schema.js.map