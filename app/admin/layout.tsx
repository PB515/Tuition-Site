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
  // only when logged out). Authenticated admin pages get the nav bar.
  if (!user) return <>{children}</>;

  return (
    <>
      <AdminNav email={user.email ?? ""} />
      {children}
    </>
  );
}
