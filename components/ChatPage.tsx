"use client";

import { AllData } from "@/lib/api/partners/queries";
import { useChat } from "ai/react";

export function hatPage(props: { data: AllData }) {
  const { data } = props;
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(e, {
      data: {
        contextData: JSON.stringify(data),
      },
    });
  }

  return (
    <div>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </li>
        ))}
      </ul>

      <form onSubmit={onSubmit}>
        <label>
          Say something...
          <input value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

//FIX: No passing data in, just fetch in the API request
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatPage(props: { data: AllData }) {
  const { data } = props;
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(e, {
      data: {
        contextData: JSON.stringify(data),
      },
    });
  }

  return (
    <div className="flex h-[800px] w-[800px] flex-col overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-10 dark:border-gray-800 dark:bg-gray-950">
      <h2 className="text-3xl font-bold">Connect Bot</h2>
      <div className="flex flex-1 flex-col justify-start gap-4 p-6">
        {messages.map((m, index) => {
          return m.role === "user" ? (
            <div key={index} className="flex flex-col items-end gap-1.5">
              <div className="max-w-[75%] rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
                <p className="text-sm">{m.content}</p>
              </div>
            </div>
          ) : (
            <div key={index} className="-1.5 flex flex-col items-start">
              <div className="max-w-[75%] rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
                <p className="text-sm">{m.content}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-end">
        <div className="sticky bottom-0 flex gap-4">
          <div className="flex-1">
            <form className="relative" onSubmit={onSubmit}>
              <Input
                className="rounded-full border-gray-200 dark:border-gray-800"
                placeholder="Type a message..."
                type="text"
                value={input}
                onChange={handleInputChange}
              />
              <Button
                className="absolute right-2.5 top-2.5 rounded-lg"
                size="icon"
                variant="ghost"
              >
                <SendIcon className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function SendIcon(props: any) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
