import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import prisma from '@/lib/prisma';
import UserModel from '@/models/Users';

const ROWS_PER_PAGE = 10;

const Users = ({ players, session, userPage }) => {
  const router = useRouter();
  const initialPage = parseInt(router.query.page as string) || userPage;
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const newPage = parseInt(router.query.page as string) || userPage;
    setPage(newPage);
  }, [router.query.page, userPage]);

  return (
    <div className="mainArea pb-10">
      <h2>Attack</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-gray-900 text-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Gold</th>
              <th className="px-4 py-2">Army Size</th>
              <th className="px-4 py-2">Level</th>
              <th className="px-4 py-2">Race</th>
            </tr>
          </thead>
          <tbody>
            {players.map((nplayer) => {
              const player = new UserModel(nplayer);
              if (player.id === session?.player.id) player.is_player = true;

              return (
                <tr
                  key={player.id}
                  className={`${
                    player.is_player
                      ? 'bg-gray-500'
                      : 'odd:bg-table-odd even:bg-table-even'
                  } text-center`}
                >
                  <td className="px-4 py-2">{nplayer.overallrank}</td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/userprofile/${player.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {player.displayName}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{player.gold.toLocaleString()}</td>
                  <td className="px-4 py-2">{player.kingdomSize}</td>
                  <td className="px-4 py-2">{player.level}</td>
                  <td className="px-4 py-2">{player.race}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => {
            const newPage = Math.max(page - 1, 1);
            setPage(newPage);
            router.push(`?page=${newPage}`);
          }}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => {
            const newPage = page + 1;
            setPage(newPage);
            router.push(`?page=${newPage}`);
          }}
          disabled={players.length < ROWS_PER_PAGE}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  // Find the rank of the current user
  const userRank = await prisma.users.count({
    where: {
      experience: {
        gte: session?.player.experience,
      },
    },
  });

  // Calculate the page number based on the user's rank
  const userPage = Math.ceil(userRank / ROWS_PER_PAGE);

  // Use the user's page as default if no page query parameter is present
  const page = parseInt(context.query.page as string) || userPage;
  const skip = (page - 1) * ROWS_PER_PAGE;

  const players = await prisma.users.findMany({
    skip,
    take: ROWS_PER_PAGE,
    orderBy: [
      {
        experience: 'desc',
      },
      {
        display_name: 'asc',
      },
    ],
  });

  // Adjust the overall rank calculation
  for (let i = 0; i < players.length; i += 1) {
    players[i].overallrank = skip + i + 1;
  }

  return { props: { players, session, userPage } };
};

export default Users;
