import pb from "../../utils/pb";

export const POST = async ({ request }) => {
  try {
    const { creationId } = await request.json();

    console.log('=== ADD TO CART ===');
    console.log('creationId:', creationId);

    if (!creationId) {
      return new Response(
        JSON.stringify({ success: false, error: "ID création manquant" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Chercher une commande "En_cours" (majuscule!)
    let commande;
    try {
      commande = await pb.collection("Commandes").getFirstListItem(
        `statut = "En_cours"`, // ✅ E majuscule + underscore
        { requestKey: null }
      );
      console.log('✅ Commande en cours trouvée:', commande.id);
    } catch (err) {
      console.log('Pas de commande en cours, création...');
      
      commande = await pb.collection("Commandes").create({
        date_commande: new Date().toISOString(),
        statut: "En_cours", // ✅ E majuscule + underscore
      });
      console.log('✅ Nouvelle commande créée:', commande.id);
    }

    // Ajouter la création à la commande
    const ligneCommande = await pb.collection("Lignes_commande").create({
      id_commandes: commande.id,
      id_creation: creationId,
      quantite: 1,
    });
    console.log('✅ Création ajoutée au panier:', ligneCommande.id);

    return new Response(
      JSON.stringify({ success: true, commandeId: commande.id }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Erreur addToCart:", err.message);
    console.error("Détails:", err.data);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: err.message,
        details: err.data 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
