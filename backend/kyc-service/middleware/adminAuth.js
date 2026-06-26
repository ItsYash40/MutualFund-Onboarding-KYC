module.exports = (req, res, next) => {
    // Ye simple check hai, production mein JWT use karte hain
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== 'super-secret-key-123') {
        return res.status(403).json({ message: 'Access Denied: Admins Only' });
    }
    next();
};