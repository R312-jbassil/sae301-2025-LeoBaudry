import pb from "../../../utils/pb";

export const POST = async ({ cookies }) => {
  console.log('🚪 Logout...');
  
  pb.authStore.clear();
  cookies.delete("pb_auth", { path: "/" });
  
  console.log('✅ Logout réussi');
  
  return new Response(
    JSON.stringify({ success: true }), 
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
