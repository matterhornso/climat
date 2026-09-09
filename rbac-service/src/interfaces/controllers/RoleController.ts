import { Controller, Get, Route, Example, Post, Body, Query, Security, Request } from "tsoa"
import { AccessControl } from "accesscontrol"

import { ICreateRoleRequest, IUpdatePermissionRequest, IUpdateRolePermissionRequest, IUpdateRoleRequest } from "./Interface"

import { Role } from '../../domain/index'
import { CreateRole, UpdateRole, GetRole } from '../../application/usecases/index';
import { RoleRepository } from '../database/RoleRepository';

import { Authorization, ActivityType } from "../../application/usecases/utils/Authorization"

import { Util } from "../utils/Util"

// ******* TODO we should not import anything from infrastructure
import { mongoConnection } from './index'
import { Response } from '../response/Response'


@Route('role')
export class RoleController extends Controller {
  public roleRepository!: RoleRepository;
  public ac: AccessControl;
  public authorization: Authorization;

  private roleResource: string = "role"; // matches defined role role "resource"

  constructor() {
    super();
    this.roleRepository = new RoleRepository(mongoConnection);
    this.ac = new AccessControl();
    this.authorization = new Authorization(this.roleRepository);
  }

  /**
   * Create a new role
   * @param role
   */
  @Example({
    "success": true,
    "error": [],
    "data": {
      "description": "string",
      "archived": "bool",
      "permissions": "string[]"
    }
  })
  @Security('jwt')
  @Post("createRole")
  async createRole(@Body() role: ICreateRoleRequest, @Request() request: any) {
    try {
      const action: string = ActivityType.CREATE;
      const isOwnerOrMember: boolean = false; // TODO get this dynamically

      let hasPermission = await new Util().hasPermission(request.user, isOwnerOrMember, action, this.roleResource, this.authorization);

      if (hasPermission != true) {
        this.setStatus(400);
        throw new Response().sendResponseFailure("User Not Authorized", false);
      }

      if (!role) {
        this.setStatus(403);
        throw new Response().sendResponseFailure({ error: "new role data missing" }, false);
      }

      if (!role.name) {
        this.setStatus(400);
        return new Response().sendResponseFailure("new role name missing", false);
      }

      if (!role.description) {
        this.setStatus(400);
        return new Response().sendResponseFailure("no description details found", false);
      }

      const createRole = new CreateRole(this.roleRepository);
      let result = await new Role().createRole(role, createRole);
      return new Response().sendResponseSuccess(result, true);
    } catch (Error: any) {
      this.setStatus(500);
      return new Response().sendResponseFailure(Error.message, false);
    }
  }

  /**
    * Update role
    * @param role
    */
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  @Security('jwt')
  @Post('updateRole')
  async updateRole(@Body() role: IUpdateRoleRequest, @Request() request: any) {
    try {
      const action: string = ActivityType.UPDATE;
      const isOwnerOrMember: boolean = false; // TODO get this dynamically

      let hasPermission = await new Util().hasPermission(request.user, isOwnerOrMember, action, this.roleResource, this.authorization);

      if (hasPermission != true) {
        this.setStatus(400);
        throw new Response().sendResponseFailure("User Not Authorized", false);
      }

      if (!role) {
        this.setStatus(403);
        throw new Response().sendResponseFailure({ error: "role data missing" }, false);
      }

      if (!role.id) {
        this.setStatus(400);
        return new Response().sendResponseFailure("role id is missing!", false);
      }

      const useCase = new UpdateRole(this.roleRepository)
      let result = await new Role().updateRole(role, useCase);
      return new Response().sendResponseSuccess(result, true);
    } catch (Error: any) {
      this.setStatus(500);
      return new Response().sendResponseFailure(Error.message, false);
    }
  }

  /**
  * Update role permissions
  * @param role
  */
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  @Security('jwt')
  @Post('updateRolePermission')
  async updateRolePermission(@Body() role: IUpdateRolePermissionRequest, @Request() request: any) {
    try {
      const action: string = ActivityType.UPDATE;
      const isOwnerOrMember: boolean = false; // TODO get this dynamically

      let hasPermission = await new Util().hasPermission(request.user, isOwnerOrMember, action, this.roleResource, this.authorization);

      if (hasPermission != true) {
        this.setStatus(400);
        return new Response().sendResponseFailure("User Not Authorized", false);
      }

      if (!role) {
        this.setStatus(403);
        return new Response().sendResponseFailure({ error: "role data missing" }, false);
      }

      if (!role.id) {
        this.setStatus(400);
        return new Response().sendResponseFailure("role id is missing!", false);
      }

      // TODO also check if both length is zero
      if (!role.add_permissions && !role.remove_permissions) {
        this.setStatus(400);
        return new Response().sendResponseFailure("permission parameters are missing!", false);
      }

      const useCase = new UpdateRole(this.roleRepository);
      let result = await new Role().updateRolePermission(role, useCase);
      return new Response().sendResponseSuccess(result, true);
    } catch (Error: any) {
      this.setStatus(500);
      return new Response().sendResponseFailure(Error.message, false);
    }
  }

  /**
   * Retrieves role by its ID.
   * @param id The role identifier
   */
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  @Security("jwt")
  @Get('role/{id}')
  public async getRoleByID(id: string, @Request() request: any) {
    try {
      const action: string = ActivityType.READ;
      const isOwnerOrMember: boolean = false; // TODO get this dynamically

      let hasPermission = await new Util().hasPermission(request.user, isOwnerOrMember, action, this.roleResource, this.authorization);

      if (hasPermission != true) {
        this.setStatus(400);
        return new Response().sendResponseFailure("User Not Authorized", false);
      }

      if (!id) {
        this.setStatus(403);
        return new Response().sendResponseFailure("role id is missing!", false);
      }

      const getRole = new GetRole(this.roleRepository);
      let result = await getRole.getRoleByID(id)
      return new Response().sendResponseSuccess(result, true)
    } catch (error: any) {
      return new Response().sendResponseSuccess(error.message, false)
    }
  }

  /**
   * Retrieves role by its Name.
   * @param name The role identifier
   */
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  @Security("jwt")
  @Get('roleByName/{name}')
  public async getRoleByName(name: string, @Request() request: any) {
    try {
      const action: string = ActivityType.READ;
      const isOwnerOrMember: boolean = false; // TODO get this dynamically

      let hasPermission = await new Util().hasPermission(request.user, isOwnerOrMember, action, this.roleResource, this.authorization);

      if (hasPermission != true) {
        this.setStatus(400);
        return new Response().sendResponseFailure("User Not Authorized", false);
      }

      if (!name) {
        this.setStatus(403);
        return new Response().sendResponseFailure("role id is missing!", false);
      }

      const getRole = new GetRole(this.roleRepository);
      let result = await getRole.getRoleByName(name)
      return new Response().sendResponseSuccess(result, true)
    } catch (error: any) {
      return new Response().sendResponseSuccess(error.message, false)
    }
  }

  /**
   * * Retrieves all roles.
   * 
  */
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  @Security("jwt")
  @Get('roles')
  public async getAllRoles(@Request() request: any) {
    try {
      const action: string = ActivityType.READ;
      const isOwnerOrMember: boolean = false; // TODO get this dynamically

      let hasPermission = await new Util().hasPermission(request.user, isOwnerOrMember, action, this.roleResource, this.authorization);

      if (hasPermission != true) {
        this.setStatus(400);
        return new Response().sendResponseFailure("User Not Authorized", false);
      }

      const getRole = new GetRole(this.roleRepository);
      let result = await getRole.getAllRoles()
      return new Response().sendResponseSuccess(result, true)
    } catch (error: any) {
      return new Response().sendResponseSuccess(error.message, false)
    }
  }

  /**
  * get Attribute

  */

  @Security("jwt")
  @Get('getRoleAttribute')
  async getRoleAttribute(@Request() request: any) {
    try {
      const result = await new GetRole(this.roleRepository).getRoleAttribute();
      return new Response().sendResponseSuccess(result, true);
    } catch (Error: any) {
      this.setStatus(500);
      return new Response().sendResponseFailure(Error.message, false);
    }
  }
  @Post("createRoleBulk")
  async createRoleBulk(@Body() role: any, @Request() request: any) {
    try {
      let role_result = await new Util().createRoleBulk(role)
      return new Response().sendResponseSuccess(role_result, true);
    } catch (Error: any) {
      this.setStatus(500);
      return new Response().sendResponseFailure(Error.message, false);
    }
  }
}