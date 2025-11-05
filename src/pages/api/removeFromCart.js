import pb from "../../utils/pb";

export const POST = async ({ request }) => {
  try {
    const { ligneId } = await request.json();

    if (!ligneId) {
      return new Response(
        JSON.stringify({ success: false, error: "ID ligne manquant" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // RÉCUPÉRER la ligne pour connaître la commande
    const ligne = await pb.collection("Lignes_commande").getOne(ligneId);
    const commandeId = ligne.id_commandes;

    // Supprimer la ligne
    await pb.collection("Lignes_commande").delete(ligneId);
    console.log("✅ Article retiré du panier");

    // VÉRIFIER SI LA COMMANDE EST VIDE
    const lignesRestantes = await pb.collection("Lignes_commande").getFullList({
      filter: `id_commandes = "${commandeId}"`,
      requestKey: null
    });

    // Si aucune ligne, supprimer la commande
    if (lignesRestantes.length === 0) {
      await pb.collection("Commandes").delete(commandeId);
      console.log("✅ Commande vide supprimée:", commandeId);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Erreur removeFromCart:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
