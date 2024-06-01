import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/web-ui/components/Tabs";

export default function HomePage() {
  return (
    <div className="flex h-full flex-col gap-y-6 px-5 py-4">
      <Tabs defaultValue="all" className="h-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="not-completed">Not Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">hello world</TabsContent>
      </Tabs>
      <div>new todo</div>
    </div>
  );
}
