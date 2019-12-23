# Flexbox

### Aulas

- [x] Ambiente e conceitos
- [x] Começando com flex
- [x] Alinhamento de conteúdo
- [x] Redimensionamento
- [x] Configurando wrap de itens
- [X] Ordenação
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
align-items: flex-start;
justify-content: flex-start;
```
- Tudo se baseia na flex-direction.  
- Quando ```flex-direction: row;``` ```align-items``` alinha sempre verticalmente e o ```justify-content``` alinha horizontalmente.  
- Quando ```flex-direction: column;``` ```align-items``` alinha horizontalmente e o ```justify-content``` alinha verticalmente.  
- flex-direction eixo Y, align-items eixo X.  
- justify-content mesmo eixo que flex-direction.  
- Valores possiveis de ambos: 
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

Controlar se componente deve ser expremido ou aumentado.
- ```flex-grow: 1``` componente ocupam largura disponivel. elemento aceita ser aumentado.
- ```flex-shrink: 1``` se expremer pra caber.
- Valores padrão
```
flex-shrink: 1
flex-grow: 0
```
- ```flex``` unico valor p/ transformar ambas propriedades.
```
flex: <grow> <shink>;
flex: 1 0;
```

## Configurando wrap de itens

Quebra de linhas.

- ```flex-wrap``` quebra linha
- ```align-content``` alinhar elementos quando estão em mais de uma linha. linha quebrada.

## Ordenação

- ```order: <NUM>``` ordena os elementos na sequencia inserida.

## Configurando app
