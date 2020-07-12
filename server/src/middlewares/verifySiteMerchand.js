function verifySiteMerchand(req, res, next) {
    if (req.merchant) {
        res.sendStatus(401);
        return;
    }

    next();
}

export default verifySiteMerchand;
