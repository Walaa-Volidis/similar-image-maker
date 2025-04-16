import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
}: ProgressBarProps) => {
  return (
    <div className="space-y-4 py-2">
      <Progress value={progress} className="h-3 bg-secondary/50" />
      <div className="flex items-center justify-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <p className="text-base font-medium text-primary">
          Creating similar image... {progress}%
        </p>
      </div>
    </div>
  );
};
