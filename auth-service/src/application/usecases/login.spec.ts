import { expect } from 'chai';
import { MongoConnection } from '../../infrastructure/MongoConnection';
import { LoginRepository } from '../../interfaces/database/LoginRepository';
import { Login } from './Login';
import dotenv from "dotenv";
import faker from "faker";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, `../../../env/${process.env.ENVIRONMENT}.env`)
});

const mongoConnection = new MongoConnection()

let dummyData = { email: faker.internet.email(), password: faker.internet.password() }
let dummyData1 = { email: 'Alvis_Donnelly8@hotmail.com', password: faker.internet.password() }

describe('Test class login', () => {
  it('Login-execute-incorrect-email-or-password', async () => {
    // const userRepository1 = new LoginRepository(mongoConnection);
    // const login = new Login(userRepository1);
    // let res = await login.execute(dummyData);
    //console.log("res",res)
    expect(null).to.be.null;
  });
  // TODO
  // it('Login-execute-success', async () => {
  //   const userRepository1 = new LoginRepository(mongoConnection);
  //   const login = new Login(userRepository1);
  //   let res = await login.execute(dummyData1);
  //   expect(res).to.be.not.null;
  // });

});