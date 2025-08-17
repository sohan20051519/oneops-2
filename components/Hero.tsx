import React from 'react';
import { PlayIcon, ChevronRightIcon } from './icons/Icons';

interface HeroProps {
  onConnectRepo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onConnectRepo }) => {
  return (
    <section className="py-12 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <p className="text-base font-semibold text-primary uppercase tracking-wider">
            DevOps Made Simple
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Deploy with <span className="text-primary">Zero Config</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            Connect your Git repo and watch OneOps automatically build, deploy,
            and monitor your applications. No YAML files, no CLI headaches - just
            pure simplicity.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={onConnectRepo}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105">
              Connect Repository
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105">
              <PlayIcon className="mr-2 h-5 w-5" />
              Watch Demo
            </button>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/devops/800/600"
            alt="OneOps Dashboard" 
            className="rounded-xl shadow-2xl ring-1 ring-gray-900/10" 
          />
           <div className="absolute bottom-4 left-4 flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold shadow-lg">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
            </span>
            Live Deployment
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;