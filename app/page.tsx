"use client";
import { useState } from "react";
import AutomationShowcase from "./_components/AutomationShowcase";
import FancyHeader from "./_components/FancyHeader";
import SearchAndTags from "./_components/SearchAndTags";
import automations from "@/data/automations";

export default function HomePage() {
  const [filteredAutomations, setFilteredAutomations] = useState(automations);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = automations.filter((auto) =>
      auto.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredAutomations(filtered);
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    const filtered = automations.filter((auto) => auto.tags.includes(tag));
    setFilteredAutomations(filtered);
  };

  const resetFilters = () => {
    setActiveTag(null);
    setSearchText("");
    setFilteredAutomations(automations);
  };

  return (
    <>
      <FancyHeader />
      <section id="automations" className="bg-black text-white">
        <SearchAndTags
          onSearch={handleSearch}
          onTagClick={handleTagClick}
          activeTag={activeTag}
          searchText={searchText}
          onResetFilters={resetFilters}
        />
        <AutomationShowcase automations={filteredAutomations} />
      </section>
    </>
  );
}
