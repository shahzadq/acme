export const AuthFormHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col gap-y-2">
    <h1 className="w-full text-2xl font-bold">{title}</h1>
    <p className="text-sm text-foreground/50">{description}</p>
  </div>
);
