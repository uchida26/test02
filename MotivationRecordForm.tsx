"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MotivationRecord } from '../hooks/useMotivationData'

interface MotivationRecordFormProps {
  initialDate: Date | null
  onSubmit: (record: MotivationRecord) => void
  onClose: () => void
  isOpen: boolean
}

export default function MotivationRecordForm({ initialDate, onSubmit, onClose, isOpen }: MotivationRecordFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const motivationSelect = form.querySelector('select') as HTMLSelectElement
    
    onSubmit({
      date: initialDate || new Date(),
      motivation: parseInt(motivationSelect.value)
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-[#FFF8DC] border-[#DEB887]">
        <DialogHeader>
          <DialogTitle className="text-[#8B4513]">Record Motivation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date" className="text-[#8B4513]">Date</Label>
            <div className="p-2 border rounded-md border-[#DEB887] bg-white">
              {initialDate ? initialDate.toLocaleDateString('en-US', { 
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'No date selected'}
            </div>
          </div>
          <div>
            <Label htmlFor="motivation" className="text-[#8B4513]">Motivation Level</Label>
            <Select required>
              <SelectTrigger className="border-[#DEB887] text-[#8B4513] bg-white">
                <SelectValue placeholder="Select motivation level" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              onClick={onClose}
              variant="outline"
              className="border-[#DEB887] text-[#8B4513] hover:bg-[#DEB887]/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-[#DEB887] text-[#8B4513] hover:bg-[#D2B48C]"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

