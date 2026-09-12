const fs = require('fs');
const path = require('path');

const webSrc = path.join(__dirname, 'apps/web/src');

const files = {
  'app/page.tsx': `
import Link from 'next/link';
import { ArrowRight, BookOpen, Building2, GraduationCap, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="px-6 py-4 border-b flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <BookOpen className="h-6 w-6" />
          <span>IPRCRP Platform</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          <Link href="/opportunities" className="text-sm font-medium hover:text-primary transition-colors">Opportunities</Link>
          <Link href="/faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 md:py-32 px-6 flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 mb-6">
            Connecting Industry Challenges with Academic Brilliance.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
            A centralized ecosystem where students, institutions, and industry users can interact with education-related services, opportunities, resources, and AI-powered features.
          </p>
          <div className="flex gap-4">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-base">
                Join the Platform <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/opportunities">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Explore Problems
              </Button>
            </Link>
          </div>
        </section>

        {/* Roles Section */}
        <section className="bg-gray-50 py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">An Ecosystem Built for Everyone</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Students</h3>
                <p className="text-gray-600 mb-6">Find real-world industry problems, secure internships, and get AI-powered career guidance.</p>
                <Link href="/register?role=student" className="text-blue-600 font-medium hover:underline flex items-center">
                  Get Started <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Institutions</h3>
                <p className="text-gray-600 mb-6">Connect your students with industry, manage resources, and monitor research success.</p>
                <Link href="/register?role=college" className="text-purple-600 font-medium hover:underline flex items-center">
                  Get Started <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Industry</h3>
                <p className="text-gray-600 mb-6">Post challenges, crowdsource solutions from brilliant minds, and hire top talent directly.</p>
                <Link href="/register?role=industry" className="text-green-600 font-medium hover:underline flex items-center">
                  Get Started <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <BookOpen className="h-6 w-6" />
              <span>IPRCRP</span>
            </div>
            <p className="text-sm max-w-xs text-gray-400">
              AI-Powered Industry Problem Resolution and Collaborative Research Platform.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <h4 className="text-white font-medium mb-2">Platform</h4>
              <Link href="/about" className="text-sm hover:text-white transition-colors">About Us</Link>
              <Link href="/opportunities" className="text-sm hover:text-white transition-colors">Opportunities</Link>
              <Link href="/faq" className="text-sm hover:text-white transition-colors">FAQ</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-white font-medium mb-2">Legal</h4>
              <Link href="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-sm hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
`,
  'app/about/page.tsx': `
export default function About() {
  return (
    <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        The AI-Powered Industry Problem Resolution and Collaborative Research Platform (IPRCRP) is designed to bridge the gap between academia and industry. 
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        We connect students, institutions, and companies through a unified platform, facilitating real-world problem solving, internships, jobs, and AI-driven career recommendations.
      </p>
    </div>
  )
}
`,
  'app/login/page.tsx': `
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <div className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="w-full border rounded-lg p-3 text-sm" />
          <input type="password" placeholder="Password" className="w-full border rounded-lg p-3 text-sm" />
          <Button className="w-full">Sign In</Button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <Link href="/register" className="text-primary font-medium hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}
`,
  'app/opportunities/page.tsx': `
export default function Opportunities() {
  return (
    <div className="min-h-screen py-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Opportunities & Problem Statements</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Placeholder cards */}
        <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
          <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-md">Research Problem</span>
          <h2 className="text-xl font-bold mt-3 mb-2">Optimize Supply Chain Logistics</h2>
          <p className="text-gray-600 text-sm mb-4">We are looking for researchers to develop a machine learning model to reduce logistics cost by 15%.</p>
          <button className="text-primary text-sm font-medium hover:underline">View Details</button>
        </div>
      </div>
    </div>
  )
}
`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(webSrc, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\\n');
}

console.log('Frontend basic pages scaffolded.');
