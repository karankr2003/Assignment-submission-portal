import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import Assignment from '../models/Assignment';
import jwt from 'jsonwebtoken';

export const registerAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;
  try {
    const existingAdmin = await User.findOne({ username });
    if (existingAdmin) {
      res.status(400).json({ error: 'Admin already exists' });
      return;
    }

    const newAdmin = new User({ username, password }); 
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering admin' });
  }
};

export const loginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getAssignmentsForAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const adminId = req.userId; 

    const assignments = await Assignment.find({ admin: adminId })
      .populate('userId', 'username') 
      .exec();

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching assignments' });
  }
};

// Accept Assignment
export const acceptAssignment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      res.status(404).json({ error: 'Assignment not found' });
      return;
    }

    assignment.status = 'accepted';
    await assignment.save();
    res.status(200).json({ message: 'Assignment accepted', assignment });
  } catch (error) {
    res.status(500).json({ error: 'Error accepting assignment' });
  }
};

// Reject Assignment
export const rejectAssignment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      res.status(404).json({ error: 'Assignment not found' });
      return;
    }

    assignment.status = 'rejected';
    await assignment.save();
    res.status(200).json({ message: 'Assignment rejected', assignment });
  } catch (error) {
    res.status(500).json({ error: 'Error rejecting assignment' });
  }
};
export  default {registerAdmin, getAssignmentsForAdmin,acceptAssignment, rejectAssignment}; 