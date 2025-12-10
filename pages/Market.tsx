import React, { useState } from 'react';
import { Search, ShoppingCart, Layout, Type, Video, Component, Hexagon, Flame, ChevronRight, Star } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

const CATEGORIES = [
  { id: 'all', name: '全部', icon: Layout },
  { id: 'template', name: '模版', icon: Component },
  { id: 'font', name: '字型', icon: Type },
  { id: 'tutorial', name: '教程', icon: Video },
  { id: 'uikit', name: 'UI Kit', icon: Layout },
  { id: 'nft', name: 'NFT', icon: Hexagon },
];

const Market: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredProducts = activeCategory === '全部' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  const bestSellers = MOCK_PRODUCTS.filter(p => p.isBestSeller).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 px-4 pt-8 pb-3 shadow-sm">
        <div className="max-w-screen-md mx-auto flex items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-900">數位市集</h1>
            <div className="flex items-center gap-3">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Search size={22} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
                    <ShoppingCart size={22} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
        </div>

        {/* Category Nav */}
        <div className="max-w-screen-md mx-auto overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
            <div className="flex gap-4">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`flex flex-col items-center gap-1.5 min-w-[64px] group transition-all`}
                    >
                        <div className={`
                            w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300
                            ${activeCategory === cat.name 
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105' 
                                : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}
                        `}>
                            <cat.icon size={24} strokeWidth={1.5} />
                        </div>
                        <span className={`text-xs font-medium ${activeCategory === cat.name ? 'text-indigo-600' : 'text-gray-500'}`}>
                            {cat.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="max-w-screen-md mx-auto px-4 py-6 space-y-8">
        
        {/* Banner Section */}
        <div className="relative w-full aspect-[2/1] sm:aspect-[3/1] rounded-2xl overflow-hidden shadow-lg group">
            <img 
                src="https://picsum.photos/seed/banner_market/800/400" 
                alt="Featured Event" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider mb-1">本月精選</span>
                <h2 className="text-white text-xl sm:text-3xl font-bold mb-2">創作者加速計畫 2024</h2>
                <p className="text-white/80 text-sm sm:text-base line-clamp-1">加入導師計畫，讓你的創作變現能力提升 200%</p>
            </div>
        </div>

        {/* Leaderboard Section */}
        {activeCategory === '全部' && (
            <section>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Flame size={20} className="text-red-500 fill-red-100" />
                        <h2 className="text-lg font-bold text-gray-900">本週熱銷榜</h2>
                    </div>
                    <button className="text-xs font-semibold text-gray-500 flex items-center hover:text-gray-900">
                        查看全部 <ChevronRight size={14} />
                    </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                    {bestSellers.map((item, index) => (
                        <div key={item.id} className="relative group cursor-pointer">
                            <div className="absolute top-0 left-0 w-6 h-6 bg-yellow-400 text-yellow-900 font-bold text-xs flex items-center justify-center rounded-br-lg rounded-tl-lg z-10 shadow-sm">
                                {index + 1}
                            </div>
                            <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 mb-2">
                                <img 
                                    src={item.coverUrl} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                            <p className="text-xs text-indigo-600 font-bold mt-0.5">NT$ {item.price}</p>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* Product Grid */}
        <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
                {activeCategory === '全部' ? '猜你喜歡' : `${activeCategory} 推薦`}
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                        {/* Cover Image */}
                        <div className="aspect-square bg-gray-200 relative overflow-hidden">
                            <img 
                                src={product.coverUrl} 
                                alt={product.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                             {/* Rating Badge */}
                             <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                {product.rating}
                             </div>
                        </div>
                        
                        {/* Info */}
                        <div className="p-3">
                            <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-2 h-9">
                                {product.title}
                            </h3>
                            
                            <div className="flex items-center gap-1.5 mb-2">
                                <img src={product.author.avatar} alt="Author" className="w-4 h-4 rounded-full" />
                                <span className="text-[10px] text-gray-500 truncate">{product.author.name}</span>
                            </div>

                            <div className="flex items-end justify-between">
                                <div className="flex flex-col">
                                    {product.originalPrice && (
                                        <span className="text-[10px] text-gray-400 line-through">NT$ {product.originalPrice}</span>
                                    )}
                                    <span className="text-sm font-bold text-indigo-600">NT$ {product.price}</span>
                                </div>
                                <span className="text-[10px] text-gray-400">{product.sales > 1000 ? '1k+' : product.sales} 人購買</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
};

export default Market;