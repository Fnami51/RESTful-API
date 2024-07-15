import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { config } from '../setting';

export const registerUser = async (request: Request, response: Response) => {
  try {
    const { username, password, email } = request.body;
    const user = new User({ username, password, email });
    await user.save();
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({ error: 'Неверный запрос' });
  }
};

export const loginUser = async (request: Request, response: Response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  console.log(user)
  try {
    // const user = await User.findOne({ username });
    if (!user || password !== user.password) {
      return response.status(400).json({ error: 'Неверный пароль или имя пользователя' });
    }
    const token = jwt.sign({ id: user._id, roles: user.roles }, config.jwtSecret, { expiresIn: '1h' });
    response.json({ token });
  } catch (error) {
    response.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const getCurrentUser = async (request: Request, response: Response) => {
    try {
      if (!request.user) {
        return response.status(404).json({ error: 'Пользователь не найден' });
      }
      const user = await User.findById(request.user.id);
      if (!user) {
        return response.status(404).json({ error: 'Пользователь не найден' });
      }
      response.json(user);
    } catch (error) {
      response.status(500).json({ error: 'Ошибка сервера' });
    }
  };

export const changeUserRole = async (request: Request, response: Response) => {
  try {
    const user = await User.findByIdAndUpdate(request.params.id, { roles: request.body.role }, { new: true, runValidators: true });
    if (!user) {
      return response.status(404).json({ error: 'Пользователь не найден' });
    }
    response.json(user);
  } catch (error) {
    response.status(400).json({ error: 'Неверный запрос' });
  }
};
