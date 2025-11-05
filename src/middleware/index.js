import pb from '../utils/pb';

export const onRequest = async (context, next) => {
  console.log('🔍 Middleware - URL:', context.url.pathname);
  
  const cookie = context.cookies.get("pb_auth")?.value;
  if (cookie) {
    pb.authStore.loadFromCookie(cookie);
    if (pb.authStore.isValid) {
      context.locals.user = pb.authStore.record;
      console.log('✅ User connecté:', context.locals.user.id);
    }
  }

  // Pour les routes API, on exige l'authentification SAUF pour /api/auth/login ET /api/auth/signup
  if (context.url.pathname.startsWith('/api/')) {
    console.log('🔍 Route API détectée:', context.url.pathname);
    console.log('🔍 User connecté ?', !!context.locals.user);
    
    // IMPORTANT: C'est /api/auth/login et /api/auth/logout
    if (!context.locals.user && 
        context.url.pathname !== '/api/auth/login' && 
        context.url.pathname !== '/api/auth/signup' &&
        context.url.pathname !== '/api/auth/logout') {
      console.log('❌ API bloquée');
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    console.log('✅ Route API autorisée');
    return next();
  }

  // Pour les autres pages, bloquer si pas connecté (sauf login/signup/landing)
  if (!context.locals.user) {
    if (
      context.url.pathname !== '/login' &&
      context.url.pathname !== '/signup' &&
      context.url.pathname !== '/' &&
      !context.url.pathname.startsWith('/personnalisation/')
    ) {
      console.log('❌ Page bloquée - redirection vers /login');
      return Response.redirect(new URL('/login', context.url), 303);
    }
  }

  return next();
};
