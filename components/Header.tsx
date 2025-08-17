import React, { useState, useEffect } from 'react';
import { LightningBoltIcon, BellIcon, CogIcon, UserCircleIcon, PlusIcon, XIcon, MenuIcon } from './icons/Icons';
import { Tab } from '../types';

interface HeaderProps {
  onNewProject: () => void;
  onNavClick: (tab: Tab) => void;
  activeTab: Tab;
}

const Header: React.FC<HeaderProps> = ({ onNewProject, onNavClick, activeTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { name: string; tab: Tab }[] = [
    { name: 'Dashboard', tab: 'Projects' },
    { name: 'Pipelines', tab: 'Pipelines' },
    { name: 'Monitoring', tab: 'Monitoring' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleMobileNavClick = (tab: Tab) => {
    onNavClick(tab);
    setIsMenuOpen(false);
  }

  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <LightningBoltIcon className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gray-900">OneOps</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavClick(item.tab)}
                className={`text-sm font-medium transition-colors ${
                  activeTab === item.tab
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-semibold">
            <span className="h-2 w-2 bg-success rounded-full mr-2"></span>
            All Systems Operational
          </div>
          <button 
            onClick={onNewProject}
            className="flex items-center space-x-2 bg-primary text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
            <PlusIcon className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">New Project</span>
          </button>
          <div className="hidden md:flex items-center space-x-3 text-gray-500">
             <BellIcon className="h-6 w-6 hover:text-gray-800 cursor-pointer"/>
             <CogIcon className="h-6 w-6 hover:text-gray-800 cursor-pointer"/>
             <UserCircleIcon className="h-6 w-6 hover:text-gray-800 cursor-pointer"/>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="text-gray-500 hover:text-gray-800">
                <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)}></div>
        <div className="relative bg-white w-72 h-full ml-auto p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-gray-800">
                    <XIcon className="h-6 w-6" />
                </button>
            </div>
            <nav className="flex flex-col space-y-4">
                 {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => handleMobileNavClick(item.tab)}
                        className={`text-lg text-left font-medium transition-colors p-2 rounded-md ${
                        activeTab === item.tab
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {item.name}
                    </button>
                ))}
            </nav>
            <div className="mt-auto border-t pt-6 flex items-center space-x-4 text-gray-500">
                <BellIcon className="h-7 w-7 hover:text-gray-800 cursor-pointer"/>
                <CogIcon className="h-7 w-7 hover:text-gray-800 cursor-pointer"/>
                <UserCircleIcon className="h-7 w-7 hover:text-gray-800 cursor-pointer"/>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;