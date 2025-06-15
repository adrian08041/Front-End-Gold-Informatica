export const SummaryCardIcon = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md">
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-sm font-medium">{children}</p>;
};

export const SummaryCardValue = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-2xl font-bold">{children}</p>;
};

export const SummaryCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-xl bg-dourado p-6 text-secondary-foreground hover:bg-dourado/80">
      {children}
    </div>
  );
};
