import Header from './_components/header'
import { Input } from './_components/ui/input'
import { Button } from './_components/ui/button'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
const Home = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Gustavo!</h2>
        <p className="text-sm text-muted-foreground">Sabado, 22 de Março.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button variant="outline">
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            alt="Agende nos melhores com FSW Barber"
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
