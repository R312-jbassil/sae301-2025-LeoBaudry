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

    // ETAPE 1 : CRÉATION (Celle-ci fonctionnait déjà)
    const userRecord = await pb.collection("users").create({
      name: name || "",
      email,
      password,
      passwordConfirm: password,
      emailVisibility: true,
    });

    console.log('✅ Utilisateur créé:', userRecord.id);

    // --- CHANGEMENT ICI ---
    // On ne tente PLUS l'auto-login. 
    // On demande juste à PocketBase d'envoyer l'email de vérification.
    // (Même si le SMTP n'est pas configuré, cet appel ne plantera pas)
    try {
      await pb.collection('users').requestVerification(email);
      console.log('📨 Demande de vérification envoyée.');
    } catch (err) {
      // On ignore l'erreur si le SMTP n'est pas configuré
      console.warn('Erreur envoi email vérification (SMTP non configuré ?):', err.message);
    }

    // On renvoie un SUCCÈS 200 immédiatement après la création.
    return new Response(
      JSON.stringify({ user: userRecord }), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
    
  } catch (err) {
    // Ce bloc attrapera maintenant UNIQUEMENT les vraies erreurs (comme 'email déjà pris')
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