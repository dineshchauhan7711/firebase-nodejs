const firebaseAdmin = require("../helper/firebase/firebase_admin");

const {
     getAuth,
     signInWithEmailAndPassword,
     sendEmailVerification,
     createUserWithEmailAndPassword
} = require("firebase/auth");

const auth = getAuth();

/**
 * firebase Authentication
 */
const authenticate = async (email, password) => {
     let response = {}
     try {
          await signInWithEmailAndPassword(auth, email, password)
               .then((data) => {
                    response.success = true
                    response.data = data
               })
               .catch((e) => {
                    throw e
               })
          return response
     } catch (e) {
          // console.log(e)
          response.success = false
          response.message = await ErrorHandling(e.code)
          return response
     }
};

/**
 * create firebase User with email and password on Firebase
 */
const createFirebaseUser = async (email, password) => {
     let response = {}
     try {
          await createUserWithEmailAndPassword(auth, email, password)
               .then(async (authUser) => {
                    response.success = true;
                    response.data = authUser.user;
               })
               .catch((error) => {
                    throw error;
               });
          return response;
     } catch (err) {
          response.success = false;
          response.message = await ErrorHandling(err.code);
          return response;
     }
}

/**
 * Delete firebase User.
 */
const deleteFirebaseUser = async (uId) => {
     let response = {}
     try {
          await firebaseAdmin.auth().deleteUser(uId);
          response.success = true;
          return response;
     } catch (err) {
          response.success = false;
          response.message = await ErrorHandling(err.code);
          return response;
     }
}
/**
 * Get user by email from firebase auth
 */
const getUserByEmail = async (email) => {
     let response = {}
     try {
          const user = await firebaseAdmin.auth().getUserByEmail(email);
          return {
               success: true,
               data: user
          }
     } catch (e) {
          // console.log(e)
          response.success = false
          response.message = await ErrorHandling(e.code)
          return response
     }
};

/**
 * Get user by email from firebase auth
 */
const sendVerificationEmail = async (user) => {
     let response = {}
     try {
          await sendEmailVerification(user)
          return {
               success: true,
          }
     } catch (e) {
          // console.log(e)
          response.success = false
          response.message = await ErrorHandling(e.code)
          return response
     }
};


/**
 * Return custom error messages
 */
const ErrorHandling = async (error) => {
     let message = ''
     switch (error) {
          case 'auth/email-already-exists':
               message = 'The provided email is already in use. Please use sign in instead of creating new account'
               break;

          case 'auth/email-already-in-use':
               message = 'The provided email is already in use. Please use sign in instead of creating new account'
               break;

          case 'auth/invalid-credential':
               message = 'Your email or password is wrong'
               break;

          case 'auth/invalid-email':
               message = 'Your email is invalid'
               break;

          case 'auth/invalid-password':
               message = 'Password must be at least six characters'
               break;

          case 'auth/weak-password':
               message = 'Password must be at least six characters'
               break;

          case 'auth/user-not-found':
               message = 'User not found in our records'
               break;

          case 'auth/wrong-password':
               message = 'Your password is wrong'
               break;

          case 'auth/too-many-requests':
               message = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
               break;

          default:
               message = 'Something went wrong!'
               break;
     }
     return message
}

module.exports = {
     authenticate,
     getUserByEmail,
     createFirebaseUser,
     sendVerificationEmail,
     deleteFirebaseUser
};