const authRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(401).json({
                error: "Not allowed",
            });
        }

        next();
    };
};

module.exports = authRole;
