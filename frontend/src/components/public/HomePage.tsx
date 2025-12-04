
import React, { useEffect, useState } from 'react';
import { APP_NAME } from '../../constants';

interface HomePageProps {
  onGetStarted: () => void;
}

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode; delay: number }> = ({ title, description, icon, delay }) => (
    <div 
        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
        style={{ animation: `fadeInUp 0.6s ease-out ${delay}s backwards` }}
    >
        <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-3xl mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const StepCard: React.FC<{ step: number; title: string; description: string; delay: number }> = ({ step, title, description, delay }) => (
    <div 
        className="relative text-center group" 
        style={{ animation: `fadeInUp 0.6s ease-out ${delay}s backwards` }}
    >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-4 border-gray-50 shadow-md group-hover:scale-110 transition-transform duration-300 z-10">
            {step}
        </div>
        <div className="pt-10 bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 h-full border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <style>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className={`text-2xl font-bold transition-colors ${scrolled ? 'text-indigo-900' : 'text-white'}`}>
            {APP_NAME}
          </h1>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className={`font-medium hover:text-indigo-400 transition-colors ${scrolled ? 'text-gray-600' : 'text-gray-200'}`}>Features</a>
            <a href="#how-it-works" className={`font-medium hover:text-indigo-400 transition-colors ${scrolled ? 'text-gray-600' : 'text-gray-200'}`}>How it Works</a>
            <a href="#contact" className={`font-medium hover:text-indigo-400 transition-colors ${scrolled ? 'text-gray-600' : 'text-gray-200'}`}>Contact</a>
          </div>
          <button 
            onClick={onGetStarted} 
            className={`font-semibold py-2.5 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${scrolled ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-indigo-600 hover:bg-indigo-50'}`}
          >
            Login / Get Started
          </button>
        </div>
      </nav>
    
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white pt-40 pb-32 px-6 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
             <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-800/50 border border-indigo-500/30 text-indigo-200 text-sm font-semibold mb-6 animate-[fadeInUp_0.6s_ease-out_0s_backwards]">
                🚀 AI-Powered CRM v2.0 is Live
             </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight animate-[fadeInUp_0.8s_ease-out_0.1s_backwards]">
              Automate Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Client Success</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.2s_backwards]">
              Deploy intelligent AI agents to handle outreach, scheduling, and follow-ups. Focus on closing deals while we handle the conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-[fadeInUp_0.8s_ease-out_0.3s_backwards]">
                <button onClick={onGetStarted} className="bg-indigo-500 text-white font-bold py-4 px-8 rounded-full shadow-xl hover:bg-indigo-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  Start Free Trial
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>
                <button className="bg-transparent border border-gray-400 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-colors duration-300">
                  Watch Demo
                </button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative animate-float">
             {/* Abstract Dashboard Illustration */}
             <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl max-w-lg mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="space-y-4">
                    <div className="h-32 bg-indigo-900/40 rounded-lg w-full flex items-end p-4 space-x-2">
                        <div className="w-1/5 bg-indigo-500 h-1/3 rounded-t"></div>
                        <div className="w-1/5 bg-purple-500 h-2/3 rounded-t"></div>
                        <div className="w-1/5 bg-indigo-500 h-1/2 rounded-t"></div>
                        <div className="w-1/5 bg-pink-500 h-3/4 rounded-t"></div>
                        <div className="w-1/5 bg-indigo-400 h-full rounded-t"></div>
                    </div>
                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg">
                        <div className="h-2 w-24 bg-gray-600 rounded"></div>
                        <div className="h-8 w-20 bg-green-500/20 text-green-300 rounded text-xs flex items-center justify-center font-bold">Active</div>
                    </div>
                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg">
                        <div className="h-2 w-32 bg-gray-600 rounded"></div>
                        <div className="h-8 w-20 bg-blue-500/20 text-blue-300 rounded text-xs flex items-center justify-center font-bold">Review</div>
                    </div>
                </div>
             </div>
             {/* Decorative Elements */}
             <div className="absolute -bottom-10 -right-10 bg-white text-gray-900 p-4 rounded-lg shadow-xl animate-[fadeInUp_0.8s_ease-out_0.6s_backwards]">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Success Rate</p>
                <p className="text-3xl font-bold text-indigo-600">98.5%</p>
             </div>
          </div>
        </div>
      </section>

      {/* Trusted By Strip */}
      <div className="bg-gray-100 py-10 border-b border-gray-200">
          <div className="container mx-auto px-6 text-center">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Trusted by 500+ innovative companies</p>
              <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  {/* Placeholders for logos */}
                  <div className="text-2xl font-bold text-gray-400 flex items-center"><span className="text-3xl mr-2">❖</span> Acme Corp</div>
                  <div className="text-2xl font-bold text-gray-400 flex items-center"><span className="text-3xl mr-2">⚡</span> BoltShift</div>
                  <div className="text-2xl font-bold text-gray-400 flex items-center"><span className="text-3xl mr-2">◈</span> GlobalBank</div>
                  <div className="text-2xl font-bold text-gray-400 flex items-center"><span className="text-3xl mr-2">◉</span> Orbit Inc.</div>
                  <div className="text-2xl font-bold text-gray-400 flex items-center"><span className="text-3xl mr-2">⌘</span> Command</div>
              </div>
          </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">Why Choose Us</h2>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Powerful Features for Modern Growth</h2>
            <p className="text-xl text-gray-600">Scale your outreach without scaling your headcount. Our AI handles the heavy lifting.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
                delay={0.1}
                title="AI-Driven Outreach" 
                description="Engage clients with intelligent, automated calls and messages that feel personal and context-aware." 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} 
            />
            <FeatureCard 
                delay={0.2}
                title="Real-time Analytics" 
                description="Monitor campaign performance as it happens with live dashboards and make data-driven decisions." 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} 
            />
            <FeatureCard 
                delay={0.3}
                title="Smart Scheduling" 
                description="The AI automatically books appointments on your calendar when leads express interest." 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} 
            />
            <FeatureCard 
                delay={0.4}
                title="Enterprise Security" 
                description="Bank-grade encryption and compliance ensures your client data is always protected." 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} 
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gray-50 px-6 relative">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Launch your first automated campaign in three simple steps.</p>
          </div>
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-4 z-0"></div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 pt-6">
            <StepCard delay={0.1} step={1} title="Upload Contacts" description="Import your leads via CSV or connect directly to your existing CRM system." />
            <StepCard delay={0.2} step={2} title="Configure AI" description="Select a persona for your AI agent and set the campaign goals and scripts." />
            <StepCard delay={0.3} step={3} title="Launch & Relax" description="The AI starts outreach immediately. Watch the appointments roll in." />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-indigo-900 text-white px-6">
          <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">What our clients say</h2>
              <div className="grid md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-indigo-800/50 p-8 rounded-xl border border-indigo-700/50">
                          <div className="flex text-yellow-400 mb-4">★★★★★</div>
                          <p className="text-indigo-100 italic mb-6">"This platform completely transformed how we handle lead qualification. We've seen a 300% increase in booked meetings."</p>
                          <div className="flex items-center">
                              <div className="w-10 h-10 bg-indigo-500 rounded-full mr-3"></div>
                              <div>
                                  <p className="font-bold">Sarah Jenkins</p>
                                  <p className="text-xs text-indigo-300">VP of Sales, TechGrowth</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-24 bg-white px-6">
        <div className="container mx-auto max-w-5xl">
            <div className="bg-indigo-50 rounded-2xl p-8 md:p-16 shadow-xl flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                    <p className="text-gray-600 mb-8">Have questions? Our team is here to help you get started with the future of CRM.</p>
                    
                    <div className="space-y-4">
                        <div className="flex items-center text-gray-700">
                            <span className="w-8 flex justify-center mr-2">📍</span>
                            <span>123 Innovation Dr, Tech City, TC 90210</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <span className="w-8 flex justify-center mr-2">📧</span>
                            <span>support@{APP_NAME.toLowerCase().replace(/\s/g, '')}.com</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <span className="w-8 flex justify-center mr-2">📞</span>
                            <span>+1 (555) 123-4567</span>
                        </div>
                    </div>
                </div>

                <div className="md:w-2/3 bg-white p-8 rounded-xl shadow-sm">
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" placeholder="Doe" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" placeholder="john@company.com" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all">
                                <option>Sales Inquiry</option>
                                <option>Technical Support</option>
                                <option>Partnership</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" placeholder="Tell us how we can help..."></textarea>
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transform active:scale-95 transition-all duration-200 shadow-md">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Brand Column */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4">{APP_NAME}</h3>
                    <p className="mb-6 text-gray-400">Revolutionizing client relationships with artificial intelligence. Built for scale, security, and success.</p>
                    <div className="flex space-x-4">
                        {/* Social Icons */}
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors text-white">𝕏</a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors text-white">in</a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors text-white">f</a>
                    </div>
                </div>

                {/* Links Column 1 */}
                <div>
                    <h4 className="text-lg font-bold text-white mb-6">Product</h4>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                    </ul>
                </div>

                {/* Links Column 2 */}
                <div>
                    <h4 className="text-lg font-bold text-white mb-6">Company</h4>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a> <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded ml-2">Hiring</span></li>
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div>
                    <h4 className="text-lg font-bold text-white mb-6">Stay Updated</h4>
                    <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest AI trends and product updates.</p>
                    <div className="flex flex-col space-y-3">
                        <input type="email" placeholder="Enter your email" className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-indigo-500 transition-colors" />
                        <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-500 transition-colors">Subscribe</button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
