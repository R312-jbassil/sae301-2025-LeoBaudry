// import pb from "../../../utils/pb";

// export const POST = async ({ request, cookies }) => {
//   try {
//     const { name, email, password } = await request.json();
    
//     if (!email || !password) {
//       return new Response(
//         JSON.stringify({ error: "Email et mot de passe requis" }), 
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const userRecord = await pb.collection("users").create({
//       name: name || "",
//       email,
//       password,
//       passwordConfirm: password,
//       emailVisibility: true,
//     });

//     const authData = await pb.collection("users").authWithPassword(email, password);

//     cookies.set("pb_auth", pb.authStore.exportToCookie(), {
//       path: "/",
//       httpOnly: false,
//       sameSite: "strict",
//       secure: import.meta.env.PROD,
//       expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
//     });

//     return new Response(
//       JSON.stringify({ user: authData.record }), 
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
    
//   } catch (err) {
//     console.error("❌ Erreur inscription:", err);
//     return new Response(
//       JSON.stringify({ 
//         error: err.message || "Erreur lors de l'inscription",
//         details: err.data || {}
//       }), 
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }
// };
