'use server';

import { attackHandler } from '@/app/actions';
import { withAuth } from '@/middleware/auth';

const handler = async (req, res) => {
  const session = req.session;
  if (session) {
    if (req.body.turns <= 0) {
      return res.status(400).json({ status: 'failed' });
    }

    if (req.body.turns > 10) {
      return res.status(400).json({ status: 'failed' });
    }

    const myUser = await prisma?.users.findUnique({
      where: { id: session.user.id },
    });

    if (!myUser) {
      return res.status(400).json({ status: 'failed' });
    }

    if (req.body.turns > myUser.attack_turns) {
      return res.status(400).json({ status: 'failed' });
    }

    return res
      .status(200)
      .json(
        await attackHandler(
          session.user.id,
          parseInt(req.query.id),
          parseInt(req.body.turns)
        )
      );
  }
  // console.log('failed: ', session);
  return res.status(401).json({ status: 'failed' });
}

export default withAuth(handler);