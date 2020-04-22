process.env.NODE_ENV = "test";
require("dotenv").config();

const { expect } = require("chai");
const supertest = require("supertest");

process.env.TEST_DB_URL =
  process.env.TEST_DB_URL ||
  "postgresql://dunder_mifflin@localhost/dungeoneer-toolkittesttest";

global.expect = expect;
global.supertest = supertest;
