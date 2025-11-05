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

    await pb.collection("Lignes_commande").delete(ligneId);
    console.log("✅ Article retiré du panier");

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
