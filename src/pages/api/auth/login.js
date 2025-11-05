// import pb from "../../../utils/pb";

// export const POST = async ({ request, cookies }) => {
//   try {
//     const { email, password } = await request.json();
    
//     const authData = await pb.collection("users").authWithPassword(email, password);

//     cookies.set("pb_auth", pb.authStore.exportToCookie(), {
//       path: "/",
//       httpOnly: false,
//       sameSite: "strict",
//       secure: import.meta.env.PROD,
//       expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
//     });

//     return new Response(JSON.stringify({ user: authData.record }), { status: 200 });
//   } catch (err) {
//     console.error("Erreur de connexion :", err);
//     return new Response(JSON.stringify({ error: "Identifiants invalides" }), { status: 401 });
//   }
// };
