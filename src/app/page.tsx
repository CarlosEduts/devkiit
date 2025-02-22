"use client";

import * as React from "react";
import Image from "next/image";
import {
  AlarmClock,
  Book,
  Clock,
  Code,
  Code2,
  Dot,
  FolderCode,
  Layers,
  Moon,
  Palette,
  Pen,
  QrCode,
  Ruler,
  Settings,
  ShieldCheck,
  Shuffle,
  Timer,
  Type,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BorderRadiusEditor from "./components/BorderRadiusEditor";
import GradientGenerator from "./components/GradientGenerator";
import BoxShadowGenerator from "./components/BoxShadowGenerator";
import CSSUnitConverter from "./components/CSSUnitConverter";
import ColorConverter from "./components/ColorConverter";
import OnlineCodeEditor from "./components/OnlineCodeEditor";
import SecurePasswordGenerator from "./components/SecurePasswordGenerator";
import ColorPaletteGenerator from "./components/ColorPaletteGenerator";
import LoremIpsumGenerator from "./components/LoremIpsumGenerator";
import UUIDGenerator from "./components/UUIDGenerator";
import QRCodeGenerator from "./components/QRCodeGenerator";
import PomodoroTimer from "./components/PomodoroTimer";
import ReadingTimeCalculator from "./components/ReadingTimeCalculator";

import CharacterWordCounter from "./components/CharacterWordCounter";
import Base64Decoder from "./components/Base64Decoder";
import CaseConverter from "./components/CaseConverter";
import EmojiUnicodeConverter from "./components/EmojiUnicodeConverter";
import TimestampConverter from "./components/TimestampConverter";

export default function Dashboard() {
  const [activeTab, setActiveTab] = React.useState("Border-Radius Editor");

  const [isDark, setIsDark] = React.useState<boolean>(false);

  const tools = [
    {
      category: "CSS Tools",
      color: "bg-green-400",
      icon: Code2,
      items: [
        { name: "Border-Radius Editor", icon: Layers },
        { name: "Gradient Generator", icon: Palette },
        { name: "Box-Shadow Generator", icon: Settings },
      ],
    },
    {
      category: "Converters",
      color: "bg-red-400",
      icon: Shuffle,
      items: [
        { name: "CSS Unit Converter", icon: Ruler },
        { name: "Color Converter", icon: Palette },
        { name: "Base64 Decoder", icon: Code },
        { name: "Case Converter", icon: Pen },
        { name: "Emoji Unicode Converter", icon: Code },
        { name: "Timestamp Converter", icon: Clock },
      ],
    },
    {
      category: "Generators",
      color: "bg-blue-400",
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
      color: "bg-violet-600",
      icon: AlarmClock,
      items: [
        { name: "Pomodoro Timer", icon: Timer },
        { name: "Reading Time Calculator", icon: Book },
        { name: "Character Word Counter", icon: Pen },
      ],
    },
    {
      category: "Development",
      color: "bg-yellow-400",
      icon: Code2,
      items: [{ name: "Online Code Editor", icon: Code2 }],
    },
  ];

  return (
    <SidebarProvider className={isDark ? "dark" : "light"}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <Image
                    src="/logo.png"
                    width={90}
                    height={25}
                    alt="Icon Image"
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent className="pb-20">
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
                        <SidebarMenuButton
                          onClick={() => setActiveTab(item.name)}
                          isActive={activeTab === item.name}
                        >
                          <div className={`p-1 rounded-md ${category.color}`}>
                            <item.icon className=" h-4 w-4 text-white" />
                          </div>
                          {item.name}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <p className="text-xs mx-2 opacity-80">
              This project offers a collection of tools designed to simplify the
              daily life of developers, writers, and general users.
            </p>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-y-auto bg-background ">
          <div className="p-4 w-full h-16 flex items-center justify-between">
            <SidebarTrigger className="p-4 border border-gray-500/20 bg-gray-400/5 dark:text-white/80" />

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setIsDark(!isDark);
                }}
                variant="ghost"
                className="p-4 h-7 w-7 border border-gray-500/20 bg-gray-400/5 dark:text-white/80"
              >
                <Moon />
              </Button>

              <a href="https://github.com/CarlosEduts/devkiit" target="_blank">
                <Button
                  variant="ghost"
                  className="p-4 h-7 w-7 border border-gray-500/20 bg-gray-400/5 dark:text-white/80"
                >
                  <FolderCode />
                </Button>
              </a>
            </div>
          </div>

          <div className="w-full flex  justify-center p-6">
            <div className="w-full max-w-xl">
              <h1 className="mb-6 text-3xl font-bold dark:text-white">
                {activeTab}
              </h1>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                <TabsContent value="Character Word Counter">
                  <CharacterWordCounter />
                </TabsContent>
                <TabsContent value="Base64 Decoder">
                  <Base64Decoder />
                </TabsContent>
                <TabsContent value="Case Converter">
                  <CaseConverter />
                </TabsContent>
                <TabsContent value="Emoji Unicode Converter">
                  <EmojiUnicodeConverter />
                </TabsContent>
                <TabsContent value="Timestamp Converter">
                  <TimestampConverter />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
