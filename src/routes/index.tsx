import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TradeBase preview" },
      { name: "description", content: "Preview of the TradeBase static marketing site." },
      { property: "og:title", content: "TradeBase preview" },
      { property: "og:description", content: "Preview of the TradeBase static marketing site." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <iframe src="/tradebase/index.html" title="TradeBase site" className="block h-screen w-full border-0" />
  ),
});
