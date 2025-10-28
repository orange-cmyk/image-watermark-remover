import { Coffee as CoffeeIcon } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { IconButton } from "./ui/button"
import { DialogDescription } from "@radix-ui/react-dialog"
import Kofi from "@/assets/kofi_button_black.png"

export function Coffee() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton tooltip="支持项目">
          <CoffeeIcon />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>支持项目开发</DialogTitle>
        <DialogDescription className="mb-8">
          如果你觉得项目对你有帮助，欢迎请作者喝杯咖啡，持续投入更多精力优化体验，感谢支持！
        </DialogDescription>
        <div className="w-full flex items-center justify-center">
          <a
            href="https://ko-fi.com/Z8Z1CZJGY"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Kofi} className="h-[32px]" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Coffee
