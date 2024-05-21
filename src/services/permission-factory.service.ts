import { createMongoAbility, MongoAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import * as rolesData from '../role.json';

export interface User {
  id: number;
  name: string;
  role_id: number;
  department_id: number;
  custom_permissions: CustomPermission[];
}

export interface CustomPermission {
  resource: string;
  actions: string[];
  department_id: number;
}

export interface SubjectRule {
  action: string[];
  subject: string;
}

@Injectable()
export class PermissionFactory {
  createForUser(user: User, departmentId: number): MongoAbility {
    let rules: SubjectRule[] = [];

    // Проверяем, есть ли у пользователя особые права доступа для этого департамента
    const customPermissions = user.custom_permissions.filter(
      (permission) => permission.department_id === departmentId,
    );
    if (customPermissions.length > 0) {
      rules = customPermissions.map((permission) => ({
        action: permission.actions,
        subject: permission.resource,
      }));
    } else if (user.department_id === departmentId) {
      // Проверяем, есть ли у пользователя департамент, соответствующий departmentId, если есть то проверяем права роли пользователя
      const role = rolesData.roles.find((role) => role.id === user.role_id);
      if (role && role.permissions) {
        rules = role.permissions
          .filter((permission) => permission.department_id === departmentId)
          .map((permission) => ({
            action: permission.actions,
            subject: permission.resource,
          }));
      }
    }

    return createMongoAbility(rules);
  }
}
