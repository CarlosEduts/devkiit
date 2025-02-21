"use client";

import * as React from "react";
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

export default function OnlineCodeEditor() {
  const [html, setHtml] = React.useState("<h1>Hello, World!</h1>");
  const [css, setCss] = React.useState("body { font-family: sans-serif; }");
  const [js, setJs] = React.useState('console.log("Hello, World!");');
  const [output, setOutput] = React.useState("");

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
    `;
    setOutput(combinedCode);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Online Code Editor</CardTitle>
        <CardDescription>
          Edit HTML, CSS, and JavaScript in real-time.
        </CardDescription>
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
  );
}