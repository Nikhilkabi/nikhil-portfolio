interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="sl">
      <span className="sl-txt">{children}</span>
      <div className="sl-line" />
    </div>
  );
}
