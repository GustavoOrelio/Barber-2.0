import { MenuIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.png" alt="FSW Barber" width={120} height={18} />
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header
