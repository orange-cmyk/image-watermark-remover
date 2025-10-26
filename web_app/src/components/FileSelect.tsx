import { useState } from "react"
import useResolution from "@/hooks/useResolution"
import { UploadCloud, Sparkles, MousePointerClick } from "lucide-react"
import { cn } from "@/lib/utils"

type FileSelectProps = {
  onSelection: (file: File) => void
}

export default function FileSelect(props: FileSelectProps) {
  const { onSelection } = props

  const [uploadElemId] = useState(`file-upload-${Math.random().toString()}`)

  const resolution = useResolution()

  function onFileSelected(file: File) {
    if (!file) {
      return
    }
    // Skip non-image files
    const isImage = file.type.match("image.*")
    if (!isImage) {
      return
    }
    try {
      // Check if file is larger than 20mb
      if (file.size > 20 * 1024 * 1024) {
        throw new Error("file too large")
      }
      onSelection(file)
    } catch (e) {
      // eslint-disable-next-line
      alert(`error: ${(e as any).message}`)
    }
  }

  const isDesktop = resolution === "desktop"

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 py-10 sm:px-8">
      <div className="pointer-events-auto w-full max-w-4xl rounded-[32px] border border-white/20 bg-white/85 p-10 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-900/85">
        <div className="space-y-6">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.35em] text-primary">
              SmartClean
            </div>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              一键清理图片水印，打造干净素材
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              支持 JPG / PNG / WebP，拖拽、点击或粘贴截图即可开始，所有内容在本地浏览器处理。
            </p>
          </div>

          <label
            htmlFor={uploadElemId}
            className="group relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-border/70 bg-gradient-to-tr from-background to-background/30 px-6 py-10 text-center transition hover:border-primary/60 hover:bg-primary/5"
            onDragOver={(ev) => {
              ev.stopPropagation()
              ev.preventDefault()
            }}
          >
            <UploadCloud className="h-10 w-10 text-primary transition group-hover:scale-105" />
            <div className="space-y-1">
              <p className="text-lg font-semibold">
                {isDesktop ? "拖拽图片到此处，或点击上传" : "点击这里选择图片"}
              </p>
              <p className="text-sm text-muted-foreground">
                支持最大 20MB；也可以直接使用 Ctrl / Cmd + V 粘贴。
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-[11px] uppercase text-muted-foreground">
              {["JPG", "PNG", "WEBP", "BMP", "TIFF"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-border/80 px-3 py-1 tracking-wide"
                >
                  {label}
                </span>
              ))}
            </div>
            <input
              className="hidden"
              id={uploadElemId}
              name={uploadElemId}
              type="file"
              onChange={(ev) => {
                const file = ev.currentTarget.files?.[0]
                if (file) {
                  onFileSelected(file)
                }
              }}
              accept="image/png, image/jpeg, image/webp, image/bmp, image/tiff"
            />
          </label>

          <div className="grid gap-4 rounded-2xl border border-border/70 bg-background/60 p-4 text-sm text-muted-foreground sm:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "AI 智能修复",
                desc: "支持 LaMa / PowerPaint 等多种模型",
              },
              {
                icon: MousePointerClick,
                title: "所见即所得",
                desc: "画笔涂抹即可选择水印区域",
              },
              {
                icon: UploadCloud,
                title: "数据不出本地",
                desc: "在浏览器中处理，无需上传服务器",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={cn(
                  "flex items-start gap-3 rounded-xl bg-white/60 p-3 dark:bg-black/30",
                  "border border-border/50"
                )}
              >
                <item.icon className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground/90">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
