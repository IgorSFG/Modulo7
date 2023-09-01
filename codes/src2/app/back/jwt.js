const jwt = require('jsonwebtoken');

// Generate JWT token for a user
function generateToken(user) {
    return jwt.sign({ user_id: user.user_id, username: user.username, userpassword: user.userpassword }, secretKey, { expiresIn: '1m' });
}
  
// Authenticate token
function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
        return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}