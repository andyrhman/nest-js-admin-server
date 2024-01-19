import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { RoleService } from "src/role/role.service";
import { PermissionService } from "src/permission/permission.service";
import { justForFun } from "./just.for.fun";

const bootstrap = async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    
    const roleService = app.get(RoleService);
    const permissionService = app.get(PermissionService);

    const perms = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_products', 'edit_products', 'view_orders', 'edit_orders'];

    let permissions = await Promise.all(perms.map(async (perm) => {
        return permissionService.seed({ name: perm });
    }));

    await roleService.seed({
        name: 'Admin',
        permissions: permissions.map(perm => perm._id)
    });

    const editorPermissions = permissions.filter((perm, index) => {
        return index !== 3; // exclude 'edit_roles'
    }).map(perm => perm._id);

    await roleService.seed({
        name: 'Editor',
        permissions: editorPermissions
    });

    const viewerPermissions = permissions.filter((perm, index) => {
        return ![1, 3, 5, 7].includes(index); // exclude 'edit_users', 'edit_products', 'edit_orders'
    }).map(perm => perm._id);

    await roleService.seed({
        name: 'Viewer',
        permissions: viewerPermissions
    });

    justForFun();

    process.exit()
}
bootstrap();