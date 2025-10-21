import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import { Eye, EyeSlash, Lock, Shield, CheckCircle } from 'phosphor-react'

interface InitialPasswordSetupProps {
  onSetupComplete: (newPassword: string) => void
  onCancel: () => void
}

export function InitialPasswordSetup({ onSetupComplete, onCancel }: InitialPasswordSetupProps) {
  const [step, setStep] = useState<'default' | 'custom'>('default')
  const [defaultPassword, setDefaultPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showDefaultPassword, setShowDefaultPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const DEFAULT_ADMIN_PASSWORD = 'admin'

  const handleDefaultPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (defaultPassword === DEFAULT_ADMIN_PASSWORD) {
        setStep('custom')
        toast.success('Senha confirmada! Agora defina sua nova senha.')
      } else {
        setError('Senha incorreta. Use a senha padrão: admin')
        setDefaultPassword('')
      }
    } catch (error) {
      setError('Erro ao verificar senha. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCustomPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (newPassword.length < 4) {
      setError('A senha deve ter pelo menos 4 caracteres.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    if (newPassword === DEFAULT_ADMIN_PASSWORD) {
      setError('Por segurança, escolha uma senha diferente de "admin".')
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      onSetupComplete(newPassword)
      toast.success('Senha personalizada definida com sucesso!')
    } catch (error) {
      setError('Erro ao definir nova senha. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { level: 0, text: '' }
    if (password.length < 4) return { level: 1, text: 'Muito fraca' }
    if (password.length < 6) return { level: 2, text: 'Fraca' }
    if (password.length < 8) return { level: 3, text: 'Média' }
    return { level: 4, text: 'Forte' }
  }

  const passwordStrength = getPasswordStrength(newPassword)

  if (step === 'default') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
                <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle>Configuração Inicial</CardTitle>
                <CardDescription>Digite a senha padrão para começar</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDefaultPasswordSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <Lock className="w-4 h-4" />
                <AlertDescription>
                  Para configurar o sistema pela primeira vez, digite a senha padrão: <strong>admin</strong>
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="defaultPassword" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Senha Padrão
                </Label>
                <div className="relative">
                  <Input
                    id="defaultPassword"
                    type={showDefaultPassword ? "text" : "password"}
                    value={defaultPassword}
                    onChange={(e) => setDefaultPassword(e.target.value)}
                    placeholder="Digite: admin"
                    className="pr-10"
                    required
                    autoFocus
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowDefaultPassword(!showDefaultPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showDefaultPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="flex-1" 
                  disabled={isLoading || !defaultPassword}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verificando...
                    </>
                  ) : (
                    'Continuar'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle>Definir Nova Senha</CardTitle>
              <CardDescription>Crie uma senha personalizada e segura</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCustomPasswordSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Alert>
              <Shield className="w-4 h-4" />
              <AlertDescription>
                Por segurança, defina uma senha personalizada que será usada para futuros acessos.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Nova Senha
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite sua nova senha"
                  className="pr-10"
                  required
                  autoFocus
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showNewPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {newPassword && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        passwordStrength.level === 1 ? 'w-1/4 bg-red-500' :
                        passwordStrength.level === 2 ? 'w-2/4 bg-yellow-500' :
                        passwordStrength.level === 3 ? 'w-3/4 bg-blue-500' :
                        passwordStrength.level === 4 ? 'w-full bg-green-500' : 'w-0'
                      }`}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{passwordStrength.text}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirmar Senha
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite novamente sua senha"
                  className="pr-10"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-500">As senhas não coincidem</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                    Salvando...
                  </>
                ) : (
                  'Confirmar Senha'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep('default')}
                disabled={isLoading}
              >
                Voltar
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Esta senha será usada para todos os futuros acessos ao painel admin.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}