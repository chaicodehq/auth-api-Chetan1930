import { User } from '../models/user.model.js';

/**
 * List all users (Admin only)
 */
export async function listUsers(req, res, next) {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
}

/**
 * Get user by ID (Admin only)
 */
export async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: { message: 'User not found' } });
    }
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete user (Admin only)
 */
export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: { message: 'User not found' } });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
}
