import { Request, Response } from 'express';
import { User } from '../models/User';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import Assignment from '../models/Assignment';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ error: 'Username is already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    return res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(400).send({ error: 'Failed to register user' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).send({ error: 'Invalid Username' });
      return;
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      res.status(401).send({ error: 'Invalid password' });
      return;
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send({ error: 'Failed to fetch users' });
  }
};

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await User.find({ role: 'admin' });  // Filter by role
    res.status(200).json(admins);
  } catch (error) {
    res.status(400).send({ error: 'Failed to fetch admins'});
  }
};


export const uploadAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { task, admin } = req.body;
    const userId = req.userId;

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const assignment = new Assignment({
      userId,
      task,
      admin,
      status: 'pending',
      filePath: req.file.path,  
    });

    await assignment.save();

    res.status(201).json({ message: 'Assignment uploaded successfully' });
  } catch (error) {
    console.error('Error uploading assignment:', error);
    res.status(500).json({ error: 'Failed to upload assignment' });
  }
};

 export default {register, login, getAdmins, getUsers, uploadAssignment};