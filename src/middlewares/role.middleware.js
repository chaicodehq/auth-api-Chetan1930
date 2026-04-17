/**
 * Check if user has required role
 *
 * Example usage: requireRole('admin') or requireRole('admin', 'moderator')
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: { message: 'Not authenticated' } });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: { message: 'Forbidden' } });
    }
    return next();
  };
}
