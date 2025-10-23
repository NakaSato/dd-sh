import React from 'react';

/**
 * Example Tailwind Component
 * Shows how to use Tailwind CSS classes in Docusaurus components
 */
export function TailwindExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Tailwind CSS Example</h2>
        <p className="text-primary-100">This component demonstrates Tailwind CSS integration</p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Utility-First</h3>
          <p className="text-gray-600 text-sm">Build responsive designs with minimal custom CSS</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Performance</h3>
          <p className="text-gray-600 text-sm">Only includes CSS for classes you actually use</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">🚀</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Fast Development</h3>
          <p className="text-gray-600 text-sm">Write styling directly in your markup without leaving HTML</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-8">
        <h3 className="text-blue-900 font-bold mb-2">Pro Tip</h3>
        <p className="text-blue-800 text-sm font-mono">
          Use responsive prefixes like <code className="bg-blue-100 px-2 py-1 rounded">md:</code>,{' '}
          <code className="bg-blue-100 px-2 py-1 rounded">lg:</code>, and{' '}
          <code className="bg-blue-100 px-2 py-1 rounded">xl:</code> for mobile-first design
        </p>
      </div>

      {/* Code Example */}
      <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-8">
        <h3 className="text-white font-bold mb-4">Example Code</h3>
        <pre className="font-mono text-sm">
          {`<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="bg-primary-500 text-white p-4 rounded-lg">
    Card 1
  </div>
  <div className="bg-primary-600 text-white p-4 rounded-lg">
    Card 2
  </div>
</div>`}
        </pre>
      </div>

      {/* Button Examples */}
      <div className="flex gap-4 flex-wrap">
        <button className="bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-600 transition-colors">
          Primary Button
        </button>
        <button className="bg-gray-200 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
          Secondary Button
        </button>
        <button className="border-2 border-primary-500 text-primary-500 px-6 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
          Outline Button
        </button>
      </div>
    </div>
  );
}
