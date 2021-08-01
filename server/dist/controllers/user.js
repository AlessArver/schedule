"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.logout = exports.updateUser = exports.getAuthUser = exports.getUser = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
exports.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return res
                .json({
                resultCode: 1,
                errors: errors.array(),
                message: 'Введите корректную почту и пароль.'
            });
        const { name, surname, email, password } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = new models_1.UserModel({ name, surname, email, password: hashedPassword });
        yield user.save();
        res.status(201).json({ resultCode: 0, message: 'Регистрация прошла успешно' });
    }
    catch (e) {
        res.json({ resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e });
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield models_1.UserModel.findOne({ email });
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!email || !isMatch)
            return res.json({ resultCode: 1, message: 'Введите почту и пароль для входа' });
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: 10080 });
        res
            .cookie('userToken', token)
            .json({ resultCode: 0, token, user, message: 'U a logged in' });
    }
    catch (e) {
        res.json({ resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e });
    }
});
exports.getUser = (req, res) => {
    try {
        models_1.UserModel.findById(req.params.id, (e, user) => {
            e ? res.json({ resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e })
                : res.json({ resultCode: 0, user, message: 'User received' });
        });
    }
    catch (e) {
        res.json({ resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e });
    }
};
exports.getAuthUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies['userToken'];
        let user = jwt.verify(token, process.env.SECRET_KEY);
        models_1.UserModel.findById(user.userId, (e, user) => {
            e ? res.json({ resultCode: 1, message: 'Нет авторизации' })
                : res.json({ resultCode: 0, token: req.token, user, message: 'Received your data' });
        });
    }
    catch (e) {
        res.json({ resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e });
    }
});
exports.updateUser = (req, res) => {
    let user = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password
    };
    models_1.UserModel.findByIdAndUpdate(req.params.id, user, (e, user) => {
        e ? res.json({ resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e })
            : res.json({ resultCode: 0, message: 'user is updated' });
    });
};
exports.logout = (req, res) => {
    console.log('log out');
    // if (req.cookies['userToken'])
    //   res
    //     .cookie('userToken', '', {maxAge: 0})
    //     .json({message: 'logged out'})
};
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // UserModel.findByIdAndDelete(req.params.id, (e: any): void => {
    //   e ? res.json({resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e})
    //     : res.json({resultCode: 0, message: 'user is deleted'})
    // })
});
//# sourceMappingURL=user.js.map