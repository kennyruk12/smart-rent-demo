import React from 'react';
import { Link } from 'react-router-dom';
import { SmartRentLogo } from './SmartRentLogo';
import { ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#0B0F17] border-t border-black/[0.06] dark:border-white/[0.08] text-[#1C1C1E] dark:text-white pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-black/[0.06] dark:border-white/[0.08]">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-2">
            <SmartRentLogo size="md" />
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed max-w-sm">
              Rwanda's verified residential rental marketplace. Connecting tenants and property owners directly with 0% broker commissions.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <ThemeToggle showLabel className="border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full" />
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Locations
            </div>
            <ul className="space-y-2 text-xs text-[#1C1C1E] dark:text-gray-300">
              <li>
                <Link to="/locations/Kicukiro%20(Kigali)" className="hover:text-[#0E9F6E] transition-colors">
                  Kicukiro (Kigali)
                </Link>
              </li>
              <li>
                <Link to="/locations/Gasabo%20(Kigali)" className="hover:text-[#0E9F6E] transition-colors">
                  Gasabo (Kigali)
                </Link>
              </li>
              <li>
                <Link to="/locations/Nyarugenge%20(Kigali)" className="hover:text-[#0E9F6E] transition-colors">
                  Nyarugenge (Kigali)
                </Link>
              </li>
              <li>
                <Link to="/locations/Musanze" className="hover:text-[#0E9F6E] transition-colors">
                  Musanze
                </Link>
              </li>
              <li>
                <Link to="/locations/Rubavu%20(Gisenyi)" className="hover:text-[#0E9F6E] transition-colors">
                  Rubavu (Lake Kivu)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Discover
            </div>
            <ul className="space-y-2 text-xs text-[#1C1C1E] dark:text-gray-300">
              <li>
                <Link to="/explore" className="hover:text-[#0E9F6E] transition-colors">
                  Explore Homes
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#0E9F6E] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/for-landlords" className="hover:text-[#0E9F6E] transition-colors">
                  For Landlords (Free)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#0E9F6E] transition-colors">
                  About Smart Rent
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#0E9F6E] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Help & Legal
            </div>
            <ul className="space-y-2 text-xs text-[#1C1C1E] dark:text-gray-300">
              <li>
                <Link to="/help" className="hover:text-[#0E9F6E] transition-colors">
                  Help Center / FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#0E9F6E] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#0E9F6E] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#0E9F6E] transition-colors">
                  Account Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
          <div>
            © {new Date().getFullYear()} Smart Rent Rwanda Ltd. 100% Commission-Free Direct Housing.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/help" className="hover:underline">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
