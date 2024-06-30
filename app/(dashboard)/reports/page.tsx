"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ReportPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="h-screen pt-32">
      <p className="text-3xl text-center"> The reports ReportPage</p>
    </div>
  );
};

export default ReportPage;
