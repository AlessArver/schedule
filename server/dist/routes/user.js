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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const controller = __importStar(require("../controllers/user"));
const router = express_1.default.Router();
router.post('/register', [
    express_validator_1.check('email', 'Введите корректный email').isEmail(),
    express_validator_1.check('password', 'Пароль не может быть короче 6 символов')
        .isLength({ min: 6 })
], controller.register);
router.post('/login', controller.login);
router.get('/:id', controller.getUser);
router.get('/', controller.getAuthUser);
router.put('/update/:id', controller.updateUser);
router.get('/logout', (req, res) => {
    console.log('log out');
    // if (req.cookies['userToken'])
    //   res
    //     .cookie('userToken', '', {maxAge: 0})
    //     .json({message: 'logged out'})
});
router.delete('/delete/:id', controller.deleteUser);
// router.get('/auth/google',
//   passport.authenticate('google', {scope: ''}))
// router.get('/auth/google/callback',
//   passport.authenticate('google', {failureRedirect: '/login'}),
//   (req: Request, res: Response) => res.redirect('/api/todos'))
exports.default = router;
//# sourceMappingURL=user.js.map