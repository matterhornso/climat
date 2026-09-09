import { Controller, Get, Route, Example, Post, Body, Query, Security, Request } from "tsoa"
import { AccessControl } from "accesscontrol"

import { ICreatePermissionRequest, IUpdatePermissionRequest } from "./Interface"
import { Permission } from '../../domain/index'
import { CreatePermission, UpdatePermission, GetPermission } from '../../application/usecases/index';
import { PermissionRepository } from '../database/PermissionRepository';
import { RoleRepository } from '../database/RoleRepository';

import { Authorization, ActivityType } from "../../application/usecases/utils/Authorization"

// ******* TODO we should not import anything from infrastructure
import { mongoConnection } from './index'
import { Response } from '../response/Response'
import { Util } from "../utils/Util"
import { UserService } from "../services/User.service";


@Route('permission')
export class PermissionController extends Controller {
  public permissionRepository!: PermissionRepository;
  public roleRepository!: RoleRepository;
  public ac: AccessControl;
  public authorization: Authorization;

  private rolePermissionResource: string = "rolepermission";

  constructor() {
    super();
    this.ac = new AccessControl();
    this.permissionRepository = new PermissionRepository(mongoConnection);
    this.roleRepository = new RoleRepository(mongoConnection);
    this.authorization = new Authorization(this.roleRepository);
  }

  /**
   * Create a new permission
   * @param new_permission
   */
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  @Security("jwt")
  @Post("createPermission")
  async createPermission(@Body() new_permission: ICreatePermissionRequest, @Request() request: any) {
    try {
      const action: string = ActivityType.CREATE;
      const isOwnerOrMember: boolean = false; // TODO get this dynamically

      let hasPermission = await new Util().hasPermission(request.user, isOwnerOrMember, action, this.rolePermissionResource, this.authorization);

      if (hasPermission != true) {
        this.setStatus(400);
        return new Response().sendResponseFailure("User Not Authorized", false);
      }

      if (!new_permission) {
        this.setStatus(400);
        return new Response().sendResponseFailure({ error: "new_permission missing" }, false);
      }

      if (!new_permission.resource) {
        this.setStatus(400);
        return new Response().sendResponseFailure("no resource details found", false);
      }

      if (!new_permission.action) {
        this.setStatus(400);
        return new Response().sendResponseFailure("no action details found", false);
      }

      if (!new_permission.attributes) {
        this.setStatus(400);
        return new Response().sendResponseFailure("no attributes details found", false);
      }
      // // TODO make sure both array and correct format
      // if (!new_permission.signatures) {
      //   this.setStatus(400);
      //   return new Response().sendResponseFailure("signatures missing", false);
      // }

      // if (!new_permission.serializedTransaction) {
      //   this.setStatus(400);
      //   return new Response().sendResponseFailure("serializedTransaction missing", false);
      // }

      const useCase = new CreatePermission(this.permissionRepository);
      let result = await new Permission().createPermission(new_permission, useCase);
      return new Response().sendResponseSuccess(result, true);
    } catch (Error: any) {
      this.setStatus(500);
      return new Response().sendResponseFailure(Error.message, false);
    }
  }

  /**
    * Update permission
    * @param request
    */
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  @Security("jwt")
  @Post('updatePermission')
  async updatePermission(@Body() update_permission: IUpdatePermissionRequest, @Request() request: any) {
    try {
      const action: string = ActivityType.UPDATE;
      const isOwnerOrMember: boolean = false; // TODO get this dynamically

      let hasPermission = await new Util().hasPermission(request.user, isOwnerOrMember, action, this.rolePermissionResource, this.authorization);

      if (hasPermission != true) {
        this.setStatus(400);
        return new Response().sendResponseFailure("User Not Authorized", false);
      }

      if (!update_permission.id) {
        this.setStatus(403);
        return new Response().sendResponseFailure("permission id is missing!", false);
      }

      const useCase = new UpdatePermission(this.permissionRepository)
      let result = await new Permission().updatePermission(update_permission, useCase);
      return new Response().sendResponseSuccess(result, true);
    } catch (Error: any) {
      this.setStatus(500);
      return new Response().sendResponseFailure(Error.message, false);
    }
  }

  /**
   * Retrieves permission by its ID.
   * @param id The permission identifier
   */
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  @Security("jwt")
  @Get('permission/{id}')
  public async getPermissionByID(id: string, @Request() request: any) {
    try {
      const action: string = ActivityType.READ;
      const isOwnerOrMember: boolean = false; // TODO get this dynamically

      let hasPermission = await new Util().hasPermission(request.user, isOwnerOrMember, action, this.rolePermissionResource, this.authorization);

      if (hasPermission != true) {
        this.setStatus(400);
        return new Response().sendResponseFailure("User Not Authorized", false);
      }

      if (!id) {
        this.setStatus(403);
        return new Response().sendResponseFailure("permission id is missing!", false);
      }

      const useCase = new GetPermission(this.permissionRepository);
      let result = await useCase.getPermissionByID(id)
      return new Response().sendResponseSuccess(result, true)
    } catch (error: any) {
      return new Response().sendResponseSuccess(error.message, false)
    }
  }

  /**
   * Retrieves all permissions.
   * 
  */
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  @Security("jwt")
  @Get('permissions')
  public async getAllPermissions(@Request() request: any) {
    try {
      const action: string = ActivityType.READ;
      const isOwnerOrMember: boolean = false; // TODO get this dynamically

      let hasPermission = await new Util().hasPermission(request.user, isOwnerOrMember, action, this.rolePermissionResource, this.authorization);

      if (hasPermission != true) {
        this.setStatus(400);
        return new Response().sendResponseFailure("User Not Authorized", false);
      }
      const useCase = new GetPermission(this.permissionRepository);
      let result = await useCase.getAllPermissions();
      let rss = await new Util().parseResourceKey(result)
      let dept = await new UserService().getDepartmentByIDS(rss.ids, '')
      let result_final = await new Util().parseFinalData(rss.parsedResult, dept.data)
      return new Response().sendResponseSuccess(result_final, true);
    } catch (error: any) {
      return new Response().sendResponseFailure(error.message, false)
    }
  }

  /**
   * isPermissionGranted
   * @param isOwnerOrMember
   * @param action
   * @param resource
   * @param userRoles
   */
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  @Security('jwt')
  @Get('isPermissionGranted')
  public async isPermissionGranted(@Query() userRoles: string[], @Query() isOwnerOrMember: boolean, @Query() action: string, @Query() resource: string, @Request() request: any) {
    try {
      let permission = await this.authorization.getPermission(userRoles, isOwnerOrMember, action, resource);
      if (permission && permission.granted == true) return new Response().sendResponseSuccess(true, true);
      return new Response().sendResponseSuccess(false, false);
    } catch (error: any) {
      return new Response().sendResponseFailure(error.message, false)
    }
  }

  /**
   * isPermissionGranted
   * @param isOwnerOrMember
   * @param action
   * @param resource
   * @param userRoles
   */
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  @Security('jwt')
  @Get('getPermission')
  public async getPermission(@Query() userRoles: string[], @Query() isOwnerOrMember: boolean, @Query() action: string, @Query() resource: string, @Request() request: any) {
    try {
      let permission = await this.authorization.getPermission(userRoles, isOwnerOrMember, action, resource);
      if (permission && permission.granted == true) return new Response().sendResponseSuccess({ granted: permission.granted, attributes: permission.attributes }, true);
      return new Response().sendResponseSuccess(false, false);
    } catch (error: any) {
      return new Response().sendResponseFailure(error.message, false)
    }
  }
  @Post("createPermissionBulk")
  async createPermissionBulk(@Body() new_permission: any, @Request() request: any) {
    try {
      let result = await new Util().createBulkPermission(new_permission)
      return new Response().sendResponseSuccess(result, true);
    } catch (Error: any) {
      this.setStatus(500);
      return new Response().sendResponseFailure(Error.message, false);
    }
  }

  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  @Get('findPermissionByActionAndResource')
  public async findPermissionByActionAndResource(@Query() action: string, @Query() resource: string, @Request() request: any) {
    try {
      let permission = await new Util().findPermissionByActionAndResource(action, resource)
      return new Response().sendResponseSuccess(permission, true);
    } catch (error: any) {
      return new Response().sendResponseFailure(error.message, false)
    }
  }


}
