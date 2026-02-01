let isAdmin = function isAdmin(req, res, next) {
    if (req.session.user.role !== 'admin') {
        req.flash('error', 'Only admin allowed');
        return res.redirect('/products/shop');
    }
    next();
}

export default isAdmin;