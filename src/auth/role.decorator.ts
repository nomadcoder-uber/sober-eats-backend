import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/entities/user.entitiy';

type AllowedRoles = keyof typeof UserRole | 'Any';

export const Role = (roles: AllowedRoles[]) => SetMetadata('roles', roles);
