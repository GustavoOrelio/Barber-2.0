'use client'

import { Badge } from './ui/badge'
import { AvatarImage, Avatar } from './ui/avatar'
import { Card, CardContent } from './ui/card'
import { Prisma } from '@prisma/client'
import { isFuture, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  SheetTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from './ui/sheet'
import Image from 'next/image'
import PhoneItem from './phone-item'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from './ui/dialog'
import { deleteBooking } from '../_actions/delete-booking'
import { toast } from 'sonner'
import { useState } from 'react'
import BookingSummary from './booking-summary'
interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

// TODO: Receber agendamento como props
const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      toast.success('Reserva cancelada com sucesso!')
      handleSheetOpenChange(false)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao cancelar reserva!')
    }
  }

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger asChild className="w-full min-w-[90%]">
          <Card className="min-w-[90%]">
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge className="w-fit" variant={isConfirmed ? 'default' : 'secondary'}>
                  {isConfirmed ? 'Confirmado' : 'Finalizado'}
                </Badge>
                <h3 className="font-semibold">{booking.service.name}</h3>

                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={booking.service.barbershop.imageUrl} />
                  </Avatar>
                  <p className="text-sm">{booking.service.barbershop.name}</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sm capitalize">
                  {format(booking.date, 'MMMM', { locale: ptBR })}
                </p>
                <p className="text-2xl">{format(booking.date, 'dd', { locale: ptBR })}</p>
                <p className="text-sm">{format(booking.date, 'HH:mm', { locale: ptBR })}</p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>
        <SheetContent className="w-[85%]">
          <SheetHeader>
            <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
          </SheetHeader>
          <div className="relative mt-6 flex h-[180px] w-full items-end">
            <Image
              src="/map.png"
              alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
              fill
              className="rounded-xl object-cover"
            />
            <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
              <CardContent className="flex items-center gap-3 px-5 py-3">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-bold">{barbershop.name}</h3>
                  <p className="text-xs">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Badge className="w-fit" variant={isConfirmed ? 'default' : 'secondary'}>
              {isConfirmed ? 'Confirmado' : 'Finalizado'}
            </Badge>

            <div className="mb-3 mt-6">
              <BookingSummary
                service={booking.service}
                barbershop={barbershop}
                selectedDate={booking.date}
              />
            </div>

            <div className="space-y-3">
              {barbershop.phones.map((phone, index) => (
                <PhoneItem key={index} phone={phone} />
              ))}
            </div>
          </div>

          <SheetFooter className="mt-6">
            <div className="flex items-center gap-3">
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  Voltar
                </Button>
              </SheetClose>
              {isConfirmed && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      Cancelar reserva
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%]">
                    <DialogHeader>
                      <DialogTitle>Você quer cancelar sua reserva?</DialogTitle>
                      <DialogDescription>
                        Ao cancelar, você perderá sua reserva e não poderá recuperá-la. Essa ação
                        não pode ser revertida.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row gap-3">
                      <DialogClose asChild>
                        <Button variant="outline" className="w-full">
                          Voltar
                        </Button>
                      </DialogClose>
                      <DialogClose asChild className="w-full">
                        <Button variant="destructive" onClick={handleCancelBooking}>
                          Confirmar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default BookingItem
