import md5 from "md5";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { idleThresholdDate } from "@/utils/utilities";

export const createUser = async (email: string, password_hash: string, display_name: string, race: string, class_name: string, locale: string = 'en-US') => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.users.create({
      data: {
        email,
        password_hash,
        display_name,
        race,
        class: class_name,
        locale,
      },
    });

    await tx.users.update({
      where: { id: user.id },
      data: { recruit_link: md5(user.id.toString()) },
    });

    return user;
  });
}

export const userExists = async (email: string) => {
  return await prisma.users.count({
    where: {
      OR: [
        {
          email: email.toLowerCase()
          
        },
        {
          display_name: {
            equals: email,
            mode: 'insensitive'
          }
          
        }
      ]      
    },
  });
}

export const updateUserAndBankHistory = async (
  prismaInstance: Prisma.TransactionClient,
  userId: number,
  userGold: bigint,
  updatedData: any[],
  killingStrength: number,
  defenseStrength: number,
  newOffense: number,
  newDefense: number,
  newSpying: number,
  newSentry: number,
  bankData: any,
  updateType: 'units' | 'items' | 'battle_upgrades'
) => {
  const updateData: any = {
    gold: userGold,
    offense: newOffense,
    defense: newDefense,
    spy: newSpying,
    sentry: newSentry,
  };

  if (updateType === 'units') {
    updateData.units = updatedData;
  } else if (updateType === 'items') {
    updateData.items = updatedData;
  } else if (updateType === 'battle_upgrades') {
    updateData.battle_upgrades = updatedData;
  }

  await prismaInstance.users.update({
    where: { id: userId },
    data: updateData,
  });

  // We could probably add this to bank.service instead and call it.
  await prismaInstance.bank_history.create({
    data: bankData,
  });
};

export const getUpdatedStatus = async (userId: number) => {
  const now = new Date();

  // Fetch the latest status history record for the user
  let statusHistory = await prisma.accountStatusHistory.findFirst({
    where: {
      user_id: userId,
      start_date: {
        lte: now,
      },
    },
    orderBy: {
      start_date: 'desc',
    },
  });

  // If no status history exists, default to ACTIVE
  if (!statusHistory) {
    // Optionally, you can create an ACTIVE status record here
    await prisma.accountStatusHistory.create({
      data: {
        user_id: userId,
        status: 'ACTIVE',
        start_date: now,
      },
    });
    return 'ACTIVE';
  }

  // Check if the current status has expired
  if (statusHistory.end_date && statusHistory.end_date <= now) {
    // Status has expired, update to ACTIVE
    await prisma.accountStatusHistory.create({
      data: {
        user_id: userId,
        status: 'ACTIVE',
        start_date: now,
        reason: 'Status expired, reverting to ACTIVE',
      },
    });
    return 'ACTIVE';
  }

  // Handle IDLE status based on last_active timestamp
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      last_active: true,
    },
  });

  if (statusHistory.status !== 'IDLE' && (!user.last_active || user?.last_active && user.last_active < idleThresholdDate(60))) {
    // User has been idle for over 60 days, update status to IDLE
    await prisma.accountStatusHistory.create({
      data: {
        user_id: userId,
        status: 'IDLE',
        start_date: now,
        reason: 'User has been idle for over 60 days',
      },
    });
    return 'IDLE';
  }

  // Return the current status
  return statusHistory.status;
};