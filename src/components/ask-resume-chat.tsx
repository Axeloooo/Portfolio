"use client";

import { ChatReply, replyToPlainText } from "@/components/chat-reply";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  CopyIcon,
  MessageCircleIcon,
  RotateCcwIcon,
  SendIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
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
// The conversation survives reloads and navigation within the same tab.
const STORAGE_KEY: string = "ask-resume-chat";

const SUGGESTIONS: string[] = [
  "What does Axel do at Scotiabank?",
  "Is Axel a fit for my role?",
  "Show me his AI projects",
];

function loadMessages(): Msg[] {
  try {
    const saved: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(saved) ? (saved as Msg[]) : [];
  } catch {
    return [];
  }
}

function saveMessages(messages: Msg[]): void {
  try {
    if (messages.length === 0) sessionStorage.removeItem(STORAGE_KEY);
    else sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
}

function CopyButton({ text }: { text: string }): JSX.Element {
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <button
      type="button"
      onClick={(): void => {
        navigator.clipboard
          .writeText(replyToPlainText(text))
          .then((): void => {
            setCopied(true);
            setTimeout((): void => setCopied(false), 1500);
          })
          .catch((): void => undefined);
      }}
      aria-label={copied ? "Copied" : "Copy answer"}
      className="mt-1 inline-flex items-center gap-1 rounded px-1 text-xs text-muted-foreground hover:text-foreground"
    >
      {copied ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function AskResumeChat(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [restored, setRestored] = useState<boolean>(false);

  // Read storage after mount so the server and client render the same markup.
  useEffect((): void => {
    setMessages(loadMessages());
    setRestored(true);
  }, []);

  useEffect((): void => {
    if (restored && !loading) saveMessages(messages);
  }, [messages, loading, restored]);

  useEffect((): void => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  useEffect((): void => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Grow the box with its content, up to its max height.
  useEffect((): void => {
    const box: HTMLTextAreaElement | null = inputRef.current;
    if (!box) return;
    box.style.height = "auto";
    // scrollHeight leaves out the border, which border-box sizing counts.
    box.style.height = `${box.scrollHeight + box.offsetHeight - box.clientHeight}px`;
  }, [input, open]);

  function close(): void {
    setOpen(false);
    toggleRef.current?.focus();
  }

  function clear(): void {
    setMessages([]);
    inputRef.current?.focus();
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

    const controller: AbortController = new AbortController();
    abortRef.current = controller;
    let reply: string = "";
    try {
      const res: Response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
        signal: controller.signal,
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
      for (;;) {
        const { done, value }: ReadableStreamReadResult<Uint8Array> =
          await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setReply(reply);
      }
    } catch {
      if (!controller.signal.aborted) setReply("Sorry, something went wrong.", true);
      // A stopped answer keeps what arrived; with nothing yet, say so.
      else setReply(reply || "Stopped.", !reply);
    } finally {
      abortRef.current = null;
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
          className="flex h-[28rem] max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm flex-col rounded-xl border bg-background shadow-lg sm:h-[36rem] sm:max-w-md"
        >
          <div className="flex items-center justify-between border-b px-4 py-2">
            <span className="text-sm font-medium">Ask about {DATA.name}</span>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={clear}
                disabled={loading}
                className="inline-flex items-center gap-1 rounded px-1 py-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50"
              >
                <RotateCcwIcon className="size-3" />
                New chat
              </button>
            )}
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
                  Answers come from Axel&apos;s resume and blog. Try one:
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
            {messages.map((m: Msg, i: number): JSX.Element => {
              const streaming: boolean = loading && i === messages.length - 1;
              return (
                <div key={i} className={cn("max-w-[85%]", m.role === "user" && "ml-auto")}>
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2",
                      m.role === "user"
                        ? "whitespace-pre-wrap bg-primary text-primary-foreground"
                        : "bg-muted",
                      m.failed && "text-muted-foreground"
                    )}
                  >
                    {m.role === "assistant" && m.content ? <ChatReply text={m.content} /> : m.content || "…"}
                  </div>
                  {m.role === "assistant" && m.content && !m.failed && !streaming && (
                    <CopyButton text={m.content} />
                  )}
                </div>
              );
            })}
            <div ref={endRef} />
          </div>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>): void => {
              e.preventDefault();
              send(input);
            }}
            className="border-t p-3"
          >
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
                  setInput(e.target.value)
                }
                onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>): void => {
                  // Enter sends; Shift+Enter adds a line. Skip while an IME is composing.
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                ref={inputRef}
                rows={1}
                maxLength={1000}
                placeholder="Ask a question…"
                aria-label="Your question"
                className="max-h-32 min-w-0 flex-1 resize-none rounded-md border bg-background px-3 py-2 text-base outline-none sm:text-sm focus-visible:ring-1 focus-visible:ring-ring"
              />
              {loading ? (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={(): void => abortRef.current?.abort()}
                  aria-label="Stop answer"
                >
                  <SquareIcon className="size-4" />
                </Button>
              ) : (
                <Button type="submit" size="icon" disabled={!input.trim()} aria-label="Send">
                  <SendIcon className="size-4" />
                </Button>
              )}
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Answers by Claude, grounded in Axel&apos;s resume and blog. They can be wrong.
            </p>
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
