"use client"

import * as React from "react"
import {
  AlarmClock,
  Book,
  Code2,
  Layers,
  Palette,
  QrCode,
  Ruler,
  Settings,
  ShieldCheck,
  Shuffle,
  Timer,
  Type,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function BorderRadiusEditor() {
  const [radius, setRadius] = React.useState({ topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 })

  const handleRadiusChange = (corner: keyof typeof radius, value: string) => {
    setRadius((prev) => ({ ...prev, [corner]: Number.parseInt(value) || 0 }))
  }

  const cssCode = `border-radius: ${radius.topLeft}px ${radius.topRight}px ${radius.bottomRight}px ${radius.bottomLeft}px;`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Border-Radius Editor</CardTitle>
        <CardDescription>Adjust rounded borders and generate CSS code.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(radius).map(([corner, value]) => (
              <div key={corner}>
                <Label htmlFor={corner}>{corner.replace(/([A-Z])/g, " $1").trim()}</Label>
                <Input
                  id={corner}
                  type="number"
                  value={value}
                  onChange={(e) => handleRadiusChange(corner as keyof typeof radius, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div
            className="h-40 w-full bg-muted"
            style={{
              borderRadius: `${radius.topLeft}px ${radius.topRight}px ${radius.bottomRight}px ${radius.bottomLeft}px`,
            }}
          />
          <Input readOnly value={cssCode} />
          <Button onClick={() => navigator.clipboard.writeText(cssCode)}>Copy CSS</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function GradientGenerator() {
  const [colors, setColors] = React.useState(["#3B82F6", "#EC4899"])
  const [angle, setAngle] = React.useState(90)

  const handleColorChange = (index: number, value: string) => {
    setColors((prev) => prev.map((c, i) => (i === index ? value : c)))
  }

  const cssCode = `background: linear-gradient(${angle}deg, ${colors.join(", ")});`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gradient Generator</CardTitle>
        <CardDescription>Create custom gradients with a preview and code.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            {colors.map((color, index) => (
              <div key={index}>
                <Label htmlFor={`color-${index + 1}`}>Color {index + 1}</Label>
                <Input
                  id={`color-${index + 1}`}
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div>
            <Label htmlFor="angle">Angle</Label>
            <Input
              id="angle"
              type="number"
              value={angle}
              onChange={(e) => setAngle(Number.parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="h-40 w-full" style={{ background: `linear-gradient(${angle}deg, ${colors.join(", ")})` }} />
          <Input readOnly value={cssCode} />
          <Button onClick={() => navigator.clipboard.writeText(cssCode)}>Copy CSS</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function BoxShadowGenerator() {
  const [shadow, setShadow] = React.useState({ horizontal: 0, vertical: 0, blur: 0, spread: 0, color: "#000000" })

  const handleShadowChange = (property: keyof typeof shadow, value: string) => {
    setShadow((prev) => ({ ...prev, [property]: property === "color" ? value : Number.parseInt(value) || 0 }))
  }

  const cssCode = `box-shadow: ${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.spread}px ${shadow.color};`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Box-Shadow Generator</CardTitle>
        <CardDescription>Fine-tune shadows and copy the generated code.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            {["horizontal", "vertical", "blur", "spread"].map((prop) => (
              <div key={prop}>
                <Label htmlFor={prop}>{prop.charAt(0).toUpperCase() + prop.slice(1)}</Label>
                <Input
                  id={prop}
                  type="number"
                  value={shadow[prop as keyof typeof shadow]}
                  onChange={(e) => handleShadowChange(prop as keyof typeof shadow, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div>
            <Label htmlFor="shadow-color">Color</Label>
            <Input
              id="shadow-color"
              type="color"
              value={shadow.color}
              onChange={(e) => handleShadowChange("color", e.target.value)}
            />
          </div>
          <div
            className="h-40 w-full rounded bg-muted"
            style={{
              boxShadow: `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`,
            }}
          />
          <Input readOnly value={cssCode} />
          <Button onClick={() => navigator.clipboard.writeText(cssCode)}>Copy CSS</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CSSUnitConverter() {
  const [value, setValue] = React.useState(0)
  const [fromUnit, setFromUnit] = React.useState("px")
  const [toUnit, setToUnit] = React.useState("em")
  const [result, setResult] = React.useState(0)

  const units = ["px", "em", "rem", "%", "vw", "vh"]

  const convert = () => {
    // This is a simplified conversion. In a real-world scenario, you'd need more complex logic
    // and possibly consider the context (e.g., font-size for em conversions)
    if (fromUnit === toUnit) {
      setResult(value)
    } else if (fromUnit === "px" && toUnit === "em") {
      setResult(value / 16)
    } else if (fromUnit === "em" && toUnit === "px") {
      setResult(value * 16)
    } else {
      setResult(value) // For other conversions, we'd need more context
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>CSS Unit Converter</CardTitle>
        <CardDescription>Convert between different CSS units.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from-value">From</Label>
              <Input
                id="from-value"
                type="number"
                value={value}
                onChange={(e) => setValue(Number.parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="to-value">To</Label>
              <Input id="to-value" type="number" value={result} readOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from-unit">From Unit</Label>
              <select
                id="from-unit"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="to-unit">To Unit</Label>
              <select
                id="to-unit"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button onClick={convert}>Convert</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ColorConverter() {
  const [input, setInput] = React.useState("")
  const [hex, setHex] = React.useState("#FFFFFF")
  const [rgb, setRgb] = React.useState("rgb(255, 255, 255)")
  const [hsl, setHsl] = React.useState("hsl(0, 0%, 100%)")

  const convertColor = () => {
    let color
    try {
      color = input.trim()
      if (color.startsWith("#")) {
        // Convert HEX to RGB
        const r = Number.parseInt(color.slice(1, 3), 16)
        const g = Number.parseInt(color.slice(3, 5), 16)
        const b = Number.parseInt(color.slice(5, 7), 16)
        setHex(color)
        setRgb(`rgb(${r}, ${g}, ${b})`)
        // Convert RGB to HSL (simplified conversion)
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const l = (max + min) / 2
        const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1))
        const h =
          max === min
            ? 0
            : max === r
              ? 60 * ((g - b) / (max - min))
              : max === g
                ? 60 * (2 + (b - r) / (max - min))
                : 60 * (4 + (r - g) / (max - min))
        setHsl(`hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`)
      } else if (color.startsWith("rgb")) {
        // Parse RGB values
        const [r, g, b] = color.match(/\d+/g)!.map(Number)
        // Convert RGB to HEX
        setHex(`#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`)
        setRgb(color)
        // Convert RGB to HSL (same as above)
        // ... (implement HSL conversion)
      }
    } catch (error) {
      console.error("Invalid color format")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Converter</CardTitle>
        <CardDescription>Transform colors between Hex, RGB, and HSL formats.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="color-input">Enter Color</Label>
            <Input
              id="color-input"
              placeholder="#FFFFFF or rgb(255, 255, 255)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Hex</Label>
              <Input readOnly value={hex} />
            </div>
            <div>
              <Label>RGB</Label>
              <Input readOnly value={rgb} />
            </div>
            <div>
              <Label>HSL</Label>
              <Input readOnly value={hsl} />
            </div>
          </div>
          <div className="h-20 w-full rounded" style={{ backgroundColor: hex }} />
          <Button onClick={convertColor}>Convert</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function OnlineCodeEditor() {
  const [html, setHtml] = React.useState("<h1>Hello, World!</h1>")
  const [css, setCss] = React.useState("body { font-family: sans-serif; }")
  const [js, setJs] = React.useState('console.log("Hello, World!");')
  const [output, setOutput] = React.useState("")

  const runCode = () => {
    const combinedCode = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `
    setOutput(combinedCode)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Online Code Editor</CardTitle>
        <CardDescription>Edit HTML, CSS, and JavaScript in real-time.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="html-editor">HTML</Label>
            <textarea
              id="html-editor"
              className="h-32 w-full rounded-md border border-input bg-background px-3 py-2"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="css-editor">CSS</Label>
            <textarea
              id="css-editor"
              className="h-32 w-full rounded-md border border-input bg-background px-3 py-2"
              value={css}
              onChange={(e) => setCss(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="js-editor">JavaScript</Label>
            <textarea
              id="js-editor"
              className="h-32 w-full rounded-md border border-input bg-background px-3 py-2"
              value={js}
              onChange={(e) => setJs(e.target.value)}
            />
          </div>
          <Button onClick={runCode}>Run</Button>
          <div>
            <Label>Output</Label>
            <iframe
              title="Code Output"
              className="h-64 w-full rounded-md border border-input bg-background"
              srcDoc={output}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SecurePasswordGenerator() {
  const [length, setLength] = React.useState(16)
  const [includeUppercase, setIncludeUppercase] = React.useState(true)
  const [includeNumbers, setIncludeNumbers] = React.useState(true)
  const [includeSymbols, setIncludeSymbols] = React.useState(true)
  const [generatedPassword, setGeneratedPassword] = React.useState("")

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?"

    let chars = lowercase
    if (includeUppercase) chars += uppercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    let password = ""
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    setGeneratedPassword(password)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Secure Password Generator</CardTitle>
        <CardDescription>Create strong and customizable passwords.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="password-length">Password Length</Label>
            <Input
              id="password-length"
              type="number"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-uppercase"
              className="h-4 w-4"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            <Label htmlFor="include-uppercase">Include Uppercase</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-numbers"
              className="h-4 w-4"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <Label htmlFor="include-numbers">Include Numbers</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-symbols"
              className="h-4 w-4"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            <Label htmlFor="include-symbols">Include Symbols</Label>
          </div>
          <Input readOnly value={generatedPassword} />
          <Button onClick={generatePassword}>Generate Password</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = React.useState("#3B82F6")
  const [palette, setPalette] = React.useState(["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"])

  const generatePalette = () => {
    const hsl = hexToHSL(baseColor)
    const newPalette = [
      baseColor,
      hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 0.1, 1)),
      hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 0.2, 1)),
      hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 0.3, 1)),
      hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 0.4, 1)),
    ]
    setPalette(newPalette)
  }

  const hexToHSL = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!
    const r = Number.parseInt(result[1], 16) / 255
    const g = Number.parseInt(result[2], 16) / 255
    const b = Number.parseInt(result[3], 16) / 255
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h = 0,
      s,
      l = (max + min) / 2
    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
    return { h, s, l }
  }

  const hslToHex = (h: number, s: number, l: number) => {
    let r, g, b
    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }
    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Palette Generator</CardTitle>
        <CardDescription>Generate harmonious color combinations for your projects.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="base-color">Base Color</Label>
            <Input id="base-color" type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {palette.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-12 w-12 rounded" style={{ backgroundColor: color }} />
                <span className="mt-1 text-xs">{color}</span>
              </div>
            ))}
          </div>
          <Button onClick={generatePalette}>Generate Palette</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = React.useState(3)
  const [generatedText, setGeneratedText] = React.useState("")

  const generateLoremIpsum = () => {
    const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

    let result = ""
    for (let i = 0; i < paragraphs; i++) {
      result += loremIpsum + "\n\n"
    }
    setGeneratedText(result.trim())
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lorem Ipsum Generator</CardTitle>
        <CardDescription>Generate placeholder text for your designs.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="paragraph-count">Number of Paragraphs</Label>
            <Input
              id="paragraph-count"
              type="number"
              min="1"
              max="10"
              value={paragraphs}
              onChange={(e) => setParagraphs(Number.parseInt(e.target.value))}
            />
          </div>
          <textarea
            className="h-48 w-full rounded-md border border-input bg-background px-3 py-2"
            readOnly
            value={generatedText}
          />
          <Button onClick={generateLoremIpsum}>Generate Lorem Ipsum</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function UUIDGenerator() {
  const [uuid, setUuid] = React.useState("")

  const generateUUID = () => {
    const newUuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
    setUuid(newUuid)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>UUID Generator</CardTitle>
        <CardDescription>Generate universally unique identifiers.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input readOnly value={uuid} />
          <Button onClick={generateUUID}>Generate UUID</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function QRCodeGenerator() {
  const [content, setContent] = React.useState("")
  const [qrCode, setQrCode] = React.useState("")

  const generateQRCode = () => {
    // In a real implementation, you would use a QR code generation library here
    // For this example, we'll just set a placeholder image
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(content)}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>Create QR codes for URLs, text, or contact information.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="qr-content">Content</Label>
            <Input
              id="qr-content"
              placeholder="Enter URL or text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {qrCode && (
            <div className="flex justify-center">
              <img src={qrCode || "/placeholder.svg"} alt="Generated QR Code" className="h-48 w-48" />
            </div>
          )}
          <Button onClick={generateQRCode}>Generate QR Code</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PomodoroTimer() {
  const [time, setTime] = React.useState(25 * 60)
  const [isActive, setIsActive] = React.useState(false)
  const [workDuration, setWorkDuration] = React.useState(25)
  const [breakDuration, setBreakDuration] = React.useState(5)

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(workDuration * 60)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pomodoro Timer</CardTitle>
        <CardDescription>Boost your productivity with the Pomodoro Technique.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="text-center">
            <span className="text-6xl font-bold">{formatTime(time)}</span>
          </div>
          <div className="flex justify-center space-x-2">
            <Button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</Button>
            <Button variant="outline" onClick={resetTimer}>
              Reset
            </Button>
          </div>
          <div>
            <Label htmlFor="work-duration">Work Duration (minutes)</Label>
            <Input
              id="work-duration"
              type="number"
              min="1"
              max="60"
              value={workDuration}
              onChange={(e) => setWorkDuration(Number.parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="break-duration">Break Duration (minutes)</Label>
            <Input
              id="break-duration"
              type="number"
              min="1"
              max="30"
              value={breakDuration}
              onChange={(e) => setBreakDuration(Number.parseInt(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReadingTimeCalculator() {
  const [wordCount, setWordCount] = React.useState(0)
  const [readingSpeed, setReadingSpeed] = React.useState(200)
  const [readingTime, setReadingTime] = React.useState("0 minutes")

  const calculateReadingTime = () => {
    const minutes = Math.ceil(wordCount / readingSpeed)
    setReadingTime(`${minutes} minute${minutes !== 1 ? "s" : ""}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reading Time Calculator</CardTitle>
        <CardDescription>Estimate the time needed to read a text based on word count.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="word-count">Word Count</Label>
            <Input
              id="word-count"
              type="number"
              min="1"
              placeholder="Enter number of words"
              value={wordCount}
              onChange={(e) => setWordCount(Number.parseInt(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label htmlFor="reading-speed">Reading Speed (words per minute)</Label>
            <Input
              id="reading-speed"
              type="number"
              min="1"
              value={readingSpeed}
              onChange={(e) => setReadingSpeed(Number.parseInt(e.target.value) || 200)}
            />
          </div>
          <div>
            <Label>Estimated Reading Time</Label>
            <Input readOnly value={readingTime} />
          </div>
          <Button onClick={calculateReadingTime}>Calculate</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = React.useState("Border-Radius Editor")

  const tools = [
    {
      category: "CSS Tools",
      icon: Code2,
      items: [
        { name: "Border-Radius Editor", icon: Layers },
        { name: "Gradient Generator", icon: Palette },
        { name: "Box-Shadow Generator", icon: Settings },
      ],
    },
    {
      category: "Converters",
      icon: Shuffle,
      items: [
        { name: "CSS Unit Converter", icon: Ruler },
        { name: "Color Converter", icon: Palette },
      ],
    },
    {
      category: "Generators",
      icon: Settings,
      items: [
        { name: "Secure Password Generator", icon: ShieldCheck },
        { name: "Color Palette Generator", icon: Palette },
        { name: "Lorem Ipsum Generator", icon: Type },
        { name: "UUID Generator", icon: Shuffle },
        { name: "QR Code Generator", icon: QrCode },
      ],
    },
    {
      category: "Productivity",
      icon: AlarmClock,
      items: [
        { name: "Pomodoro Timer", icon: Timer },
        { name: "Reading Time Calculator", icon: Book },
      ],
    },
    {
      category: "Development",
      icon: Code2,
      items: [{ name: "Online Code Editor", icon: Code2 }],
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <Code2 className="mr-2 h-5 w-5" />
                  <span className="font-bold">DevKitt</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            {tools.map((category) => (
              <SidebarGroup key={category.category}>
                <SidebarGroupLabel>
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.category}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {category.items.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton onClick={() => setActiveTab(item.name)} isActive={activeTab === item.name}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <div className="container mx-auto">
            <SidebarTrigger className="mb-6 md:hidden" />
            <h1 className="mb-6 text-3xl font-bold">{activeTab}</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 flex flex-wrap">
                {tools.flatMap((category) =>
                  category.items.map((item) => (
                    <TabsTrigger key={item.name} value={item.name}>
                      {item.name}
                    </TabsTrigger>
                  )),
                )}
              </TabsList>
              <TabsContent value="Border-Radius Editor">
                <BorderRadiusEditor />
              </TabsContent>
              <TabsContent value="Gradient Generator">
                <GradientGenerator />
              </TabsContent>
              <TabsContent value="Box-Shadow Generator">
                <BoxShadowGenerator />
              </TabsContent>
              <TabsContent value="CSS Unit Converter">
                <CSSUnitConverter />
              </TabsContent>
              <TabsContent value="Color Converter">
                <ColorConverter />
              </TabsContent>
              <TabsContent value="Online Code Editor">
                <OnlineCodeEditor />
              </TabsContent>
              <TabsContent value="Secure Password Generator">
                <SecurePasswordGenerator />
              </TabsContent>
              <TabsContent value="Color Palette Generator">
                <ColorPaletteGenerator />
              </TabsContent>
              <TabsContent value="Lorem Ipsum Generator">
                <LoremIpsumGenerator />
              </TabsContent>
              <TabsContent value="UUID Generator">
                <UUIDGenerator />
              </TabsContent>
              <TabsContent value="QR Code Generator">
                <QRCodeGenerator />
              </TabsContent>
              <TabsContent value="Pomodoro Timer">
                <PomodoroTimer />
              </TabsContent>
              <TabsContent value="Reading Time Calculator">
                <ReadingTimeCalculator />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

