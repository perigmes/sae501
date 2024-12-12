import mongoose from 'mongoose';
export const userSchema = new mongoose.Schema({
  idUser: { type: String, required: true, unique: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex pour valider l'email
  },
  role: { 
    type: String, 
    enum: ['student', 'admin'], // Validation avec enum
    required: true 
  },
  affiliation: { 
    type: String, 
    enum: ['student', 'professor'], // Validation avec enum
    required: true 
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});


