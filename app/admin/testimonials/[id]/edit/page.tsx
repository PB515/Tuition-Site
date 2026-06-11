import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { updateTestimonial } from "../../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit testimonial", robots: { index: false, follow: false } };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: testimonial } = await supabase.from("testimonials").select("*").eq("id", id).single();
  if (!testimonial) notFound();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/testimonials" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong">
        <ArrowLeft size={15} strokeWidth={2} /> Testimonials
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">Edit testimonial</h1>
      <div className="mt-6">
        <TestimonialForm testimonial={testimonial} action={updateTestimonial} submitLabel="Save changes" />
      </div>
    </div>
  );
}
