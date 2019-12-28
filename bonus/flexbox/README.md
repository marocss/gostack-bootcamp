<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>


Flexbox
==========

Curso bônus do GoStack Bootcamp.

---

Conteúdo
------

* [x] [Ambiente e conceitos](#ambiente-e-conceitos)
* [x] [Começando com flex](#começando-com-flex)
* [x] [Alinhamento de conteúdo](#alinhamento-de-conteudo)
* [x] [Redimensionamento](#redimensionamento)
* [x] [Configurando wrap de itens](#configurando-wrap-de-itens)
* [X] [Ordenação](#ordenacao)
* [ ] [Configurando app](#configurando-app)
* [ ] [Header](#header)
* [ ] [Banner](#banner)
* [ ] [Barra superior](#barra-superior)
* [ ] [Profile](#profile)
* [ ] [Widgets](#widgets)
* [ ] [Timeline](#timeline)

---

Ambiente e conceitos
------

* Adicionar extensão live server ao VSCode.
* Executar live server:  
  * `ctrl + shift + p` + `live server`  
  * `open with...`  

Começando com flex
------

* Para trabalhar com flexbox adicionar `display: flex;` no elemento que contém os elementos que deseja alinhar.
* Por padrão alinha itens horizontalmente.
  `flex-direction: row;`
* Outros valores possíveis:  
  ```
  flex-direction: column;
  flex-direction: row-reverse;
  flex-direction: column-reverse;
  ```

Alinhamento de conteúdo
------

* Duas principais propriedades:  
  ```
  align-items: ;
  justify-content: ;
  ```
* Comportamento dessas propriedades se baseia na flex-direction.  
* Quando `flex-direction: row;` (padrão):  
  * `align-items` alinha sempre verticalmente.  
  * `justify-content` alinha horizontalmente.  
  * `flex-direction` eixo X, `align-items` eixo Y.  
* Quando `flex-direction: column;`:  
  * `align-items` alinha horizontalmente.  
  * `justify-content` alinha verticalmente.  
  * `flex-direction` eixo Y, `align-items` eixo X.  
* `justify-content` mesmo eixo que flex-direction, `align-items` sempre eixo contrário.
* Valores possíveis de ambos: 
  ```
  flex-start
  flex-end
  center
  ``` 
* Valores exclusivos para o `justify-content`:  
  ```
  justify-content: space-between;
  justify-content: space-around;
  ```

Redimensionamento
------

Controlar se componente deve ser expremido ou aumentado para caber no container.
* Propriedades: 
  ```
  flex-grow: ;
  flex-shrink: ;
  ```  
  * `flex-grow: 1`: Componente ocupam toda largura disponivel. Elemento aceita ser aumentado.
  * `flex-shrink: 0`: Informa que componente não tem capacidade de se expremer para caber no container.
* Valores padrão: 
  ```
  flex-shrink: 1;
  flex-grow: 0;
  ```
* Valor p/ transformar ambas propriedades:  
  `flex: ;`
  ```
  flex: <grow> <shink>;
  flex: 1 0;
  flex: 1;
  ```

Configurando wrap de itens
------

Quebra de linhas.
------

* Propriedade para adicionar quebra de linha 
  `flex-wrap: wrap`
* Adicionar o `flex-wrap` disponibiliza uma nova propriedade de alinhamento.
  * Alinhar elementos quando estão em mais de uma linha.
    `align-content`
* A propriedade `align-content` tem acesso aos mesmos valores de `justify-content`.

Ordenação
------

* Para ordenar elementos na tela: (design responsivo)
  `order: <NUM>`
* Ordena os elementos na sequência inserida.
  ```
  el1 {
    order: 0
  }
  el2 {
    order: 1
  }
  ```

## Configurando app
