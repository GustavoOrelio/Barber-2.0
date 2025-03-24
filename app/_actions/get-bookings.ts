'use server'

import { db } from '../_lib/prisma'
import { startOfDay, endOfDay } from 'date-fns'
interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = ({ date }: GetBookingsProps) => {
  return db.booking.findMany({
    where: {
      date: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
    },
  })
}
