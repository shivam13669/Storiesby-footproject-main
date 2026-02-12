import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GuestData } from "@/pages/BookingPage";

interface AddGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGuest: (guest: GuestData) => void;
}

const AddGuestModal = ({ isOpen, onClose, onAddGuest }: AddGuestModalProps) => {
  const [guestName, setGuestName] = useState("");
  const [guestAadhaar, setGuestAadhaar] = useState("");

  const handleSubmit = () => {
    if (!guestName.trim() || !guestAadhaar.trim()) {
      alert("Please fill in all fields");
      return;
    }

    onAddGuest({
      name: guestName,
      aadhaarNumber: guestAadhaar,
    });

    // Reset form
    setGuestName("");
    setGuestAadhaar("");
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setGuestName("");
      setGuestAadhaar("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-2xl font-bold">Add Guest</DialogTitle>
        <DialogDescription>
          Add another traveler's details for this trip.
        </DialogDescription>

        <div className="space-y-5 py-6">
          {/* Guest Name */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Guest Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Enter guest name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="h-12 text-base"
            />
          </div>

          {/* Guest Aadhaar */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Aadhaar Number <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="XXXX XXXX XXXX XXXX"
              value={guestAadhaar}
              onChange={(e) => setGuestAadhaar(e.target.value.slice(0, 16))}
              maxLength={16}
              className="h-12 text-base tracking-widest"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-11"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 btn-primary h-11"
          >
            Add Guest
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddGuestModal;
