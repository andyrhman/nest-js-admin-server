import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';
import { RoleDocument as Role } from 'src/role/models/role.schema';
import { UserDocument as User } from 'src/user/models/user.schema';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService
    ) {}

  async canActivate(
    context: ExecutionContext,
  ){

    const access = this.reflector.get<string>('access', context.getHandler());
    if (!access) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();

    const id = await this.authService.userId(request);

    const user: User = await this.userService.findUserAndPopulate(id);

    const role: Role = await this.roleService.findRolesAndPopulate(user.role._id);

    // Delete this if you want only permissions like @HasPermission('view_users') or @HasPermission('edit_users')
    if (request.method === 'GET') {
      return role.permissions.some(p => (p.name === `view_${access}`) || (p.name === `edit_${access}`));
    }

    return role.permissions.some(p => p.name === `edit_${access}`);
  }
}