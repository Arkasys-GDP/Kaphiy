export type MessageRole = "ai" | "user";

export interface ProductSuggestion {
  id: string;
  name: string;
  description: string;
  price: string;
  emoji: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  time: string;
  suggestions?: ProductSuggestion[];
  orderSummary?: string[];
  isOrderReady?: boolean;
}
