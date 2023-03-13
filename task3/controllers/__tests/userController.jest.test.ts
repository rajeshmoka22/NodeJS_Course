/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import { Request, Response, NextFunction } from "express";

import app from "../../loaders/express";
import { UserService } from "../../services/userService";
import { jwtValidator } from "../../api/middleware/jwtValidator";
import { apiLogger } from "../../api/middleware/apiLogger";

import {userMockData} from './mockData';
import { UserInput } from "../../types/userInterface";

jest.mock("../../api/middleware/jwtValidator");
jest.mock("../../api/middleware/apiLogger");
jest.mock("../../api/middleware/controllerLogger", () => ({
  ControllerLogger:
    () =>
    (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ): PropertyDescriptor => {
      const originalMethod: any = descriptor.value;
      descriptor.value = async (...args: any): Promise<void> => {
        try {
          await originalMethod.apply(this, args);
        } catch (e) {
          return;
        }
      };

      return descriptor;
    },
}));

describe('Test Suite User Controller', () => {
  beforeEach(() => {
    (apiLogger as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  beforeEach(() => {
    (jwtValidator as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  describe('Test Suite for Create User - /users', () => {
    let userData: UserInput;

    beforeEach(() => {
      const { login, password, age } = userMockData[0];
      userData = { login, password, age };
    });

    it('Should return 200 if successful', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService,'createUser',).and.returnValue(userMockData[0]);

      request(app).post('/users').send(userData)
      .then(response => {
        expect(spy).toHaveBeenCalledWith(userData);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({"message": "user created successfully"});
        done();
      });
    });

    it('Should return 500 if there is an error', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'createUser',).and.throwError('some random error');

      request(app).post('/users').send(userData)
      .then(response => {
        expect(spy).toHaveBeenCalledWith(userData);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message');
        done();
      });
    });
  });

  describe('Test Suite for Get User by Id - /users/:id', () => {
    const testId = userMockData[0].id;
    it('should return 200 if it is success', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'getUser').and.returnValue(userMockData[0]);

      request(app).get(`/users/${testId}`)
      .then(response => {
        expect(spy).toHaveBeenCalledWith(testId);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(userMockData[0]);
        done();
      });
    });

    it('Should return 404 if user does not exists', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'getUser').and.returnValue(undefined);

      request(app).get(`/users/${testId}`)
      .then(response => {
        expect(spy).toHaveBeenCalledWith(testId);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({message: `user not found for id: ${testId}`});
        done();
      });
    });

    it('Should return 500 if there is an error', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'getUser').and.throwError('some random error');

      request(app).get(`/users/${testId}`)
      .then(response => {
        expect(spy).toHaveBeenCalledWith(testId);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
        done();
      });
    });
  });

  describe('Test Suite Update User - /users/:id', () => {
    let userData: UserInput;
    const testId = userMockData[0].id;

    beforeEach(() => {
      const { login, password, age } = userMockData[0];
      userData = { login, password, age };
    });

    it('Should return 200 if update is success', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'updateUser').and.returnValue(userMockData[0]);

      request(app).post(`/users/${testId}`).send(userData)
      .then(response => {
        expect(spy).toHaveBeenCalledWith(testId, userData);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(userMockData[0]);
        done();
      });
    });

    it('Should return 404 if user does not exists', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'updateUser').and.returnValue(undefined);

      request(app).post(`/users/${testId}`).send(userData)
      .then(response => {
        expect(spy).toHaveBeenCalledWith(testId, userData);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({message: `user not found for id: ${testId}`});
        done();
      })
    });

    it('Should return 500 if there is an error', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'updateUser').and.throwError('some random error');

      request(app).post(`/users/${testId}`).send(userData)
      .then(response => {
        expect(spy).toHaveBeenCalledWith(testId, userData);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
        done();
      });
    });
  });

  describe('Test suite for Delete user -  /users/:id', () => {
    const testId = userMockData[0].id;
    it('Should return 200 if success', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'deleteUser').and.returnValue(1);

      request(app).delete(`/users/${testId}`)
      .then(response => {
        expect(spy).toHaveBeenCalledWith(testId);
        expect(response.status).toBe(200);
        done();
      });
    });

    it('Should return 404 if user does not exist', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'deleteUser').and.returnValue(0);

      request(app).delete(`/users/${testId}`)
      .then(response => {
        expect(spy).toHaveBeenCalledWith(testId);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({message: `user not found for id: ${testId}`});
        done();
      });
    });

    it('Should return 500 if there is an error', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'deleteUser').and.throwError('some random error');

      request(app).delete(`/users/${testId}`)
      .then(response => {
        expect(spy).toHaveBeenCalledWith(testId);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message');
        done();
      });
    });
  });

  describe('Test suite Get Users - /users', () => {
    it('Should return 200 and use default uery params', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'getUsers').and.returnValue(userMockData);

      request(app).get('/users')
      .then((response) => {
        expect(spy).toHaveBeenCalledWith({"limit": 10, "loginSubstring": undefined});
        expect(response.status).toBe(200);
        expect(response.body).toEqual(userMockData);
        done();
      });
    });

    it('Should return 200 if success', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'getUsers').and.returnValue(userMockData);
      const loginSubstring = 'Virat';
      const limit = '5';
      request(app).get(`/users?loginSubstring=${loginSubstring}&limit=${limit}`)
      .then((response) => {
        expect(spy).toHaveBeenCalledWith({"limit": "5", "loginSubstring": "Virat"});
        expect(response.status).toBe(200);
        expect(response.body).toEqual(userMockData);
        done();
      });
    });

    it('Should return 500 if there is an error', (done: jest.DoneCallback) => {
      const spy = spyOn(UserService, 'getUsers').and.throwError('some random error');

      request(app).get('/users')
      .then(response => {
        expect(spy).toHaveBeenCalled();
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message');
        done();
      });
    });
  });
});
