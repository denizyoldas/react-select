export const Label = ({ label }: { label?: string }) => {
  if (!label) return null;

  return (
    <div className="pb-1">
      <label className="text-sm text-primary font-medium">{label}</label>
    </div>
  );
};
