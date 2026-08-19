function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-extrabold text-primary mb-4">Forest Green Heading</h1>
      <p className="text-muted mb-4">This is muted text on an off-white background.</p>
      <button className="bg-accent text-text px-4 py-2 rounded-lg font-semibold">
        Gold Accent Button
      </button>
      <div className="mt-4 flex gap-2">
        <span className="bg-success text-white px-3 py-1 rounded">Success</span>
        <span className="bg-warning text-white px-3 py-1 rounded">Warning</span>
        <span className="bg-error text-white px-3 py-1 rounded">Error</span>
      </div>
    </div>
  );
}

export default App;