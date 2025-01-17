"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../shadcn/ui/button";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabase/client";
import { signout } from "@/utils/auth-actions";

const LoginButton = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);
  if (user) {
    return (
      <Button
        onClick={() => {
          signout();
          setUser(null);
        }}>
        Log out
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push("/login");
      }}>
      Login
    </Button>
  );
};

export default LoginButton;
