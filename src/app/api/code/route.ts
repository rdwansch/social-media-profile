import { NextResponse } from 'next/server';
import { prisma } from 'prisma/confiq';
import { getServerSession } from 'next-auth/next';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import { Session } from 'next-auth';
import { createId } from '@paralleldrive/cuid2';

export async function GET(request: Request) {
  const session: Session | null = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);

  console.log(`\n\nSearchParms: ${searchParams}\n`);
  if (searchParams.get('slug')) {
    console.log(`Get a card with ${searchParams.get('slug')}\n`);
    const card = await prisma.card.findFirst({ where: { slug: searchParams.get('slug') + '' } });
    console.log(`\nGet a card with ${searchParams.get('slug')}\n\n`);
    console.log(`\nThe Result is ${card}\n\n`);

    if (card) {
      console.log(`\nFind: ${searchParams.get('slug')}; and get\n${card}`);
      return NextResponse.json(card);
    }
    return NextResponse.json({ err: true });
  }

  if (session) {
    const old = await prisma.card.findFirst({ where: { email: session.user.email } });

    const { createdAt, updatedAt, id, ...card } = await prisma.card.upsert({
      where: {
        email: session.user.email,
      },
      create: {
        name: session.user.name,
        email: session.user.email + '',
        imgSrc: session.user.image + '',
        title: '',
        slug: createId(),
        website: '',
      },
      update: {
        name: session.user.name,
        email: session.user.email + '',
        imgSrc: session.user.image + '',
        title: searchParams.get('title') ?? old?.title,
        website: searchParams.get('website') ?? old?.website,
      },
    });

    return NextResponse.json(card);
  }

  return NextResponse.json({ message: 'Unauthorize' });
}
