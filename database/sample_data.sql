-- Inserir dados de exemplo para demonstração do painel admin

-- Dados de exemplo para media_items (galeria)
INSERT INTO public.media_items (id, type, url, title, description, category, created_by) VALUES
(
  gen_random_uuid(),
  'image',
  'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop',
  'Reparo de Tela iPhone 13 Pro',
  'Troca completa do display com teste de funcionalidade. Cliente muito satisfeito com o resultado.',
  'iPhone',
  NULL
),
(
  gen_random_uuid(),
  'image',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop',
  'MacBook Air M1 - Limpeza Interna',
  'Limpeza completa da placa-mãe e substituição da pasta térmica. Performance restaurada.',
  'MacBook',
  NULL
),
(
  gen_random_uuid(),
  'image',
  'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop',
  'iPad Pro - Substituição de Bateria',
  'Troca da bateria com 100% de capacidade. Procedimento realizado com cuidado extremo.',
  'iPad',
  NULL
),
(
  gen_random_uuid(),
  'video',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'Processo de Reparo iPhone 12',
  'Vídeo demonstrando o processo completo de reparo da tela de um iPhone 12.',
  'iPhone',
  NULL
);

-- Dados de exemplo para testimonials (depoimentos)
INSERT INTO public.testimonials (
  id, name, avatar_url, location, device, rating, testimonial, repair_type, 
  date, platform, verified, review_url, created_by
) VALUES
(
  gen_random_uuid(),
  'Ana Silva',
  'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face',
  'São Paulo, SP',
  'iPhone 13 Pro Max',
  5,
  'Excelente atendimento! Meu iPhone estava com a tela completamente quebrada e eles conseguiram deixar como novo. Muito profissionais e rápidos.',
  'Troca de Tela',
  '2024-10-15',
  'google',
  true,
  'https://g.co/kgs/example1',
  NULL
),
(
  gen_random_uuid(),
  'Carlos Mendes',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'Rio de Janeiro, RJ',
  'MacBook Pro 16"',
  5,
  'Incrível! Meu MacBook não ligava mais e pensei que tinha perdido tudo. A Teccell conseguiu recuperar e ainda fez upgrade da memória.',
  'Reparo de Placa-Mãe',
  '2024-10-10',
  'facebook',
  true,
  'https://facebook.com/review/example2',
  NULL
),
(
  gen_random_uuid(),
  'Maria Santos',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'Belo Horizonte, MG',
  'iPad Air 5ª geração',
  4,
  'Muito bom atendimento. Levei meu iPad com problema de bateria e ficou perfeito. Recomendo!',
  'Substituição de Bateria',
  '2024-10-08',
  'local',
  false,
  NULL,
  NULL
),
(
  gen_random_uuid(),
  'João Costa',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'Brasília, DF',
  'iPhone 14',
  5,
  'Serviço impecável! Quebrei a câmera do meu iPhone e eles trocaram no mesmo dia. Qualidade premium mesmo!',
  'Reparo de Câmera',
  '2024-10-05',
  'google',
  true,
  'https://g.co/kgs/example3',
  NULL
),
(
  gen_random_uuid(),
  'Fernanda Lima',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  'Porto Alegre, RS',
  'MacBook Air M2',
  5,
  'Fantástico! Meu MacBook estava super lento e com problemas. Agora está voando! Parabéns pelo trabalho.',
  'Limpeza e Manutenção',
  '2024-09-28',
  'local',
  false,
  NULL,
  NULL
);

-- Atualizar as datas de criação para mostrar ordem cronológica
UPDATE public.media_items SET created_at = NOW() - INTERVAL '1 day' WHERE title LIKE '%iPhone 13%';
UPDATE public.media_items SET created_at = NOW() - INTERVAL '2 days' WHERE title LIKE '%MacBook Air%';
UPDATE public.media_items SET created_at = NOW() - INTERVAL '3 days' WHERE title LIKE '%iPad Pro%';
UPDATE public.media_items SET created_at = NOW() - INTERVAL '4 days' WHERE title LIKE '%iPhone 12%';

UPDATE public.testimonials SET created_at = NOW() - INTERVAL '1 day' WHERE name = 'Ana Silva';
UPDATE public.testimonials SET created_at = NOW() - INTERVAL '2 days' WHERE name = 'Carlos Mendes';
UPDATE public.testimonials SET created_at = NOW() - INTERVAL '3 days' WHERE name = 'Maria Santos';
UPDATE public.testimonials SET created_at = NOW() - INTERVAL '4 days' WHERE name = 'João Costa';
UPDATE public.testimonials SET created_at = NOW() - INTERVAL '5 days' WHERE name = 'Fernanda Lima';