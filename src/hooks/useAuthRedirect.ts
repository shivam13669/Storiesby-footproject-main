import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

/**
 * Hook that automatically redirects users to their dashboard after login
 * Should be used on pages where unauthenticated users land (like home page)
 */
export function useAuthRedirect() {
  const navigate = useNavigate()
  const { user, isAdmin, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    // If user has a valid session and profile has loaded, redirect to dashboard
    if (!isLoading && isAuthenticated && user) {
      if (isAdmin) {
        console.log('[useAuthRedirect] Redirecting admin to admin dashboard')
        navigate('/admin-dashboard', { replace: true })
      } else {
        console.log('[useAuthRedirect] Redirecting user to user dashboard')
        navigate('/user-dashboard', { replace: true })
      }
    }
  }, [user, isAdmin, isLoading, isAuthenticated, navigate])
}
