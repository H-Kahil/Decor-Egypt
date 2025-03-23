import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const SettingsTab: React.FC = () => {
  return (
    <div className="max-w-2xl">
      <h3 className="text-lg font-medium mb-4">General Settings</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input
              id="store-name"
              defaultValue="Decor Egypt"
              className="max-w-md"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-email">Store Email</Label>
            <Input
              id="store-email"
              type="email"
              defaultValue="info@decoregypt.com"
              className="max-w-md"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-phone">Store Phone</Label>
            <Input
              id="store-phone"
              defaultValue="+20 123 456 7890"
              className="max-w-md"
            />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <h3 className="text-lg font-medium mb-4">Currency Settings</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" defaultValue="USD" className="max-w-md" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency-symbol">Currency Symbol</Label>
            <Input id="currency-symbol" defaultValue="$" className="max-w-md" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button className="bg-violet-600 hover:bg-violet-700">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SettingsTab;
