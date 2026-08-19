import prisma from "../config/db.js";

export async function addFavourite(req, res, next) {
  try {
    const userId = req.user.userId;
    const { destinationId } = req.body;

    if (!destinationId) {
      return res.status(400).json({ error: "destinationId is required" });
    }

    const destination = await prisma.destination.findUnique({ where: { id: destinationId } });
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const existing = await prisma.favourite.findUnique({
      where: { userId_destinationId: { userId, destinationId } },
    });

    if (existing) {
      return res.status(409).json({ error: "Destination already in favourites" });
    }

    const favourite = await prisma.favourite.create({
      data: { userId, destinationId },
    });

    res.status(201).json(favourite);
  } catch (err) {
    next(err);
  }
}

export async function getMyFavourites(req, res, next) {
  try {
    const userId = req.user.userId;

    const favourites = await prisma.favourite.findMany({
      where: { userId },
      include: { destination: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(favourites);
  } catch (err) {
    next(err);
  }
}

export async function removeFavourite(req, res, next) {
  try {
    const userId = req.user.userId;
    const { destinationId } = req.params;

    const existing = await prisma.favourite.findUnique({
      where: { userId_destinationId: { userId, destinationId } },
      include: { destination: true },
    });

    if (!existing) {
      return res.status(404).json({ error: "Favourite not found" });
    }

    await prisma.favourite.delete({
      where: { userId_destinationId: { userId, destinationId } },
    });

    res.status(200).json({ message: `${existing.destination.name} removed from favourites` });
  } catch (err) {
    next(err);
  }
}