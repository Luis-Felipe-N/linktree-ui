import { useEffect, useRef } from 'react'

interface BackgroundGridProps {
  className?: string
  cellSize?: number
  lineColor?: string
  lineWidth?: number
}

export function BackgroundGrid({
  className,
  cellSize = 40,
  lineColor = 'rgba(255, 255, 255, 0.08)',
  lineWidth = 1,
}: BackgroundGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let animationFrameId: number | null = null

    const drawGrid = () => {
      const target = canvas.parentElement ?? canvas
      const rect = target.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      const width = Math.round(rect.width)
      const height = Math.round(rect.height)

      if (!width || !height) return

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr
        canvas.height = height * dpr
      }

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.save()
      context.scale(dpr, dpr)

  context.strokeStyle = lineColor
  context.lineWidth = lineWidth / dpr

      const spacing = cellSize
      const horizontalCount = Math.ceil(height / spacing)
      const verticalCount = Math.ceil(width / spacing)

      context.beginPath()

      for (let i = 0; i <= verticalCount; i++) {
        const x = i * spacing + 0.5
        context.moveTo(x, 0)
        context.lineTo(x, height)
      }

      for (let j = 0; j <= horizontalCount; j++) {
        const y = j * spacing + 0.5
        context.moveTo(0, y)
        context.lineTo(width, y)
      }

      context.stroke()
      context.restore()
    }

    const queueDraw = () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(drawGrid)
    }

  const resizeObserver = new ResizeObserver(() => queueDraw())
  resizeObserver.observe(canvas.parentElement ?? canvas)

    queueDraw()

    window.addEventListener('resize', queueDraw)

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', queueDraw)
    }
  }, [cellSize, lineColor, lineWidth])

  return <canvas ref={canvasRef} className={className} aria-hidden />
}
