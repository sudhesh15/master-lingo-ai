"use client";

import { useState, useRef, useEffect } from 'react';
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Mic, MicOff, Volume2, Globe, Languages, BookOpen, Users, Star, Play, Pause, StopCircle, Award, TrendingUp, Clock, Headphones, LogOut, AlertTriangle } from 'lucide-react';
import { RealtimeSession } from '@openai/agents-realtime';
import { languageAgent } from '../agents/languageAgent';

type RealtimeSessionWithEvents = RealtimeSession & {
  on(event: string, callback: (data: unknown) => void): void;
  disconnect?: () => Promise<void>;
  end?: () => Promise<void>;
};

interface ConversationItem {
  type: string;
  role: string;
  content?: Array<{ text?: string }>;
}

export default function LanguageLearningApp() {
  const { user } = useUser();
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [sessionState, setSessionState] = useState('setup'); // setup, learning, paused
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [sessionTime, setSessionTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(180); // 3 minutes = 180 seconds
  const sessionRef = useRef<RealtimeSessionWithEvents | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const languages = [
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Mandarin', flag: '🇨🇳' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  ];

  const nativeLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'zh', name: 'Mandarin', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  ];

  // Timer for active learning time
  useEffect(() => {
    if (sessionState === 'learning' && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else if (sessionState !== 'learning' && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [sessionState]);

  // Timer for 3-minute session limit
  useEffect(() => {
    if (isConnected && !sessionTimerRef.current) {
      sessionTimerRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            handleStopLearning();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isConnected && sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }

    return () => {
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
      }
    };
  }, [isConnected]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  async function handleStartLearning() {
    if (!currentLanguage || !targetLanguage) return;

    try {
      const response = await fetch('/api');
      const data = await response.json();
      const tempKey = data.tempApiKey;
      
      const session = new RealtimeSession(languageAgent, {
        config: {
          inputAudioFormat: 'pcm16',
          inputAudioNoiseReduction: { type: 'near_field'},
          inputAudioTranscription: {
            language: currentLanguage,
            model: 'gpt-4o-mini-transcribe'
          }
        }
      }) as unknown as RealtimeSessionWithEvents;

      // Add event listeners for the session
      session.on('conversation.item.created', (item: unknown) => {
        const conversationItem = item as ConversationItem;
        if (conversationItem.type === 'message' && conversationItem.role === 'assistant') {
          const content = conversationItem.content?.[0]?.text || '';
          if (content.includes('Practice:') || content.includes('Repeat:')) {
            setCurrentPhrase(content.replace(/^(Practice:|Repeat:)\s*/, ''));
          }
        }
      });

      session.on('input_audio_buffer.speech_started', () => {
        setIsListening(true);
      });

      session.on('input_audio_buffer.speech_stopped', () => {
        setIsListening(false);
      });

      sessionRef.current = session;
      await session.connect({ apiKey: tempKey });
      
      await session.sendMessage({
        type: 'message',
        role: 'user',
        content: [{
          type: 'input_text',
          text: `SYSTEM INSTRUCTION:
        USER_NATIVE=${nativeLanguages.find(l => l.code === currentLanguage)?.name || currentLanguage}
        TARGET=${languages.find(l => l.code === targetLanguage)?.name || targetLanguage}

        Reinforce these rules strictly at runtime:
        - Always speak in USER_NATIVE for explanations, feedback, and conversation.
        - Only produce TARGET words when giving a 'Repeat after me:' phrase (exact phrase only), immediately followed by 'That means: [native translation]'.
        - If the user replies in TARGET, treat it as practice: reply in USER_NATIVE with feedback and the next 'Repeat after me:' phrase with its meaning. Do NOT switch the conversation to TARGET unless the user explicitly says 'Switch to TARGET for conversation'.`
        }]
      });
      
      setIsConnected(true);
      setSessionState('learning');
      setIsListening(true);
      setRemainingTime(180); // Reset to 3 minutes
      
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 3;
        });
      }, 5000);

    } catch (error) {
      console.error('Failed to start session:', error);
    }
  }

  function handlePauseResume() {
    if (sessionState === 'learning') {
      setSessionState('paused');
      setIsListening(false);
    } else if (sessionState === 'paused') {
      setSessionState('learning');
      setIsListening(true);
    }
  }

  async function handleStopLearning() {
    try {
      if (sessionRef.current) {
        if (sessionRef.current.disconnect) {
          await sessionRef.current.disconnect();
        } else if (sessionRef.current.close) {
          await sessionRef.current.close();
        } else if (sessionRef.current.end) {
          await sessionRef.current.end();
        }
        sessionRef.current = null;
      }
    } catch (e) {
      console.error('Error stopping session', e);
    } finally {
      setIsConnected(false);
      setIsListening(false);
      setSessionState('setup');
      setProgress(0);
      setSessionTime(0);
      setRemainingTime(180);
      setCurrentPhrase('');
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
        sessionTimerRef.current = null;
      }
    }
  }

  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        sessionRef.current = null;
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
        sessionTimerRef.current = null;
      }
    };
  }, []);

  // Setup Phase - Green Theme
  if (sessionState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-emerald-900 overflow-x-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-600 to-teal-700 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-10 animate-spin" style={{animationDuration: '20s'}}></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-emerald-400 rounded-full opacity-30 animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-green-400 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-emerald-300 rounded-full opacity-50 animate-pulse"></div>
        </div>

        {/* Header with User Info */}
        <div className="relative z-10 bg-gray-900/90 backdrop-blur-md border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  MasterLingo.ai
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Welcome back,</p>
                  <p className="font-semibold text-white">{user?.firstName || user?.emailAddresses[0]?.emailAddress}</p>
                </div>
                <SignOutButton>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800/50 rounded-lg">
                    <LogOut className="w-5 h-5" />
                  </button>
                </SignOutButton>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 max-w-4xl w-full">
            {/* Beta Notice */}
            <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-orange-500/30">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
                <span className="text-lg font-semibold text-orange-300">Beta Version - 3 Minute Sessions</span>
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <p className="text-orange-200">
                This beta version allows 3-minute learning sessions to help you explore our AI-powered language learning experience.
              </p>
            </div>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full mb-6 shadow-lg shadow-emerald-500/30">
                <Languages className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-4">
                Start Your Learning Journey
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Select your languages and begin your personalized AI conversation experience.
              </p>
            </div>

            {/* Language Selection */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Native Language */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-emerald-400" />
                  Your Native Language
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {nativeLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setCurrentLanguage(lang.code)}
                      className={`group relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105 ${
                        currentLanguage === lang.code
                          ? 'border-emerald-500 bg-emerald-900/50 shadow-lg shadow-emerald-500/30 scale-105'
                          : 'border-gray-600 hover:border-emerald-400 bg-gray-800/50'
                      }`}
                    >
                      <div className="text-3xl mb-2 text-gray-200 group-hover:animate-bounce">{lang.flag}</div>
                      <div className="text-sm font-semibold text-gray-200">{lang.name}</div>
                      {currentLanguage === lang.code && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Language */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-green-400" />
                  Language to Learn
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setTargetLanguage(lang.code)}
                      className={`group relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105 ${
                        targetLanguage === lang.code
                          ? 'border-green-500 bg-green-900/50 shadow-lg shadow-green-500/30 scale-105'
                          : 'border-gray-600 hover:border-green-400 bg-gray-800/50'
                      }`}
                    >
                      <div className="text-3xl mb-2 text-gray-200 group-hover:animate-bounce">{lang.flag}</div>
                      <div className="text-sm font-semibold text-gray-200">{lang.name}</div>
                      {targetLanguage === lang.code && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <button
                onClick={handleStartLearning}
                disabled={!currentLanguage || !targetLanguage}
                className="group relative inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl shadow-emerald-500/30 disabled:shadow-none text-xl min-w-[300px] focus:outline-none"
              >
                <div className="relative flex items-center gap-3">
                  <Play className="w-7 h-7" />
                  Begin Your Journey
                </div>
              </button>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50">
                <div className="w-12 h-12 bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
                  <Headphones className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-semibold text-white mb-1">Voice Conversations</h4>
                <p className="text-sm text-gray-300">Natural speech practice with AI feedback</p>
              </div>
              <div className="p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50">
                <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="font-semibold text-white mb-1">Adaptive Learning</h4>
                <p className="text-sm text-gray-300">Personalized lessons that adapt to your pace</p>
              </div>
              <div className="p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50">
                <div className="w-12 h-12 bg-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-3 border border-teal-500/30">
                  <Award className="w-6 h-6 text-teal-400" />
                </div>
                <h4 className="font-semibold text-white mb-1">Progress Tracking</h4>
                <p className="text-sm text-gray-300">Monitor your improvement in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Learning Phase - Enhanced Green Theme with Timer
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-emerald-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full opacity-5 animate-spin" style={{animationDuration: '30s'}}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gray-900/90 backdrop-blur-md border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  MasterLingo.ai
                </h1>
              </div>
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-800/60 rounded-full border border-gray-700/50">
                  <span className="text-gray-300">Learning:</span>
                  <span className="text-2xl">{languages.find(l => l.code === targetLanguage)?.flag}</span>
                  <span className="font-semibold text-emerald-400">{languages.find(l => l.code === targetLanguage)?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  {formatTime(sessionTime)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Remaining Time Counter */}
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
                remainingTime <= 30 
                  ? 'bg-red-900/60 border-red-500/50 text-red-300' 
                  : remainingTime <= 60 
                  ? 'bg-yellow-900/60 border-yellow-500/50 text-yellow-300'
                  : 'bg-emerald-900/60 border-emerald-500/50 text-emerald-300'
              }`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold">{formatTime(remainingTime)}</span>
                <span className="text-xs">left</span>
              </div>
              <SignOutButton>
                <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800/50 rounded-lg">
                  <LogOut className="w-5 h-5" />
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Learning Area */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-medium text-white">Session Progress</span>
                  <span className="text-lg font-bold text-emerald-400">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-800/60 rounded-full h-4 overflow-hidden border border-gray-700/50">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-4 rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="h-full bg-white/30 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Time Warning */}
              {remainingTime <= 30 && (
                <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-red-500/30">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
                    <span className="text-red-300 font-semibold">
                      Session ending in {remainingTime} seconds!
                    </span>
                  </div>
                </div>
              )}

              {/* Voice Interface */}
              <div className="text-center mb-8">
                <div className={`relative inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 transition-all duration-300 ${
                  isListening 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-2xl shadow-green-500/50 animate-pulse' 
                    : sessionState === 'paused'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-2xl shadow-yellow-500/50'
                    : 'bg-gradient-to-r from-gray-600 to-gray-700 shadow-2xl shadow-gray-500/30'
                }`}>
                  {isListening ? (
                    <>
                      <Mic className="w-16 h-16 text-white animate-bounce" />
                      <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></div>
                    </>
                  ) : sessionState === 'paused' ? (
                    <Pause className="w-16 h-16 text-white" />
                  ) : (
                    <MicOff className="w-16 h-16 text-white" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  {sessionState === 'learning' 
                    ? (isListening ? "I'm Listening..." : "Ready to Resume")
                    : "Session Paused"
                  }
                </h3>
                <p className="text-gray-300 text-lg">
                  {isListening 
                    ? "Speak naturally and I'll guide you through your learning journey"
                    : "Click the controls below to continue your session"
                  }
                </p>
              </div>

              {/* Current Phrase */}
              {currentPhrase && (
                <div className="bg-gradient-to-r from-emerald-900/40 to-green-900/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-emerald-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Volume2 className="w-6 h-6 text-emerald-400" />
                    <span className="text-lg font-semibold text-emerald-300">Practice This Phrase:</span>
                  </div>
                  <p className="text-2xl font-bold text-white leading-relaxed">{currentPhrase}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: `${i * 0.2}s`}}></div>
                      ))}
                    </div>
                    <span className="text-gray-300 text-sm ml-2">Repeat after me</span>
                  </div>
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePauseResume}
                  disabled={!isConnected}
                  className={`group p-4 rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                    sessionState === 'learning'
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 shadow-2xl shadow-yellow-600/30'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl shadow-green-600/30'
                  }`}
                >
                  {sessionState === 'learning' ? 
                    <Pause className="w-8 h-8 text-white" /> : 
                    <Play className="w-8 h-8 text-white" />
                  }
                </button>
                
                <button
                  onClick={handleStopLearning}
                  disabled={!isConnected}
                  className="group p-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-red-600/30"
                >
                  <StopCircle className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session Timer */}
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-emerald-400" />
                Beta Session Timer
              </h3>
              <div className="text-center">
                <div className={`text-4xl font-mono font-bold mb-2 ${
                  remainingTime <= 30 ? 'text-red-400' : 
                  remainingTime <= 60 ? 'text-yellow-400' : 'text-emerald-400'
                }`}>
                  {formatTime(remainingTime)}
                </div>
                <p className="text-sm text-gray-400">Time Remaining</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      remainingTime <= 30 ? 'bg-red-500' : 
                      remainingTime <= 60 ? 'bg-yellow-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${(remainingTime / 180) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Session Stats */}
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                Session Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Time</span>
                  <span className="font-bold text-white text-lg">{formatTime(sessionTime)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Progress</span>
                  <span className="font-bold text-emerald-400 text-lg">{Math.round(progress)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Status</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`}></div>
                    <span className={`font-semibold ${isConnected ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Tips */}
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                Pro Tips
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                {[
                  'Speak clearly and naturally',
                  'Don\'t worry about perfect pronunciation',
                  'Repeat phrases to build muscle memory',
                  'Ask questions when confused',
                  'Make the most of your 3 minutes!'
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-green-400" />
                Languages
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-400">Native Language</span>
                  <div className="flex items-center gap-3 mt-2 p-3 bg-gray-800/60 rounded-xl border border-gray-700/50">
                    <span className="text-2xl">{nativeLanguages.find(l => l.code === currentLanguage)?.flag}</span>
                    <span className="font-semibold text-white">{nativeLanguages.find(l => l.code === currentLanguage)?.name}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Learning</span>
                  <div className="flex items-center gap-3 mt-2 p-3 bg-gradient-to-r from-emerald-900/40 to-green-900/40 rounded-xl border border-emerald-500/30">
                    <span className="text-2xl">{languages.find(l => l.code === targetLanguage)?.flag}</span>
                    <span className="font-semibold text-white">{languages.find(l => l.code === targetLanguage)?.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}