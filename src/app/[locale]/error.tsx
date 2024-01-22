"use client"; // Error components must be Client Components

import ErrorPage, { ErrorPageProps } from "@/components/ErrorPage";

export default function Error(props: ErrorPageProps) {
  return <ErrorPage {...props} />;
}
