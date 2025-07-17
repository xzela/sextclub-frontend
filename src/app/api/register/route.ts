"use server";

import { Payload, User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import mysql, { QueryError, RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

export async function createUser(phone: string, phoneFormatted: string, password: string): Promise<User | undefined> {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "sextclub",
  });

  try {
    const hashedPassword = await bcrypt.hash(password, 6);

    const [insert_results] = await connection.query(
      `INSERT INTO members (phone, phone_formatted, password) VALUES("${phone}", "${phoneFormatted}", "${hashedPassword}");`
    ) as RowDataPacket[];
    console.log(insert_results);
    const insertId = insert_results.insertId;

    const [user_results] = await connection.query(
      `SELECT * FROM members WHERE id = ${insertId};`,
    ) as RowDataPacket[];
    const user = user_results[0];
    console.log('db:user', user);
    return user as User;
  } catch (err: unknown) {
    const error = err as QueryError;
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Failed to insert user');
    }
    throw new Error('Failed to find user');
  }
}

async function postHandler(request: NextRequest, response: NextResponse) {
  const bodyFormData = await request.formData();
  const password = bodyFormData.get('password') as string;
  const rawPhone = bodyFormData.get('phone') as string;
  const countryCode = bodyFormData.get('countryCode') as string;
  const phoneFormatted = `${countryCode} ${rawPhone}`;

  const phone = `${phoneFormatted}`.replace(/\D/g, '');

  const payload: Payload = {
    error: false,
    message: '',
    user: undefined,
  };
  try {
    const user = await createUser(phone, phoneFormatted, password);
    payload.user = user;
  } catch (err: unknown) {
    const error = err as Error;
    payload.error = true;
    payload.message = error.message;
  }

  return NextResponse.json(payload, {status: 200});
}
export { postHandler as POST };
