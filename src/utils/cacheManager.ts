// Cache Manager - Gerenciador de cache para forçar atualizações

const APP_VERSION = Date.now().toString();
const VERSION_KEY = 'app_version';
const LAST_CLEAR_KEY = 'last_cache_clear';

export class CacheManager {
  // Registrar e configurar Service Worker
  static async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        // Desregistrar service workers antigos
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
          console.log('[Cache] Service Worker antigo removido');
        }

        // Registrar novo service worker
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none' // Nunca usar cache para o SW
        });

        console.log('[Cache] Service Worker registrado:', registration.scope);

        // NÃO verificar automaticamente - apenas quando necessário
        // O browser já verifica automaticamente em navegações

        // Listener para atualizações
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                console.log('[Cache] Nova versão ativada, recarregando...');
                window.location.reload();
              }
            });
          }
        });

      } catch (error) {
        console.error('[Cache] Erro ao registrar Service Worker:', error);
      }
    }
  }

  // Verificar se precisa limpar cache
  static shouldClearCache(): boolean {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    const lastClear = localStorage.getItem(LAST_CLEAR_KEY);
    const now = Date.now();

    // Limpar se:
    // 1. Não tem versão armazenada
    // 2. Versão mudou
    // 3. Última limpeza foi há mais de 1 hora
    if (!storedVersion || storedVersion !== APP_VERSION) {
      return true;
    }

    if (!lastClear || (now - parseInt(lastClear)) > 3600000) {
      return true;
    }

    return false;
  }

  // Limpar todo o cache
  static async clearAllCache() {
    console.log('[Cache] Limpando todo o cache...');

    try {
      // 1. Preservar TODOS os dados de autenticação antes de limpar
      const authData = {
        admin_setup_completed: localStorage.getItem('admin_setup_completed'),
        admin_password_hash: localStorage.getItem('admin_password_hash'),
        admin_logged_in: localStorage.getItem('admin_logged_in'),
        admin_session_expiry: localStorage.getItem('admin_session_expiry'),
        recovery_code: localStorage.getItem('recovery_code')
      };
      
      // Limpar localStorage
      localStorage.clear();
      
      // Restaurar dados de autenticação
      Object.entries(authData).forEach(([key, value]) => {
        if (value !== null) {
          localStorage.setItem(key, value);
        }
      });

      // 2. Limpar sessionStorage
      sessionStorage.clear();

      // 3. Limpar Cache API
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        console.log('[Cache] Cache API limpo');
      }

      // 4. Enviar mensagem para Service Worker
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage('CLEAR_CACHE');
      }

      // 5. Atualizar versão e timestamp
      localStorage.setItem(VERSION_KEY, APP_VERSION);
      localStorage.setItem(LAST_CLEAR_KEY, Date.now().toString());

      console.log('[Cache] Cache limpo com sucesso');
      return true;
    } catch (error) {
      console.error('[Cache] Erro ao limpar cache:', error);
      return false;
    }
  }

  // Forçar reload sem cache
  static forceReload() {
    console.log('[Cache] Forçando reload sem cache...');
    
    // Tentar várias abordagens
    if (window.location.reload) {
      // @ts-ignore - forceGet não está na tipagem mas funciona em alguns browsers
      window.location.reload(true);
    }
    
    // Fallback: adicionar timestamp na URL
    const url = new URL(window.location.href);
    url.searchParams.set('_t', Date.now().toString());
    window.location.href = url.toString();
  }

  // Verificar e limpar cache na inicialização
  static async init() {
    console.log('[Cache] Inicializando Cache Manager...');

    // Registrar Service Worker
    await this.registerServiceWorker();

    // NÃO limpar cache automaticamente - apenas quando solicitado
    // Evita reloads infinitos
    console.log('[Cache] Sistema de cache ativo');
  }

  // Limpar cache manualmente (para admin)
  static async manualClear() {
    await this.clearAllCache();
    alert('Cache limpo com sucesso! A página será recarregada.');
    this.forceReload();
  }

  // Adicionar botão de limpeza no console
  static exposeGlobalClearFunction() {
    // @ts-ignore
    window.clearCache = () => this.manualClear();
    console.log('[Cache] Use window.clearCache() para limpar cache manualmente');
  }
}

// Executar automaticamente ao importar
CacheManager.init();
CacheManager.exposeGlobalClearFunction();
