"use client"

import React from "react";
import Modal from "@/registry/components/modal";

export default function ModalCustomHeaderDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-bold">Modal Custom-header Demo</h2>
      
      <div className="p-6 border rounded-lg">
        {/* Component usage goes here */}
        <p className="text-muted-foreground mb-4">Add your custom custom-header demo for the Modal component below:</p>
        
        <Modal>
          {/* Component content goes here */}
        </Modal>
      </div>
    </div>
  );
}
