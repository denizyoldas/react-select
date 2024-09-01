export const HelperText = ({ helperText }: { helperText?: string }) => {
  if (!helperText) return null;

  return (
    <div className="pt-1">
      <p className="text-sm text-placeholder">{helperText}</p>
    </div>
  );
};
