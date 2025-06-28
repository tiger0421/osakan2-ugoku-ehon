export default function HomePage() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', fontSize: '32px', marginBottom: '20px' }}>
        動く絵本アプリ
      </h1>
      <p style={{ color: '#666', fontSize: '18px', marginBottom: '20px' }}>
        子ども向けの動きのあるイラスト付き絵本をWebアプリとして提供するサービスです。
      </p>
      <button 
        style={{ 
          backgroundColor: '#8B5CF6', 
          color: 'white', 
          padding: '12px 24px', 
          border: 'none', 
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        絵本を作る
      </button>
    </div>
  )
}
