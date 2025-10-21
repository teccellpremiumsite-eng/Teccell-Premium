// Cache busting utility
export const clearAllCaches = async () => {
  try {
    // Clear Service Worker caches if they exist
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      for (const registration of registrations) {
        await registration.unregister()
      }
    }

    // Clear Cache API if available
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      )
    }

    // Clear various browser storages
    if (typeof Storage !== 'undefined') {
      // Clear localStorage (but preserve admin settings)
      const adminKeys = [
        'admin_setup_completed',
        'admin_password_hash', 
        'admin_logged_in',
        'admin_session_expiry'
      ]
      const adminData: Record<string, string | null> = {}
      
      // Backup admin data
      adminKeys.forEach(key => {
        adminData[key] = localStorage.getItem(key)
      })
      
      // Clear all localStorage
      localStorage.clear()
      
      // Restore admin data
      Object.entries(adminData).forEach(([key, value]) => {
        if (value !== null) {
          localStorage.setItem(key, value)
        }
      })

      // Clear sessionStorage completely
      sessionStorage.clear()
    }

    // Force reload from server (bypass cache)
    console.log('Cache cleared successfully')
  } catch (error) {
    console.warn('Error clearing cache:', error)
  }
}

// Add cache busting parameters to URLs
export const addCacheBuster = (url: string): string => {
  const timestamp = Date.now()
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}_t=${timestamp}&_cb=${Math.random().toString(36).substring(2)}`
}

// Force reload with cache bypass
export const forceReload = () => {
  // Clear cache first
  clearAllCaches().then(() => {
    // Use location.reload with force parameter
    window.location.reload()
  })
}

// State to track if uploads are in progress
let uploadsInProgress = false

// Function to set upload state
export const setUploadInProgress = (inProgress: boolean) => {
  uploadsInProgress = inProgress
}

// Auto cache clearing on page load
export const initCacheBusting = () => {
  // COMPLETELY DISABLE CACHE CLEARING - it was causing constant page refreshes
  // Cache will only be cleared manually if needed
  console.log('Cache busting disabled to prevent refresh issues during uploads')
}