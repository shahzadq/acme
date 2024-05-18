import { RootLayout } from "@workspace/web-ui/components/Layout/RootLayout";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <RootLayout classNames={{ main: "items-center justify-center" }}>
      <div className="flex w-full max-w-[480px] flex-col gap-y-6 rounded-md p-8">
        {props.children}
      </div>
    </RootLayout>
  );
}
