import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const handleSignOut = async () => {
    "use server";
    redirect("/");
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="m-0 p-0">
        <Link href="/signin">
          <Button variant="outline" className="rounded-none rounded-l-full">
            Sign in
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline" className="rounded-none rounded-r-full">
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}
