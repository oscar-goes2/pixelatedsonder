'use client'

import { useState, useEffect, useRef } from 'react'

// ============================================
// 📱 FUN INTERACTIVE APPS CONFIGURATION
// ============================================
type AppType = 'game' | 'tool' | 'fun' | 'creative'

interface App {
  id: string
  name: string
  icon: string
  color: string
  gradient: string
  type: AppType
}

// 🔗 YOUR IMPORTANT LINKS (These show in the DOCK!)
interface LinkApp {
  id: string
  name: string
  icon: string
  url: string
  gradient: string
}

const LINK_APPS: LinkApp[] = [
  { id: 'videos', name: 'My Documentaries', icon: '🎬', url: 'https://youtube.com/@deadmentoldme', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A5A 100%)' },
  { id: 'tutorials', name: 'Melodies', icon: '📺', url: 'https://youtube.com/@oscar-rb19?si=tBhWDfEZsl9U2c66', gradient: 'linear-gradient(135deg, #FF9F43 0%, #EE8E32 100%)' },
  { id: 'gaming', name: 'Placed Some Blocks', icon: '🎮', url: 'https://youtube.com/@MineHackzz', gradient: 'linear-gradient(135deg, #A55EEA 0%, #944DE0 100%)' },
  { id: 'spotify', name: 'Playlist', icon: '🎵', url: 'https://open.spotify.com/playlist/25cFGtIkzKkMOBTdK8CuZ8?si=SeNMqrtwSiG1r29leS0ZtQ&nd=1&dlsi=99a4971724c848fe', gradient: 'linear-gradient(135deg, #1DB954 0%, #19AA4A 100%)' },
  { id: 'instagram', name: 'Instagram', icon: '📸', url: 'https://www.instagram.com/pixelatedsonder/', gradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' },
  { id: 'email', name: 'Contact', icon: '✉️', url: 'mailto:andtheoscargoestou@gmail.com', gradient: 'linear-gradient(135deg, #58A7E5 0%, #4790D4 100%)' },
]

const APPS: App[] = [
  // 🎮 GAMES
  { id: 'snake', name: 'Snake', icon: '🐍', color: '#22c55e', gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', type: 'game' },
  { id: 'tictactoe', name: 'Tic Tac Toe', icon: '⭕', color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', type: 'game' },
  { id: 'memory', name: 'Memory', icon: '🧠', color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', type: 'game' },
  { id: 'puzzle2048', name: '2048', icon: '🔢', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', type: 'game' },
  { id: 'whackamole', name: 'Whack!', icon: '🔨', color: '#973716', gradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)', type: 'game' },
  
  // 🛠️ TOOLS
  { id: 'calculator', name: 'Calculator', icon: '🧮', color: '#64748b', gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)', type: 'tool' },
  { id: 'stopwatch', name: 'Stopwatch', icon: '⏱️', color: '#0ea5e9', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', type: 'tool' },
  { id: 'notes', name: 'Notes', icon: '📝', color: '#eab308', gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', type: 'tool' },
  { id: 'paint', name: 'Paint', icon: '🎨', color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', type: 'creative' },
  
  // 🎉 FUN APPS
  { id: 'dice', name: 'Dice', icon: '🎲', color: '#f43f5e', gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', type: 'fun' },
  { id: 'coinflip', name: 'Coin Flip', icon: '🪙', color: '#d97706', gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', type: 'fun' },
  { id: 'magic8ball', name: 'Magic 8', icon: '🔮', color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', type: 'fun' },
  { id: 'jokes', name: 'Jokes', icon: '😂', color: '#14b8a6', gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', type: 'fun' },
  { id: 'piano', name: 'Piano', icon: '🎹', color: '#1d4ed8', gradient: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)', type: 'creative' },
  { id: 'colorgen', name: 'Colors', icon: '🌈', color: '#f472b6', gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)', type: 'fun' },
  { id: 'agecalc', name: 'My Age', icon: '🎂', color: '#fb923c', gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)', type: 'tool' },
  { id: 'tipcalc', name: 'Tip Calc', icon: '💰', color: '#059669', gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)', type: 'tool' },
]

// Boot phases - Mobile OS Animation
type BootPhase = 'off' | 'logo' | 'loading' | 'hello' | 'lock' | 'ready'
type OpenApp = string | null

// Snake Game Component
function SnakeGame({ onClose }: { onClose: () => void }) {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }])
  const [food, setFood] = useState({ x: 10, y: 10 })
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const gameRef = useRef<NodeJS.Timeout>()

  const resetGame = () => {
    setSnake([{ x: 5, y: 5 }])
    setFood({ x: Math.floor(Math.random() * 15), y: Math.floor(Math.random() * 15) })
    setDirection({ x: 1, y: 0 })
    setGameOver(false)
    setScore(0)
    setIsPlaying(true)
  }

  useEffect(() => {
    if (!isPlaying || gameOver) return
    
    gameRef.current = setInterval(() => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] }
        head.x += direction.x
        head.y += direction.y
        
        if (head.x < 0 || head.x >= 15 || head.y < 0 || head.y >= 15 ||
            prevSnake.some(s => s.x === head.x && s.y === head.y)) {
          setGameOver(true)
          setIsPlaying(false)
          return prevSnake
        }
        
        const newSnake = [head, ...prevSnake]
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10)
          setFood({ x: Math.floor(Math.random() * 15), y: Math.floor(Math.random() * 15) })
        } else {
          newSnake.pop()
        }
        return newSnake
      })
    }, 200)

    return () => clearInterval(gameRef.current)
  }, [isPlaying, gameOver, direction, food])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isPlaying) return
      switch(e.key) {
        case 'ArrowUp': if (direction.y !== 1) setDirection({ x: 0, y: -1 }); break
        case 'ArrowDown': if (direction.y !== -1) setDirection({ x: 0, y: 1 }); break
        case 'ArrowLeft': if (direction.x !== 1) setDirection({ x: -1, y: 0 }); break
        case 'ArrowRight': if (direction.x !== -1) setDirection({ x: 1, y: 0 }); break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isPlaying, direction])

  const cellSize = 16
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 8px' }}>
        <span style={{ color: '#22c55e', fontWeight: 'bold' }}>Score: {score}</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(15, ${cellSize}px)`,
        gridTemplateRows: `repeat(15, ${cellSize}px)`,
        gap: '1px',
        background: '#1a1a2e',
        padding: '8px',
        borderRadius: '12px',
        border: '2px solid #22c55e'
      }}>
        {Array.from({ length: 225 }).map((_, i) => {
          const x = i % 15
          const y = Math.floor(i / 15)
          const isSnake = snake.some(s => s.x === x && s.y === y)
          const isFood = food.x === x && food.y === y
          return (
            <div key={i} style={{
              width: cellSize,
              height: cellSize,
              background: isSnake ? '#22c55e' : isFood ? '#ef4444' : '#0f0f1a',
              borderRadius: isSnake || isFood ? '3px' : '1px',
              transition: 'background 0.05s'
            }} />
          )
        })}
      </div>
      {!isPlaying && (
        <button onClick={resetGame} style={{
          ...appBtnStyle,
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          width: '100%'
        }}>
          {gameOver ? 'Play Again' : 'Start Game'}
        </button>
      )}
      {isPlaying && !gameOver && (
        <div style={{ color: '#888', fontSize: '11px' }}>Use arrow keys or swipe</div>
      )}
      {/* Mobile Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 40px)', gap: '4px' }}>
        <div /><div><button onTouchEnd={() => isPlaying && direction.y !== 1 && setDirection({ x: 0, y: -1 })} style={dpadStyle}>↑</button></div><div />
        <div><button onTouchEnd={() => isPlaying && direction.x !== 1 && setDirection({ x: -1, y: 0 })} style={dpadStyle}>←</button></div>
        <div><button onTouchEnd={() => isPlaying && direction.x !== -1 && setDirection({ x: 1, y: 0 })} style={dpadStyle}>→</button></div>
        <div /><div><button onTouchEnd={() => isPlaying && direction.y !== -1 && setDirection({ x: 0, y: 1 })} style={dpadStyle}>↓</button></div><div />
      </div>
    </div>
  )
}

// Tic Tac Toe Component
function TicTacToe({ onClose }: { onClose: () => void }) {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)

  const checkWinner = (s: (string | null)[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    for (const [a,b,c] of lines) {
      if (s[a] && s[a] === s[b] && s[a] === s[c]) return s[a]
    }
    return null
  }

  const handleClick = (i: number) => {
    if (board[i] || winner) return
    const newBoard = [...board]
    newBoard[i] = isXNext ? '❌' : '⭕'
    setBoard(newBoard)
    setIsXNext(!isXNext)
    const w = checkWinner(newBoard)
    if (w) setWinner(w)
  }

  const reset = () => { setBoard(Array(9).fill(null)); setIsXNext(true); setWinner(null) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', height: '100%', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{winner ? `${winner} wins!` : isXNext ? "❌'s Turn" : "⭕'s Turn"}</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: '8px' }}>
        {board.map((cell, i) => (
          <button key={i} onClick={() => handleClick(i)} style={{
            width: 60, height: 60, fontSize: '28px',
            background: cell ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px',
            color: '#fff', cursor: 'pointer', transition: 'all 0.15s'
          }}>{cell}</button>
        ))}
      </div>
      <button onClick={reset} style={{ ...appBtnStyle, background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>New Game</button>
    </div>
  )
}

// Memory Match Game
function MemoryGame({ onClose }: { onClose: () => void }) {
  const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯']
  const [cards, setCards] = useState<{ emoji: string; flipped: boolean; matched: boolean }[]>(() =>
    [...emojis, ...emojis].sort(() => Math.random() - 0.5).map(e => ({ emoji: e, flipped: false, matched: false }))
  )
  const [flippedIdx, setFlippedIdx] = useState<number[]>([])
  const [moves, setMoves] = useState(0)

  const handleClick = (idx: number) => {
    if (flippedIdx.length >= 2 || cards[idx].flipped || cards[idx].matched) return
    const newCards = [...cards]
    newCards[idx].flipped = true
    setCards(newCards)
    const newFlipped = [...flippedIdx, idx]
    setFlippedIdx(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(m => m + 1)
      if (cards[newFlipped[0]].emoji === cards[newFlipped[1]].emoji) {
        setTimeout(() => {
          const c = [...cards]
          c[newFlipped[0]].matched = true
          c[newFlipped[1]].matched = true
          setCards(c)
          setFlippedIdx([])
        }, 500)
      } else {
        setTimeout(() => {
          const c = [...cards]
          c[newFlipped[0]].flipped = false
          c[newFlipped[1]].flipped = false
          setCards(c)
          setFlippedIdx([])
        }, 800)
      }
    }
  }

  const reset = () => {
    setCards([...emojis, ...emojis].sort(() => Math.random() - 0.5).map(e => ({ emoji: e, flipped: false, matched: false })))
    setFlippedIdx([])
    setMoves(0)
  }

  const won = cards.every(c => c.matched)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>Moves: {moves}</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 52px)', gap: '8px' }}>
        {cards.map((card, i) => (
          <button key={i} onClick={() => handleClick(i)} style={{
            width: 52, height: 52, fontSize: '24px',
            background: card.flipped || card.matched ? 'rgba(139,92,246,0.2)' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            border: card.matched ? '2px solid #22c55e' : '1px solid rgba(255,255,255,0.2)',
            borderRadius: '10px', color: card.flipped || card.matched ? '#fff' : 'transparent',
            cursor: 'pointer', transition: 'all 0.2s'
          }}>{card.flipped || card.matched ? card.emoji : '?'}</button>
        ))}
      </div>
      {won && <div style={{ color: '#22c55e', fontWeight: 'bold' }}>🎉 You Won!</div>}
      <button onClick={reset} style={{ ...appBtnStyle, background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>Reset</button>
    </div>
  )
}

// 2048 Puzzle Game
function Puzzle2048({ onClose }: { onClose: () => void }) {
  const [grid, setGrid] = useState<number[][]>(() => Array(4).fill(null).map(() => Array(4).fill(0)))
  const [score, setScore] = useState(0)

  const addTile = (g: number[][]) => {
    const empty: [number, number][] = []
    g.forEach((row, r) => row.forEach((cell, c) => { if (cell === 0) empty.push([r, c]) }))
    if (empty.length > 0) {
      const [r, c] = empty[Math.floor(Math.random() * empty.length)]
      g[r][c] = Math.random() < 0.9 ? 2 : 4
    }
    return g
  }

  const initGame = () => {
    let g = Array(4).fill(null).map(() => Array(4).fill(0))
    g = addTile(g)
    g = addTile(g)
    setGrid(g)
    setScore(0)
  }

  useEffect(() => { initGame() }, [])

  const slide = (g: number[][], dir: string): number[][] => {
    let newG = g.map(row => [...row])
    const rotated = dir === 'up' || dir === 'down' ? newG[0].map((_, i) => newG.map(row => row[i])) : newG.map(row => [...row])
    
    const moved = rotated.map(row => {
      let filtered = row.filter(x => x !== 0)
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2
          setScore(s => s + filtered[i])
          filtered.splice(i + 1, 1)
        }
      }
      while (filtered.length < 4) filtered.push(0)
      return filtered
    })

    return dir === 'up' || dir === 'down' ? moved[0].map((_, i) => moved.map(row => row[i])) : moved
  }

  const move = (dir: string) => {
    const newGrid = slide(grid, dir)
    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      setGrid(addTile(newGrid))
    }
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowUp': move('up'); break
        case 'ArrowDown': move('down'); break
        case 'ArrowLeft': move('left'); break
        case 'ArrowRight': move('right'); break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [grid])

  const getColor = (val: number) => {
    const colors: Record<number, string> = { 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563', 32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61', 512: '#edc850', 1024: '#edc53f', 2048: '#edc22e' }
    return colors[val] || '#3c3a32'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>Score: {score}</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 52px)', gap: '6px', background: '#bbada0', padding: '8px', borderRadius: '8px' }}>
        {grid.flat().map((cell, i) => (
          <div key={i} style={{
            width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: getColor(cell), borderRadius: '6px', fontSize: cell > 512 ? '18px' : cell > 64 ? '22px' : '26px',
            fontWeight: 'bold', color: cell > 4 ? '#f9f6f2' : '#776e65'
          }}>{cell || ''}</div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => move('left')} style={arrowBtnStyle}>←</button>
        <button onClick={() => move('up')} style={arrowBtnStyle}>↑</button>
        <button onClick={() => move('down')} style={arrowBtnStyle}>↓</button>
        <button onClick={() => move('right')} style={arrowBtnStyle}>→</button>
      </div>
      <button onClick={initGame} style={{ ...appBtnStyle, background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>New Game</button>
    </div>
  )
}

// Whack-a-Mole Game
function WhackAMole({ onClose }: { onClose: () => void }) {
  const [holes, setHoles] = useState<boolean[]>(Array(9).fill(false))
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [playing, setPlaying] = useState(false)
  const moleTimer = useRef<NodeJS.Timeout>()
  const gameTimer = useRef<NodeJS.Timeout>()

  const showMole = () => {
    const idx = Math.floor(Math.random() * 9)
    setHoles(h => h.map((v, i) => i === idx))
    moleTimer.current = setTimeout(showMole, 600 + Math.random() * 500)
  }

  const startGame = () => {
    setScore(0); setTimeLeft(30); setPlaying(true)
    showMole()
    gameTimer.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { endGame(); return 0 } return t - 1 })
    }, 1000)
  }

  const endGame = () => {
    setPlaying(false)
    clearTimeout(moleTimer.current)
    clearInterval(gameTimer.current)
    setHoles(Array(9).fill(false))
  }

  const whack = (idx: number) => {
    if (holes[idx]) {
      setScore(s => s + 1)
      setHoles(h => h.map((v, i) => i === idx ? false : v))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', height: '100%', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ color: '#ea580c', fontWeight: 'bold' }}>Score: {score} | Time: {timeLeft}s</span>
        <button onClick={() => { endGame(); onClose(); }} style={closeBtnStyle}>✕</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: '10px' }}>
        {holes.map((hasMole, i) => (
          <button key={i} onClick={() => whack(i)} style={{
            width: 60, height: 60, borderRadius: '50%',
            background: hasMole ? '#8B4513' : '#654321',
            border: '3px solid #3d2914', fontSize: '28px',
            cursor: 'pointer', transform: hasMole ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.1s', boxShadow: hasMole ? '0 0 15px rgba(234,88,12,0.5)' : 'none'
          }}>{hasMole ? '🐹' : '🕳️'}</button>
        ))}
      </div>
      {!playing && (
        <button onClick={startGame} style={{ ...appBtnStyle, background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
          {score > 0 ? 'Play Again' : 'Start Game'}
        </button>
      )}
    </div>
  )
}

// Calculator Component
function CalculatorApp({ onClose }: { onClose: () => void }) {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForOperand) { setDisplay(digit); setWaitingForOperand(false) }
    else setDisplay(display === '0' ? digit : display + digit)
  }

  const inputDot = () => {
    if (waitingForOperand) { setDisplay('0.'); setWaitingForOperand(false); return }
    if (!display.includes('.')) setDisplay(display + '.')
  }

  const clear = () => { setDisplay('0'); setPrevValue(null); setOperator(null) }

  const performOperation = (nextOp: string) => {
    const inputValue = parseFloat(display)
    if (prevValue === null) { setPrevValue(inputValue) }
    else if (operator) {
      const result = calculate(prevValue, inputValue, operator)
      setDisplay(String(result))
      setPrevValue(result)
    }
    setWaitingForOperand(true)
    setOperator(nextOp)
  }

  const calculate = (a: number, b: number, op: string): number => {
    switch(op) { case '+': return a + b; case '-': return a - b; case '*': return a * b; case '/': return b !== 0 ? a / b : 0; default: return b }
  }

  const equals = () => {
    if (!operator || prevValue === null) return
    const result = calculate(prevValue, parseFloat(display), operator)
    setDisplay(String(result))
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(true)
  }

  const btnStyle = (color: string) => ({
    width: '50px', height: '50px', borderRadius: '12px', border: 'none',
    background: color, color: '#fff', fontSize: '20px', fontWeight: '600',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'transform 0.1s', userSelect: 'none'
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span />
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <div style={{
        width: '100%', background: '#1e1e2e', borderRadius: '12px', padding: '16px',
        textAlign: 'right', fontSize: '32px', fontWeight: '300', color: '#fff',
        minHeight: '50px', wordBreak: 'break-all'
      }}>{display}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 50px)', gap: '8px' }}>
        <button onClick={clear} style={btnStyle('#475569')}>C</button>
        <button onClick={() => setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display)} style={btnStyle('#475569')}>±</button>
        <button onClick={() => setDisplay(String(parseFloat(display) / 100))} style={btnStyle('#475569')}>%</button>
        <button onClick={() => performOperation('/')} style={btnStyle('#f59e0b')}>÷</button>
        {['7','8','9'].map(n => <button key={n} onClick={() => inputDigit(n)} style={btnStyle('#334155')}>{n}</button>)}
        <button onClick={() => performOperation('*')} style={btnStyle('#f59e0b')}>×</button>
        {['4','5','6'].map(n => <button key={n} onClick={() => inputDigit(n)} style={btnStyle('#334155')}>{n}</button>)}
        <button onClick={() => performOperation('-')} style={btnStyle('#f59e0b')}>−</button>
        {['1','2','3'].map(n => <button key={n} onClick={() => inputDigit(n)} style={btnStyle('#334155')}>{n}</button>)}
        <button onClick={() => performOperation('+')} style={btnStyle('#f59e0b')}>+</button>
        <button onClick={() => inputDigit('0')} style={{ ...btnStyle('#334155'), gridColumn: 'span 2', width: '108px' }}>0</button>
        <button onClick={inputDot} style={btnStyle('#334155')}>.</button>
        <button onClick={equals} style={btnStyle('#22c55e')}>=</button>
      </div>
    </div>
  )
}

// Stopwatch Component
function StopwatchApp({ onClose }: { onClose: () => void }) {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => setTime(t => t + 10), 10)
    } else clearInterval(timerRef.current)
    return () => clearInterval(timerRef.current)
  }, [running])

  const formatTime = (ms: number) => {
    const m = Math.floor(ms / 60000)
    const s = Math.floor((ms % 60000) / 1000)
    const cs = Math.floor((ms % 1000) / 10)
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}.${cs.toString().padStart(2,'0')}`
  }

  const lap = () => { if (running) setLaps([...laps, time]) }
  const reset = () => { setTime(0); setRunning(false); setLaps([]) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span />
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <div style={{ fontSize: '42px', fontWeight: '200', fontFamily: 'monospace', color: '#fff', letterSpacing: '2px' }}>
        {formatTime(time)}
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => running ? setRunning(false) : setRunning(true)} style={{
          ...appBtnStyle, background: running ? '#ef4444' : '#22c55e', width: '80px', height: '80px', borderRadius: '50%', fontSize: '14px'
        }}>{running ? 'Stop' : 'Start'}</button>
        <button onClick={lap} disabled={!running} style={{
          ...appBtnStyle, background: '#0ea5e9', opacity: running ? 1 : 0.5, width: '70px', height: '70px', borderRadius: '50%', fontSize: '12px'
        }}>Lap</button>
        <button onClick={reset} style={{ ...appBtnStyle, background: '#64748b', width: '60px', height: '60px', borderRadius: '50%', fontSize: '11px' }}>Reset</button>
      </div>
      <div style={{ width: '100%', maxHeight: '120px', overflowY: 'auto' }}>
        {laps.map((l, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ color: '#888' }}>Lap {i + 1}</span>
            <span style={{ fontFamily: 'monospace', color: '#0ea5e9' }}>{formatTime(l)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Notes App
function NotesApp({ onClose }: { onClose: () => void }) {
  const [notes, setNotes] = useState<string>('')
  const [saved, setSaved] = useState<string>('')

  const saveNote = () => { setSaved(notes); alert('Note saved! ✅') }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#eab308', fontWeight: 'bold' }}>📝 My Notes</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Write your notes here..."
        style={{
          flex: 1, background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
          padding: '16px', color: '#fff', fontSize: '15px', resize: 'none', outline: 'none',
          lineHeight: '1.6', fontFamily: '-apple-system, sans-serif'
        }}
      />
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={saveNote} style={{ ...appBtnStyle, background: 'linear-gradient(135deg, #eab308, #ca8a04)', flex: 1 }}>Save Note</button>
        <button onClick={() => setNotes('')} style={{ ...appBtnStyle, background: '#64748b' }}>Clear</button>
      </div>
      {saved && (
        <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '10px' }}>
          <div style={{ color: '#888', fontSize: '11px', marginBottom: '4px' }}>Last saved:</div>
          <div style={{ color: '#fff', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{saved}</div>
        </div>
      )}
    </div>
  )
}

// Paint App
function PaintApp({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [color, setColor] = useState('#ffffff')
  const [brushSize, setBrushSize] = useState(4)
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [])

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    setDrawing(true)
    lastPos.current = getPos(e)
  }

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!drawing) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const pos = getPos(e)
    ctx.strokeStyle = color; ctx.lineWidth = brushSize; ctx.lineCap = 'round'
    ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y); ctx.lineTo(pos.x, pos.y); ctx.stroke()
    lastPos.current = pos
  }

  const stopDraw = () => setDrawing(false)
  const clearCanvas = () => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const colors = ['#ffffff', '#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#ec4899', fontWeight: 'bold' }}>🎨 Paint</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <canvas ref={canvasRef}
        onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
        onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
        style={{ flex: 1, borderRadius: '12px', touchAction: 'none', cursor: 'crosshair' }}
      />
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
        {colors.map(c => (
          <button key={c} onClick={() => setColor(c)} style={{
            width: 28, height: 28, borderRadius: '50%', background: c,
            border: color === c ? '3px #fff solid' : '2px rgba(255,255,255,0.2) solid', cursor: 'pointer'
          }} />
        ))}
        <input type="range" min="1" max="20" value={brushSize} onChange={e => setBrushSize(+e.target.value)} style={{ width: '80px', accentColor: '#ec4899' }} />
        <button onClick={clearCanvas} style={{ ...appBtnStyle, background: '#64748b', padding: '6px 12px', fontSize: '11px' }}>Clear</button>
      </div>
    </div>
  )
}

// Dice Roller
function DiceApp({ onClose }: { onClose: () => void }) {
  const [dice, setDice] = useState([1, 1])
  const [rolling, setRolling] = useState(false)
  const [history, setHistory] = useState<number[]>([])

  const roll = () => {
    setRolling(true)
    let count = 0
    const interval = setInterval(() => {
      setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1])
      count++
      if (count > 15) {
        clearInterval(interval)
        const final = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]
        setDice(final)
        setHistory(h => [...h.slice(-9), final[0] + final[1]])
        setRolling(false)
      }
    }, 60)
  }

  const diceFace = (n: number) => {
    const dots: Record<number, string[]> = { 1: ['center'], 2: ['tl','br'], 3: ['tl','center','br'], 4: ['tl','tr','bl','br'], 5: ['tl','tr','center','bl','br'], 6: ['tl','tr','ml','mr','bl','br'] }
    const pos: Record<string, string> = { tl: 'top:8px;left:8px', tr: 'top:8px;right:8px', bl: 'bottom:8px;left:8px', br: 'bottom:8px;right:8px', center: 'top:50%;left:50%;transform:translate(-50%,-50%)', ml: 'top:50%;left:8px;transform:translateY(-50%)', mr: 'top:50%;right:8px;transform:translateY(-50%)' }
    return dots[n].map((d, i) => <div key={i} style={{ position: 'absolute', width: '8px', height: '8px', background: '#fff', borderRadius: '50%', ...{ [pos[d]]: '' } as React.CSSProperties }} />)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', height: '100%', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ color: '#f43f5e', fontWeight: 'bold' }}>Total: {dice[0] + dice[1]}</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        {[dice[0], dice[1]].map((d, i) => (
          <div key={i} style={{
            width: '70px', height: '70px', background: rolling ? '#333' : '#fff',
            borderRadius: '14px', position: 'relative', transform: rolling ? `rotate(${Math.random()*30-15}deg)` : 'rotate(0deg)',
            transition: 'transform 0.1s', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            <div style={{ position: 'absolute', inset: 0, background: '#1e40af', borderRadius: '14px' }} />
            {diceFace(d)}
          </div>
        ))}
      </div>
      <button onClick={roll} disabled={rolling} style={{ ...appBtnStyle, background: 'linear-gradient(135deg, #f43f5e, #e11d48)', width: '140px', fontSize: '18px' }}>
        {rolling ? '🎲...' : 'Roll!'}
      </button>
      {history.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {history.map((h, i) => <span key={i} style={{ background: 'rgba(244,63,94,0.2)', padding: '4px 10px', borderRadius: '12px', fontSize: '13px', color: '#f43f5e' }}>{h}</span>)}
        </div>
      )}
    </div>
  )
}

// Coin Flip App
function CoinFlipApp({ onClose }: { onClose: () => void }) {
  const [result, setResult] = useState<'heads' | 'tails' | null>(null)
  const [flipping, setFlipping] = useState(false)
  const [headsCount, setHeadsCount] = useState(0)
  const [tailsCount, setTailsCount] = useState(0)

  const flip = () => {
    setFlipping(true)
    setResult(null)
    setTimeout(() => {
      const res = Math.random() < 0.5 ? 'heads' : 'tails'
      setResult(res)
      if (res === 'heads') setHeadsCount(h => h + 1)
      else setTailsCount(t => t + 1)
      setFlipping(false)
    }, 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', height: '100%', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ color: '#d97706', fontWeight: 'bold' }}>🪙 Coin Flip</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <div style={{
        width: '120px', height: '120px', borderRadius: '50%',
        background: flipping ? 'linear-gradient(135deg, #d97706, #fbbf24)' : result === 'heads' ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : 'linear-gradient(135deg, #78716c, #57534e)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px',
        animation: flipping ? 'coinFlip 0.2s ease-in-out infinite alternate' : 'none',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
      }}>
        {flipping ? '?' : result === 'heads' ? '👑' : result === 'tails' ? '🦅' : '?'}
      </div>
      {result && !flipping && (
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: result === 'heads' ? '#fbbf24' : '#a8a29e' }}>
          {result === 'heads' ? 'HEADS!' : 'TAILS!'}
        </div>
      )}
      <button onClick={flip} disabled={flipping} style={{ ...appBtnStyle, background: 'linear-gradient(135deg, #d97706, #b45309)', width: '140px' }}>
        {flipping ? 'Flipping...' : 'Flip Coin!'}
      </button>
      <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
        <span style={{ color: '#fbbf24' }}>👑 Heads: {headsCount}</span>
        <span style={{ color: '#a8a29e' }}>🦅 Tails: {tailsCount}</span>
      </div>
      <style>{`@keyframes coinFlip { from { transform: rotateY(0deg); } to { transform: rotateY(180deg); } }`}</style>
    </div>
  )
}

// Magic 8 Ball
function Magic8BallApp({ onClose }: { onClose: () => void }) {
  const [answer, setAnswer] = useState('')
  const [shaking, setShaking] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)

  const answers = [
    'It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely', 'You may rely on it',
    'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes',
    'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again',
    'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'
  ]

  const shake = () => {
    setShaking(true)
    setAnswer('')
    setTimeout(() => {
      setAnswer(answers[Math.floor(Math.random() * answers.length)])
      setShaking(false)
      setQuestionCount(q => q + 1)
    }, 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', height: '100%', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ color: '#6366f1', fontWeight: 'bold' }}>🔮 Magic 8 Ball</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <div style={{
        width: '140px', height: '140px', borderRadius: '50%',
        background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: shaking ? 'shake8ball 0.15s ease-in-out infinite' : 'none',
        boxShadow: '0 10px 40px rgba(99,102,241,0.4)'
      }}>
        <div style={{
          width: '90px', height: '90px', borderRadius: '50%',
          background: shaking ? '#1e1b4b' : '#000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '12px', color: '#6366f1', fontSize: '13px', fontWeight: 'bold'
        }}>
          {shaking ? '...' : answer || 'Ask me anything!'}
        </div>
      </div>
      <button onClick={shake} disabled={shaking} style={{ ...appBtnStyle, background: 'linear-gradient(135deg, #6366f1, #4f46e5)', width: '140px' }}>
        {shaking ? '🔮 Shaking...' : 'Shake!'}
      </button>
      <div style={{ color: '#888', fontSize: '12px' }}>Questions asked: {questionCount}</div>
      <style>{`@keyframes shake8ball { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }`}</style>
    </div>
  )
}

// Jokes App
function JokesApp({ onClose }: { onClose: () => void }) {
  const [joke, setJoke] = useState({ setup: '', punchline: '', showPunchline: false })

  const jokes = [
    { setup: 'Why do programmers prefer dark mode?', punchline: 'Because light attracts bugs!' },
    { setup: 'What do you call a fake noodle?', punchline: 'An impasta!' },
    { setup: 'Why did the scarecrow win an award?', punchline: 'He was outstanding in his field!' },
    { setup: 'What do you call a bear with no teeth?', punchline: 'A gummy bear!' },
    { setup: 'Why don\'t scientists trust atoms?', punchline: 'Because they make up everything!' },
    { setup: 'What did the ocean say to the beach?', punchline: 'Nothing, it just waved.' },
    { setup: 'Why did the math book look sad?', punchline: 'Because it had too many problems.' },
    { setup: 'What do you call a can opener that doesn\'t work?', punchline: 'A can\'t opener!' },
    { setup: 'Why don\'t eggs tell jokes?', punchline: 'They\'d crack each other up!' },
    { setup: 'What did the snail say while riding on the turtle\'s back?', punchline: 'Wheeeee!' },
  ]

  const tellJoke = () => {
    const j = jokes[Math.floor(Math.random() * jokes.length)]
    setJoke({ ...j, showPunchline: false })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', height: '100%', justifyContent: 'center', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ color: '#14b8a6', fontWeight: 'bold' }}>😂 Joke Generator</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      {joke.setup ? (
        <>
          <div style={{
            background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.3)',
            borderRadius: '16px', padding: '24px 20px', textAlign: 'center', width: '100%'
          }}>
            <div style={{ fontSize: '18px', color: '#fff', marginBottom: '12px' }}>{joke.setup}</div>
            {joke.showPunchline ? (
              <div style={{ fontSize: '20px', color: '#14b8a6', fontWeight: 'bold', animation: 'fadeIn 0.5s' }}>{joke.punchline}</div>
            ) : (
              <button onClick={() => setJoke({ ...joke, showPunchline: true })} style={{ ...appBtnStyle, background: 'linear-gradient(135deg, #14b8a6, #0d9488)', fontSize: '13px' }}>
                Reveal Punchline 😆
              </button>
            )}
          </div>
          <button onClick={tellJoke} style={{ ...appBtnStyle, background: '#64748b' }}>Another One! 🔄</button>
        </>
      ) : (
        <button onClick={tellJoke} style={{ ...appBtnStyle, background: 'linear-gradient(135deg, #14b8a6, #0d9488)', width: '160px', fontSize: '18px' }}>
          Tell Me a Joke! 😄
        </button>
      )}
    </div>
  )
}

// Piano App
function PianoApp({ onClose }: { onClose: () => void }) {
  const audioContext = useRef<AudioContext | null>(null)
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const playNote = (freq: number, key: string) => {
    setActiveKey(key)
    if (!audioContext.current) audioContext.current = new AudioContext()
    const osc = audioContext.current.createOscillator()
    const gain = audioContext.current.createGain()
    osc.connect(gain); gain.connect(audioContext.current.destination)
    osc.frequency.value = freq; osc.type = 'sine'
    gain.gain.setValueAtTime(0.3, audioContext.current.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.5)
    osc.start(); osc.stop(audioContext.current.currentTime + 0.5)
    setTimeout(() => setActiveKey(null), 200)
  }

  const keys = [
    { note: 'C', freq: 261.63, black: false },
    { note: 'C#', freq: 277.18, black: true },
    { note: 'D', freq: 293.66, black: false },
    { note: 'D#', freq: 311.13, black: true },
    { note: 'E', freq: 329.63, black: false },
    { note: 'F', freq: 349.23, black: false },
    { note: 'F#', freq: 369.99, black: true },
    { note: 'G', freq: 392.00, black: false },
    { note: 'G#', freq: 415.30, black: true },
    { note: 'A', freq: 440.00, black: false },
    { note: 'A#', freq: 466.16, black: true },
    { note: 'B', freq: 493.88, black: false },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', height: '100%', justifyContent: 'flex-end', paddingBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ color: '#1d4ed8', fontWeight: 'bold' }}>🎹 Piano</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <div style={{ position: 'relative', display: 'flex', height: '150px' }}>
        {keys.filter(k => !k.black).map(k => (
          <button key={k.note} onMouseDown={() => playNote(k.freq, k.note)} onTouchStart={() => playNote(k.freq, k.note)} style={{
            width: '38px', height: '150px', background: activeKey === k.note ? '#ddd' : '#fff',
            border: '1px solid #ccc', borderRadius: '0 0 6px 6px', cursor: 'pointer',
            marginRight: '2px', boxShadow: activeKey === k.note ? 'inset 0 3px 8px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.2)'
          }}>
            <span style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', color: '#999' }}>{k.note}</span>
          </button>
        ))}
        {keys.filter(k => k.black).map((k, i) => (
          <button key={k.note} onMouseDown={() => playNote(k.freq, k.note)} onTouchStart={() => playNote(k.freq, k.note)} style={{
            position: 'absolute', width: '24px', height: '95px',
            background: activeKey === k.note ? '#555' : '#333',
            border: '1px solid #000', borderRadius: '0 0 4px 4px', cursor: 'pointer',
            left: `${26 + i * 40}px`, zIndex: 2, boxShadow: '0 3px 5px rgba(0,0,0,0.4)'
          }} />
        ))}
      </div>
      <div style={{ color: '#888', fontSize: '11px' }}>Tap the keys to play music! 🎵</div>
    </div>
  )
}

// Color Generator App
function ColorGenApp({ onClose }: { onClose: () => void }) {
  const [color, setColor] = useState('#6366f1')
  const [history, setHistory] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const generateColor = () => {
    const newColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    setColor(newColor)
    setHistory(h => [newColor, ...h.slice(8)])
  }

  const copyColor = () => {
    navigator.clipboard.writeText(color)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', height: '100%', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ color: '#f472b6', fontWeight: 'bold' }}>🌈 Color Gen</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <div style={{
        width: '160px', height: '160px', borderRadius: '24px', background: color,
        boxShadow: `0 10px 40px ${color}66`, transition: 'background 0.3s'
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'monospace', color: '#fff' }}>{color.toUpperCase()}</span>
        <button onClick={copyColor} style={{ ...appBtnStyle, background: copied ? '#22c55e' : '#64748b', padding: '8px 14px', fontSize: '12px' }}>
          {copied ? 'Copied! ✓' : 'Copy'}
        </button>
      </div>
      <button onClick={generateColor} style={{ ...appBtnStyle, background: 'linear-gradient(135deg, #f472b6, #ec4899)', width: '140px' }}>
        Generate! 🎨
      </button>
      {history.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {history.map((h, i) => (
            <button key={i} onClick={() => setColor(h)} style={{
              width: '32px', height: '32px', borderRadius: '8px', background: h, border: '2px solid rgba(255,255,255,0.2)', cursor: 'pointer'
            }} />
          ))}
        </div>
      )}
    </div>
  )
}

// Age Calculator App
function AgeCalcApp({ onClose }: { onClose: () => void }) {
  const [birthDate, setBirthDate] = useState('')
  const [result, setResult] = useState<{ years: number; months: number; days: number; nextBirthday: number } | null>(null)

  const calculateAge = () => {
    if (!birthDate) return
    const birth = new Date(birthDate)
    const today = new Date()
    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()
    
    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate() }
    if (months < 0) { years--; months += 12 }
    
    const nextBirth = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirth < today) nextBirth.setFullYear(nextBirth.getFullYear() + 1)
    const daysUntil = Math.ceil((nextBirth.getTime() - today.getTime()) / (1000*60*60*24))
    
    setResult({ years, months, days, nextBirthday: daysUntil })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', height: '100%', justifyContent: 'center', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ color: '#fb923c', fontWeight: 'bold' }}>🎂 Age Calculator</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} max={new Date().toISOString().split('T')[0]} style={{
        background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px',
        padding: '14px 18px', color: '#fff', fontSize: '16px', outline: 'none', width: '100%'
      }} />
      <button onClick={calculateAge} style={{ ...appBtnStyle, background: 'linear-gradient(135deg, #fb923c, #f97316)', width: '100%' }}>
        Calculate My Age! 🎉
      </button>
      {result && (
        <div style={{
          background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.3)',
          borderRadius: '16px', padding: '20px', width: '100%', textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#fb923c' }}>{result.years}</div>
          <div style={{ color: '#fff', marginBottom: '12px' }}>years old</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', color: '#ccc', fontSize: '14px' }}>
            <span>{result.months} months</span>
            <span>{result.days} days</span>
          </div>
          <div style={{ marginTop: '12px', color: '#22c55e', fontSize: '13px' }}>
            🎂 Next birthday in {result.nextBirthday} days!
          </div>
        </div>
      )}
    </div>
  )
}

// Tip Calculator App
function TipCalcApp({ onClose }: { onClose: () => void }) {
  const [bill, setBill] = useState('')
  const [tipPercent, setTipPercent] = useState(15)
  const [split, setSplit] = useState(1)

  const billAmount = parseFloat(bill) || 0
  const tipAmount = billAmount * (tipPercent / 100)
  const total = billAmount + tipAmount
  const perPerson = total / split

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', height: '100%', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ color: '#059669', fontWeight: 'bold' }}>💰 Tip Calculator</span>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
      </div>
      
      <div style={{ width: '100%' }}>
        <label style={{ color: '#888', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Bill Amount ($)</label>
        <input type="number" value={bill} onChange={e => setBill(e.target.value)} placeholder="0.00" style={inputStyle} />
      </div>

      <div style={{ width: '100%' }}>
        <label style={{ color: '#888', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Tip: {tipPercent}%</label>
        <input type="range" min="0" max="50" value={tipPercent} onChange={e => setTipPercent(+e.target.value)} style={{ width: '100%', accentColor: '#059669' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '11px' }}>
          {[10, 15, 20, 25].map(p => (
            <button key={p} onClick={() => setTipPercent(p)} style={{
              background: tipPercent === p ? '#059669' : 'transparent', color: tipPercent === p ? '#fff' : '#666',
              border: '1px solid #333', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', cursor: 'pointer'
            }}>{p}%</button>
          ))}
        </div>
      </div>

      <div style={{ width: '100%' }}>
        <label style={{ color: '#888', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Split: {split} person{split > 1 ? 's' : ''}</label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => setSplit(Math.max(1, split - 1))} style={counterBtnStyle}>−</button>
          <span style={{ color: '#fff', fontSize: '18px', minWidth: '30px', textAlign: 'center' }}>{split}</span>
          <button onClick={() => setSplit(split + 1)} style={counterBtnStyle}>+</button>
        </div>
      </div>

      <div style={{
        background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.3)',
        borderRadius: '16px', padding: '16px', width: '100%'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#888' }}>Tip Amount:</span>
          <span style={{ color: '#059669', fontWeight: 'bold' }}>${tipAmount.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#888' }}>Total:</span>
          <span style={{ color: '#fff', fontWeight: 'bold' }}>${total.toFixed(2)}</span>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#888' }}>Per Person:</span>
          <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '18px' }}>${perPerson.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

// Shared styles
const closeBtnStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
  width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer',
  fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center'
}

const appBtnStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none', color: '#fff',
  padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', fontSize: '14px',
  fontWeight: '600', transition: 'transform 0.15s'
}

const dpadStyle: React.CSSProperties = {
  width: 40, height: 40, background: '#333', border: '1px solid #555',
  borderRadius: '8px', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
}

const arrowBtnStyle: React.CSSProperties = {
  width: 40, height: 40, background: '#f59e0b', border: 'none', borderRadius: '8px',
  color: '#fff', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold'
}

const inputStyle: React.CSSProperties = {
  background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px',
  padding: '14px 18px', color: '#fff', fontSize: '18px', outline: 'none', width: '100%', boxSizing: 'border-box'
}

const counterBtnStyle: React.CSSProperties = {
  width: 36, height: 36, background: '#059669', border: 'none', borderRadius: '8px',
  color: '#fff', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
}

// Main Home Component
// Pre-generate wallpaper data to avoid hydration mismatch
const generateStars = (count: number, maxYPercent: number) => 
  Array.from({ length: count }, (_, i) => ({
    id: i,
    top: (Math.sin(i * 12.9898 + 78.233) * 43758.5453 % 1) * maxYPercent,
    left: (Math.sin(i * 93.989 + 28.233) * 23421.6453 % 1) * 100,
    size: ((Math.sin(i * 45.123) * 12345.6789 % 1) * 2 + 1),
    opacity: ((Math.sin(i * 67.456) * 34567.8901 % 1) * 0.5 + 0.3),
    delay: ((Math.sin(i * 23.789) * 15678.9012 % 1) * 2),
    duration: ((Math.sin(i * 89.012) * 27890.1234 % 1) * 2 + 2)
  }))

const generateTrees = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    left: i * 8 + ((Math.sin(i * 34.567) * 14567.8901 % 1) * 4),
    width: ((Math.sin(i * 56.789) * 25678.9012 % 1) * 12 + 6),
    height: ((Math.sin(i * 78.901) * 36789.0123 % 1) * 25 + 15),
    opacity: ((Math.sin(i * 90.123) * 47890.1234 % 1) * 0.5 + 0.5)
  }))

// Pre-computed wallpaper data (deterministic based on index)
const LOCK_STARS = generateStars(30, 50)
const HOME_STARS = generateStars(40, 55)
const HOME_TREES = generateTrees(12)

// Combine all apps - Links first, then fun apps (for pagination)
interface AllApp {
  id: string
  name: string
  icon: string
  gradient: string
  isLink: boolean
  url?: string
}

const ALL_APPS: AllApp[] = [
  // 🔗 LINK APPS FIRST (Page 1 - first 6 slots)
  { id: 'videos', name: 'My Documentaries', icon: '🎬', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A5A 100%)', isLink: true, url: 'https://youtube.com/@deadmentoldme' },
  { id: 'tutorials', name: 'Melodies', icon: '📺', gradient: 'linear-gradient(135deg, #FF9F43 0%, #EE8E32 100%)', isLink: true, url: 'https://youtube.com/@oscar-rb19?si=tBhWDfEZsl9U2c66' },
  { id: 'gaming', name: 'Placed Some Blocks', icon: '🎮', gradient: 'linear-gradient(135deg, #A55EEA 0%, #944DE0 100%)', isLink: true, url: 'https://youtube.com/@MineHackzz' },
  { id: 'spotify', name: 'Playlist', icon: '🎵', gradient: 'linear-gradient(135deg, #1DB954 0%, #19AA4A 100%)', isLink: true, url: 'https://open.spotify.com/playlist/25cFGtIkzKkMOBTdK8CuZ8?si=SeNMqrtwSiG1r29leS0ZtQ&nd=1&dlsi=99a4971724c848fe' },
  { id: 'instagram', name: 'Instagram', icon: '📸', gradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', isLink: true, url: 'https://instagram.com/pixelatedsonder' },
  { id: 'email', name: 'Contact', icon: '✉️', gradient: 'linear-gradient(135deg, #58A7E5 0%, #4790D4 100%)', isLink: true, url: 'mailto:andtheoscargoestou@gmail.com' },
  
  // 🎮 GAMES (fill rest of page 1 + more pages)
  { id: 'snake', name: 'Snake', icon: '🐍', gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', isLink: false },
  { id: 'tictactoe', name: 'Tic Tac Toe', icon: '⭕', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', isLink: false },
  { id: 'memory', name: 'Memory', icon: '🧠', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', isLink: false },
  { id: 'puzzle2048', name: '2048', icon: '🔢', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', isLink: false },
  { id: 'whackamole', name: 'Whack!', icon: '🔨', gradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)', isLink: false },
  
  // 🛠️ TOOLS
  { id: 'calculator', name: 'Calculator', icon: '🧮', gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)', isLink: false },
  { id: 'stopwatch', name: 'Stopwatch', icon: '⏱️', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', isLink: false },
  { id: 'notes', name: 'Notes', icon: '📝', gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', isLink: false },
  { id: 'paint', name: 'Paint', icon: '🎨', gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', isLink: false },
  
  // 🎉 FUN APPS
  { id: 'dice', name: 'Dice', icon: '🎲', gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', isLink: false },
  { id: 'coinflip', name: 'Coin Flip', icon: '🪙', gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', isLink: false },
  { id: 'magic8ball', name: 'Magic 8', icon: '🔮', gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', isLink: false },
  { id: 'jokes', name: 'Jokes', icon: '😂', gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', isLink: false },
  { id: 'piano', name: 'Piano', icon: '🎹', gradient: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)', isLink: false },
  { id: 'colorgen', name: 'Colors', icon: '🌈', gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)', isLink: false },
  { id: 'agecalc', name: 'My Age', icon: '🎂', gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)', isLink: false },
  { id: 'tipcalc', name: 'Tip Calc', icon: '💰', gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)', isLink: false },
]

// Split into pages of 9 apps each (3x3 grid)
const APPS_PER_PAGE = 9
const TOTAL_PAGES = Math.ceil(ALL_APPS.length / APPS_PER_PAGE)

export default function Home() {
  const [bootPhase, setBootPhase] = useState<BootPhase>('off')
  const [currentTime, setCurrentTime] = useState('')
  const [selectedApp, setSelectedApp] = useState<number | null>(null)
  const [bootProgress, setBootProgress] = useState(0)
  const [showUnlockHint, setShowUnlockHint] = useState(false)
  const [openApp, setOpenApp] = useState<OpenApp>(null)
  const [mounted, setMounted] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  
  // Set mounted state to true after first render (for client-only features)
  // Using requestAnimationFrame to avoid direct setState in effect
  useEffect(() => {
    const rafId = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(rafId)
  }, [])
  
  // Clock update
  useEffect(() => {
    if (!mounted) return
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [mounted])

  // Boot sequence - Multi-phase animation
  useEffect(() => {
    const logoTimer = setTimeout(() => setBootPhase('logo'), 500)
    const loadingTimer = setTimeout(() => setBootPhase('loading'), 2000)
    const helloTimer = setTimeout(() => setBootPhase('hello'), 4000)
    const lockTimer = setTimeout(() => setBootPhase('lock'), 5500)
    
    return () => {
      clearTimeout(logoTimer)
      clearTimeout(loadingTimer)
      clearTimeout(helloTimer)
      clearTimeout(lockTimer)
    }
  }, [])

  // Simulate boot progress during loading phase
  useEffect(() => {
    if (bootPhase === 'loading') {
      const interval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) { clearInterval(interval); return 100 }
          if (prev === 0) return 1 // Start from 1 on first tick
          return prev + Math.random() * 15 + 5
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [bootPhase])

  // Handle unlock
  const handleUnlock = () => { setBootPhase('ready') }

  // Handle app click (link or game)
  const handleAppClick = (app: AllApp) => {
    if (app.isLink && app.url) {
      window.open(app.url, '_blank')
    } else {
      setOpenApp(app.id)
    }
  }

  // Swipe handling - Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 40
    
    if (distance > minSwipeDistance && currentPage < TOTAL_PAGES - 1) {
      // Swipe left → next page
      setCurrentPage(p => p + 1)
    } else if (distance < -minSwipeDistance && currentPage > 0) {
      // Swipe right → previous page  
      setCurrentPage(p => p - 1)
    }
    
    setTouchStart(null)
    setTouchEnd(null)
  }

  // Mouse drag support for desktop testing
  const [mouseDown, setMouseDown] = useState(false)
  const [mouseStart, setMouseStart] = useState<number | null>(null)
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDown(true)
    setMouseStart(e.clientX)
    setTouchStart(e.clientX)
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseDown) return
    setTouchEnd(e.clientX)
  }
  
  const handleMouseUp = () => {
    if (!mouseDown || !mouseStart) return
    const distance = mouseStart - (touchEnd || mouseStart)
    const minSwipeDistance = 40
    
    if (distance > minSwipeDistance && currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(p => p + 1)
    } else if (distance < -minSwipeDistance && currentPage > 0) {
      setCurrentPage(p => p - 1)
    }
    
    setMouseDown(false)
    setMouseStart(null)
    setTouchStart(null)
    setTouchEnd(null)
  }

  // Get current page apps
  const getCurrentPageApps = (): AllApp[] => {
    const start = currentPage * APPS_PER_PAGE
    return ALL_APPS.slice(start, start + APPS_PER_PAGE)
  }

  // Render app content based on ID
  const renderAppContent = () => {
    switch(openApp) {
      case 'snake': return <SnakeGame onClose={() => setOpenApp(null)} />
      case 'tictactoe': return <TicTacToe onClose={() => setOpenApp(null)} />
      case 'memory': return <MemoryGame onClose={() => setOpenApp(null)} />
      case 'puzzle2048': return <Puzzle2048 onClose={() => setOpenApp(null)} />
      case 'whackamole': return <WhackAMole onClose={() => setOpenApp(null)} />
      case 'calculator': return <CalculatorApp onClose={() => setOpenApp(null)} />
      case 'stopwatch': return <StopwatchApp onClose={() => setOpenApp(null)} />
      case 'notes': return <NotesApp onClose={() => setOpenApp(null)} />
      case 'paint': return <PaintApp onClose={() => setOpenApp(null)} />
      case 'dice': return <DiceApp onClose={() => setOpenApp(null)} />
      case 'coinflip': return <CoinFlipApp onClose={() => setOpenApp(null)} />
      case 'magic8ball': return <Magic8BallApp onClose={() => setOpenApp(null)} />
      case 'jokes': return <JokesApp onClose={() => setOpenApp(null)} />
      case 'piano': return <PianoApp onClose={() => setOpenApp(null)} />
      case 'colorgen': return <ColorGenApp onClose={() => setOpenApp(null)} />
      case 'agecalc': return <AgeCalcApp onClose={() => setOpenApp(null)} />
      case 'tipcalc': return <TipCalcApp onClose={() => setOpenApp(null)} />
      default: return null
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      minHeight: '100dvh',
      background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Mobile Phone Container */}
      <div style={{
        width: '100%',
        maxWidth: '380px',
        height: 'calc(100vh - 32px)',
        maxHeight: '800px',
        position: 'relative'
      }}>
        {/* Phone Frame */}
        <div style={{
          width: '100%',
          height: '100%',
          background: '#1a1a1a',
          borderRadius: '44px',
          padding: '12px',
          boxShadow: `
            0 25px 60px rgba(0, 0, 0, 0.5),
            0 10px 20px rgba(0, 0, 0, 0.3),
            inset 0 0 0 2px rgba(255, 255, 255, 0.1)
          `,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Dynamic Island / Notch */}
          <div style={{
            position: 'absolute',
            top: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '34px',
            background: '#000',
            borderRadius: '20px',
            zIndex: 50,
            boxShadow: 'inset 0 0 4px rgba(0,0,0,0.5)'
          }} />

          {/* Screen */}
          <div style={{
            flex: 1,
            background: '#000',
            borderRadius: '36px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}>
            
            {/* ========== PHASE 1: OFF / BLACK SCREEN ========== */}
            {bootPhase === 'off' && (
              <div style={{
                width: '100%',
                height: '100%',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '8px', height: '8px', background: '#222', borderRadius: '50%' }} />
              </div>
            )}

            {/* ========== PHASE 2: LOGO ========== */}
            {bootPhase === 'logo' && (
              <div style={{
                width: '100%',
                height: '100%',
                background: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
              }}>
                <div style={{
                  fontSize: '72px',
                  animation: 'logoGlow 2s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.4))'
                }}>📱</div>
                <div style={{
                  width: '40px', height: '3px', background: '#333', borderRadius: '2px', overflow: 'hidden'
                }}>
                  <div style={{
                    width: '30%', height: '100%', background: '#fff', borderRadius: '2px',
                    animation: 'shimmer 1.5s ease-in-out infinite'
                  }} />
                </div>
                <style>{`
                  @keyframes logoGlow { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); filter: drop-shadow(0 0 60px rgba(255,255,255,0.6)); } }
                  @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
                `}</style>
              </div>
            )}

            {/* ========== PHASE 3: LOADING WITH PROGRESS BAR ========== */}
            {bootPhase === 'loading' && (
              <div style={{
                width: '100%',
                height: '100%',
                background: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '30px'
              }}>
                <div style={{ fontSize: '48px', opacity: 0.9, filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.5))' }}>📱</div>
                <div style={{ width: '200px', height: '4px', background: '#333', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${Math.min(bootProgress, 100)}%`, height: '100%',
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
                    borderRadius: '2px', transition: 'width 0.15s ease-out',
                    boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)'
                  }} />
                </div>
                <div style={{ color: '#666', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>Starting up...</div>
              </div>
            )}

            {/* ========== PHASE 4: HELLO SCREEN ========== */}
            {bootPhase === 'hello' && (
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, #1a1a3e 0%, #16213e 50%, #0d2137 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                animation: 'fadeIn 0.8s ease-out'
              }}>
                <div style={{ color: '#fff', fontSize: '72px', fontWeight: '300', letterSpacing: '-2px', lineHeight: '1', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                  {currentTime || '--:--'}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', fontWeight: '400' }}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
                <div style={{ marginTop: '40px', color: '#fff', fontSize: '32px', fontWeight: '600', animation: 'helloFadeIn 1s ease-out 0.3s both' }}>
                  Hello
                </div>
                <style>{`
                  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                  @keyframes helloFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                `}</style>
              </div>
            )}

            {/* ========== PHASE 5: LOCK SCREEN ========== */}
            {bootPhase === 'lock' && (
              <div 
                onClick={handleUnlock}
                onTouchStart={() => setShowUnlockHint(true)}
                onTouchEnd={() => setShowUnlockHint(false)}
                onMouseDown={() => setShowUnlockHint(true)}
                onMouseUp={() => setShowUnlockHint(false)}
                style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, #1a1a3e 0%, #16213e 35%, #1a3a52 65%, #0d2137 100%)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {LOCK_STARS.map((star) => (
                  <div key={`lock-star-${star.id}`} style={{
                    position: 'absolute', top: `${star.top}%`, left: `${star.left}%`,
                    width: `${star.size}px`, height: `${star.size}px`,
                    background: '#fff', borderRadius: '50%', opacity: star.opacity,
                    animation: `twinkle ${star.duration}s ease-in-out infinite`,
                    animationDelay: `${star.delay}s`
                  }} />
                ))}
                <div style={{ position: 'absolute', top: '10%', right: '15%', width: '45px', height: '45px', background: 'linear-gradient(135deg, #fef9c3 0%, #fde047 100%)', borderRadius: '50%', boxShadow: '0 0 25px rgba(250, 204, 21, 0.4)' }} />

                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50px', paddingTop: '14px', paddingLeft: '28px', paddingRight: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20, color: '#fff', fontSize: '13px', fontWeight: '600' }}>
                  <span>{currentTime}</span>
                  <div style={{ display: 'flex', gap: '6px' }}><span>📶</span><span>🔋</span></div>
                </div>

                <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
                  <div style={{ color: '#fff', fontSize: '80px', fontWeight: '300', letterSpacing: '-3px', lineHeight: '1', textShadow: '0 2px 30px rgba(0,0,0,0.3)' }}>{currentTime || '--:--'}</div>
                  <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', fontWeight: '500', marginTop: '4px' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </div>
                </div>

                <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 10, transition: 'all 0.2s ease', opacity: showUnlockHint ? 1 : 0.6 }}>
                  <div style={{ width: '50px', height: '32px', border: '2px solid rgba(255,255,255,0.8)', borderRadius: '20px', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '22px', height: '22px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%' }} />
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '500' }}>Tap to unlock</div>
                </div>
                <style>{`@keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }`}</style>
              </div>
            )}

            {/* ========== PHASE 6: HOME SCREEN OR OPEN APP ========== */}
            {bootPhase === 'ready' && (
              <>
                {!openApp ? (
                  /* ===== HOME SCREEN WITH APPS ===== */
                  <>
                    {/* Wallpaper - Full Screen Coverage! 🖼️ */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 25%, #1a2744 45%, #15243f 65%, #0c1929 85%, #061018 100%)',
                      overflow: 'hidden'
                    }}>
                      {/* Stars - scattered across entire sky */}
                      {HOME_STARS.map((star) => (
                        <div key={`home-star-${star.id}`} style={{
                          position: 'absolute', top: `${star.top}%`, left: `${star.left}%`,
                          width: `${star.size}px`, height: `${star.size}px`,
                          background: '#fff', borderRadius: '50%', opacity: star.opacity,
                          animation: `twinkle ${star.duration}s ease-in-out infinite`,
                          animationDelay: `${star.delay}s`
                        }} />
                      ))}
                      
                      {/* Moon with glow */}
                      <div style={{ position: 'absolute', top: '10%', right: '12%', width: '56px', height: '56px', background: 'linear-gradient(135deg, #fef9c3 0%, #fde047 50%, #facc15 100%)', borderRadius: '50%', boxShadow: '0 0 40px rgba(250, 204, 21, 0.6), 0 0 80px rgba(250, 204, 21, 0.3)' }} />
                      
                      {/* Aurora effect - wider coverage */}
                      <div style={{ position: 'absolute', top: '0%', left: '-20%', width: '140%', height: '50%', background: 'linear-gradient(180deg, transparent 0%, rgba(34, 197, 94, 0.06) 15%, rgba(59, 130, 246, 0.10) 35%, rgba(168, 85, 247, 0.07) 55%, rgba(99, 102, 241, 0.04) 70%, transparent 100%)', animation: 'aurora 8s ease-in-out infinite alternate', filter: 'blur(20px)', transform: 'skewX(-8deg)' }} />
                      
                      {/* Distant mountains layer 1 - further back, lighter */}
                      <svg style={{ position: 'absolute', bottom: '28%', left: 0, width: '100%', height: '45%' }} viewBox="0 0 400 180" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="mtnGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.7"/>
                            <stop offset="100%" stopColor="#152238" stopOpacity="0.9"/>
                          </linearGradient>
                          <linearGradient id="mtnGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1a3050" stopOpacity="0.8"/>
                            <stop offset="100%" stopColor="#0f1a2e" stopOpacity="1"/>
                          </linearGradient>
                        </defs>
                        <path d="M0,180 L0,90 L50,55 L100,80 L160,30 L220,75 L280,25 L340,60 L380,38 L400,58 L400,180 Z" fill="url(#mtnGrad1)"/>
                        <path d="M0,180 L0,110 L40,85 L90,105 L150,60 L210,95 L270,55 L330,85 L370,68 L400,88 L400,180 Z" fill="url(#mtnGrad2)"/>
                      </svg>
                      
                      {/* Foreground hills/ground - covers bottom completely! */}
                      <div style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        right: 0, 
                        height: '32%',
                        background: 'linear-gradient(180deg, #0a1628 0%, #061018 60%, #030810 100%)'
                      }}>
                        {/* Rolling hills silhouette */}
                        <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }} viewBox="0 0 400 120" preserveAspectRatio="none">
                          <path d="M0,120 L0,70 Q50,45 100,60 T200,50 T300,65 T400,48 L400,120 Z" fill="#081420" opacity="0.8"/>
                          <path d="M0,120 L0,85 Q80,65 160,78 T280,68 T400,82 L400,120 Z" fill="#050d14" opacity="0.9"/>
                        </svg>
                        
                        {/* Trees on the hills */}
                        {HOME_TREES.map((tree, idx) => (
                          <div key={`home-tree-${tree.id}`} style={{
                            position: 'absolute', bottom: `${((idx * 17 + 8) % 25)}%`, left: `${tree.left}%`,
                            width: `${tree.width * 1.2}px`, height: `${tree.height * 1.3}px`,
                            background: 'linear-gradient(180deg, #091826 0%, #040c14 100%)',
                            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', opacity: tree.opacity * 0.9
                          }} />
                        ))}
                      </div>
                      
                      {/* Water/lake reflection at very bottom */}
                      <div style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        right: 0, 
                        height: '8%', 
                        background: 'linear-gradient(180deg, rgba(15, 30, 50, 0.5) 0%, rgba(5, 12, 20, 0.8) 100%)', 
                        animation: 'water 4s ease-in-out infinite' 
                      }} />
                      
                      {/* Subtle vignette for depth */}
                      <div style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0,
                        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
                        pointerEvents: 'none'
                      }} />

                      <style>{`
                        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
                        @keyframes aurora { 0% { opacity: 0.3; transform: skewX(-8deg) translateX(-3%); } 100% { opacity: 0.7; transform: skewX(-8deg) translateX(3%); } }
                        @keyframes water { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
                      `}</style>
                    </div>

                    {/* Status Bar */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '50px', paddingTop: '14px',
                      paddingLeft: '28px', paddingRight: '28px', display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', zIndex: 20, color: '#fff', fontSize: '13px', fontWeight: '600',
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}>
                      <span>{currentTime}</span>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}><span>📶</span><span>🔋</span></div>
                    </div>

                    {/* Swipeable App Pages Container - iPhone style! 📱 */}
                    <div
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      style={{
                        position: 'absolute', top: '54px', left: 0, right: 0, bottom: '50px',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        overflow: 'hidden',
                        touchAction: 'none',
                        userSelect: 'none',
                        WebkitUserSelect: 'none'
                      }}
                    >
                      {/* 3x3 App Grid - Perfectly Centered */}
                      <div style={{
                        width: '100%',
                        maxWidth: '280px',
                        height: '100%',
                        maxHeight: '320px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridTemplateRows: 'repeat(3, 1fr)',
                        gap: '14px',
                        padding: '8px',
                        placeContent: 'center',
                        alignContent: 'center'
                      }}>
                        {getCurrentPageApps().map((app, index) => (
                          <button
                            key={`${currentPage}-${app.id}`}
                            onClick={() => handleAppClick(app)}
                            onTouchStart={() => setSelectedApp(currentPage * APPS_PER_PAGE + index)}
                            onTouchEnd={() => setTimeout(() => setSelectedApp(null), 200)}
                            onMouseDown={() => setSelectedApp(currentPage * APPS_PER_PAGE + index)}
                            onMouseUp={() => setTimeout(() => setSelectedApp(null), 200)}
                            style={{
                              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px',
                              background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                              transition: 'transform 0.15s ease',
                              transform: selectedApp === currentPage * APPS_PER_PAGE + index ? 'scale(0.9)' : 'scale(1)',
                              alignSelf: 'center'
                            }}
                          >
                            <div style={{
                              width: '64px', height: '64px', borderRadius: '16px', background: app.gradient,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px',
                              boxShadow: selectedApp === currentPage * APPS_PER_PAGE + index 
                                ? '0 6px 25px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.4)' 
                                : '0 4px 15px rgba(0,0,0,0.35)',
                              border: selectedApp === currentPage * APPS_PER_PAGE + index ? '2px solid rgba(255,255,255,0.6)' : 'none',
                              transition: 'all 0.15s ease'
                            }}>{app.icon}</div>
                            <span style={{
                              fontSize: '11px', color: '#fff', fontWeight: '500',
                              textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)',
                              textAlign: 'center', letterSpacing: '0.2px'
                            }}>{app.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* Page Indicator Dots • • • */}
                      <div style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
                        paddingTop: '8px',
                        paddingBottom: '4px'
                      }}>
                        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setCurrentPage(i) }}
                            style={{
                              width: currentPage === i ? '10px' : '8px',
                              height: currentPage === i ? '10px' : '8px',
                              borderRadius: '50%',
                              background: currentPage === i ? '#fff' : 'rgba(255,255,255,0.35)',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.25s ease',
                              boxShadow: currentPage === i ? '0 0 10px rgba(255,255,255,0.6)' : 'none',
                              padding: 0
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Home Indicator Bar */}
                    <div style={{
                      position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
                      width: '134px', height: '5px', background: 'rgba(255,255,255,0.55)', borderRadius: '3px', zIndex: 20
                    }} />

                    {/* Screen glare effect */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 40%, transparent 100%)',
                      pointerEvents: 'none', zIndex: 25, borderRadius: '36px'
                    }} />
                  </>
                ) : (
                  /* ===== OPEN APP VIEW ===== */
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(180deg, #121220 0%, #1a1a2e 50%, #16162a 100%)',
                    borderRadius: '36px', padding: '50px 12px 12px', overflow: 'auto',
                    display: 'flex', flexDirection: 'column', zIndex: 30
                  }}>
                    {/* App Header */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px',
                      paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <button onClick={() => setOpenApp(null)} style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
                        fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>←</button>
                      <span style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                        {ALL_APPS.find(a => a.id === openApp)?.name || 'App'}
                      </span>
                    </div>
                    
                    {/* App Content */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {renderAppContent()}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Side Buttons */}
          <div style={{ position: 'absolute', right: '-2px', top: '140px', width: '4px', height: '60px', background: '#333', borderRadius: '0 4px 4px 0' }} />
          <div style={{ position: 'absolute', left: '-2px', top: '180px', width: '4px', height: '40px', background: '#333', borderRadius: '4px 0 0 4px' }} />
          <div style={{ position: 'absolute', left: '-2px', top: '240px', width: '4px', height: '50px', background: '#333', borderRadius: '4px 0 0 4px' }} />
        </div>
        
        {/* Brand Text below phone */}
        <div style={{
          textAlign: 'center', marginTop: '16px', color: 'rgba(255,255,255,0.4)',
          fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '500'
        }}>
          ✨ Swipe to Explore {ALL_APPS.length} Apps! ✨
        </div>
      </div>
    </div>
  )
}
