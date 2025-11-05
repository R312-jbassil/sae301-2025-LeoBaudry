import pb from "../../utils/pb";

export const POST = async ({ request, locals }) => {
  try {
    const { creationId } = await request.json();
    const user = locals?.user;

    console.log('=== ADD TO CART ===');
    console.log('creationId:', creationId);
    console.log('User:', user?.id);

    // VÉRIFIER USER
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "Utilisateur non connecté" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!creationId) {
      return new Response(
        JSON.stringify({ success: false, error: "ID création manquant" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // CHERCHER LA COMMANDE EN COURS POUR CET UTILISATEUR
    let commande;
    try {
      commande = await pb.collection("Commandes").getFirstListItem(
        `statut = "En_cours" && id_user = "${user.id}"`,
        { requestKey: null }
      );
      console.log('✅ Commande en cours trouvée:', commande.id);
    } catch (err) {
      console.log('Pas de commande en cours, création...');
      
      commande = await pb.collection("Commandes").create({
        date_commande: new Date().toISOString(),
        statut: "En_cours",
        id_user: user.id, // ← AJOUTER L'UTILISATEUR
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
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
