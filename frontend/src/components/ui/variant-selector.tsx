import React from "react";
import { ScrollArea } from "./scroll-area";
import { Resume } from "@/types";
import { useUpdateVariantMutation } from "@/services/resume";
import { Button } from "./button";

const VariantSelector = ({
  variant,
  onUpdate,
  resumeId,
}: {
  variant: Resume["variant"];
  resumeId: string;
  onUpdate: () => void;
}) => {
  const [updateVariant] = useUpdateVariantMutation();
  const [selectedVariant, setSelectedVariant] = React.useState<
    Resume["variant"]
  >(variant || "blank");

  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    setSelectedVariant(variant);
  }, [variant]);

  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (selectedVariant !== variant) {
        updateVariant({ resumeId, variant: selectedVariant }).then(() =>
          onUpdate()
        );
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [selectedVariant, updateVariant, resumeId, onUpdate, variant]);

  const variants = ["classic", "modern", "elegant", "professional", "creative"];

  return (
    <ScrollArea className="h-screen rounded-md border p-4 w-full">
      <div className="space-y-2">
        {variants.map((v) => (
          <Button
            key={v}
            onClick={() => setSelectedVariant(v as Resume["variant"])}
            className={`w-full p-2 border rounded-md ${
              selectedVariant === v ? "bg-blue-200" : ""
            }`}
            variant={"outline"}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default VariantSelector;
