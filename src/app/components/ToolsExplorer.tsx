'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  FaSearch, 
  FaList, 
  FaThLarge, 
  FaSortAlphaDown, 
  FaSortAlphaUp, 
  FaFolder, 
  FaChevronRight 
} from 'react-icons/fa';
import { CATEGORIES, TOOLS } from '../../data/tools';

type ViewMode = 'details' | 'icons';
type SortOrder = 'asc' | 'desc';
type SortBy = 'name' | 'status';

export const ToolsExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('details');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortBy] = useState<SortBy>('name');

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesCategory = activeCategory ? tool.category === CATEGORIES.find(c => c.id === activeCategory)?.name : true;
      const matchesStatus = statusFilter ? tool.status === statusFilter : true;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [activeCategory, statusFilter, searchQuery, sortBy, sortOrder]);

  const activeCategoryName = activeCategory ? CATEGORIES.find(c => c.id === activeCategory)?.name : 'All Tools';

  return (
    <div className="flex flex-col md:flex-row bg-white border border-[#dfe5dc] rounded-xl overflow-hidden shadow-sm h-[800px]">
      
      {/* Sidebar - Navigation Pane */}
      <div className="w-full md:w-64 bg-[#f8f9f7] border-r border-[#dfe5dc] flex flex-col h-full overflow-y-auto">
        
        {/* Filter Section */}
        <div className="p-4 border-b border-[#dfe5dc]">
          <h2 className="text-sm font-semibold text-[#5a6872] uppercase tracking-wider mb-4">Filters</h2>
          <div className="space-y-1">
            {['Live', 'Soon', 'Pro'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(statusFilter === status ? null : status)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all ${
                  statusFilter === status 
                    ? status === 'Live' ? 'bg-green-100 text-green-700 font-bold border border-green-200' :
                      status === 'Pro' ? 'bg-purple-100 text-purple-700 font-bold border border-purple-200' :
                      'bg-gray-200 text-gray-700 font-bold border border-gray-300'
                    : 'text-[#5a6872] hover:bg-[#edf0eb] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    status === 'Live' ? 'bg-green-500' :
                    status === 'Pro' ? 'bg-purple-500' :
                    'bg-gray-400'
                  }`} />
                  {status}
                </div>
                {statusFilter === status && <span className="text-[10px]">ACTIVE</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-b border-[#dfe5dc]">
          <h2 className="text-sm font-semibold text-[#5a6872] uppercase tracking-wider">Quick Access</h2>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          <button
            onClick={() => setActiveCategory(null)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
              activeCategory === null 
                ? 'bg-[#eaf7e5] text-[#2f8f14] font-medium' 
                : 'text-[#5a6872] hover:bg-[#edf0eb]'
            }`}
          >
            <FaFolder className={activeCategory === null ? 'text-[#3faf18]' : 'text-[#a3b1a0]'} />
            All Tools
          </button>
          
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#eaf7e5] text-[#2f8f14] font-medium' 
                    : 'text-[#5a6872] hover:bg-[#edf0eb]'
                }`}
              >
                <Icon className={isActive ? 'text-[#3faf18]' : 'text-[#a3b1a0]'} />
                {cat.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
        
        {/* Top Bar - Address / Search / View Options */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-[#dfe5dc] bg-white gap-4">
          <div className="flex items-center gap-2 text-sm text-[#5a6872]">
            <span className="font-medium text-[#0d161c]">Plzwork</span>
            <FaChevronRight className="w-3 h-3 text-[#a3b1a0]" />
            <span className="font-medium text-[#0d161c]">{activeCategoryName}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3b1a0]" />
              <input 
                type="text" 
                placeholder="Search tools..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-[#dfe5dc] rounded-lg focus:outline-none focus:border-[#3faf18] focus:ring-1 focus:ring-[#3faf18] transition"
              />
            </div>
            
            <div className="flex items-center border border-[#dfe5dc] rounded-lg overflow-hidden bg-[#f8f9f7]">
              <button 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="p-2 text-[#5a6872] hover:text-[#0d161c] hover:bg-[#edf0eb] transition"
                title={`Sort ${sortOrder === 'asc' ? 'Z-A' : 'A-Z'}`}
              >
                {sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
              </button>
              <div className="w-px h-5 bg-[#dfe5dc]"></div>
              <button 
                onClick={() => setViewMode('details')}
                className={`p-2 transition ${viewMode === 'details' ? 'bg-[#eaf7e5] text-[#2f8f14]' : 'text-[#5a6872] hover:bg-[#edf0eb]'}`}
                title="Details View"
              >
                <FaList />
              </button>
              <button 
                onClick={() => setViewMode('icons')}
                className={`p-2 transition ${viewMode === 'icons' ? 'bg-[#eaf7e5] text-[#2f8f14]' : 'text-[#5a6872] hover:bg-[#edf0eb]'}`}
                title="Icons View"
              >
                <FaThLarge />
              </button>
            </div>
          </div>
        </div>

        {/* Content List/Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          {filteredTools.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#5a6872]">
              <FaSearch className="w-12 h-12 mb-4 text-[#dfe5dc]" />
              <p>No tools found matching your criteria.</p>
            </div>
          ) : viewMode === 'details' ? (
            <div className="w-full">
              {/* Details View Header */}
              <div className="hidden sm:grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 border-b border-[#dfe5dc] text-xs font-semibold text-[#5a6872] uppercase tracking-wider mb-2">
                <div className="w-6"></div>
                <div>Name</div>
                <div>Category</div>
                <div className="w-20 text-center">Status</div>
              </div>
              
              {/* Details View Rows */}
              <div className="space-y-1">
                {filteredTools.map(tool => {
                  const ToolIcon = tool.icon || FaFolder;
                  const content = (
                    <div className="group flex flex-col sm:grid sm:grid-cols-[auto_1fr_1fr_auto] gap-4 items-start sm:items-center px-4 py-3 rounded-lg hover:bg-[#fbfdf9] border border-transparent hover:border-[#b9d9b0] transition cursor-pointer">
                      <div className="hidden sm:flex text-[#3faf18] w-6 justify-center">
                        <ToolIcon size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-[#17232a] flex items-center gap-2">
                          <span className="sm:hidden text-[#3faf18]"><ToolIcon size={16} /></span>
                          {tool.name}
                          {tool.isPopular && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold ml-2">POPULAR</span>}
                        </div>
                        <div className="text-xs text-[#63707a] mt-1">{tool.description}</div>
                      </div>
                      <div className="hidden sm:block text-sm text-[#63707a]">
                        {tool.subCategory ? `${tool.category} > ${tool.subCategory}` : tool.category}
                      </div>
                      <div className="w-full sm:w-20 flex justify-end sm:justify-center mt-2 sm:mt-0">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          tool.status === 'Live' ? 'bg-[#e7f8df] text-[#2f8f14]' : 
                          tool.status === 'Pro' ? 'bg-purple-100 text-purple-700' : 'bg-[#f2f3f1] text-[#69747c]'
                        }`}>
                          {tool.status}
                        </span>
                      </div>
                    </div>
                  );

                  return tool.status === 'Live' ? (
                    <Link key={tool.id} href={tool.href} className="block">{content}</Link>
                  ) : (
                    <div key={tool.id} className="block opacity-80">{content}</div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Icons View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredTools.map(tool => {
                const ToolIcon = tool.icon || FaFolder;
                const content = (
                  <div className="flex flex-col items-center justify-center p-6 bg-white border border-[#edf0eb] rounded-xl hover:border-[#b9d9b0] hover:bg-[#fbfdf9] hover:shadow-sm transition cursor-pointer text-center h-full group relative">
                    {tool.isPopular && <span className="absolute top-2 right-2 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span></span>}
                    <div className="w-16 h-16 rounded-2xl bg-[#eaf7e5] text-[#3faf18] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ToolIcon size={32} />
                    </div>
                    <h3 className="font-semibold text-[#17232a] text-sm mb-1">{tool.name}</h3>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full mt-2 ${
                          tool.status === 'Live' ? 'bg-[#e7f8df] text-[#2f8f14]' : 
                          tool.status === 'Pro' ? 'bg-purple-100 text-purple-700' : 'bg-[#f2f3f1] text-[#69747c]'
                        }`}>
                      {tool.status}
                    </span>
                  </div>
                );

                return tool.status === 'Live' ? (
                  <Link key={tool.id} href={tool.href} className="block h-full">{content}</Link>
                ) : (
                  <div key={tool.id} className="block opacity-80 h-full">{content}</div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Status Bar */}
        <div className="bg-[#f8f9f7] border-t border-[#dfe5dc] px-4 py-2 text-xs text-[#5a6872] flex justify-between">
          <span>{filteredTools.length} items</span>
          <span>{viewMode === 'details' ? 'Details' : 'Small Icons'} View</span>
        </div>
      </div>
    </div>
  );
};
