const { expect } = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
} = require("sequelize-test-helpers");

const User = require("../User");

describe("Check", () => {
    const Model = User(sequelize, dataTypes);
    const instance = new Model();
    checkModelName(Model)("User");
    context("properties", () => {
        ["name", "email"].forEach(checkPropertyExists(instance));
    });
});
