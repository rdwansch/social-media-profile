'use server';

import { prisma } from 'prisma/confiq';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';

export default async function Signup(dataform: FormData) {
  try {
    const name = dataform.get('name') + '';
    const email = dataform.get('email') + '';
    const password = dataform.get('password') + '';
    const username = dataform.get('username') + '';

    if (name || email || password || username) {
      console.log(dataform);
      throw 'Not valid input form';
    }

    const user = await prisma.user.findFirst({
      where: {
        email: dataform.get('email') + '',
      },
    });

    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          username,
          password: bcrypt.hashSync(password, 10),
        },
      });

      console.log('Create a new user:', newUser);
    }
  } catch (err) {
    console.log('Err:', err);
    return;
  }

  redirect('/signin', RedirectType.push);
}
