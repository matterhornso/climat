import { AccessControl as Authorizer, Permission as AuthPermission, Query as AuthQuery } from "accesscontrol";
import { IRoleRepository } from "../../repositories/IRoleRepository";

enum AuthorizationActions {
  READ = "read",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

enum ActivityType {
  ACCEPT = "accept",
  ADD = "add",
  ANNOUNCE = "announce",
  ARRIVE = "arrive",
  BLOCK = "block",
  CREATE = "create",
  DELETE = "delete",
  DISLIKE = "dislike",
  FLAG = "flag",
  FOLLOW = "follow",
  IGNORE = "ignore",
  INVITE = "invite",
  JOIN = "join",
  LEAVE = "leave",
  LIKE = "like",
  LISTEN = "listen",
  MOVE = "move",
  OFFER = "offer",
  QUESTION = "question",
  READ = "read",
  REJECT = "reject",
  REMOVE = "remove",
  TENTATIVE_ACCEPT = "tentativeAccept",
  TENTATIVE_REJECT = "tentativeReject",
  TRAVEL = "travel",
  UNDO = "undo",
  UPDATE = "update",
  VIEW = "view",
}

export class Authorization {
  private roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this.roleRepository = roleRepository
  }

  async getPermission(userRoles: string[], isOwnerOrMember: boolean, action: string, resource: string) {

    let grantList = await this.createGrantListFromDatabase();

    //console.log(grantList);

    // let grantList = [
    //   { role: 'admin', resource: 'rolepermission', action: 'create:any', attributes: '*, !_id' },
    //   { role: 'admin', resource: 'rolepermission', action: 'read:any', attributes: '*, !_id' },
    //   { role: 'admin', resource: 'rolepermission', action: 'update:any', attributes: '*' },
    //   { role: 'admin', resource: 'rolepermission', action: 'delete:any', attributes: '*' },

    //   { role: 'admin', resource: 'role', action: 'create:any', attributes: '*, !_id' },
    //   { role: 'admin', resource: 'role', action: 'read:any', attributes: '*, !_id' },
    //   { role: 'admin', resource: 'role', action: 'update:any', attributes: '*' },
    //   { role: 'admin', resource: 'role', action: 'delete:any', attributes: '*' },

    //   // { role: 'user', resource: 'permission', action: 'create:own', attributes: '*, !rating, !views' },
    //   { role: 'user', resource: 'rolepermission', action: 'read:any', attributes: '*' },
    //   // { role: 'user', resource: 'permission', action: 'update:own', attributes: '*, !rating, !views' },
    //   // { role: 'user', resource: 'permission', action: 'delete:own', attributes: '*' }
    // ];

    const authorizer: Authorizer = new Authorizer(grantList);// await getAuthorizer();
    // const userRoles: string[] = ["admin"]; // await getUserRoles(user);
    const query: AuthQuery = authorizer.can(userRoles);

    // console.log("query", query)
    // grants: any, query: IQueryInfo
    if (isOwnerOrMember) {
      switch (action) {
        case AuthorizationActions.CREATE:
          console.log(query.createOwn(resource))
          return query.createOwn(resource);
        case AuthorizationActions.UPDATE:
          return query.updateOwn(resource);
        case AuthorizationActions.DELETE:
          return query.deleteOwn(resource);
        case AuthorizationActions.READ:
          return query.readOwn(resource);
        default:
          return null;
        // return new Error(); // throw Exception?
      }
    } else {
      switch (action) {
        case AuthorizationActions.CREATE:
          return query.createAny(resource);
        case AuthorizationActions.UPDATE:
          return query.updateAny(resource);
        case AuthorizationActions.DELETE:
          return query.deleteAny(resource);
        case AuthorizationActions.READ:
          return query.readAny(resource);
        default:
          return null; // throw Exception?
      }
    }
  }

  // getPermission -> getAuthorizer -> 

  //   /**
  //  * Checks whether user is authorized
  //  */
  //   getAuthorizer(): Promise<Authorizer> {
  //     const started: number = Date.now();
  //     // TODO getGrantListFromCache
  //     let grantList: Array<{ [key: string]: any }> = this.createGrantListFromDatabase();

  //     if (!grantList) {
  //       //   await refreshGrants();
  //       //   grantList = await createGrantListFromDatabase();
  //       //   log(EventType.CACHE_MISS, AUTHORIZATION_GRANTS_KEY, started);
  //       // } else {
  //       //   log(EventType.CACHE_HIT, AUTHORIZATION_GRANTS_KEY, started);
  //     }

  //     return new Authorizer(grantList);
  //   };


  async createGrantListFromDatabase() {
    const grantList: Array<{ [key: string]: any }> = [];

    const roles: any = await this.roleRepository.getAllRoles();

    // console.log(roles);

    if (!roles) return null;

    roles.forEach((role: any) => {
      if (!role.permissions) return null;
      // console.log("role", role);
      role.permissions.forEach((permission: any) => {
        // console.log("permission", permission);
        const permObj: { [key: string]: any } = {
          action: permission.action,
          attributes: permission.attributes,
          resource: permission.resource,
          role: role.name,
        };
        grantList.push(permObj);
      });
    });

    return grantList;
  }
  // console.log(grantList);


  //   [
  //     {
  //         "archived": false,
  //         "permissions": [
  //             {
  //                 "resource": "a",
  //                 "action": "b",
  //                 "attributes": "c",
  //             },
  //             {
  //                 "resource": "a",
  //                 "action": "b",
  //                 "attributes": "c",
  //             }
  //         ],
  //         "description": "create new role",
  //     }
  // ]
  // console.log("roles", roles);


  // roles.forEach((role: Role) => {
  //   role.permissions.forEach((permission: Permission) => {
  //     const permObj: { [key: string]: any } = {
  //       action: permission.action,
  //       attributes: permission.attributes,
  //       resource: permission.resource,
  //       role: role.id,
  //     };
  //     grantList.push(permObj);
  //   });
  //   // });

  //   logger.debug(grantList);
  // return grantList;
  // }
}

export {
  AuthPermission,
  AuthorizationActions,
  ActivityType
}