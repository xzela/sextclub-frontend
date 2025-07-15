"use server";

import { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

export async function createUser(phone: string, password: string): Promise<User | undefined> {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "sextclub",
  });

  try {
    const hashedPassword = await bcrypt.hash(password, 6);

    const [insert_results] = await connection.query(
      `INSERT INTO members (phone, password) VALUES("${phone}", "${hashedPassword}");`
    );
    console.log(insert_results);
    const insertId = insert_results.insertId;

    const [user_results] = await connection.query(
      `SELECT * FROM members WHERE id = ${insertId};`,
    );
    const user = user_results[0];
    return user as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

async function postHandler(request:Request) {
  const bodyFormData = await request.formData();
  const phone = bodyFormData.get('phone') as string;
  const password = bodyFormData.get('password') as string;
  const user = createUser(phone, password);

  return new Response(JSON.stringify(user), {
    status: 200,
    headers:{ "Content-Type": "application/json" }
  })
}
export { postHandler as POST };
