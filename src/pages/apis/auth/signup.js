import pb from "../../../utils/pb";

export const POST = async ({ request, cookies }) => {
  try {
    const { name, email, password } = await request.json();
    
    console.log('📝 Signup tentative:', email);
    
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email et mot de passe requis" }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // --- C'EST CE CODE DONT VOUS AVEZ BESOIN ---

    // ÉTAPE 1 : On crée l'utilisateur ET on le force à "verified: true"
    const userRecord = await pb.collection("users").create({
      name: name || "",
      email,
      password,
      passwordConfirm: password,
      emailVisibility: true,
      verified: true  // <-- LA LIGNE CLÉ QUI MANQUE
    });

    console.log('✅ Utilisateur créé et forcé "vérifié":', userRecord.id);

    // ÉTAPE 2 : On remet l'auto-login (qui va maintenant fonctionner)
    const authData = await pb.collection("users").authWithPassword(email, password);

    // ÉTAPE 3 : On remet le cookie
    cookies.set("pb_auth", pb.authStore.exportToCookie(), {
      path: "/",
      httpOnly: false,
      sameSite: "strict",
      secure: import.meta.env.PROD,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    console.log('✅ Signup ET auto-login réussis:', authData.record.id);

    // ÉTAPE 4 : On renvoie le succès avec l'utilisateur connecté
    return new Response(
      JSON.stringify({ user: authData.record }), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
    // --- FIN DU BON CODE ---
    
  } catch (err) {
  // Ce bloc attrapera l'erreur 'email déjà pris' si vous essayez 2x
    console.error("❌ Erreur inscription:", err.message);
    return new Response(
      JSON.stringify({ 
        error: err.message || "Erreur lors de l'inscription",
        details: err.data || {}
      }), 
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};