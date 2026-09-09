import { UserService } from "../services/User.service";
import { Authorization } from "../../application/usecases/utils/Authorization"
import mongoose from 'mongoose';
import { PermissionModel } from '../../infrastructure/database/permission/permission.model'
import { RoleModel } from '../../infrastructure/database/role/role.model'
export class Util {

  constructor() { }

  async hasPermission(user: any, isOwnerOrMember: boolean, action: string, resource: string, authorization: Authorization): Promise<boolean> {
    return new Promise(async (resolve, reject) => {

      if (!user || !user._user_uuid || !user.jwtToken) return reject(new Error("user not found "));

      const userRolesResult = await new UserService().getUserRoles(user._user_uuid, user.jwtToken);

      if (userRolesResult.success != true || !userRolesResult.data || userRolesResult.data.length == 0) {
        return reject(new Error("user role not found!"));
      }

      let permission = await authorization.getPermission(userRolesResult.data, isOwnerOrMember, action, resource);

      if (permission == null) return reject(new Error("unable to fetch permission!"));

      if (permission.granted == true) return resolve(true);

      return resolve(false);
    });
  }

  checkForValidObjectId(id: string) {
    return mongoose.Types.ObjectId.isValid(id)
  }
  parseResourceKey(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let temp_copy = data;
      let temp_copy1 = [];
      let ids = [];
      for (let i = 0; i < temp_copy.length; i++) {
        let temp = temp_copy[i]
        let t = {
          _id: temp._id,
          resource: temp.resource,
          action: temp.action,
          attributes: temp.attributes,
          transactions: temp.transactions,
          resourceKey: null,
          resourceName: null
        }
        if (this.checkForValidObjectId(temp_copy[i].resource.split(':')[0]) && temp_copy[i].resource.split(':')[0] !== 'organization') {
          t.resourceKey = temp_copy[i].resource.split(':')[0];
          t.resourceName = temp_copy[i].resource.split(':')[1]
          ids.push(temp_copy[i].resource.split(':')[0])
          temp_copy1.push(t)
        } else {
          temp_copy1.push(t)
        }
      }
      return resolve({ parsedResult: temp_copy1, ids: ids });
    });
  }
  parseFinalData(data: any, ids: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let array = data;
      let final_array = [];
      for (let i = 0; i < array.length; i++) {
        let temp = array[i]
        let t = {
          _id: temp._id,
          resource: temp.resource,
          action: temp.action,
          attributes: temp.attributes,
          transactions: temp.transactions,
          resourceKey: temp.resourceKey,
          resourceName: temp.resourceName,
          resourceDisplay: ''
        }
        if (temp.resourceKey) {
          let find = ids.filter((key: any) => key._id == array[i].resourceKey)
          if (find.length > 0) {
            t.resourceDisplay = find[0].name + ":" + temp.resourceName
            final_array.push(t)
          } else {
            t.resourceDisplay = "NA" + ":" + temp.resourceName
            final_array.push(t)
          }
        } else {
          t.resourceDisplay = temp.resource
          final_array.push(t)
        }
      }
      return resolve(final_array);
    });
  }

  //bulk permission create
  async createBulkPermission(permissions: any) {
    console.log("permissions", permissions)
    let permission = await PermissionModel.createPermissionInBulk(permissions);
    return permission;
  }
  //bulk role create
  async createRoleBulk(role: any) {
    let roles = await RoleModel.createRoleBulk(role);
    return roles;
  }
  //findPermissionByActionAndResource
  async findPermissionByActionAndResource(action: string, resource: string) {
    let roles = await PermissionModel.findPermissionByActionAndResource(action, resource);
    return roles;
  }



}