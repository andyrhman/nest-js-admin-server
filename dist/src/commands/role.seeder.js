"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const permission_schema_1 = require("../permission/models/permission.schema");
const role_schema_1 = require("../role/models/role.schema");
mongoose_1.default.connect('mongodb://localhost/node_admin').then(async () => {
    const perms = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_products', 'edit_products', 'view_orders', 'edit_orders'];
    let permissions = await Promise.all(perms.map(async (perm) => {
        return permission_schema_1.Permission.create({ name: perm });
    }));
    await role_schema_1.Role.create({
        name: 'Admin',
        permissions: permissions.map(perm => perm._id)
    });
    const editorPermissions = permissions.filter((perm, index) => {
        return index !== 3;
    }).map(perm => perm._id);
    await role_schema_1.Role.create({
        name: 'Editor',
        permissions: editorPermissions
    });
    const viewerPermissions = permissions.filter((perm, index) => {
        return ![1, 3, 5, 7].includes(index);
    }).map(perm => perm._id);
    await role_schema_1.Role.create({
        name: 'Viewer',
        permissions: viewerPermissions
    });
    console.log('🌱 Seeding complete!');
    process.exit(0);
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
//# sourceMappingURL=role.seeder.js.map