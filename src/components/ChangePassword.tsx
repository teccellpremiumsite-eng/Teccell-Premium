import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { X, Key, LockKey, CheckCircle } from 'phosphor-react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

interface ChangePasswordProps {
  onClose: () => void
  userEmail: string
}

export function ChangePassword({ onClose, userEmail }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'verify' | 'change'>('verify')

  const handleVerifyCurrentPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Tentar fazer login com a senha atual para verificar
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: currentPassword
      })

      if (signInError) {
        setError('Senha atual incorreta')
        setLoading(false)
        return
      }

      // Senha correta, avançar para próximo passo
      setStep('change')
      toast.success('Senha verificada! Agora defina a nova senha.')
    } catch (err) {
      setError('Erro ao verificar senha')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validações
    if (newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (newPassword === currentPassword) {
      setError('A nova senha deve ser diferente da atual')
      return
    }

    setLoading(true)

    try {
      // Atualizar senha no Supabase Auth
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) {
        throw updateError
      }

      toast.success('✅ Senha alterada com sucesso!')
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Erro ao alterar senha')
      toast.error('Erro ao alterar senha')
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
          onClick={onClose}
          disabled={loading}
        >
          <X className="w-5 h-5" />
        </Button>

        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <LockKey className="w-6 h-6 text-white" weight="bold" />
            </div>
            <div>
              <CardTitle className="text-2xl">Alterar Senha</CardTitle>
              <CardDescription>
                {step === 'verify' ? 'Confirme sua senha atual' : 'Defina sua nova senha'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {step === 'verify' ? (
            <form onSubmit={handleVerifyCurrentPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Digite sua senha atual"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={loading}
                  required
                  autoFocus
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Verificando...' : 'Verificar Senha'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0" weight="fill" />
                <span>Senha atual verificada com sucesso!</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  required
                  minLength={6}
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Digite novamente"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Alterando...' : 'Alterar Senha'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep('verify')}
                  disabled={loading}
                >
                  Voltar
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                <p>✓ Mínimo 6 caracteres</p>
                <p>✓ Senha deve ser diferente da atual</p>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
