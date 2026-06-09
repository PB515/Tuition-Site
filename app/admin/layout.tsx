import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";

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

  // The login page renders alone (middleware guarantees this path is reached
  // only when logged out).
  if (!user) return <>{children}</>;

  // Only staff may use the admin. A logged-in non-staff user (a parent) is
  // sent to the parent portal.
  const { data: staffRow } = await supabase
    .from("staff")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!staffRow) redirect("/parent");

  return (
    <>
      <AdminNav email={user.email ?? ""} />
      {children}
    </>
  );
}
