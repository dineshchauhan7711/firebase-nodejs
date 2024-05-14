const firebaseAdmin = require("../helper/firebase/firebase_admin");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth")

const auth = getAuth();

const { authenticate, getUserByEmail, createFirebaseUser, sendVerificationEmail, deleteFirebaseUser } = require("./firebase.controller");


/**
 * Create user
 */
async function createUser(req, res) {
     try {
          const { email, password, name } = req.body;

          // Check if the user already exists
          const response = await getUserByEmail(email);
          if (response.success) {
               const user = response.data;
               if (user.emailVerified) {
                    return res.status(400).json({ message: "User already registered and verified." });
               } else {
                    await deleteFirebaseUser(user.uid);
               }
          }

          // Create user
          const userData = await createFirebaseUser(email, password);
          if (!userData.success) {
               return res.status(422).json({
                    success: false,
                    message: userData.message
               });
          };
          // Send email verification
          await sendVerificationEmail(userData.data);

          return res.status(201).json({ message: "Verification email sent! User created successfully!" });
     } catch (error) {
          console.log('error :>> ', error);
          res.status(500).send(error.message);
     }
};

/**
 * Login
 */
async function login(req, res) {
     try {
          const { email, password } = req.body;

          const response = await authenticate(email, password);
          // Check if the user's email is verified
          const user = response.data.user;
          if (!user.emailVerified) {
               return res.status(403).send({
                    success: false,
                    message: "Email not verified. Please verify your email before logging in."
               });
          };
          const token = await user.getIdToken()
          res.status(200).send({
               success: true,
               message: "Login successfully",
               token: token
          });
     } catch (error) {
          console.log('error :>> ', error);
          res.status(500).send({
               success: false,
               message: error.message
          });
     }
};

/**
 * Get user
 */
async function getUser(req, res) {
     try {
          console.log('req.user :>> ', req.user);
          res.status(200).send("Get user successfully");
     } catch (error) {
          console.log('error :>> ', error);
          res.status(500).send({
               success: false,
               message: error.message
          });
     }
};


module.exports = {
     createUser,
     login,
     getUser
}