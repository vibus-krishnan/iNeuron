import "mocha";
import { expect } from "chai";
import * as mongoose from "mongoose";
import app from "../../src/app";
import * as supertest from "supertest";
const agent = supertest.agent(app);

import User from "../Model/User"
import * as testUserData from "./data"
import { response } from "express";
const UserData = testUserData.newUser;

const dbConnectionString: string = "mongodb://localhost:27017/MyDb";

// skipping until needed
describe("Intergration Test with SuperTest Should", function () {

    // before("clear data", function (done) {
    //     // let promises = <any>[];
    //     // .connect(dbConnectionString).then(() => {
    //     // mongoose.connection.collections["users"].drop()
    //     //     .then(() => done());
    //     // })
    //     // setTimeout(() => {
    //     //     mongoose.connection.db.dropDatabase().then(() => done());
    //     // })

    //     mongoose.connect(dbConnectionString, function () {
    //         // mongoose.connection.db.dropDatabase().then(() => done());
    //         mongoose.connection.collections.users.drop().then(() => done());
    //         // done();
    //     })


    //     // for (let i in mongoose.connection.collections) {
    //     //     promises.push(mongoose.connection.collections[i].drop());
    //     // }
    //     // Promise.all(promises)
    //     //     .then(() => done());
    // });
 





        describe("CRUD Test should", function () {

            it("create new user, POST /user/", function (done) {
                const newUser = {
                    name: "Arun",
                    age: 29,
                    location: "Banglore"
                }

                agent.post("/user/")
                    .send(newUser)
                    .expect(response => {
                        response.body.hasOwnProperty("newUser");
                        expect(response.body.newUser.name).equal(newUser.name)
                    })
                    .expect(201, done);

            });


            it("update user, PATCH /user/", function (done) {
                agent.patch(`/user/`)
                    .send(UserData)
                    .expect("Content-Type", /json/)
                    .expect(response => {
                        response.body.hasOwnProperty("updatedUser");
                        expect(response.body.updatedUser.acknowledged).equal(true);
                        expect(response.body.updatedUser.modifiedCount).equal(1);
                    })
                    .expect(201, done);

            });


            it("find user by id, GET /user/:id", function (done) {
                let id: string = "";
                UserData.name = "test123"
                agent.post("/user/")
                    .send(UserData)
                    .expect(response => id = response.body.newUser._id)
                    .then(() => {
                        console.log("ID", id)
                        agent.get(`/user/${id}`)
                            .expect(response => {
                                expect(response.body.userDetails._id).equal(id);
                                expect(response.body.userDetails.name).equal("test123");
                            })
                            .expect(200, done);
                    });

            });

        });

    });