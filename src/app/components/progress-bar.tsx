import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
}: ProgressBarProps) => {
  return (
    <div className="space-y-2">
      <Progress value={progress} />
      <p className="text-sm text-gray-500 text-center">
        Creating similar image... {progress}%
      </p>
    </div>
  );
};
