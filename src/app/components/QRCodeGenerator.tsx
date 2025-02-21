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

export default function QRCodeGenerator() {
  const [content, setContent] = React.useState("");
  const [qrCode, setQrCode] = React.useState("");

  const generateQRCode = () => {
    setQrCode(
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        content
      )}`
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>
          Create QR codes for URLs, text, or contact information.
        </CardDescription>
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
              <img
                src={qrCode || "/placeholder.svg"}
                alt="Generated QR Code"
                className="h-48 w-48"
              />
            </div>
          )}
          <Button onClick={generateQRCode}>Generate QR Code</Button>
        </div>
      </CardContent>
    </Card>
  );
}
