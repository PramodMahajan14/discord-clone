import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import "../globals.css";

const mainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <div className="!hidden sm:!flex   flex-col fixed h-full sm:w-[72px] z-30  inset-y-0 ">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default mainLayout;
