'use server';

import { getServerSession } from 'next-auth';

import { attackHandler, spyHandler } from '@/app/actions';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    switch (req.body.type) {
      case 'intel':
        if (req.body.spies <= 0) {
          return res.status(400).json({ status: 'failed' });
        }

        if (req.body.spies > 10) {
          return res.status(400).json({ status: 'failed' });
        }

        const myUser = await prisma?.users.findUnique({
          where: { id: session.user.id },
        });

        if (!myUser) {
          return res.status(400).json({ status: 'failed' });
        }

        if (req.body.spies > myUser.units.find((u) => u.type === 'SPY' && u.level === 1).quantity) {
          return res.status(400).json({ status: 'failed' });
        }

        return res
          .status(200)
          .json(
            await spyHandler(
              session.user.id,
              parseInt(req.query.id),
              parseInt(req.body.spies)
            )
          );
      case 'assassinate':
        return res.status(200).json({ status: 'success' });
      case 'infiltrate':
        return res.status(200).json({ status: 'success' });
    }
  }
  // console.log('failed: ', session);
  return res.status(401).json({ status: 'failed' });
}
