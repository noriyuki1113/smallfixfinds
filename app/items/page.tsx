import { ItemCard } from "../../components/cards";

export const metadata = { title: "All Finds | Small Fix Finds" };

export default function ItemsIndex() {
  return (
    <div>
      <p style={{ color: "#666", fontSize: 14 }}>Home / Finds</p>
      <p style={{ letterSpacing: 2, fontSize: 13, color: "#666" }}>ALL FINDS</p>
      <h1>Useful little upgrades</h1>
      <p>Every find includes the reason to consider it—and the reason it might not fit.</p>
      <ItemCard />
    </div>
  );
}
