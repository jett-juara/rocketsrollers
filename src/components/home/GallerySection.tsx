export default function GallerySection() {
    const media = [
        {
            type: "video",
            tag: "Mic'd Up",
            img: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1600&auto=format&fit=crop"
        },
        {
            type: "video",
            tag: "9 Club",
            img: "https://images.unsplash.com/photo-1564982024202-77843ac64b24?q=80&w=1600&auto=format&fit=crop"
        },
        {
            type: "video",
            img: "https://images.unsplash.com/photo-1520156582985-313184ba8e15?q=80&w=1600&auto=format&fit=crop"
        }
    ];

    return (
        <section id="gallery" className="bg-white py-24 text-black">
            <div className="max-w-[1440px] mx-auto px-6 text-center">
                <h2 className="text-black font-heading font-bold text-7xl uppercase tracking-tighter mb-20">Gallery</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {media.map((item, idx) => (
                        <div key={idx} className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer">
                            <img
                                src={item.img}
                                alt={`Media ${idx + 1}`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                                    <svg className="w-6 h-6 text-white group-hover:text-black fill-current" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Branding Overlay (Bottom Left) */}
                            {item.tag && (
                                <div className="absolute bottom-4 left-4 text-left">
                                    <div className="bg-black/80 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                                        {item.tag}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <a href="#" className="inline-block border border-black rounded-full px-12 py-3 text-sm font-bold text-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                        More Photo & Videos
                    </a>
                </div>
            </div>
        </section>
    );
}
