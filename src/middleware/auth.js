const firebase = require("../helper/firebase/firebase_admin");

function authMiddleware(req, res, next) {
     const headerToken = req.headers.authorization;
     if (!headerToken) {
          return res.send({ message: "No token provided" }).status(401);
     };

     if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
          res.send({ message: "Invalid token" }).status(401);
     };

     const token = headerToken.split(" ")[1];
     firebase
          .auth()
          .verifyIdToken(token)
          .then((user) => {
               req.user = {
                    uid: user.uid,
                    email: user.email
               }
               next()
          })
          .catch((error) => {
               console.log('error :>> ', error);
               return res.send({ message: "Invalid token" }).status(401)
          });
}

module.exports = { authMiddleware };