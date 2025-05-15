import { registry } from "@/registry";
import type { RegistryItem } from "@/registry/schema";

export type ComponentType = RegistryItem;

export async function getComponentByName(name: string): Promise<ComponentType | null> {
  const component = registry.find((component) => component.name === name);
  
  if (!component) {
    return null;
  }

  // Return the component as is
  return component as ComponentType;
} 