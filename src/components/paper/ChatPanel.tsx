"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Comment } from "@gravity-ui/icons";
import { Button } from "@/components/ui/Button";
import { useSession } from "@/lib/auth-client";
import { useChatHistory, useSendChatMessage } from "@/hooks/useChat";

const SUGGESTED_PROMPTS = [
  "What are the main findings?",
  "What methodology was used?",
  "Summarize the conclusion",
];

export function ChatPanel({ paperId }: { paperId: string }) {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const { data, isLoading } = useChatHistory(paperId, isLoggedIn);
  const sendMessage = useSendChatMessage(paperId);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = data?.messages || [];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, sendMessage.isPending]);

  function handleSend(e?: FormEvent, textOverride?: string) {
    e?.preventDefault();
    const text = (textOverride ?? input).trim();
    if (!text || sendMessage.isPending) return;
    setInput("");
    sendMessage.mutate(text);
  }

  if (!isLoggedIn) {
    return (
      <div className="rounded-lg border border-parchment-line bg-white p-6 text-center">
        <Comment width={22} height={22} className="mx-auto mb-2.5 text-navy" />
        <h3 className="mb-1 font-display text-[15px] font-semibold text-ink">Chat with this paper</h3>
        <p className="mb-4 text-[12.5px] text-ink-faint">Log in to ask questions and get answers grounded in the paper&apos;s text.</p>
        <Button href="/login" size="sm" className="w-full">
          Log in to chat
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-[520px] flex-col rounded-lg border border-parchment-line bg-white">
      <div className="flex items-center gap-2 border-b border-parchment-line px-4 py-3">
        <Comment width={16} height={16} className="text-navy" />
        <h3 className="font-display text-[14px] font-semibold text-ink">Ask this paper</h3>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-10 w-3/4 animate-pulse rounded-lg bg-parchment-line" />
            <div className="ml-auto h-10 w-2/3 animate-pulse rounded-lg bg-parchment-line" />
          </div>
        ) : messages.length === 0 ? (
          <div>
            <p className="mb-3 text-[12.5px] text-ink-faint">Try asking:</p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(undefined, prompt)}
                  className="rounded-md border border-parchment-line px-3 py-2 text-left text-[12.5px] text-ink-muted transition-colors hover:border-amber hover:text-ink"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m._id}
              className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-[13px] leading-relaxed ${
                m.role === "user" ? "ml-auto bg-navy text-parchment" : "bg-parchment text-ink"
              }`}
            >
              {m.content}
            </div>
          ))
        )}

        {sendMessage.isPending && (
          <div className="flex w-fit items-center gap-1 rounded-lg bg-parchment px-3.5 py-2.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint" />
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2 border-t border-parchment-line p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about this paper…"
          className="flex-1 rounded-md border border-parchment-line px-3 py-2 text-[13px] outline-none focus:border-amber"
        />
        <Button type="submit" size="sm" disabled={sendMessage.isPending || !input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}