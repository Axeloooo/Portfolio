"use client";

import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { MessageCircleIcon, SendIcon, XIcon } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";

type Role = "user" | "assistant";
type Msg = { role: Role; content: string; failed?: boolean };
type ApiMsg = { role: Role; content: string };

// Mirrors the API route's limit; older turns are dropped from the request.
const MAX_HISTORY: number = 12;

const SUGGESTIONS: string[] = [
  "What did Axel do at Microsoft?",
  "Which languages does he know?",
  "Tell me about his projects",
];

export default function AskResumeChat(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect((): void => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  useEffect((): void => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function close(): void {
    setOpen(false);
    toggleRef.current?.focus();
  }

  async function send(text: string): Promise<void> {
    const question: string = text.trim();
    if (!question || loading) return;
    const history: Msg[] = [...messages, { role: "user", content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    const setReply = (content: string, failed: boolean = false): void =>
      setMessages([...history, { role: "assistant", content, failed }]);

    // Error notices and empty turns are UI only; keep the request within the
    // route's limits and starting on a user turn.
    let payload: ApiMsg[] = history
      .filter((m: Msg): boolean => !m.failed && m.content.length > 0)
      .map(({ role, content }: Msg): ApiMsg => ({ role, content }))
      .slice(-MAX_HISTORY);
    while (payload.length > 0 && payload[0].role !== "user") {
      payload = payload.slice(1);
    }

    try {
      const res: Response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      if (!res.ok || !res.body) {
        const err: { error?: string } | null = await res
          .json()
          .catch((): null => null);
        setReply(err?.error ?? "Sorry, something went wrong.", true);
        return;
      }
      const reader: ReadableStreamDefaultReader<Uint8Array> = res.body.getReader();
      const decoder: TextDecoder = new TextDecoder();
      let reply: string = "";
      for (;;) {
        const { done, value }: ReadableStreamReadResult<Uint8Array> =
          await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setReply(reply);
      }
    } catch {
      setReply("Sorry, something went wrong.", true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2 sm:right-6">
      {open && (
        <div
          id="ask-resume-chat"
          role="dialog"
          aria-label="Ask my resume"
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>): void => {
            if (e.key === "Escape") close();
          }}
          className="flex h-[28rem] max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm flex-col rounded-xl border bg-background shadow-lg"
        >
          <div className="border-b px-4 py-3 text-sm font-medium">
            Ask about {DATA.name}
          </div>
          <div
            role="log"
            aria-live="polite"
            aria-busy={loading}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm"
          >
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Answers come from Axel&apos;s resume. Try one:
                </p>
                {SUGGESTIONS.map((s: string): JSX.Element => (
                  <button
                    key={s}
                    type="button"
                    onClick={(): Promise<void> => send(s)}
                    className="block w-full rounded-lg border px-3 py-2 text-left hover:bg-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m: Msg, i: number): JSX.Element => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2",
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {m.content || "…"}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>): void => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 border-t p-3"
          >
            <input
              value={input}
              onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                setInput(e.target.value)
              }
              ref={inputRef}
              maxLength={1000}
              placeholder="Ask a question…"
              aria-label="Your question"
              className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-base outline-none sm:text-sm focus-visible:ring-1 focus-visible:ring-ring"
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label="Send">
              <SendIcon className="size-4" />
            </Button>
          </form>
        </div>
      )}
      <Button
        ref={toggleRef}
        size="icon"
        className="size-12 shadow-lg"
        onClick={(): void => (open ? close() : setOpen(true))}
        aria-label={open ? "Close chat" : "Ask my resume"}
        aria-expanded={open}
        aria-controls="ask-resume-chat"
      >
        {open ? <XIcon className="size-5" /> : <MessageCircleIcon className="size-5" />}
      </Button>
    </div>
  );
}
