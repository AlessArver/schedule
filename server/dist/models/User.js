"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    facebook: String,
    twitter: String,
    google: String,
    password: { type: String, required: true },
    todos: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Todo' }]
}, { timestamps: true });
exports.default = mongoose_1.model('User', schema);
//# sourceMappingURL=User.js.map