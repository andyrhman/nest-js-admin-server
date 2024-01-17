"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
});
exports.UserSchema.pre('save', function (next) {
    if (this.isModified('email')) {
        this.email = this.email.toLowerCase();
    }
    if (this.isModified('username')) {
        this.username = this.username.toLowerCase();
    }
    next();
});
//# sourceMappingURL=user.schema.js.map