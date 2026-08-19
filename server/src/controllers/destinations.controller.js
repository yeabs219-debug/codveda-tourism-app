import prisma from "../config/db.js";

export async function getAllDestinations(req, res, next) {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(destinations);
  } catch (err) {
    next(err);
  }
}

export async function getDestinationById(req, res, next) {
  try {
    const { id } = req.params;
    const destination = await prisma.destination.findUnique({ where: { id } });

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.status(200).json(destination);
  } catch (err) {
    next(err);
  }
}

export async function createDestination(req, res, next) {
  try {
    const { name, description, location, price, imageUrl, category } = req.body;

    if (!name || !description || !location || !price || !imageUrl || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const destination = await prisma.destination.create({
      data: { name, description, location, price, imageUrl, category },
    });

    res.status(201).json(destination);
  } catch (err) {
    next(err);
  }
}

export async function updateDestination(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, location, price, imageUrl, category } = req.body;

    const existing = await prisma.destination.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const updated = await prisma.destination.update({
      where: { id },
      data: { name, description, location, price, imageUrl, category },
    });

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteDestination(req, res, next) {
  try {
    const { id } = req.params;

    const existing = await prisma.destination.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Destination not found" });
    }

    await prisma.destination.delete({ where: { id } });

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (err) {
    next(err);
  }
}