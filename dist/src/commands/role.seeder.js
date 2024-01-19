"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const role_service_1 = require("../role/role.service");
const permission_service_1 = require("../permission/permission.service");
const just_for_fun_1 = require("./just.for.fun");
const bootstrap = async () => {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const roleService = app.get(role_service_1.RoleService);
    const permissionService = app.get(permission_service_1.PermissionService);
    const perms = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_products', 'edit_products', 'view_orders', 'edit_orders'];
    let permissions = await Promise.all(perms.map(async (perm) => {
        return permissionService.seed({ name: perm });
    }));
    await roleService.seed({
        name: 'Admin',
        permissions: permissions.map(perm => perm._id)
    });
    const editorPermissions = permissions.filter((perm, index) => {
        return index !== 3;
    }).map(perm => perm._id);
    await roleService.seed({
        name: 'Editor',
        permissions: editorPermissions
    });
    const viewerPermissions = permissions.filter((perm, index) => {
        return ![1, 3, 5, 7].includes(index);
    }).map(perm => perm._id);
    await roleService.seed({
        name: 'Viewer',
        permissions: viewerPermissions
    });
    (0, just_for_fun_1.justForFun)();
    process.exit();
};
bootstrap();
//# sourceMappingURL=role.seeder.js.map