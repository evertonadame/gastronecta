import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "../../context/authProvider";
import { api } from "../../lib/axios";

const UserInfo = () => {
  const { session } = useSession();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => {
      return api.get(`/user/${session}`);
    },
  });

  return <div>UserInfo</div>;
};

export default UserInfo;
