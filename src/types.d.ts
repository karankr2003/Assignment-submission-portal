import { Express } from "express";
import { File } from 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File; 
      files?: Multer.File[]; 
    }
  }
}
declare namespace Express {
    interface Request {
      file?: Multer.File;
      userId?: string;   
    }
  }
  declare namespace Express {
    interface Request {
      userId?: string;
    }
  }
  