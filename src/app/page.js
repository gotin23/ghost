// Components
import UserLoggedOut from "@/layouts/home/UserLoggedOut";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <UserLoggedOut />
    </main>
  );
}
