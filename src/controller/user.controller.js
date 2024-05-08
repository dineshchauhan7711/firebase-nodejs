const firebaseAdmin = require("../helper/firebase/firebase_admin");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth")



/**
 * Create user
 */
async function createUser(req, res) {
     try {
          const { email, password } = req.body;
          const user = await firebaseAdmin.auth().createUser({ email, password });
          console.log('user :>> ', user);
          res.status(201).send("User created successfully");
     } catch (error) {
          res.status(500).send(error.message);
     }
};

/**
 * Login
 */
async function login(req, res) {
     try {
          const { email, password } = req.body;
          const user = await signInWithEmailAndPassword(getAuth(), email, password);
          res.status(200).send({
               success: true,
               message: "Login successfully",
               token: user.user.refreshToken
          });
     } catch (error) {
          console.log('error :>> ', error);
          res.status(500).send(error.message);
     }
};

/**
 * Get user
 */
async function getUser(req, res) {
     try {
          res.status(200).send("Get user successfully");
     } catch (error) {
          res.status(500).send(error.message);
     }
};


module.exports = {
     createUser,
     login,
     getUser
}