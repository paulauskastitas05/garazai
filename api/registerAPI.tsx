import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../src/app/lib/db/mongodb';
import User, { IUser } from '../src/app/lib/db/models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { email, password } = req.body;

  try {
    await connectToDatabase();

    const userExists: IUser | null = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword: string = await bcrypt.hash(password, 12);

    const newUser: IUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
