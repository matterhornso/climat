import mongoose from 'mongoose';
import { Role } from '../domain';
import { IDBConnection } from '../interfaces/database/IDBConnection'
import { PermissionModel } from './database/permission/permission.model'
import { RoleModel } from './database/role/role.model'
import logger from './logger/logger'

export class MongoConnection extends IDBConnection {

  constructor() {
    super();
    let mongo_url: string;

    if (process.env.MONGODB_URI) {
      mongo_url = process.env.MONGODB_URI + "/" + process.env.DB_NAME + "?authSource=admin";// replicaSet=staging-rs0
    } else if (process.env.ENVIRONMENT?.toString().includes("dev")) {
      // mongo_url = process.env.MONGODB_HOST + ":" + process.env.MONGODB_PORT + "/" + process.env.DB_NAME;
      mongo_url =
        "mongodb://" +
        process.env.DB_USER +
        ":" +
        process.env.DB_PASS +
        "@" +
        process.env.MONGODB_HOST +
        ":" +
        process.env.MONGODB_PORT +
        "/" +
        process.env.DB_NAME +
        "?authSource=admin";
    } else if (process.env.ENVIRONMENT?.toString().includes("test")) {
      mongo_url = process.env.MONGODB_HOST + "/" + process.env.DB_NAME;
    }
     else {
      mongo_url = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" +
        process.env.MONGODB_HOST + ":" + process.env.MONGODB_PORT + "/" + process.env.DB_NAME + "?authSource=admin";
    }

    mongoose.connect(mongo_url).then(
      () => {
        console.log("MongoDB connection successful");
        logger.debug("MongoDB connection successful at " + new Date());
      },
    ).catch((err: string) => {
      console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    });
    return
  }

  // **** Permission *** //

  async createPermission(query: any) {
    let permission = await PermissionModel.createPermission(query);
    return permission;
  }

  async updatePermission(query: any) {
    let permission = await PermissionModel.findOneUpdate(query);
    return permission;;
  }

  async getPermissionByID(id: string) {
    let permission = await PermissionModel.findPermissionById(id);
    return permission;
  }

  async getAllPermissions() {
    let permission = await PermissionModel.getAllPermissions();
    return permission;;
  }

  // **** Permission *** //

  // **** Role *** //

  async createRole(query: any) {
    let role = await RoleModel.createRole(query);
    return role;
  }

  async updateRole(query: any) {
    let role = await RoleModel.findOneUpdate(query);
    return role;;
  }

  async UpdateRolePermission(query: any) {
    let role = await RoleModel.updateRolePermission(query);
    return role;;
  }

  async getRoleByID(id: string) {
    let role = await RoleModel.findRoleById(id);
    return role;
  }

  async getRoleByName(name: string) {
    let role = await RoleModel.findRoleByName(name);
    return role;
  }
  async getAllRoles() {
    let role = await RoleModel.getAllRoles();
    return role;;
  }

  async getRoleAttribute(){
    let role = await RoleModel.getRoleAttribute();
    return role;
  }

  // **** Role *** //
}