import { expect } from 'chai';
import { Auth } from "./index"
import faker from "faker";
let validData = { uuid: '', jwtToken: '', userAgent: '', ipAddress: '', type: '', captchaVerify: false, otp: '' };
let validData1 = { uuid: '', jwtToken: 'abcdd', userAgent: '1234', ipAddress: faker.internet.ip(), type: '11', captchaVerify: false, otp: '' };
let validData2 = { uuid: '1234', jwtToken: '', userAgent: '1234', ipAddress: faker.internet.ip(), type: '11', captchaVerify: false, otp: '' };
let validData3 = { uuid: '1234', jwtToken: 'abcdd', userAgent: '', ipAddress: faker.internet.ip(), type: '11', captchaVerify: false, otp: '' };
let validData4 = { uuid: '12345', jwtToken: 'abcdd', userAgent: '1234', ipAddress: '', type: '11', captchaVerify: false, otp: '' };
let validData5 = { uuid: '12345', jwtToken: 'abcdd', userAgent: '1234', ipAddress: faker.internet.ip(), type: '11', captchaVerify: false, otp: '' };

describe('Test Entity Auth', () => {
  it('should set Auth all value', () => {
    expect(() => new Auth().generateJwtToken(validData, null).to.throw())
  });
  it('should validate blank uuid', () => {
    expect(() => new Auth().generateJwtToken(validData1, null).to.throw())
  });
  it('should validate blank jwtToken', () => {
    expect(() => new Auth().generateJwtToken(validData2, null).to.throw())
  });
  it('should validate blank userAgent', () => {
    expect(() => new Auth().generateJwtToken(validData3, null).to.throw())
  });
  it('should validate blank ipAddress', () => {
    expect(() => new Auth().generateJwtToken(validData4, null).to.throw())
  });
  it('should pass use case param', () => {
    expect(() => new Auth().generateJwtToken(validData5, null).to.throw())
  });

  it('should set Auth verify token all value', () => {
    expect(() => new Auth().verifyJwtToken('', '',).to.throw())
  });
  it('should set Auth verify token all value', () => {
    expect(() => new Auth().verifyJwtToken('abcd', '',).to.throw())
  });
  it('should set Auth verify token all value', () => {
    expect(() => new Auth().verifyJwtToken('', '123').to.throw())
  });
  it('should pass use case param', () => {
    expect(() => new Auth().verifyJwtToken('abcd', '123').to.throw())
  });
});