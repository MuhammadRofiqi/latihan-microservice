require("dotenv").config();
const db = require("../../database");
const bcrypt = require("bcrypt");
const registerSchema = require("../validations/registerSchema");
const loginSchema = require("../validations/loginSchema");
const updateAvatarschema = require("../validations/updateavatarschema");
const jwt = require("jsonwebtoken");
const service =require("../helpers/service");

module.exports = class AuthController {
  static async register(req, res) {
    // check validation from body
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.boom.badData(error.message);
    }

    // check username 
    const user = await db("users").where({ username: value.username }).first();
    if (user) {
      return res.boom.badRequest("username already registered");
    }

    // generate uuid
    value.id = require("crypto").randomUUID();

    // hash password
    value.password = bcrypt.hashSync(value.password, 10);

    // insert data users
    await db("users")
      .insert(value)
      .catch(err => {
        return res.boom.badRequest(err.message);
      });

    return res.status(201).json({
      success: true,
      message: "user successfully registered"
    });
  }

  static async login(req, res) {
    // check validation from body
    const { value, error } = loginSchema.validate(req.body);
    if (error) {
      return res.boom.badData(error.message);
    }

    // check username
    const user = await db("users").where({ username: value.username }).first();
    if (!user) {
      return res.boom.badRequest("username is not registered");
    } else if (!bcrypt.compareSync(value.password, user.password)) {
      return res.boom.unauthorized("wrong password !!");
    } else {
      // generate token
      const token = jwt.sign({
        id: user.id,
        username: user.username,
        name: user.name
      }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRED_TIME });

      return res.json({
        success: true,
        message: "user successfully login",
        token
      });
    }
  }

  static async updateavatar(req,res){
    const { value, error } = updateAvatarschema.validate(req.body);
    if (error) {
      return res.boom.badData(error.message);
    }

    const user = await db("users").where({id: req.user.id}).first();
    const data = await service("assets").post("/v1/users",{
      image: value.image,
      filename: user.avatar
    });

    if (data.status !== 200) {
      return res.boom.badRequest("failed update avatar");
    } else{
      await db("users")
      .where({
        id: req.user.id
      })
      .update({
        avatar: data.data.path
      })

      return res.json({
        success: true,
        message: "avatar successfully updated"
      })
    }
  }

  static async verify(req, res) {
    // Get token from headers
    const token = req.headers['authorization']
    if (typeof token =='undefined' || token == '') {
      return res.boom.forbidden("Access denied");
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, passed) => {
      if (err) {
        return res.boom.forbidden(err.message)
      } else {
        return res.json({
          success: true,
          message: "token succesfully verified",
          payload: passed
        })
      }
    })
  }
}