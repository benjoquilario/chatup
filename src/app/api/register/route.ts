import bcrypt from 'bcrypt';

import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { registerValidator } from '@/lib/validations/credentials';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = registerValidator.parse(body);

  const isEmailExist = await db.user.findFirst({
    where: { email },
  });

  if (isEmailExist) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await db.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
