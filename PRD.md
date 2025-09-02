# Teccell Premium - Especialista Apple em Reparo de Placas

Site profissional para empresa especializada em reparo de placas Apple com painel administrativo para gerenciamento de conteúdo.

**Experience Qualities**: 
1. Premium - Interface elegante que transmite qualidade e expertise técnica
2. Profissional - Design limpo e organizado que inspira confiança e credibilidade
3. Moderno - Visual contemporâneo que reflete inovação e tecnologia avançada

**Complexity Level**: Light Application (múltiplas funcionalidades com estado básico)
- Inclui painel administrativo para upload de mídia, sistema de autenticação básico, e gerenciamento de conteúdo

## Essential Features

### Página Principal
- **Functionality**: Apresenta a empresa, serviços e galeria de trabalhos realizados
- **Purpose**: Demonstrar expertise e atrair novos clientes
- **Trigger**: Acesso direto ao site
- **Progression**: Landing → Visualizar serviços → Ver galeria → Contato
- **Success criteria**: Taxa de conversão de visitante para lead

### Galeria de Trabalhos
- **Functionality**: Exibe fotos e vídeos dos reparos realizados organizados em cards
- **Purpose**: Demonstrar qualidade técnica e construir credibilidade
- **Trigger**: Navegação pela galeria ou filtros por categoria
- **Progression**: Seleção de categoria → Visualização em grid → Modal detalhado → Ações
- **Success criteria**: Tempo de permanência e engajamento com conteúdo

### Painel Administrativo
- **Functionality**: Interface para upload e gerenciamento de fotos/vídeos dos reparos
- **Purpose**: Permitir atualização fácil do portfólio pela equipe
- **Trigger**: Login de administrador
- **Progression**: Login → Dashboard → Upload mídia → Organização por categoria → Publicação
- **Success criteria**: Facilidade de uso e eficiência na atualização de conteúdo

### Sistema de Autenticação
- **Functionality**: Login seguro para acesso ao painel administrativo
- **Purpose**: Proteger área administrativa e controlar acesso
- **Trigger**: Tentativa de acesso ao painel admin
- **Progression**: Formulário login → Verificação → Acesso ou erro → Dashboard
- **Success criteria**: Segurança mantida sem acessos não autorizados

## Edge Case Handling
- **Falha no upload**: Mensagem clara com opção de retry
- **Sem conexão**: Cache local para visualização offline básica
- **Arquivos grandes**: Compressão automática e progress bar
- **Sessão expirada**: Redirecionamento suave para login
- **Erro de servidor**: Fallback gracioso com mensagem amigável

## Design Direction
O design deve evocar sofisticação técnica e confiabilidade premium, com acabamento impecável que espelhe a qualidade dos reparos Apple. Interface minimalista que destaca o trabalho técnico através de fotografia de alta qualidade.

## Color Selection
Complementary (cores opostas) - Usando tons de cinza sofisticados com acentos azuis tecnológicos para criar contraste elegante e profissional.

- **Primary Color**: Space Gray escuro (oklch(0.15 0.02 270)) - Comunica sofisticação e expertise técnica Apple
- **Secondary Colors**: Cinza claro (oklch(0.92 0.01 270)) para fundos e Cinza médio (oklch(0.65 0.02 270)) para textos secundários
- **Accent Color**: Apple Blue (oklch(0.55 0.15 230)) - Destaque para CTAs e elementos importantes
- **Foreground/Background Pairings**: 
  - Background (Branco #FFFFFF): Texto escuro (oklch(0.15 0.02 270)) - Ratio 12.5:1 ✓
  - Card (oklch(0.97 0.01 270)): Texto escuro (oklch(0.15 0.02 270)) - Ratio 11.8:1 ✓
  - Primary (oklch(0.15 0.02 270)): Texto branco (oklch(0.98 0 0)) - Ratio 11.2:1 ✓
  - Accent (oklch(0.55 0.15 230)): Texto branco (oklch(0.98 0 0)) - Ratio 5.1:1 ✓

## Font Selection
Tipografia deve comunicar precisão técnica e modernidade, usando SF Pro Display para transmitir conexão com o ecossistema Apple.

- **Typographic Hierarchy**: 
  - H1 (Título principal): SF Pro Display Bold/48px/tight letter spacing
  - H2 (Seções): SF Pro Display Semibold/32px/normal spacing  
  - H3 (Cards): SF Pro Display Medium/24px/normal spacing
  - Body (Texto corrido): SF Pro Text Regular/16px/relaxed line height
  - Caption (Metadados): SF Pro Text Regular/14px/muted color

## Animations
Animações sutis e funcionais que comunicam precisão técnica, com foco em transições suaves que guiam a atenção sem distrair do conteúdo técnico.

- **Purposeful Meaning**: Movimentos inspirados na interface Apple - fluidos e com propósito claro
- **Hierarchy of Movement**: Hover states em cards, transições de página, e feedback de upload com maior prioridade

## Component Selection
- **Components**: Card (galeria de trabalhos), Dialog (visualização de mídia), Form (login), Button (ações principais), Badge (categorias), Progress (upload), Avatar (admin), Tabs (navegação de seções)
- **Customizations**: Cards com proporção 16:9 para mídia, Modal customizado para visualização fullscreen, Upload area com drag & drop
- **States**: Buttons com estados hover/active sutis, Cards com elevação no hover, Loading states com skeleton components
- **Icon Selection**: Phosphor icons com peso regular para ações, bold para destaque
- **Spacing**: Sistema baseado em 8px (4, 8, 16, 24, 32, 48) para consistência visual
- **Mobile**: Grid responsivo que adapta de 1 coluna (mobile) para 3-4 colunas (desktop), navegação colapsível, upload simplificado para touch