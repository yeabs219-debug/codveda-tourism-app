import prisma from "../config/db.js";

export async function createBooking(req, res, next) {
  try {
    const userId = req.user.userId;
    const { destinationId, travelDate, guests } = req.body;

    const destination = await prisma.destination.findUnique({ where: { id: destinationId } });
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        destinationId,
        travelDate: new Date(travelDate),
        guests: Number(guests),
      },
    });

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
}

export async function getMyBookings(req, res, next) {
  try {
    const userId = req.user.userId;

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { destination: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
}

export async function cancelBooking(req, res, next) {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.userId !== userId) {
      return res.status(403).json({ error: "You can only cancel your own bookings" });
    }

    if (booking.status === "CANCELLED") {
      return res.status(409).json({ error: "Booking is already cancelled" });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

export async function confirmBooking(req, res, next) {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.status === "CANCELLED") {
      return res.status(409).json({ error: "Cannot confirm a cancelled booking" });
    }

    if (booking.status === "CONFIRMED") {
      return res.status(409).json({ error: "Booking is already confirmed" });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status: "CONFIRMED" },
    });

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}