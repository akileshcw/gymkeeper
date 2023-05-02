import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Protected = (props) => {
  const router = useRouter();
  const session = useSession();
  const authenticate = () => {
    if (session.status === "authenticated") {
      if (router.pathname === "/") {
        if (window.history.length > 3) {
          router.back();
        } else {
          router.push("/dashboard");
        }
      }
    } else {
      router.push("/");
    }
  };
  useEffect(() => {
    authenticate();
  }, [session]);

  return <>{props.children}</>;
};

export default Protected;
