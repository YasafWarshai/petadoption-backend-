const mongoose = require("mongoose");

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const signupSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 2 },
    lastName: { type: "string", minLength: 2 },
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password" },
    rePassword: { type: "string", format: "password" },
    phone: { type: "string", minLength: 0 },
    isAdmin: {type: "boolean", default: false},
    bio: {type: "string"},
    savedPets: {type: "array"}
  },
  required: ["firstName", "lastName", "email", "password"],
  additionalProperties: true,
};

const petSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    typeOf: { type: "string", minLength: 1 },
    adoptionStatus: { type: "string", minLength: 1 },
    picture: { type: "string", minLength: 0 },
    height: { type: "string", minLength: 1 },
    weight: { type: "string", minLength: 1 },
    color: { type: "string", minLength: 1 },
    bio: { type: "string", minLength: 0 },
    hypoallergenic: { type: "boolean", default: false },
    dietary: { type: "array" },
    breed: { type: "string", minLength: 1 },
    owner: {type: "string"}

  },
  required: ["name", "typeOf", "adoptionStatus", "height", "weight", "breed", "owner"],
  additionalProperties: true,
};

module.exports = { signupSchema, loginSchema, petSchema };
