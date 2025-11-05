import pb from "../../utils/pb";

export const POST = async ({ request, locals }) => {
  try {
    const { id, name, svg, chat_history, materiaux } = await request.json();

    const creation = await pb.collection("Creations").getOne(id);

    let logIaId = creation.id_log_ia;

    // METTRE À JOUR LOG IA SI CHAT_HISTORY
    if (chat_history && chat_history !== "[]") {
      try {
        const parsedHistory = JSON.parse(chat_history);
        const firstUserMsg = parsedHistory.find(m => m.role === "user")?.content || "";
        const fullHistoryJson = JSON.stringify(parsedHistory);

        if (logIaId) {
          console.log('Mise à jour Log_IA existant:', logIaId);
          await pb.collection("Log_IA").update(logIaId, {
            prompt_utilisateur: firstUserMsg,
            reponse_ia: fullHistoryJson,
            timestamp: new Date().toISOString()
          });
        } else {
          console.log('Création nouveau Log_IA');
          const logIa = await pb.collection("Log_IA").create({
            timestamp: new Date().toISOString(),
            prompt_utilisateur: firstUserMsg,
            reponse_ia: fullHistoryJson,
          });
          logIaId = logIa.id;
        }
      } catch (err) {
        console.error('Erreur Log_IA:', err);
      }
    }

    // METTRE À JOUR LA CRÉATION
    const updated = await pb.collection("Creations").update(id, {
      nom_creation: name || creation.nom_creation,
      svg: svg,
      id_log_ia: logIaId
    });

    console.log('✅ Création mise à jour:', updated.id);

    // METTRE À JOUR LES MATÉRIAUX SI PRÉSENTS 
    if (materiaux && Array.isArray(materiaux) && materiaux.length > 0) {
      console.log('Traitement de', materiaux.length, 'matériaux');

      // Supprimer les anciens choix
      const oldChoix = await pb.collection("Choisir").getFullList({
        filter: `id_creation="${id}"`
      });
      
      for (const c of oldChoix) {
        await pb.collection("Choisir").delete(c.id);
      }
      
      // Créer les nouveaux
      for (const mat of materiaux) {
        try {
          const materiau = await pb.collection("Materiau").getFirstListItem(`code_valeur="${mat.code_valeur}"`);
          
          // CONVERTIR EN MAJUSCULE CORRECTEMENT
          const partieCiblee = {
            'monture': 'Monture',
            'verres': 'Verres',
            'branches': 'Branches'
          }[mat.partie_ciblee] || mat.partie_ciblee;

          console.log('Création Choisir avec:', {
            id_materiau: materiau.id,
            id_creation: id,
            partie_ciblee: partieCiblee
          });

          await pb.collection("Choisir").create({
            id_materiau: materiau.id,
            id_creation: id,
            partie_ciblee: partieCiblee,
          });

          console.log(`✅ Choisir créé pour ${partieCiblee}`);
        } catch (err) {
          console.error(`❌ Erreur pour ${mat.partie_ciblee}:`, err.data || err.message);
        }
      }
    }

    console.log('=== ✅ SUCCÈS UPDATE ===\n');
    return new Response(
      JSON.stringify({ success: true, id: updated.id }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Erreur update SVG:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
