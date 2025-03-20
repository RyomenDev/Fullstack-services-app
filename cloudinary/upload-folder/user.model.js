const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: "recipe",
    },
    shoppingList: {
      _id: false,
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "ingredient",
          },
          measure: {
            type: String,
            default: "",
          },
        },
      ],
      default: [],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    subscribed: {
      type: Boolean,
      default: false,
    },
    subscribedToken: {
      type: String,
      required: false,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const update = Joi.object({
  name: Joi.string().required(),
});

const subscribe = Joi.object({ email: Joi.string().email().required() });

const authValidators = {
  register,
  signin,
  update,
  subscribe,
};

const User = model("user", userSchema);

module.exports = {
  User,
  authValidators,
};
