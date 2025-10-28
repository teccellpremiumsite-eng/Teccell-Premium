// Service Worker para limpar cache automaticamente
const CACHE_VERSION = 'v' + Date.now();
const CACHE_NAME = `teccell-premium-${CACHE_VERSION}`;

// Instalar service worker e limpar caches antigos
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando nova versão:', CACHE_VERSION);
  self.skipWaiting(); // Ativar imediatamente
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('teccell-premium-'))
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deletando cache antigo:', name);
            return caches.delete(name);
          })
      );
    })
  );
});

// Ativar e assumir controle imediatamente
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando nova versão:', CACHE_VERSION);
  event.waitUntil(
    clients.claim()
  );
});

// Estratégia: Network First (sempre buscar da rede)
self.addEventListener('fetch', (event) => {
  // Ignorar requisições que não sejam GET
  if (event.request.method !== 'GET') return;
  
  // Ignorar requisições externas (Supabase, etc)
  const url = new URL(event.request.url);
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request, {
      cache: 'no-store', // Nunca usar cache do browser
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
    .then((response) => {
      // Sempre retornar resposta fresca da rede
      return response;
    })
    .catch((error) => {
      console.error('[SW] Erro ao buscar:', event.request.url, error);
      // Em caso de erro, tentar cache como fallback
      return caches.match(event.request);
    })
  );
});

// Limpar cache periodicamente
self.addEventListener('message', (event) => {
  if (event.data === 'CLEAR_CACHE') {
    console.log('[SW] Limpando cache manualmente');
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => caches.delete(name))
        );
      })
    );
  }
});
