import prisma from "../prismaclient.js";

export const getDashboard = async (req, res) => {
  try {
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const [
      available,
      allocated,
      activeBookings,
      pendingTransfers,
      upcomingReturns,
    ] = await Promise.all([
      prisma.asset.count({
        where: {
          status: "AVAILABLE",
        },
      }),

      prisma.asset.count({
        where: {
          status: "ALLOCATED",
        },
      }),

      prisma.allocation.count({
        where: {
          status: "ACTIVE",
        },
      }),

      prisma.asset.count({
        where: {
          status: "RESERVED",
        },
      }),

      prisma.allocation.count({
        where: {
          status: "ACTIVE",
          expectedReturnDate: {
            gte: today,
            lte: next7Days,
          },
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        available,
        allocated,
        activeBookings,
        pendingTransfers,
        upcomingReturns,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};