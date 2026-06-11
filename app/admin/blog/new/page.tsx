import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostEditor from "@/components/admin/PostEditor";
import { createPost } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "New post", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong">
        <ArrowLeft size={15} strokeWidth={2} /> Blog
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">New post</h1>
      <div className="mt-6">
        <PostEditor action={createPost} submitLabel="Save post" />
      </div>
    </div>
  );
}
