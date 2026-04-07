export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: "Trekking Tips" | "Culture" | "Solo Travel" | "Gear Guide";
    date: string;
    author: string;
    image: string;
    content: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "solo-trekking-guide-2024",
        title: "The Ultimate Guide to Solo Trekking in Nepal (2024 Edition)",
        excerpt: "Everything you need to know about the new mandatory guide policy and how to find your perfect partner.",
        category: "Solo Travel",
        date: "Feb 24, 2024",
        author: "Pasang Sherpa",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop",
        content: `
            <p>Solo trekking in Nepal has undergone a significant transformation in 2024. With the introduction of mandatory guide policies in many regions, including the popular Everest and Annapurna circuits, the landscape for independent adventurers has shifted.</p>
            
            <h3>Understanding the 2024 Policy</h3>
            <p>The Nepal Tourism Board now requires all foreign trekkers to be accompanied by a licensed guide in restricted areas and national parks. This move aims to improve trekker safety and support the local economy.</p>
            
            <blockquote>
                "Safety is our top priority. The mountains are unpredictable, and having a local expert can be the difference between a crisis and a successful journey."
            </blockquote>
            
            <h3>How to Find Your Perfect Guide</h3>
            <p>Finding a guide isn't just about hiring a professional; it's about finding a companion who understands your pace and interests. Look for certifications from the Trekking Agencies' Association of Nepal (TAAN).</p>
            
            <ul>
                <li>Verify their license and insurance.</li>
                <li>Discuss your itinerary and expectations beforehand.</li>
                <li>Ensure they have experience in the specific region you plan to visit.</li>
            </ul>
        `
    },
    {
        slug: "everest-base-camp-packing-list",
        title: "Everest Base Camp Packing List: What You Really Need",
        excerpt: "Don't overpack! Here is the definitive list of gear that helped our guides reach EBC over 50 times.",
        category: "Gear Guide",
        date: "Feb 20, 2024",
        author: "Lhakpa Tenzing",
        image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=2670&auto=format&fit=crop",
        content: `
            <p>Packing for EBC is a delicate balance between being prepared and staying light. Every kilogram counts when you're crossing 5,000 meters.</p>
            
            <h3>The Core Layering System</h3>
            <p>Forget heavy coats. Think layers. You need a base layer that wicks moisture, a mid-layer for warmth (fleece), and an outer shell to block wind and rain.</p>
            
            <h3>Essential Footwear</h3>
            <p>Your boots are your most important investment. They must be broken in well before you land in Lukla. Don't forget high-quality wool socks to prevent blisters.</p>
        `
    },
    {
        slug: "best-time-to-visit-nepal",
        title: "When to Visit Nepal: A Guide to the Trekking Seasons",
        excerpt: "From the crystal clear skies of October to the blooming rhododendrons of April, find your perfect window.",
        category: "Trekking Tips",
        date: "Feb 15, 2024",
        author: "Suman Gurung",
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop",
        content: `
            <p>Nepal's trekking seasons are defined by the monsoon. Autumn (October - November) and Spring (March - April) remain the gold standard for high-altitude adventures.</p>
            
            <h3>Autumn: The Peak Season</h3>
            <p>Post-monsoon air is incredibly clear, offering the best views of the Himalayan giants. It's the most popular time for a reason.</p>
            
            <h3>Winter & Monsoon: The Quiet Alternative</h3>
            <p>For those who hate crowds, winter offers quiet trails and lower prices, but requires expert gear for the cold. Monsoon trekking is possible in 'rain shadow' areas like Upper Mustang.</p>
        `
    }
];
