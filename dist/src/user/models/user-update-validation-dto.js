"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUnique = void 0;
const class_validator_1 = require("class-validator");
function IsUnique(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isUnique',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            async validator(value, args) {
                const [relatedPropertyName] = args.constraints;
                const userService = args.object['userService'];
                const existingUser = await userService.findOne({ [propertyName]: value });
                return !existingUser;
            },
        });
    };
}
exports.IsUnique = IsUnique;
//# sourceMappingURL=user-update-validation-dto.js.map