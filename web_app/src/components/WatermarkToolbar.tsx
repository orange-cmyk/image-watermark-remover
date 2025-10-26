import { useMemo } from "react"
import {
  Brush,
  CheckCircle2,
  MousePointerClick,
  RotateCcw,
  Sparkles,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/states"
import { cn } from "@/lib/utils"

type StepStatus = "todo" | "active" | "done"

const statusStyles: Record<StepStatus, string> = {
  todo: "bg-muted text-muted-foreground",
  active: "bg-primary/15 text-primary",
  done: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
}

const statusIcon: Record<StepStatus, JSX.Element> = {
  todo: <MousePointerClick className="h-4 w-4" />,
  active: <Sparkles className="h-4 w-4" />,
  done: <CheckCircle2 className="h-4 w-4" />,
}

const WatermarkToolbar = () => {
  const [
    runInpainting,
    isProcessing,
    cleanCurLineGroup,
    updateEditorState,
    interactiveSegState,
  ] = useStore((state) => [
    state.runInpainting,
    state.getIsProcessing(),
    state.cleanCurLineGroup,
    state.updateEditorState,
    state.interactiveSegState,
  ])

  const file = useStore((state) => state.file)
  const renderCount = useStore(
    (state) => state.editorState.renders.length
  )
  const curLineGroupLength = useStore(
    (state) => state.editorState.curLineGroup.length
  )
  const extraMaskLength = useStore(
    (state) => state.editorState.extraMasks.length
  )

  const hasSelection = useMemo(() => {
    if (interactiveSegState.isInteractiveSeg) {
      return extraMaskLength > 0
    }
    return curLineGroupLength > 0 || extraMaskLength > 0
  }, [
    curLineGroupLength,
    extraMaskLength,
    interactiveSegState.isInteractiveSeg,
  ])

  const handleClear = () => {
    if (!hasSelection || isProcessing) {
      return
    }
    cleanCurLineGroup()
    updateEditorState({
      extraMasks: [],
      temporaryMasks: [],
    })
  }

  const handleRun = async () => {
    if (!hasSelection || isProcessing) {
      return
    }
    await runInpainting()
  }

  type Step = {
    title: string
    desc: string
    status: StepStatus
    icon: JSX.Element
  }

  const steps: Step[] = useMemo(() => {
    const selectionStatus: StepStatus = hasSelection
      ? "done"
      : file
      ? "active"
      : "todo"
    const runStatus: StepStatus = renderCount
      ? "done"
      : hasSelection
      ? "active"
      : "todo"

    return [
      {
        title: "上传图片",
        desc: "拖拽或点击选择需要处理的图片",
        status: file ? ("done" as StepStatus) : ("active" as StepStatus),
        icon: <Upload className="h-4 w-4" />,
      },
      {
        title: "涂抹水印区域",
        desc: "按住鼠标左键或手指在水印位置涂抹",
        status: selectionStatus,
        icon: <Brush className="h-4 w-4" />,
      },
      {
        title: "去除水印",
        desc: "点击按钮开始智能修复",
        status: runStatus,
        icon: statusIcon[runStatus],
      },
    ]
  }, [file, hasSelection, renderCount])

  const disableActions = !hasSelection || isProcessing

  return (
    <div className="absolute right-6 top-24 z-30 w-[320px] space-y-4 rounded-3xl border border-border/70 bg-background/95 p-6 shadow-2xl backdrop-blur-xl">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Sparkles className="h-5 w-5 text-primary" />
          智能去水印助手
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          依次完成以下步骤即可快速清除图片水印。
        </p>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={cn(
              "rounded-2xl border px-3.5 py-3 transition-colors duration-200",
              step.status === "done"
                ? "border-emerald-400/40 bg-emerald-500/10"
                : step.status === "active"
                ? "border-primary/40 bg-primary/10"
                : "border-muted bg-muted/60"
            )}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full",
                  statusStyles[step.status]
                )}
              >
                {step.status === "done" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : step.icon}
              </div>
              <span>
                步骤 {index + 1}：{step.title}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Button
          className="cursor-pointer py-5 text-base font-semibold"
          disabled={disableActions}
          onClick={handleRun}
        >
          {isProcessing ? "正在处理…" : "去除水印"}
        </Button>
        <Button
          className="cursor-pointer"
          variant="ghost"
          disabled={disableActions}
          onClick={handleClear}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          重新开始涂抹
        </Button>
      </div>
    </div>
  )
}

export default WatermarkToolbar
