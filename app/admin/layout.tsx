import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page renders alone (middleware guarantees logged-out here).
  if (!user) return <>{children}</>;

  // Staff only; a logged-in non-staff (parent) goes to the parent portal.
  const { data: staffRow } = await supabase
    .from("staff")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!staffRow) redirect("/parent");

  return <AdminShell email={user.email ?? ""}>{children}</AdminShell>;
}
