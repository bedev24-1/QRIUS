'use client';

import { useState } from 'react';
import { AdminNav } from '@/components/qrius/AdminNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MENU_ITEMS } from '@/lib/mock-data';
import { MenuItem } from '@/lib/types';
import { Pencil, Plus, Trash2 } from 'lucide-react';

export default function MenuManagementPage() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'grillades',
    available: true,
    preparationTime: 15,
  });

  const handleEdit = (item: MenuItem) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) {
      alert('Please fill all required fields');
      return;
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...(formData as MenuItem) } : item
        )
      );
    } else {
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        name: formData.name!,
        description: formData.description || '',
        price: formData.price!,
        category: formData.category || 'grillades',
        image: '/menu/placeholder.jpg',
        available: formData.available !== false,
        preparationTime: formData.preparationTime || 15,
      };
      setItems((prev) => [...prev, newItem]);
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'grillades',
      available: true,
      preparationTime: 15,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminNav />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Menu Management</h1>
              <p className="text-sm text-muted-foreground mt-1">{items.length} items</p>
            </div>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          {/* Form Modal */}
          {showForm && (
            <Card className="mb-6 p-6 bg-primary/5 border-primary">
              <h3 className="text-lg font-bold text-foreground mb-4">
                {editingId ? 'Edit Item' : 'Add New Item'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Name</label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Item name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">
                    Price (FCFA)
                  </label>
                  <Input
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    placeholder="Price"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Category</label>
                  <select
                    value={formData.category || 'grillades'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as MenuItem['category'],
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    <option value="entrées">Entrées</option>
                    <option value="grillades">Grillades</option>
                    <option value="boissons">Boissons</option>
                    <option value="desserts">Desserts</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">
                    Prep Time (min)
                  </label>
                  <Input
                    type="number"
                    value={formData.preparationTime || 15}
                    onChange={(e) =>
                      setFormData({ ...formData, preparationTime: parseInt(e.target.value) })
                    }
                    placeholder="Minutes"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground block mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Item description"
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleSave}>
                  {editingId ? 'Update Item' : 'Add Item'}
                </Button>
              </div>
            </Card>
          )}

          {/* Items Table */}
          <div className="grid grid-cols-1 gap-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{item.price.toLocaleString()} F</span>
                    <span className="capitalize">{item.category}</span>
                    <span>⏱️ {item.preparationTime}m</span>
                    <span>
                      {item.available ? (
                        <span className="text-green-600">✓ Available</span>
                      ) : (
                        <span className="text-red-600">✗ Unavailable</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
