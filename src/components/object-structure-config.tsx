'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit2 } from 'lucide-react'

type FieldType = 'string' | 'number' | 'boolean' | 'array' | 'object'

interface Field {
  id: string
  name: string
  description: string
  type: FieldType
}

export function ObjectStructureConfigComponent() {
  const [fields, setFields] = useState<Field[]>([])
  const [newField, setNewField] = useState<Field>({ id: '', name: '', description: '', type: 'string' })
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setFields(fields.map(field => field.id === editingId ? { ...newField, id: editingId } : field))
      setEditingId(null)
    } else {
      setFields([...fields, { ...newField, id: Date.now().toString() }])
    }
    setNewField({ id: '', name: '', description: '', type: 'string' })
  }

  const handleEditField = (field: Field) => {
    setNewField(field)
    setEditingId(field.id)
  }

  const handleDeleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Configure Object Structure</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddField} className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fieldName">Field Name</Label>
              <Input
                id="fieldName"
                value={newField.name}
                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fieldType">Field Type</Label>
              <Select
                value={newField.type}
                onValueChange={(value: FieldType) => setNewField({ ...newField, type: value })}
              >
                <SelectTrigger id="fieldType">
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="array">Array</SelectItem>
                  <SelectItem value="object">Object</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fieldDescription">Field Description</Label>
            <Input
              id="fieldDescription"
              value={newField.description}
              onChange={(e) => setNewField({ ...newField, description: e.target.value })}
            />
          </div>
          <Button type="submit">{editingId ? 'Update Field' : 'Add Field'}</Button>
        </form>

        <div className="space-y-4">
          {fields.map(field => (
            <Card key={field.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-semibold">{field.name}</h3>
                  <p className="text-sm text-gray-500">{field.description}</p>
                  <p className="text-sm text-gray-500">Type: {field.type}</p>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditField(field)}
                    aria-label={`Edit ${field.name}`}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteField(field.id)}
                    aria-label={`Delete ${field.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}