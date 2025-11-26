'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function TestDBPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">MongoDB Connection Test</h1>
        <Button onClick={testConnection} disabled={loading} className="mb-4">
          Test MongoDB Connection
        </Button>
        <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
          {result || 'Click the button to test connection'}
        </pre>
      </Card>
    </div>
  );
}
