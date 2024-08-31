import React from 'react';

interface ExerciseInfoItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: React.ReactNode;
}

const ExerciseInfoItem: React.FC<ExerciseInfoItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-2 text-sm">
    <Icon className="w-4 h-4 text-muted-foreground" />
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

export default ExerciseInfoItem;
