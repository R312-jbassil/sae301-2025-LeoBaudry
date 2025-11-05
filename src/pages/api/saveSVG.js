// import pb from "../../utils/pb";

// export const POST = async ({ request, locals }) => {
//   try {
//     const { name, svg, chat_history, id_modele, materiaux } = await request.json();
//     const user = locals?.user;

//     if (!user) {
//       return new Response(
//         JSON.stringify({ success: false, error: "Utilisateur non connecté" }),
//         { status: 401, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     if (!name || !svg) {
//       return new Response(
//         JSON.stringify({ success: false, error: "Nom ou SVG manquant" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Créer le log IA si chat_history existe (création IA)
//     let logIaId = null;
//     if (chat_history && chat_history !== "[]") {
//       const parsedHistory = JSON.parse(chat_history);
//       const firstUserMsg = parsedHistory.find(m => m.role === "user")?.content || "";
//       const lastAssistantMsg = [...parsedHistory].reverse().find(m => m.role === "assistant")?.content || "";
      
//       const logIa = await pb.collection("Log_IA").create({
//         timestamp: new Date().toISOString(),
//         prompt_utilisateur: firstUserMsg,
//         repose_ia: lastAssistantMsg,
//         id_user: user.id,
//       });
      
//       logIaId = logIa.id;
//     }

//     // Créer la création
//     const creation = await pb.collection("Creations").create({
//       nom_creation: name,
//       svg: svg,
//       id_user: user.id,
//       id_modele: id_modele || null,
//       id_log_ia: logIaId,
//     });

//     // Créer les choix de matériaux (si personnalisation)
//     if (materiaux && Array.isArray(materiaux)) {
//       for (const mat of materiaux) {
//         await pb.collection("Choisir").create({
//           id_materiau: mat.id_materiau,
//           id_creation: creation.id,
//           partie_ciblee: mat.partie_ciblee,
//         });
//       }
//     }

//     return new Response(
//       JSON.stringify({ success: true, id: creation.id, creation }),
//       { headers: { "Content-Type": "application/json" } }
//     );
//   } catch (err) {
//     console.error("Erreur sauvegarde SVG :", err);
//     return new Response(
//       JSON.stringify({ success: false, error: err.message }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// };


// SANS MIDDLEWARE POUR L'INSTANT
// SANS MIDDLEWARE POUR L'INSTANT
// SANS MIDDLEWARE POUR L'INSTANT
// SANS MIDDLEWARE POUR L'INSTANT
// SANS MIDDLEWARE POUR L'INSTANT

import pb from "../../utils/pb";

export const POST = async ({ request }) => {
  try {
    const { name, svg, id_modele, materiaux, chat_history } = await request.json();

    console.log('=== SAVSVG REÇU ===');
    console.log('Name:', name);

    if (!name || !svg) {
      return new Response(
        JSON.stringify({ success: false, error: "Nom ou SVG manquant" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let logIaId = null;

    // ===== CRÉER LE LOG IA SI CHAT_HISTORY EXISTE =====
    if (chat_history && chat_history !== "[]") {
      try {
        const parsedHistory = JSON.parse(chat_history);
        console.log('Chat history parsé:', parsedHistory.length, 'messages');

        const firstUserMsg = parsedHistory.find(m => m.role === "user")?.content || "";
        
        // ✅ ENVOIE LE SVG COMPLET
        console.log('SVG à enregistrer length:', svg.length);
        console.log('Création Log_IA...');

        const logIa = await pb.collection("Log_IA").create({
          timestamp: new Date().toISOString(),
          prompt_utilisateur: firstUserMsg,
          reponse_ia: svg, // ✅ LE SVG COMPLET
        });

        logIaId = logIa.id;
        console.log('✅ Log_IA créé:', logIaId);
        console.log('Enregistrement created:', logIa);
      } catch (err) {
        console.error('❌ Erreur création Log_IA:', err);
        console.error('Error details:', err.data || err.message);
      }
    }

    // ===== CRÉER LA CRÉATION =====
    const creation = await pb.collection("Creations").create({
      nom_creation: name,
      svg: svg,
      id_modele: id_modele || null,
      id_log_ia: logIaId || null,
    });

    console.log('✅ Création créée:', creation.id);

    // ===== CRÉER LES CHOIX DE MATÉRIAUX =====
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



