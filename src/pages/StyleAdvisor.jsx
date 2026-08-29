import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";
import { Send, Loader2, Compass } from "lucide-react";
import { Link } from "react-router-dom";

const AGENT_NAME = "Style Advisor";

function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-[#F39C12] text-black rounded-br-sm"
            : "bg-white/10 text-white rounded-bl-sm border border-white/10"
        }`}>
        {message.content && (
          isUser ? (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown className="text-sm prose prose-sm prose-invert max-w-none [&_li]:my-0.5 [&_ul]:my-1 [&_p]:my-1">
              {message.content}
            </ReactMarkdown>
          )
        )}
        {message.tool_calls?.map((tc, idx) => {
          const failed = tc.status === "failed" || tc.status === "error";
          return (
            <div key={idx} className="mt-2 text-xs flex items-center gap-1.5 text-white/60">
              {tc.status === "running" || tc.status === "pending" || tc.status === "in_progress" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : failed ? (
                <span className="text-red-400">✕</span>
              ) : (
                <span className="text-green-400">✓</span>
              )}
              <span className="capitalize">{tc.name?.replace(/_/g, " ")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  "I have a delivery van — what styles work?",
  "Show me building sign examples",
  "I want a bold full wrap for my ute",
  "What's the difference between full and partial wraps?",
];

export default function StyleAdvisor() {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const conv = await base44.agents.createConversation({
          agent_name: AGENT_NAME,
          metadata: { name: "Style Advisor Chat" },
        });
        setConversationId(conv.id);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!conversationId) return;
    const unsubscribe = base44.agents.subscribeToConversation(conversationId, (data) => {
      setMessages(data.messages || []);
    });
    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    const content = text ?? input;
    if (!content.trim() || !conversationId || creating) return;
    setInput("");
    setCreating(true);
    try {
      const conv = await base44.agents.getConversation(conversationId);
      await base44.agents.addMessage(conv, { role: "user", content });
    } catch (e) {
      console.error(e);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F39C12]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 lg:pt-56 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F39C12]/15 border border-[#F39C12]/40">
            <Compass className="w-6 h-6 text-[#F39C12]" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold">Style Advisor</h1>
            <p className="text-white/50 text-sm">Explore our portfolio and find your perfect wrap style</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] overflow-hidden flex flex-col h-[60vh]">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-3 bg-white/10 text-white border border-white/10">
                    <p className="text-sm">
                      Kia ora! I'm your Style Advisor. I'll help you explore our portfolio and find a style that fits
                      your vehicle or signage. What are you looking to wrap?
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-[#F39C12]/30 text-white/80 hover:bg-[#F39C12]/10 hover:border-[#F39C12]/50 transition-all">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, idx) => (
              <MessageBubble key={idx} message={m} />
            ))}
          </div>

          <div className="border-t border-white/10 p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              placeholder="Ask about styles, or describe your vehicle..."
              className="flex-1 bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F39C12]/50 focus:ring-1 focus:ring-[#F39C12]/30"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || creating}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#F39C12] text-black hover:bg-[#ffb84d] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
              {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-sm">
          <Link to="/portfolio" className="text-[#F39C12] hover:underline">Browse Portfolio</Link>
          <span className="text-white/20">|</span>
          <Link to="/my-design" className="text-[#F39C12] hover:underline">Create a Mockup</Link>
          <span className="text-white/20">|</span>
          <Link to="/quote" className="text-[#F39C12] hover:underline">Get a Quote</Link>
        </div>
      </div>
    </div>
  );
}