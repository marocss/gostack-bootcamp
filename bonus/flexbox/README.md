# Flexbox

### Aulas

- [x] Ambiente e conceitos
- [x] Começando com flex
- [x] Alinhamento de conteúdo
- [ ] Redimensionamento
- [ ] Configurando wrap de itens
- [ ] Ordenação
- [ ] Configurando app
- [ ] Header
- [ ] Banner
- [ ] Barra superior
- [ ] Profile
- [ ] Widgets
- [ ] Timeline

## Ambiente e conceitos

- Adicionar extensão live server
- ```ctrl + shift + p```
- ```open with...```

## Começando com flex

```display: flex;``` usar p/ trabalhar no elemento por fora dos elementos que deseja alinhar.  
```flex-direction: row;``` padrão. todos itens se ordenam em linha.  
```
flex-direction: column;
flex-direction: row-reverse;
flex-direction: column-reverse;
```

## Alinhamento de conteúdo

```
align-items: ;
justify-content: ;
```
- Tudo se baseia na flex-direction.  
- Quando ```flex-direction: row;``` ```align-items``` alinha sempre verticalmente e o ```justify-content``` alinha horizontalmente.  
- Quando ```flex-direction: column;``` ```align-items``` alinha horizontalmente e o ```justify-content``` alinha verticalmente.  
- flex-direction eixo Y, align-items eixo X.  
- justify-content mesmo eixo que flex-direction.  
- Valores padrão de ambos: 
```
flex-start
flex-end
center
``` 
- Valores exclusivos p/ ```justify-content```
```
justify-content: space-between;
justify-content: space-around;
```

## Redimensionamento