import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { X, Spinner, Key } from 'phosphor-react'

interface SupabaseLoginProps {
  onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  onCancel: () => void
}

export function SupabaseLogin({ onLogin, onCancel }: SupabaseLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showResetPassword, setShowResetPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await onLogin(email, password)
      
      if (!result.success) {
        setError(result.error || 'Email ou senha incorretos')
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onCancel}
          disabled={loading}
        >
          <X className="w-5 h-5" />
        </Button>

        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Key className="w-6 h-6 text-white" weight="bold" />
            </div>
            <div>
              <CardTitle className="text-2xl">Painel Admin</CardTitle>
              <CardDescription>TecCell Premium</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {!showResetPassword ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm">
                <div className="flex items-start gap-2">
                  <Key className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Senha padrão: <code className="bg-blue-100 px-2 py-0.5 rounded">teccell2024</code></p>
                    <p className="text-xs mt-1">Após o primeiro acesso, troque sua senha no painel admin</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@teccellpremium.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={() => setShowResetPassword(true)}
                  disabled={loading}
                >
                  Esqueceu a senha?
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                Sistema de autenticação seguro com Supabase
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Para resetar sua senha, entre em contato com o desenvolvedor ou use o SQL Editor do Supabase.
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowResetPassword(false)}
              >
                Voltar ao Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
