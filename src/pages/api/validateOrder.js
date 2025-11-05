import pb from "../../utils/pb";

export const POST = async ({ request }) => {
  try {
    const { commandeId } = await request.json();

    if (!commandeId) {
      return new Response(
        JSON.stringify({ success: false, error: "ID commande manquant" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Changer "En_cours" → "Validé"
    await pb.collection("Commandes").update(commandeId, {
      statut: "Validé", // ✅ Majuscule
    });

    console.log("✅ Commande validée:", commandeId);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Erreur validateOrder:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
