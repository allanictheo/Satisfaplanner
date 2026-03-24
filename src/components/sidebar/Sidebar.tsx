import { Search, Factory } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { SidebarItemList } from './SidebarItemList';
import { SidebarFilters } from './SidebarFilters';

export function Sidebar() {
  const { searchQuery, setSearchQuery } = useStore((s) => ({
    searchQuery: s.sidebar.searchQuery,
    setSearchQuery: s.setSearchQuery,
  }));

  return (
    <div className="w-80 min-w-80 h-full bg-sf-sidebar border-r border-sf-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sf-border">
        <div className="flex items-center gap-2 mb-3">
          <Factory className="w-6 h-6 text-sf-orange" />
          <h1 className="text-lg font-bold text-sf-orange tracking-wide">
            SATISFA<span className="text-sf-text">PLANNER</span>
          </h1>
        </div>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sf-text-muted" />
          <input
            type="text"
            placeholder="Search items, buildings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-sf-bg-card border border-sf-border rounded-lg pl-10 pr-3 py-2 text-sm text-sf-text placeholder-sf-text-muted focus:outline-none focus:border-sf-orange transition-colors"
          />
        </div>
      </div>
      {/* Filters */}
      <SidebarFilters />
      {/* Item List */}
      <SidebarItemList />
    </div>
  );
}
