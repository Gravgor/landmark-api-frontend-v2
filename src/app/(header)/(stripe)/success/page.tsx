import SuccessPage from "@/components/success";
import SuccessPageSkeleton from "@/components/success-page-skeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<SuccessPageSkeleton />}>
      <SuccessPage />
    </Suspense>
  )
}