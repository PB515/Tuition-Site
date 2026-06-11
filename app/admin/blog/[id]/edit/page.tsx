import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import PostEditor from "@/components/admin/PostEditor";
import { updatePost } from "../../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit post", robots: { index: false, follow: false } };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).single();
  if (!post) notFound();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong">
        <ArrowLeft size={15} strokeWidth={2} /> Blog
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">Edit post</h1>
      <div className="mt-6">
        <PostEditor post={post} action={updatePost} submitLabel="Save changes" />
      </div>
    </div>
  );
}
