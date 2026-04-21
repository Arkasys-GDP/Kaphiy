import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/src/test/renderWithProviders";
import { OrderCard } from "./OrderCard";
import { useKaphiyStore } from "../store";
import type { Order } from "../types";

// next/navigation mock — OrderCard doesn't navigate but store imports may trigger it
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => "/orders",
}));

const MOCK_ORDER: Order = {
  id: "41",
  orderNumber: "#PED-0041",
  tableId: "3",
  tableNumber: "3",
  paxCount: 1,
  status: "PENDING",
  items: [
    {
      id: "101",
      name: "Latte de Avellana",
      quantity: 2,
      modifiers: ["Oat milk", "sin azúcar"],
      dietaryFlags: ["Lactosa"],
      status: "pending",
    },
    {
      id: "102",
      name: "Croissant Praliné",
      quantity: 1,
      modifiers: [],
      dietaryFlags: ["Gluten"],
      status: "pending",
    },
  ],
  createdAt: new Date(Date.now() - 5 * 60_000).toISOString(),
  updatedAt: new Date().toISOString(),
  notes: undefined,
};

function makeProps(overrides?: Partial<Order>) {
  const onStart = vi.fn().mockResolvedValue(true);
  const onReady = vi.fn().mockResolvedValue(true);
  const onOutOfStock = vi.fn().mockResolvedValue(true);
  return {
    order: overrides ? { ...MOCK_ORDER, ...overrides } : MOCK_ORDER,
    onStart,
    onReady,
    onOutOfStock,
  };
}

beforeEach(() => {
  // Reset store to defaults before each test
  useKaphiyStore.setState({
    semaphoreWarnSecs: 300,
    semaphoreAlertSecs: 600,
  });
});

describe("OrderCard", () => {
  it("renders table number and order number", () => {
    const props = makeProps();
    renderWithProviders(<OrderCard {...props} />);
    expect(screen.getByText("3")).toBeInTheDocument(); // tableNumber in display
    expect(screen.getByText(/#PED-0041/)).toBeInTheDocument();
  });

  it("renders all order items by name", () => {
    const props = makeProps();
    renderWithProviders(<OrderCard {...props} />);
    expect(screen.getByText("Latte de Avellana")).toBeInTheDocument();
    expect(screen.getByText("Croissant Praliné")).toBeInTheDocument();
  });

  it("shows quantity for each item", () => {
    const props = makeProps();
    renderWithProviders(<OrderCard {...props} />);
    // item qty bubbles
    const qtyBubbles = screen.getAllByRole("generic", {}).filter(
      (el) => el.getAttribute("aria-label")?.startsWith("Cantidad:"),
    );
    expect(qtyBubbles.length).toBeGreaterThanOrEqual(2);
  });

  it("shows dietary flag chip for allergen", () => {
    const props = makeProps();
    renderWithProviders(<OrderCard {...props} />);
    expect(screen.getByText("Lactosa")).toBeInTheDocument();
    expect(screen.getByText("Gluten")).toBeInTheDocument();
  });

  it("renders 'Iniciar preparación' button for PENDING order", () => {
    const props = makeProps();
    renderWithProviders(<OrderCard {...props} />);
    expect(screen.getByRole("button", { name: /iniciar preparación/i })).toBeInTheDocument();
  });

  it("calls onStart when action button clicked on PENDING order", async () => {
    const props = makeProps();
    renderWithProviders(<OrderCard {...props} />);
    fireEvent.click(screen.getByRole("button", { name: /iniciar preparación/i }));
    expect(props.onStart).toHaveBeenCalledWith("41");
  });

  it("renders 'Listo para entregar' button for IN_PREP order", () => {
    const props = makeProps({ status: "IN_PREP" });
    renderWithProviders(<OrderCard {...props} />);
    expect(screen.getByRole("button", { name: /listo para entregar/i })).toBeInTheDocument();
  });

  it("calls onReady when action button clicked on IN_PREP order", async () => {
    const props = makeProps({ status: "IN_PREP" });
    renderWithProviders(<OrderCard {...props} />);
    fireEvent.click(screen.getByRole("button", { name: /listo para entregar/i }));
    expect(props.onReady).toHaveBeenCalledWith("41");
  });

  it("shows no action button for READY order", () => {
    const props = makeProps({ status: "READY" });
    renderWithProviders(<OrderCard {...props} />);
    expect(screen.queryByRole("button", { name: /iniciar|listo/i })).not.toBeInTheDocument();
  });

  it("renders per-item out-of-stock buttons for PENDING order", () => {
    const props = makeProps();
    renderWithProviders(<OrderCard {...props} />);
    // one PackageX button per item
    const oos = screen.getAllByRole("button", { name: /agotado/i });
    expect(oos).toHaveLength(2);
  });

  it("calls onOutOfStock with correct itemId", () => {
    const props = makeProps();
    renderWithProviders(<OrderCard {...props} />);
    const [firstBtn] = screen.getAllByRole("button", { name: /Latte de Avellana/i });
    fireEvent.click(firstBtn!);
    expect(props.onOutOfStock).toHaveBeenCalledWith("41", "101");
  });

  it("hides out-of-stock buttons for READY order", () => {
    const props = makeProps({ status: "READY" });
    renderWithProviders(<OrderCard {...props} />);
    expect(screen.queryByRole("button", { name: /agotado/i })).not.toBeInTheDocument();
  });
});
