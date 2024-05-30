import { RootLayout } from "@workspace/web-ui/components/Layout/RootLayout";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <RootLayout
      classNames={{ main: "flex-row" }}
      header={{ appName: "todos" }}
      {...props}
    />
  );
}
