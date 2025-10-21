-- Migração dos dados reais do site TecCell
-- Este script insere os dados existentes dos componentes Gallery.tsx e Testimonials.tsx

-- Limpar dados existentes (opcional - remova se quiser manter dados de teste)
DELETE FROM media_items;
DELETE FROM testimonials;

-- Inserir dados reais da galeria (Gallery.tsx)
INSERT INTO media_items (id, type, url, title, description, category, created_at, updated_at) VALUES
(
  gen_random_uuid(),
  'image',
  'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=800&h=600&fit=crop',
  'Reparo de Placa iPhone 13 Pro',
  'Problema resolvido: Face ID não funcionando após queda',
  'iPhone',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'image',
  'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=600&fit=crop',
  'Microsoldagem MacBook Pro',
  'Substituição de IC de carregamento USB-C',
  'MacBook',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'video',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'Processo de Reparo iPad Pro',
  'Demonstração completa do processo de reparo',
  'iPad',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'image',
  'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop',
  'Dano por Líquido iPhone 12',
  'Limpeza ultrassônica e restauração completa',
  'iPhone',
  NOW(),
  NOW()
);

-- Inserir dados reais dos depoimentos (Testimonials.tsx)
INSERT INTO testimonials (id, name, avatar_url, location, device, rating, testimonial, repair_type, date, platform, verified, review_url, created_at, updated_at) VALUES
(
  gen_random_uuid(),
  'Maria Silva',
  NULL,
  'São Paulo, SP',
  'iPhone 12 Pro',
  5,
  'Excelente trabalho! Meu iPhone estava com problemas na placa-mãe e eles conseguiram resolver perfeitamente. Atendimento profissional e resultado impecável.',
  'Reparo de Placa-Mãe',
  '2024-01-15'::date,
  'google',
  true,
  'https://g.co/kgs/example1',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'João Santos',
  NULL,
  'Rio de Janeiro, RJ',
  'MacBook Pro 13"',
  5,
  'Depois de passar por várias assistências, finalmente encontrei quem realmente entende de Apple. Recuperaram totalmente meu MacBook com problema de placa lógica.',
  'Reparo de Placa Lógica',
  '2024-01-10'::date,
  'facebook',
  true,
  'https://facebook.com/review/example2',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Ana Costa',
  NULL,
  'Belo Horizonte, MG',
  'iPad Pro',
  5,
  'Serviço premium de verdade! Meu iPad não ligava mais e eles fizeram um diagnóstico preciso e reparo completo. Voltou melhor que novo!',
  'Diagnóstico e Reparo',
  '2024-01-05'::date,
  'google',
  true,
  'https://g.co/kgs/example3',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Carlos Oliveira',
  NULL,
  'Brasília, DF',
  'iPhone 13 Pro Max',
  5,
  'Impressionante a qualidade do trabalho! Meu iPhone caiu na água e pensei que não tinha mais salvação. A equipe fez milagres e recuperou tudo.',
  'Recuperação após Dano Líquido',
  '2024-01-20'::date,
  'facebook',
  true,
  'https://facebook.com/review/example4',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Fernanda Martins',
  NULL,
  'Porto Alegre, RS',
  'MacBook Air M1',
  5,
  'Atendimento excepcional do início ao fim. Explicaram todo o processo, deram garantia e o resultado foi perfeito. Recomendo 100%!',
  'Reparo de Placa Lógica',
  '2024-01-12'::date,
  'google',
  true,
  'https://g.co/kgs/example5',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Ricardo Lima',
  NULL,
  'Recife, PE',
  'iPhone 11',
  5,
  'Profissionais extremamente competentes. Resolveram um problema que outros lugares disseram ser impossível. Preço justo e trabalho impecável.',
  'Microsolda Avançada',
  '2024-01-08'::date,
  'local',
  false,
  NULL,
  NOW(),
  NOW()
);

-- Verificar se os dados foram inseridos corretamente
SELECT 'Media Items inseridos:' as info, COUNT(*) as count FROM media_items;
SELECT 'Testimonials inseridos:' as info, COUNT(*) as count FROM testimonials;

-- Mostrar alguns dados inseridos para verificação
SELECT 'Galeria - Primeiros 2 itens:' as info;
SELECT title, category, type FROM media_items LIMIT 2;

SELECT 'Depoimentos - Primeiros 2 itens:' as info;
SELECT name, device, rating FROM testimonials LIMIT 2;