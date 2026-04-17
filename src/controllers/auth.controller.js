import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { signToken } from '../utils/jwt.js';

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: { message: 'Email already exists' } });
    }
    const newUser = await User.create({ name, email, password });
    return res.status(201).json({
      user: { ...newUser.toObject(), password: undefined },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const normalizedEmail =
      typeof email === 'string' ? email.toLowerCase().trim() : email;
    const user = await User.findOne({ email: normalizedEmail }).select(
      '+password'
    );
    if (!user) {
      return res.status(401).json({ error: { message: 'Invalid credentials' } });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: { message: 'Invalid credentials' } });
    }
    const token = signToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });
    return res.status(200).json({
      token,
      user: { ...user.toObject(), password: undefined },
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
}
