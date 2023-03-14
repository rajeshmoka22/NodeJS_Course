/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../../loaders/express";
import { GroupService } from "../../services/groupService";
import { GroupRequest } from "../../types/groupInterface";
import { jwtValidator } from "../../api/middleware/jwtValidator";
import { apiLogger } from "../../api/middleware/apiLogger";

import {groupMockData} from './mockData';
import { UserGroupService } from "../../services/userGroupService";

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

describe("Test Suite Group Controller", () => {
  beforeEach(() => {
    (apiLogger as jest.Mock).mockImplementation((req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  beforeEach(() => {
    (jwtValidator as jest.Mock).mockImplementation((req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  describe("Test Suite for Creating Group (/groups)", () => {
    let groupData: GroupRequest;

    beforeEach(() => {
      const { name, permissions } = groupMockData[0];
      groupData = { name, permissions };
    });

    it("Should return created group and 200 status as response",  (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService, "createGroup").and.returnValue(groupMockData[0]);

      request(app).post("/groups").send(groupData)
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(groupData);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({"message": "group created successfully"});
        done();
      });
    });

    it("Should throw an error with 500 if there's an error", (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService, "createGroup").and.throwError("An error occured");

      request(app).post("/groups").send(groupData)
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(groupData);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
        done();
      });
    });
  });

  describe("Test Suite for Deleting group by id - /groups/:id", () => {
    const testId = groupMockData[0].id
    it("Should return 200 if success", (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService,"deleteGroup").and.returnValue(testId);

      request(app).delete(`/groups/${testId}`)
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(testId);
        expect(response.status).toBe(200);
        done();
      });
    });

    it("Should return 404 if group does not exist", (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService,"deleteGroup").and.returnValue(0);

      request(app).delete(`/groups/${testId}`)
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(testId);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({message: `group not found for id: ${testId}`});
        done();
      });
    });

    it("Should return 500 if there is an error", (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService,"deleteGroup").and.throwError("An error occured");

      request(app).delete(`/groups/${testId}`)
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(testId);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
        done();
      });
    });
  });

  describe("Test Suite for Getting Groups (/groups)", () => {
    it("Should return groups and 200 status as response", (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService, "getAllGroups").and.returnValue(groupMockData);

      request(app).get("/groups")
      .then((response) => {
        expect(spy).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body).toEqual(groupMockData);
        done();
      });
    });

    it("Should throw an error with 500 if there's an error", (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService, "getAllGroups").and.throwError(
        "An error occured"
      );

      request(app).get("/groups")
      .then((response) => {
        expect(spy).toHaveBeenCalled();
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
        done();
      });
    });
  });

  describe("Test Suite for getting group by Id - /groups/:id", () => {
    const testId = groupMockData[0].id;

    it("Should return group and 200 status as response", (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService, "getGroup").and.returnValue(
        groupMockData[0]
      );

      request(app).get(`/groups/${testId}`)
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(testId);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(groupMockData[0]);
        done();
      });
    });

    it("Should return 404 if group does not exist", (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService, "getGroup").and.returnValue(
        undefined
      );

      request(app).get(`/groups/${testId}`)
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(testId);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: `group not found for id ${testId}`});
        done();
      });
    });

    it("Should throw an error with 500 if there's an error", (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService, "getGroup").and.throwError(
        "An error occured"
      );

      request(app).get(`/groups/${testId}`)
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(testId);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message');
        done();
      });
    });
  });

  describe("Test Suite for add users to group -  /groups/:id/addUsers", () => {
    const testId = groupMockData[0].id;
    const usersData: Array<string> =  ['34543', '23435', '34656'];

    it("Should return 200 if success", (done: jest.DoneCallback) => {
      const spy = spyOn(UserGroupService,"addUsersToGroup").and.returnValue(usersData.length);

      request(app).post(`/groups/${testId}/addUsers`).send({userId: usersData})
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(testId, usersData);
        expect(response.status).toBe(200);
        done();
      });
    });

    it("Should return 404 if group does not exists", (done: jest.DoneCallback) => {
      const spy = spyOn(UserGroupService,"addUsersToGroup").and.returnValue(0);

      request(app).post(`/groups/${testId}/addUsers`).send({userId: usersData})
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(testId, usersData);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({message:`group not found for id ${testId}`})
        done();
      });
    });

    it("should return 500 if there is an error", (done: jest.DoneCallback) => {
      const spy = spyOn(UserGroupService, "addUsersToGroup").and.throwError("An error occured");

      request(app).post(`/groups/${testId}/addUsers`).send({userId: usersData})
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(testId, usersData);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
        done();
      });
    });
  });

  describe("Test Suite for updating group - /groups/:id", () => {
    let groupRequest: GroupRequest;
    const testId = groupMockData[0].id;

    beforeEach(() => {
      const { name, permissions } = groupMockData[0];
      groupRequest = { name, permissions };
    });

    it("Should return 200 with updated group", (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService, "updateGroup").and.returnValue(groupMockData[0]);

      request(app).post(`/groups/${testId}`).send(groupRequest)
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(testId, groupRequest);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(groupMockData[0]);
        done();
      });
    });

    it("Should return 404 if group does not exists", (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService,"updateGroup").and.returnValue(undefined);
      
      request(app).post(`/groups/${testId}`).send(groupRequest)
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(testId, groupRequest);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({message: `group not found for id: ${testId}`});
        done();
      });
    });

    it("Should return 500 if there is any error", (done: jest.DoneCallback) => {
      const spy = spyOn(GroupService, "updateGroup").and.throwError("An error occured");

      request(app).post(`/groups/${testId}`).send(groupRequest)
      .then((response) => {
        expect(spy).toHaveBeenCalledWith(testId, groupRequest);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
        done();
      });
    });
  });

});
