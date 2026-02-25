"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Share2,
  Users,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
} from "lucide-react";

export default function VideoMeetingSimulator() {
  const params = useParams();
  const router = useRouter();
  const { bookings, currentUser } = useApp();
  const bookingId = (params?.id as string) || "bk-104";

  const booking = bookings.find((b) => b.id === bookingId) || bookings[3] || {
    id: "bk-104",
    customerName: "Michael Chang",
    serviceId: "Executive Growth & Product Pitch Audit",
    startTime: "16:00",
    endTime: "17:00",
  };

  const [isJoined, setIsJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; msg: string; time: string }[]>([
    { sender: "Victoria Sterling (Host)", msg: "Welcome! Let's examine your Q3 revenue funnels today.", time: "4:00 PM" },
  ]);
  const [msgInput, setMsgInput] = useState("");
  const [sessionTimer, setSessionTimer] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isJoined) {
      timer = setInterval(() => {
        setSessionTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isJoined]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { sender: currentUser.name, msg: msgInput, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setMsgInput("");
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col justify-between selection:bg-indigo-500">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/customer" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-300" />
          </Link>
          <div>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded font-mono">
              Meeting ID: #{booking.id}
            </span>
            <h1 className="text-sm font-black truncate max-w-sm sm:max-w-md">{booking.serviceId}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          {isJoined && (
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center space-x-2 font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>LIVE: {formatTimer(sessionTimer)}</span>
            </span>
          )}
          <span className="hidden sm:flex items-center space-x-1 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>End-to-End SSL Encrypted</span>
          </span>
        </div>
      </header>

      {/* Main Stream Area */}
      <div className="flex-grow flex flex-col lg:flex-row p-6 gap-6 max-w-7xl mx-auto w-full items-stretch">
        {!isJoined ? (
          /* Lobby Join Card */
          <div className="flex-grow flex items-center justify-center animate-in zoom-in-95">
            <div className="bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl max-w-lg w-full text-center space-y-6">
              <div className="w-24 h-24 rounded-3xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-4xl mx-auto shadow-inner">
                💼
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full">
                  Consultation Room Ready
                </span>
                <h2 className="text-2xl font-black">{booking.customerName}'s Private Advisory Session</h2>
                <p className="text-xs text-slate-400">
                  Verify your audio & camera devices before starting the secure virtual stream.
                </p>
              </div>

              {/* Preview simulated stream box */}
              <div className="bg-slate-950 h-48 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden group">
                {videoOn ? (
                  <div className="text-center space-y-2">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Me" className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-indigo-500" />
                    <span className="text-xs font-bold font-mono text-indigo-300 block">Camera Active ({currentUser.name})</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-600 font-mono">Video Muted</span>
                )}
                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <button onClick={() => setMicOn(!micOn)} className={`p-2 rounded-xl ${micOn ? "bg-slate-800 text-emerald-400" : "bg-rose-600 text-white"}`}>
                    {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setVideoOn(!videoOn)} className={`p-2 rounded-xl ${videoOn ? "bg-slate-800 text-emerald-400" : "bg-rose-600 text-white"}`}>
                    {videoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsJoined(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/25 transition-transform active:scale-98 cursor-pointer"
              >
                Join Stream Now
              </button>
            </div>
          </div>
        ) : (
          /* Live Stream Container */
          <>
            <div className="flex-grow bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative flex flex-col justify-between">
              {/* Main Presenter simulated video */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600"
                  alt="Consultant"
                  className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl object-cover border-4 border-indigo-500/40 shadow-2xl animate-in zoom-in-95"
                />
                <span className="mt-4 text-lg font-black text-white">Victoria Sterling</span>
                <span className="text-xs text-indigo-400 font-mono">Principal SaaS Strategist (Host)</span>
              </div>

              {/* Top Stream Overlay */}
              <div className="p-4 flex items-center justify-between z-10 bg-gradient-to-b from-slate-950/80 to-transparent">
                <div className="flex items-center space-x-2 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>2 Attendees Booked</span>
                </div>
              </div>

              {/* Self Mini Video Overlay */}
              <div className="absolute bottom-6 right-6 w-36 sm:w-48 bg-slate-950/80 p-2 rounded-2xl border border-slate-700 shadow-xl z-10 text-center">
                {videoOn ? (
                  <img
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"}
                    alt="Me"
                    className="w-full h-24 sm:h-32 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-full h-24 sm:h-32 rounded-xl bg-slate-900 flex items-center justify-center text-xs text-slate-500 font-mono">
                    Video Off
                  </div>
                )}
                <span className="block text-[10px] font-bold mt-1 text-slate-300 truncate">{currentUser.name} (You)</span>
              </div>
            </div>

            {/* Side Chat Sidebar */}
            <div className="w-full lg:w-80 bg-slate-900 rounded-3xl border border-slate-800 p-4 flex flex-col justify-between shadow-2xl shrink-0">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-extrabold text-xs uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <span>Stream Live Chat</span>
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">Online</span>
              </div>

              {/* Message List */}
              <div className="flex-grow overflow-y-auto py-3 space-y-3 max-h-64 lg:max-h-full">
                {chatMessages.map((m, idx) => (
                  <div key={idx} className="space-y-0.5 text-xs">
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <strong className={m.sender.includes("Host") ? "text-indigo-400 font-extrabold" : "text-emerald-400"}>{m.sender}</strong>
                      <span>{m.time}</span>
                    </div>
                    <div className="p-2.5 bg-slate-800/90 rounded-xl text-slate-200 leading-relaxed break-words border border-slate-750">
                      {m.msg}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex space-x-2">
                <input
                  type="text"
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  placeholder="Type message..."
                  className="flex-grow p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-hidden"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer">
                  Send
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Bottom Meeting Controls Bar */}
      {isJoined && (
        <footer className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-center space-x-4">
          <button
            onClick={() => setMicOn(!micOn)}
            title="Toggle Microphone"
            className={`p-4 rounded-2xl transition-all shadow-md cursor-pointer ${micOn ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-rose-600 hover:bg-rose-700 text-white scale-105"}`}
          >
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setVideoOn(!videoOn)}
            title="Toggle Video"
            className={`p-4 rounded-2xl transition-all shadow-md cursor-pointer ${videoOn ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-rose-600 hover:bg-rose-700 text-white scale-105"}`}
          >
            {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              setIsJoined(false);
              router.push("/dashboard/customer");
            }}
            title="Leave Stream"
            className="px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-xl flex items-center space-x-2 transition-transform active:scale-95 cursor-pointer"
          >
            <PhoneOff className="w-5 h-5" />
            <span>End Session & Return</span>
          </button>
        </footer>
      )}
    </div>
  );
}
