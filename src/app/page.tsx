"use client";

import * as React from "react";
import {
  AlarmClock,
  Book,
  Code,
  Code2,
  FolderCode,
  Layers,
  Moon,
  Palette,
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = React.useState("Border-Radius Editor");

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
  ];

  return (
    <SidebarProvider className="">
      <div className="flex h-screen w-full">
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

        <main className="flex-1 overflow-y-auto bg-background ">
          <div className="p-4 w-full h-16 flex items-center justify-between">
            <SidebarTrigger className="p-4 border border-gray-500/20 bg-gray-400/5 dark:text-white/80" />

            <div className="flex gap-3">
              <Button
                variant="ghost"
                className="p-4 h-7 w-7 border border-gray-500/20 bg-gray-400/5 dark:text-white/80"
              >
                <Moon />
              </Button>

              <Button
                variant="ghost"
                className="p-4 h-7 w-7 border border-gray-500/20 bg-gray-400/5 dark:text-white/80"
              >
                <FolderCode />
              </Button>
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
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
