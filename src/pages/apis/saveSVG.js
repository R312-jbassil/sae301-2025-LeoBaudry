import pb from "../../utils/pb";

export const POST = async ({ request, locals }) => {
  try {
    const { name, svg, chat_history, id_modele, materiaux } = await request.json();
    const user = locals?.user;

    console.log('=== SAVESVG REÇU ===');
    console.log('Name:', name);
    console.log('User:', user?.id);

    // VÉRIFIER USER
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "Utilisateur non connecté" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!name || !svg) {
      return new Response(
        JSON.stringify({ success: false, error: "Nom ou SVG manquant" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let logIaId = null;

    // CRÉER LE LOG IA SI CHAT_HISTORY EXISTE
    if (chat_history && chat_history !== "[]") {
      try {
        const parsedHistory = JSON.parse(chat_history);
        console.log('Chat history parsé:', parsedHistory.length, 'messages');

        const firstUserMsg = parsedHistory.find(m => m.role === "user")?.content || "";
        
        console.log('Création Log_IA...');

        const logIa = await pb.collection("Log_IA").create({
          timestamp: new Date().toISOString(),
          prompt_utilisateur: firstUserMsg,
          reponse_ia: svg,
          id_user: user.id,
        });

        logIaId = logIa.id;
        console.log('✅ Log_IA créé:', logIaId);
      } catch (err) {
        console.error('❌ Erreur création Log_IA:', err);
        console.error('Error details:', err.data || err.message);
      }
    }

    // CRÉER LA CRÉATION 
    const creation = await pb.collection("Creations").create({
      nom_creation: name,
      svg: svg,
      id_modele: id_modele || null,
      id_log_ia: logIaId || null,
      id_user: user.id,
    });

    console.log('✅ Création créée:', creation.id);

    // CRÉER LES CHOIX DE MATÉRIAUX
    if (materiaux && Array.isArray(materiaux) && materiaux.length > 0) {
      for (const mat of materiaux) {
        try {
          const materiau = await pb.collection("Materiau").getFirstListItem(
            `code_valeur="${mat.code_valeur}"`
          );

          const partieCiblee = {
            monture: 'Monture',
            verres: 'Verres',
            branches: 'Branches'
          }[mat.partie_ciblee] || mat.partie_ciblee;

          await pb.collection("Choisir").create({
            id_materiau: materiau.id,
            id_creation: creation.id,
            partie_ciblee: partieCiblee,
          });

          console.log('✅ Matériau lié:', materiau.id);
        } catch (err) {
          console.error(`❌ Erreur matériau:`, err.message);
        }
      }
    }

    console.log('=== ✅ SUCCÈS ===\n');
    return new Response(
      JSON.stringify({ success: true, id: creation.id, creation }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Erreur sauvegarde SVG:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
