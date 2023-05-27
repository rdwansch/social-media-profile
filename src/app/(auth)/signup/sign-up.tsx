'use server';

import { prisma } from 'prisma/confiq';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';

export default async function Signup(dataform: FormData) {
  try {
    const name = dataform.get('name') + '';
    const email = dataform.get('emai') + '';
    const password = dataform.get('password') + '';

    if (name || email || password) {
      throw 'Not valid';
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
          password: bcrypt.hashSync(password, 10),
        },
      });
    }
  } catch (err) {
    console.log('Err:', err);
    return;
  }

  redirect('/signin', RedirectType.push);
}
