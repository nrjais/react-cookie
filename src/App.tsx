import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";

const extractCookieFromCurl = (curlCommand: string) => {
  const cookieHeader = curlCommand.match(/-H 'Cookie: ([^']+)'/);
  return cookieHeader ? cookieHeader[1] : null;
};

export default function App() {
  const [cookie, setCookie] = React.useState<string | null>(null);

  return (
    <div className="w-full h-full">
      <Card className="w- m-auto">
        <CardHeader>
          <CardTitle>cURL to Cookie</CardTitle>
          <CardDescription>
            Paste a cURL request and extract the cookie header.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="curl-input">cURL Request</Label>
            <Textarea
              id="curl-input"
              placeholder="Paste your cURL request here..."
              className="h-32"
              onChange={(event) => {
                const curlCommand = event.target.value;
                const cookieHeader = extractCookieFromCurl(curlCommand);

                if (cookieHeader) {
                  setCookie(cookieHeader);
                } else {
                  setCookie(null);
                }
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-md bg-muted px-3 py-2 text-sm font-medium overflow-scroll h-60">
              {cookie || "Cookie header will appear here... "}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (cookie) navigator.clipboard.writeText(cookie);
              }}
            >
              <CopyIcon className="h-5 w-5" />
              <span className="sr-only">Copy Cookie</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
