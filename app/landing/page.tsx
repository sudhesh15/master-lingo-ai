import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Languages, Headphones, TrendingUp, Award, Mic, Zap, Clock, Star, Quote, Mail, MapPin, Phone, Twitter, Facebook, Instagram, Youtube } from "lucide-react";

export default function LandingPage() {
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

      <div className="relative z-10">
        {/* Header */}
        <header className="px-3 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between w-full">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Languages className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent truncate">
                MasterLingo.ai
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
              <SignInButton>
                <button className="px-4 sm:px-6 py-2 text-gray-300 hover:text-white border border-gray-600 hover:border-emerald-500 rounded-lg transition-all duration-300 w-full sm:w-auto">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-4 sm:px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 w-full sm:w-auto">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-3 sm:px-6 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-300">Beta Version - 3 Minute Sessions</span>
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              
              <h1
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight break-words hyphens-auto"
                style={{ wordBreak: "break-word" }}
              >
                Master Languages with
                <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent block mt-2 break-words hyphens-auto">
                  AI-Powered Conversations
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                Experience the future of language learning with personalized AI tutors that adapt to your pace. 
                Practice speaking, improve pronunciation, and gain confidence through natural conversations.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SignUpButton>
                  <button className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-emerald-500/30 text-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative flex items-center gap-3">
                      <Mic className="w-6 h-6" />
                      Start Learning Now
                      <div className="ml-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    </div>
                  </button>
                </SignUpButton>
                
                <a
                href="https://youtu.be/tX7Li2hOzV4?si=jZvpJoIfCrjqRsZB"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                <span className="w-12 h-12 border-2 border-gray-600 group-hover:border-emerald-500 rounded-full flex items-center justify-center transition-all duration-300">
                    <span className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-current ml-1" />
                </span>
                <span className="text-lg">Watch Demo</span>
                </a>

              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="group p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Voice Conversations</h3>
                <p className="text-gray-300 leading-relaxed">
                  Practice speaking naturally with AI tutors that provide real-time feedback on pronunciation and fluency.
                </p>
              </div>

              <div className="group p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-green-500/30 transition-all duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Adaptive Learning</h3>
                <p className="text-gray-300 leading-relaxed">
                  Personalized lessons that adapt to your learning pace and style, ensuring optimal progress at every step.
                </p>
              </div>

              <div className="group p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-teal-500/30 transition-all duration-300">
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
                <div key={index} className="px-6 py-3 bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-700/50 text-gray-300 hover:border-emerald-500/30 hover:text-white transition-all duration-300">
                  {lang}
                </div>
              ))}
            </div>

            <SignUpButton>
              <button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-emerald-500/30 text-lg">
                Choose Your Language
              </button>
            </SignUpButton>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of language learners who are already making progress with MasterLingo.ai
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Review 1 */}
              <div className="group p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    S
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Sarah Chen</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-emerald-400 mb-4 opacity-60" />
                <p className="text-gray-300 leading-relaxed mb-4">
                  "The AI conversations feel so natural! I&apos;ve improved my Spanish pronunciation more in 2 weeks than I did in months with traditional apps."
                </p>
                <span className="text-emerald-400 text-sm font-semibold">Learning Spanish</span>
              </div>

              {/* Review 2 */}
              <div className="group p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Marcus Johnson</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-green-400 text-green-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-green-400 mb-4 opacity-60" />
                <p className="text-gray-300 leading-relaxed mb-4">
                  &quot;Finally, a language app that understands my learning style. The adaptive AI adjusts to my pace perfectly. Highly recommended!&quot;
                </p>
                <span className="text-green-400 text-sm font-semibold">Learning French</span>
              </div>

              {/* Review 3 */}
              <div className="group p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    A
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Anna Kowalski</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-teal-400 mb-4 opacity-60" />
                <p className="text-gray-300 leading-relaxed mb-4">
                 &quot;The real-time feedback is incredible. I can actually feel my confidence growing with each conversation. This is the future of language learning!&quot;
                </p>
                <span className="text-teal-400 text-sm font-semibold">Learning German</span>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="text-center mt-16">
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>
                  <span className="text-white font-bold text-lg">4.9/5</span>
                  <span className="text-gray-300">from 2,500+ users</span>
                </div>
                <div className="text-emerald-400 font-bold text-lg">10,000+ conversations completed</div>
                <div className="text-green-400 font-bold text-lg">95% user satisfaction</div>
              </div>
            </div>
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
                Start with our free beta and upgrade when you&apos;re ready for unlimited learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Beta Plan */}
              <div className="relative p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  CURRENT
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Beta Access</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-emerald-400">Free</span>
                    <span className="text-gray-400">during beta</span>
                  </div>
                  <p className="text-gray-300">Perfect for trying out our AI tutors</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    3-minute conversation sessions
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    All 8+ languages available
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Basic progress tracking
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Voice conversation practice
                  </li>
                </ul>
                <SignUpButton>
                  <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300">
                    Start Free Beta
                  </button>
                </SignUpButton>
              </div>

              {/* Pro Plan */}
              <div className="relative p-8 bg-gradient-to-br from-emerald-900/40 to-green-900/40 backdrop-blur-xl rounded-3xl border border-emerald-500/50 hover:border-emerald-400/60 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-emerald-500/20">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-400 to-green-400 text-white text-xs font-bold px-3 py-1 rounded-full">
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
                    <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Unlimited conversation time
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Advanced AI tutors
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Detailed progress analytics
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Custom lesson plans
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Priority support
                  </li>
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/30">
                  Coming Soon
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="relative p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-green-400">Custom</span>
                  </div>
                  <p className="text-gray-300">Perfect for schools and organizations</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Everything in Pro
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Team management dashboard
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Custom integrations
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Dedicated support
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Volume pricing
                  </li>
                </ul>
                <button className="w-full py-3 border border-green-500 hover:bg-green-500/10 text-green-400 hover:text-green-300 font-bold rounded-xl transition-all duration-300">
                  Contact Sales
                </button>
              </div>
            </div>

            {/* Beta Notice */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/30 rounded-full px-6 py-3">
                <Zap className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300">Beta users get early access to Pro features when they launch</span>
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Beta Notice */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-900/40 to-green-900/40 backdrop-blur-xl rounded-3xl border border-emerald-500/30 p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-emerald-400" />
                <h3 className="text-3xl font-bold text-white">Beta Version</h3>
                <Clock className="w-8 h-8 text-emerald-400" />
              </div>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Experience the future of AI language learning! This beta version offers 3-minute sessions 
                to let you explore our revolutionary conversation-based learning system.
              </p>
              <div className="flex items-center justify-center gap-2 text-emerald-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-lg font-semibold">Free during beta period</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-gray-800/50 bg-gray-900/20">
          <div className="max-w-7xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Brand Section */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Languages className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    MasterLingo.ai
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                  Revolutionizing language learning through AI-powered conversations. Master any language naturally 
                  with personalized tutors that adapt to your unique learning style.
                </p>
                
                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <a href="#" className="w-10 h-10 bg-gray-800/60 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                    <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800/60 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                    <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800/60 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                    <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800/60 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                    <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-bold text-lg mb-4">Product</h4>
                <ul className="space-y-3">
                  <li><a href="#features" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Features</a></li>
                  <li><a href="#languages" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Languages</a></li>
                  <li><a href="#pricing" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Pricing</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Mobile App</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">API Access</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-white font-bold text-lg mb-4">Support</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Help Center</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Community</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Contact Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Bug Reports</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">Feature Requests</a></li>
                </ul>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-gradient-to-r from-emerald-900/20 to-green-900/20 backdrop-blur-sm rounded-2xl border border-emerald-500/20 p-8 mb-12">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-white mb-2">Stay Updated</h4>
                <p className="text-gray-300 mb-6">Get notified about new features, languages, and exclusive beta updates</p>
                <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
                  <div className="relative flex-1 w-full">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full pl-12 pr-4 py-3 bg-gray-800/60 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <div className="w-10 h-10 bg-emerald-600/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-semibold">hello@masterlingo.ai</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <div className="w-10 h-10 bg-emerald-600/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Support</p>
                  <p className="text-white font-semibold">24/7 Chat Support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <div className="w-10 h-10 bg-emerald-600/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Global</p>
                  <p className="text-white font-semibold">Available Worldwide</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800/50">
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">
                  © 2024 MasterLingo.ai. All rights reserved.
                </p>
              </div>
              
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-300">
                  Cookies
                </a>
              </div>
            </div>

            {/* Beta Badge */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/30 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-300 text-sm font-semibold">Currently in Beta - Free Access</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}