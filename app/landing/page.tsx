// app/landing/page.tsx
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Globe, Languages, Headphones, TrendingUp, Award, Mic, Zap, Clock } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full opacity-10 animate-spin" style={{animationDuration: '20s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-400 rounded-full opacity-30 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-violet-400 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-purple-300 rounded-full opacity-50 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Languages className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                MasterLingo.ai
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <SignInButton>
                <button className="px-6 py-2 text-gray-300 hover:text-white border border-gray-600 hover:border-purple-500 rounded-lg transition-all duration-300">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/30">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300">Beta Version - 3 Minute Sessions</span>
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Master Languages with
                <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent block mt-2">
                  AI-Powered Conversations
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                Experience the future of language learning with personalized AI tutors that adapt to your pace. 
                Practice speaking, improve pronunciation, and gain confidence through natural conversations.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SignUpButton>
                  <button className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/30 text-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative flex items-center gap-3">
                      <Mic className="w-6 h-6" />
                      Start Learning Now
                      <div className="ml-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    </div>
                  </button>
                </SignUpButton>
                
                <a
                href="https://youtu.be/u2f4pvZ0qJs?si=WupfCxj5gzI0F3BH"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                <span className="w-12 h-12 border-2 border-gray-600 group-hover:border-purple-500 rounded-full flex items-center justify-center transition-all duration-300">
                    <span className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-current ml-1" />
                </span>
                <span className="text-lg">Watch Demo</span>
                </a>

              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="group p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Voice Conversations</h3>
                <p className="text-gray-300 leading-relaxed">
                  Practice speaking naturally with AI tutors that provide real-time feedback on pronunciation and fluency.
                </p>
              </div>

              <div className="group p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-violet-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Adaptive Learning</h3>
                <p className="text-gray-300 leading-relaxed">
                  Personalized lessons that adapt to your learning pace and style, ensuring optimal progress at every step.
                </p>
              </div>

              <div className="group p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Real-time Progress</h3>
                <p className="text-gray-300 leading-relaxed">
                  Track your improvement with detailed analytics and celebrate milestones as you progress toward fluency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Languages Section */}
        <section className="px-6 py-20 bg-gray-900/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Learn Any Language
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Choose from 10+ popular languages and start your journey to fluency
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
              {['🇪🇸 Spanish', '🇫🇷 French', '🇩🇪 German', '🇮🇹 Italian', '🇯🇵 Japanese', '🇰🇷 Korean', '🇨🇳 Mandarin', '🇷🇺 Russian'].map((lang, index) => (
                <div key={index} className="px-6 py-3 bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-700/50 text-gray-300 hover:border-purple-500/30 hover:text-white transition-all duration-300">
                  {lang}
                </div>
              ))}
            </div>

            <SignUpButton>
              <button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/30 text-lg">
                Choose Your Language
              </button>
            </SignUpButton>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Start with our free beta and upgrade when you're ready for unlimited learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Beta Plan */}
              <div className="relative p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  CURRENT
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Beta Access</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-purple-400">Free</span>
                    <span className="text-gray-400">during beta</span>
                  </div>
                  <p className="text-gray-300">Perfect for trying out our AI tutors</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    3-minute conversation sessions
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    All 8+ languages available
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Basic progress tracking
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Voice conversation practice
                  </li>
                </ul>
                <SignUpButton>
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold rounded-xl transition-all duration-300">
                    Start Free Beta
                  </button>
                </SignUpButton>
              </div>

              {/* Pro Plan */}
              <div className="relative p-8 bg-gradient-to-br from-purple-900/40 to-violet-900/40 backdrop-blur-xl rounded-3xl border border-purple-500/50 hover:border-purple-400/60 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-500/20">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-400 to-violet-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-white">$19</span>
                    <span className="text-gray-300">/month</span>
                  </div>
                  <p className="text-gray-300">Unlimited learning for serious students</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Unlimited conversation time
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Advanced AI tutors
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Detailed progress analytics
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Custom lesson plans
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Priority support
                  </li>
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30">
                  Coming Soon
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="relative p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-violet-500/30 transition-all duration-300">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-violet-400">Custom</span>
                  </div>
                  <p className="text-gray-300">Perfect for schools and organizations</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-violet-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Everything in Pro
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-violet-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Team management dashboard
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-violet-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Custom integrations
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-violet-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Dedicated support
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-violet-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Volume pricing
                  </li>
                </ul>
                <button className="w-full py-3 border border-violet-500 hover:bg-violet-500/10 text-violet-400 hover:text-violet-300 font-bold rounded-xl transition-all duration-300">
                  Contact Sales
                </button>
              </div>
            </div>

            {/* Beta Notice */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-6 py-3">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300">Beta users get early access to Pro features when they launch</span>
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Beta Notice */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-900/40 to-violet-900/40 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-purple-400" />
                <h3 className="text-3xl font-bold text-white">Beta Version</h3>
                <Clock className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Experience the future of AI language learning! This beta version offers 3-minute sessions 
                to let you explore our revolutionary conversation-based learning system.
              </p>
              <div className="flex items-center justify-center gap-2 text-purple-300">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-lg font-semibold">Free during beta period</span>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center">
                <Languages className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                MasterLingo.ai
              </span>
            </div>
            <p className="text-gray-400">
              Powered by advanced AI technology • Beta Version
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}