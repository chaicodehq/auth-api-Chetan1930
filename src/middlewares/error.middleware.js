export function errorHandler(error, req, res, next) {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: { message: error.message } });
  }
  if (error.code === 11000) {
    return res.status(409).json({ error: { message: 'Email already exists' } });
  }
  return res.status(500).json({ error: { message: error.message } });
}
