import pb from "../../../utils/pb";

export const POST = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();
    
    console.log('🔐 Login tentative:', email);
    
    const authData = await pb.collection("users").authWithPassword(email, password);

    cookies.set("pb_auth", pb.authStore.exportToCookie(), {
      path: "/",
      httpOnly: false,
      sameSite: "strict",
      secure: import.meta.env.PROD,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    console.log('✅ Login réussi:', authData.record.id);

    return new Response(
      JSON.stringify({ user: authData.record }), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Erreur de connexion:", err.message);
    return new Response(
      JSON.stringify({ error: "Identifiants invalides" }), 
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
};
