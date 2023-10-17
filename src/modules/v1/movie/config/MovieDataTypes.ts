import { Document } from 'mongoose';
import { Request } from 'express';

export interface MovieType extends Document {
  _id?: string,
  '99popularity'?: string,
  director?: string,
  genre?: string[],
  imdb_score?: number,
  name?: string,
  created_by? : string,
  updated_by? : string
  meta_description?:string,
  image?: string,
  createdAt?: string,
  updatedAt?: string,
}