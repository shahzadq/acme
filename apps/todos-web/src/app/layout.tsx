import { AppRootLayout } from "@workspace/web-ui/components/Layout/AppRootLayout";

export default function Layout(props: { children: React.ReactNode }) {
  return <AppRootLayout classNames={{ main: "flex-row" }} {...props} />;
}
