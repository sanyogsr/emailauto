import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const page = async () => {
  const session = await auth();
  console.log("client session", session);

  return (
    <div>
      {JSON.stringify(session?.user?.id)}

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
};

export default page;
