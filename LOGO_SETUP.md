# Como adicionar sua logo no header

## Passos para adicionar a logo:

1. **Coloque sua logo** na pasta: `src/assets/images/`
   - Nomeie o arquivo como: `teccell-logo.png`, `teccell-logo.jpg`, ou `teccell-logo.svg`
   - Formatos recomendados:
     - **PNG**: Para logos com transparência
     - **SVG**: Para logos vetoriais (melhor qualidade em qualquer tamanho)
     - **JPG**: Para fotos

2. **Se usar um nome diferente**, atualize o arquivo `src/components/Header.tsx`:
   - Linha 3: Altere `import teccellLogo from '@/assets/images/teccell-logo.svg'`
   - Substitua `teccell-logo.svg` pelo nome do seu arquivo

3. **Ajustes opcionais**:
   - **Tamanho da logo**: Altere `w-8 h-8` na linha onde está o `<img>` para o tamanho desejado
   - **Fundo da logo**: Modifique `bg-white/10` para ajustar o fundo do container da logo

## Status atual:
✅ Pasta criada: `src/assets/images/`
✅ Header configurado para mostrar a logo
✅ Logo temporária criada (SVG placeholder)

**Agora você pode substituir o arquivo `teccell-logo.svg` pela sua logo real!**
