import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";
import { Send, Loader2, ImagePlus, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

const AGENT_NAME = "Vehicle Graphics Design Director";

function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-[#F39C12] text-black rounded-br-sm"
            : "bg-white/10 text-white rounded-bl-sm border border-white/10"
        }`}
      >
        {message.content &&
          (isUser ? (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown className="text-sm prose prose-sm prose-invert max-w-none [&_p]:my-1 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-0.5 [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_strong]:text-[#F39C12]">
              {message.content}
            </ReactMarkdown>
          ))}
        {message.file_urls?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.file_urls.map((url, i) => (
              <img key={i} src={url} alt="upload" className="h-20 w-20 object-cover rounded-lg border border-white/20" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DesignDirector() {
  const { user } = useAuth();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [pendingFiles, setPendingFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(true);
  const fileRef = useRef(null);
  const scrollRef = useRef(null);

  // Create conversation on mount
  useEffect(() => {
    let unsub = () => {};
    (async () => {
      try {
        const conv = await base44.agents.createConversation({
          agent_name: AGENT_NAME,
          metadata: { name: "Design Director Chat", description: "Vehicle graphics design rules" },
        });
        setConversation(conv);
        setMessages(conv.messages || []);
        setCreating(false);
        unsub = base44.agents.subscribeToConversation(conv.id, (data) => {
          setMessages(data.messages || []);
        });
      } catch (e) {
        setCreating(false);
      }
    })();
    return () => unsub();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const uploaded = [];
    for (const file of files) {
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        uploaded.push(file_url);
      } catch (err) {
        // skip failed uploads
      }
    }
    setPendingFiles((prev) => [...prev, ...uploaded]);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSend = async () => {
    if ((!input.trim() && pendingFiles.length === 0) || !conversation) return;
    const content = input.trim();
    const file_urls = pendingFiles.length > 0 ? pendingFiles : undefined;
    setInput("");
    setPendingFiles([]);
    setLoading(true);
    try {
      await base44.agents.addMessage(conversation, { role: "user", content, file_urls });
    } catch (e) {
      // error will surface via subscription
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col bg-black text-white pt-32 lg:pt-56">
      {/* Header */}
      <div className="border-b border-white/10 px-4 py-4 bg-gradient-to-r from-[#1a1a1a] to-black">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#F39C12]">차량 그래픽 디자인 디렉터</h1>
            <p className="text-sm text-white/60 mt-0.5">
              차량 랩 목업 전 전문적인 디자인 규칙을 준비하세요.
            </p>
          </div>
          <Link
            to="/design-projects"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-[#F39C12]/20 hover:border-[#F39C12]/40 transition-all flex-shrink-0"
          >
            <FolderOpen className="w-4 h-4" />
            <span className="hidden sm:inline">내 프로젝트</span>
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {creating ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-[#F39C12]" />
            </div>
          ) : (
            messages.map((msg, i) => <MessageBubble key={i} message={msg} />)
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3 border border-white/10">
                <Loader2 className="w-4 h-4 animate-spin text-white/60" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pending files */}
      {pendingFiles.length > 0 && (
        <div className="px-4 pb-2 max-w-3xl mx-auto w-full">
          <div className="flex flex-wrap gap-2">
            {pendingFiles.map((url, i) => (
              <div key={i} className="relative">
                <img src={url} alt="pending" className="h-16 w-16 object-cover rounded-lg border border-[#F39C12]/40" />
                <button
                  onClick={() => setPendingFiles((prev) => prev.filter((_, j) => j !== i))}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-white/10 px-4 py-3 bg-black/95">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-[#F39C12]/20 hover:border-[#F39C12]/40 transition-all flex-shrink-0"
            aria-label="Upload image"
          >
            <ImagePlus className="w-5 h-5" />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="비즈니스, 차량에 대해 설명하거나 디자인 질문을 해보세요…"
            className="flex-1 resize-none bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#F39C12]/50 focus:bg-white/15 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={loading || (!input.trim() && pendingFiles.length === 0)}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F39C12] text-black hover:bg-[#ffb84d] hover:shadow-[0_0_12px_rgba(243,156,18,0.4)] transition-all flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}