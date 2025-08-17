import React, { useState, useCallback, useEffect } from 'react';
import { PipelineStep, PipelineStatus } from '../types';
import { CheckCircleIcon, ClockIcon, XCircleIcon, BeakerIcon } from './icons/Icons';
import { getAiErrorExplanation } from '../services/geminiService';

interface PipelineStepProps {
  step: PipelineStep;
  isLast: boolean;
  onAnalyze: (error: string) => void;
}

const statusConfig = {
  [PipelineStatus.Success]: {
    icon: <CheckCircleIcon className="h-6 w-6 text-white" />,
    bgColor: 'bg-success',
    lineColor: 'border-success',
  },
  [PipelineStatus.Running]: {
    icon: <ClockIcon className="h-6 w-6 text-white" />,
    bgColor: 'bg-warning',
    lineColor: 'border-warning',
  },
  [PipelineStatus.Failed]: {
    icon: <XCircleIcon className="h-6 w-6 text-white" />,
    bgColor: 'bg-danger',
    lineColor: 'border-danger',
  },
  [PipelineStatus.Pending]: {
    icon: <div className="h-3 w-3 bg-gray-300 rounded-full" />,
    bgColor: 'bg-gray-100 border-2 border-gray-300',
    lineColor: 'border-gray-300',
  },
};

const PipelineStepComponent: React.FC<PipelineStepProps> = ({ step, isLast, onAnalyze }) => {
  const config = statusConfig[step.status];
  return (
    <div className="flex items-start">
      <div className="flex flex-col items-center mr-6">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${config.bgColor}`}>
          {config.icon}
        </div>
        {!isLast && (
          <div className={`w-0.5 h-16 mt-2 ${config.lineColor} border-l-2 border-dashed`}></div>
        )}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md border w-full">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800">{step.name}</p>
            <p className="text-sm text-gray-500">{step.status}</p>
          </div>
          {step.status === PipelineStatus.Failed && step.error && (
            <button
              onClick={() => onAnalyze(step.error || '')}
              className="flex items-center space-x-2 bg-red-100 text-danger px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              <BeakerIcon className="h-4 w-4" />
              <span>Auto-Fix</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


const AiAnalysisModal: React.FC<{ error: string, onClose: () => void }> = ({ error, onClose }) => {
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchExplanation = useCallback(async () => {
        setIsLoading(true);
        const result = await getAiErrorExplanation(error);
        setExplanation(result);
        setIsLoading(false);
    }, [error]);

    useEffect(() => {
        fetchExplanation();
    }, [fetchExplanation]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <XCircleIcon className="h-6 w-6"/>
                </button>
                <h3 className="text-xl font-bold text-gray-900">AI Error Analysis</h3>
                <div className="mt-4 bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-sm font-mono text-danger">{error}</p>
                </div>
                <div className="mt-4 space-y-4 text-gray-700 max-h-[60vh] overflow-y-auto pr-2">
                    {isLoading ? (
                         <div className="flex flex-col items-center justify-center h-48">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            <p className="mt-4 text-gray-600">Analyzing with Gemini...</p>
                        </div>
                    ) : (
                        <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br />') }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};


const PipelineView: React.FC<{stages: PipelineStep[]}> = ({stages}) => {
  const [analyzingError, setAnalyzingError] = useState<string | null>(null);

  const handleAnalyze = (error: string) => {
    setAnalyzingError(error);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 ml-2">Latest Pipeline</h3>
      <div className="space-y-0">
        {stages.map((step, index) => (
          <PipelineStepComponent
            key={`${step.name}-${index}`}
            step={step}
            isLast={index === stages.length - 1}
            onAnalyze={handleAnalyze}
          />
        ))}
      </div>
      {analyzingError && (
        <AiAnalysisModal error={analyzingError} onClose={() => setAnalyzingError(null)} />
      )}
    </div>
  );
};

export default PipelineView;
