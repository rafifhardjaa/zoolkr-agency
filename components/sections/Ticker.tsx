export function Ticker({ text }: { text: string }) {
  const repeats = Array.from({ length: 4 })

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1].map((half) => (
          <div className="ticker-half" key={half}>
            {repeats.map((_, index) => (
              <span className="ticker-item" key={index}>
                {text}
                <span className="ticker-sep">✱</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
