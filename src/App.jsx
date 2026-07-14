import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // 1. Nosso carrinho agora é um Estado!
  const [carrinho, setCarrinho] = useState(() => {
    const salvo = localStorage.getItem('carrinho_loja')
    return salvo ? JSON.parse(salvo) : []
  })

  useEffect(() => {
    localStorage.setItem('carrinho_loja', JSON.stringify(carrinho))
  }, [carrinho])

  // Lista fixa de produtos para a nossa vitrine
  const produtosLoja = [
    { id: 1, nome: "Camiseta Skate", preco: 70 },
    { id: 2, nome: "Chaveiro Pixel", preco: 15 },
    { id: 3, nome: "Moletom Black", preco: 200 }
  ]

  // 2. Lógica para adicionar itens ao carrinho
  function adicionarAoCarrinho(id, nome, preco) {
    const produtoExistente = carrinho.find(item => item.id === id)

    if (produtoExistente) {
      // No React, NUNCA alteramos o estado diretamente (ex: produtoExistente.quantidade++ é errado)
      // Precisamos usar a função setCarrinho criando um novo array modificado com .map()
      const novoCarrinho = carrinho.map(item => {
        if (item.id === id) {
          return { ...item, quantidade: item.quantidade + 1 }
        }
        return item
      })
      setCarrinho(novoCarrinho)
    } else {
      // Para adicionar um item novo, fazemos o spread do carrinho antigo e adicionamos o novo objeto
      setCarrinho([...carrinho, { id, nome, preco, quantidade: 1 }])
    }
  }

  // Botão remover carrinho
  function removerCarrinho(id){
    const removerItens = carrinho.filter(item => item.id !== id)
    setCarrinho(removerItens)
  }

  // Só aparecer o que tem no carrinho, depois que 0
  const MostrandoCarrinho = carrinho.length > 0


  // === SUA LOGICA DO ROUND ANTERIOR ===
  const totalQuantidade = carrinho.reduce((acc, item) => acc + item.quantidade, 0)
  const valorTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
  const temCamiseta = carrinho.some(item => item.nome.includes('Camiseta'))



  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Minha Loja em React ⚛️</h1>
      
      {/* Vitrine de Produtos */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        {produtosLoja.map(produto => (
          <div key={produto.id} style={{ background: '#333', padding: '15px', borderRadius: '8px', color: 'white' }}>
            <h3>{produto.nome}</h3>
            <p>R$ {produto.preco},00</p>
            <button onClick={() => adicionarAoCarrinho(produto.id, produto.nome, produto.preco)}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      {/* Resumo do Pedido Dinâmico */}
      <div style={{ background: '#222', color: 'white', padding: '20px', borderRadius: '8px' }}>
        <h2>Resumo do Pedido</h2>
        <p>Total de Itens: {totalQuantidade}</p>
        <p>Valor Total: R$ {valorTotal},00</p>
        
        {temCamiseta && (
          <p style={{ color: '#00ff88', fontWeight: 'bold' }}>
            Cupom Gerado: BRINDE10
          </p>
        )}

      </div>

      {/* O que tem no carrinho */}
      {MostrandoCarrinho && (
        <div style ={{background: '#222', color: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px'}}>
          <h2>O que tem no carrinho</h2>

          {/* Map aqui */}
          {carrinho.map(item => (
            <p key={item.id} style={{ borderBottom: '1px solid #444', paddingBottom: '8px' }}>
              <strong>{item.nome}</strong> - Quantidade: {item.quantidade}x (R$ {item.preco * item.quantidade},00)
              <button
                onClick={() => removerCarrinho(item.id)}
              >Remover</button>
            </p>
          ))}
        </div>
      )}

    </div>
  )
}

export default App