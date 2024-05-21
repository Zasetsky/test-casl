import { Injectable } from '@nestjs/common';
import { PermissionFactory } from './permission-factory.service';

@Injectable()
export class SomeService {
  constructor(private readonly permissionFactory: PermissionFactory) {}

  async someAction() {
    const user = {
      id: 1,
      name: 'Иван Иванов',
      role_id: 1,
      department_id: 1,
      custom_permissions: [
        // {
        //   resource: 'clients',
        //   actions: ['read'],
        //   department_id: 2,
        // },
      ],
    };

    const departmentId = 1;

    const ability = this.permissionFactory.createForUser(user, departmentId);

    if (ability.can('create', 'payments')) {
      return 'Пользователь имеет разрешение';
    } else {
      return 'Пользователь не имеет разрешения';
    }
  }
}
