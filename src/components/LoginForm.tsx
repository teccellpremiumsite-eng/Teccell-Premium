import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Eye, EyeSlash, SignIn, X } from 'phosphor-react'

interface LoginFormProps {
  onLogin: (success: boolean) => void
  onCancel: () => void
}

export function LoginForm({ onLogin, onCancel }: LoginFormProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Simple password - in production, this should be properly secured
  const ADMIN_PASSWORD = 'admin123'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (password === ADMIN_PASSWORD) {
      toast.success('Login realizado com sucesso!')
      onLogin(true)
    } else {
      toast.error('Senha incorreta!')
      setPassword('')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <SignIn size={20} />
              Acesso Administrativo
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X size={16} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha administrativa"
                  className="pr-10"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeSlash size={16} className="text-muted-foreground" />
                  ) : (
                    <Eye size={16} className="text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading || !password}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                    Entrando...
                  </>
                ) : (
                  <>
                    <SignIn size={16} className="mr-2" />
                    Entrar
                  </>
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

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Pressione Ctrl + Shift + A para abrir este painel
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}