import { expect } from 'chai';
import { LoginIn } from "./index"
import faker from "faker";

let validData = { email: '', password: faker.internet.password(), id: '', captcha: '' };
let validData2 = { email: '', password: faker.internet.password(), id: '', captcha: '' };
let validData3 = { email: 'singh@gmail.com', password: faker.internet.password(), id: '', captcha: '' };
let validData4 = { email: 'singh@gmail.com', password: faker.internet.password(), id: '', captcha: '' };

describe('Test Entity Login', () => {
  it('should set login all value', () => {
    expect(() => new LoginIn().login(validData, null).to.throw())
  });

  it('should validate blank email', () => {
    expect(() => new LoginIn().login(validData2, null).to.throw())
  });
  it('should validate blank password', () => {
    expect(() => new LoginIn().login(validData3, null).to.throw())
  });
  it('should pass use case param', () => {
    expect(() => new LoginIn().login(validData4, null).to.throw())
  });
});