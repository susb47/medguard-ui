"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Sun, Moon, Activity } from "lucide-react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const links = {
    main: [
      { name: 'Home', href: '/' },       
      { name: 'Team', href: '/team' },   
      { name: 'Contact', href: '/contact' }, 
    ],
    research: [
      { name: 'Project Timeline', href: '/timeline' }, 
      { name: 'Data Reports', href: '/data-reports' }, 
      { name: 'Methodological System', href: '/methodology' }, 
      { name: 'Publication Status', href: '/publication' }, 
      { name: 'References', href: '/references' }, 
    ],
    system: { name: 'Launch MedGuard', href: '/simulation' } 
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-2" 
        : "bg-transparent py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group z-50">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Activity size={20} />
            </div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              Med<span className="text-blue-600 dark:text-blue-400">Guard</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Main Links */}
            {links.main.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Research Dropdown */}
            <div className="relative group px-3 py-2">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Research <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden p-1 flex flex-col">
                  {links.research.map((link) => (
                    <Link 
                      key={link.name}
                      href={link.href} 
                      className="text-left px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
            <ThemeToggle />
            
            {/* CTA Button */}
            <Link 
              href={links.system.href}
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-slate-200/50 dark:shadow-none hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>{links.system.name}</span>
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="flex lg:hidden items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl animate-fade-in max-h-[85vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-1">
            {links.main.map(link => (
              <Link key={link.name} href={link.href} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">{link.name}</Link>
            ))}
            
            <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Research</div>
            {links.research.map(link => (
              <Link key={link.name} href={link.href} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">{link.name}</Link>
            ))}
            
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>
            
            <Link 
              href={links.system.href}
              className="block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 dark:shadow-none"
            >
              {links.system.name}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}