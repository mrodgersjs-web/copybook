"use client";

import { toText } from "@copybook/core";
import type { Rendered } from "@copybook/core";
import { useState } from "react";

import type { CopyEvent } from "@/components/copybook/agent-prompt";
import { CopyButton } from "@/components/copybook/copy-button";
import { AgentIcon } from "@/components/copybook/icons";
import { RenderedMarkdown } from "@/components/copybook/rendered-markdown";
import { RenderedText } from "@/components/copybook/rendered-text";
import { ViewToggle } from "@/components/copybook/view-toggle";
import type { PromptView } from "@/components/copybook/view-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface CodeVariant {
  key: string;
  /** `prompt` tabs get an agent icon and wrap long lines. */
  kind?: "snippet" | "prompt";
  label: string;
  rendered: Rendered;
}

interface CodeVariantsProps {
  defaultKey?: string;
  /** The view prompt tabs show first. `rendered` formats their Markdown. */
  defaultView?: PromptView;
  /** Rendered in order, one tab each. */
  items: readonly CodeVariant[];
  onCopy?: (event: CopyEvent) => void;
  /** Shows a switch between formatted and Markdown views on prompt tabs. */
  viewToggle?: boolean;
}

const TabBody = ({ item, view }: { item: CodeVariant; view: PromptView }) => {
  if (item.kind !== "prompt") {
    return (
      <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed">
        <code data-lang={item.rendered.lang}>
          <RenderedText rendered={item.rendered} />
        </code>
      </pre>
    );
  }
  if (view === "rendered") {
    return (
      <RenderedMarkdown
        className="max-h-48 overflow-y-auto p-3"
        rendered={item.rendered}
      />
    );
  }
  return (
    <pre className="max-h-48 overflow-y-auto p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap">
      <RenderedText rendered={item.rendered} />
    </pre>
  );
};

/**
 * One snippet in several frameworks or setups, optionally with an agent
 * prompt tab. Render every variant on the server with `listVariants` and
 * `render`, then pass them here.
 */
export const CodeVariants = ({
  defaultKey,
  defaultView = "source",
  items,
  onCopy,
  viewToggle = false,
}: CodeVariantsProps) => {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key ?? "");
  const [view, setView] = useState(defaultView);
  const current = items.find((item) => item.key === active);
  const isPrompt = current?.kind === "prompt";

  return (
    <div
      className="bg-card text-card-foreground border"
      data-copybook-id={current?.rendered.id}
      data-copybook-variant={current?.rendered.variant}
    >
      <Tabs onValueChange={(value) => setActive(String(value))} value={active}>
        <div className="flex items-center justify-between gap-2 border-b pr-1">
          <div className="min-w-0 overflow-x-auto">
            <TabsList variant="line">
              {items.map((item) => (
                <TabsTrigger key={item.key} value={item.key}>
                  {item.kind === "prompt" ? <AgentIcon /> : null}
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {current ? (
            <span className="flex shrink-0 items-center gap-1">
              {viewToggle && isPrompt ? (
                <ViewToggle onChange={setView} view={view} />
              ) : null}
              <CopyButton
                label={isPrompt ? "Copy prompt" : "Copy snippet"}
                onCopy={(text) =>
                  onCopy?.({
                    id: current.rendered.id,
                    text,
                    ...(current.rendered.variant
                      ? { variant: current.rendered.variant }
                      : {}),
                  })
                }
                value={toText(current.rendered)}
              />
            </span>
          ) : null}
        </div>
        {items.map((item) => (
          <TabsContent key={item.key} value={item.key}>
            <TabBody item={item} view={view} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
