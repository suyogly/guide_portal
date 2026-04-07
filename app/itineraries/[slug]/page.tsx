import { MoveLeft, Mountain, Users, Clock, Star } from "lucide-react";
import Link from "next/link";
import ItineraryView from "@/components/ItineraryView";
import TrustStrip from "@/components/TrustStrip";
import FinalCtaStrip from "@/components/FinalCtaStrip";

// Mock Data for specific itineraries
const ITINERARIES: Record<string, any> = {
    "ebc-trek": {
        region: "Everest",
        regionSlug: "everest-region",
        duration: "14 Days",
        maxAltitude: "5,545m",
        difficulty: "Difficult",
        rating: 4.9,
        reviews: 128,
        description: "The Everest Base Camp Trek is the quintessential Himalayan adventure, taking you through the heart of the Khumbu region to the doorstep of the world's highest peak. This 14-day journey offers more than just stunning mountain views; it's a deep dive into Sherpa culture, ancient monasteries, and the sheer resilience of life at high altitudes. While the challenge is significant, our safety-first approach with experienced guides and 24/7 support ensures a secure and memorable expedition for every trekker.",
        faqs: [
            { question: "Do I need a guide by law for EBC?", answer: "Yes, since April 2023, the Nepal Tourism Board mandates that all foreign trekkers must hire a licensed guide or porter-guide for the Everest Base Camp trek and other restricted routes." },
            { question: "Independent guide vs trekking agency — what's the difference?", answer: "An independent guide is directly hired by you through our platform. You pay them their daily rate directly without any agency markup or hidden package margins. Agencies charge a premium to manage your entire trip." },
            { question: "How much does an independent guide cost per day?", answer: "A certified guide typically costs between $25 and $35 per day. This cost can be shared among your group (up to 4 people per guide is standard)." },
            { question: "Can my guide arrange teahouse bookings?", answer: "Absolutely. During peak seasons (October/November), popular teahouses fill up fast. Your guide will call ahead on the trail to reserve the best rooms for you." },
            { question: "What if I need to evacuate — what is my guide's role?", answer: "If you suffer from severe AMS or injury, your guide will coordinate directly with Kathmandu helicopter services for rapid evacuation. They'll also handle communication with your insurance and family." }
        ],
        days: [
            { day: 1, title: "Flight to Lukla", description: "Fly from Kathmandu to Lukla (2,860m). Begin trek to Phakding. The flight offers a stunning first glimpse of the Himalayas.", distance: "8km", elevationGain: "-200m", time: "3-4 hrs", altitude: 2860 },
            { day: 2, title: "Trek to Namche Bazaar", description: "Follow the Dudh Koshi river. Steep ascent to Namche Bazaar, the Sherpa capital.", distance: "11km", elevationGain: "+830m", time: "5-6 hrs", altitude: 3440 },
            { day: 3, title: "Acclimatization Day", description: "Stay in Namche for acclimatization. Hike to Everest View Hotel for the first view of Mt. Everest.", distance: "4km", elevationGain: "+440m", time: "3 hrs", altitude: 3440, isRestDay: true, guideTip: "Drink at least 3-4 liters of water today. Climb high, sleep low." },
            { day: 4, title: "Trek to Tengboche", description: "Walk through rhododendron forests to the famous Tengboche Monastery.", distance: "10km", elevationGain: "+420m", time: "5-6 hrs", altitude: 3860, flexNote: "If the lodges in Tengboche are full, your guide might suggest staying in Deboche, 20 mins further down, which is often warmer." },
            { day: 5, title: "Trek to Dingboche", description: "Enter the Imja Valley. The landscapes become more rugged and alpine.", distance: "11km", elevationGain: "+550m", time: "5-6 hrs", altitude: 4410 },
            { day: 6, title: "Acclimatization Day", description: "A second acclimatization day in Dingboche. Hike to Nangkartshang Peak for stunning views.", distance: "4km", elevationGain: "+600m", time: "4 hrs", altitude: 4410, isRestDay: true, guideTip: "A slow hike to Nangkartshang Peak will vastly improve your sleep tonight." },
            { day: 7, title: "Trek to Lobuche", description: "Walk past the memorial for fallen climbers. Views of Khumbu Glacier.", distance: "11km", elevationGain: "+500m", time: "5-6 hrs", altitude: 4910 },
            { day: 8, title: "Gorak Shep & EBC", description: "Trek to Gorak Shep, then continue to Everest Base Camp. Return to Gorak Shep for the night.", distance: "13km", elevationGain: "+450m", time: "7-8 hrs", altitude: 5364 },
            { day: 9, title: "Kala Patthar & Pheriche", description: "Early morning hike to Kala Patthar for sunrise over Everest. Descend to Pheriche.", distance: "15km", elevationGain: "+180m", time: "7-8 hrs", altitude: 5545 },
            { day: 10, title: "Trek to Namche Bazaar", description: "A long day of descending back through the valley to Namche.", distance: "20km", elevationGain: "-1200m", time: "6-7 hrs", altitude: 3440 },
            { day: 11, title: "Trek to Lukla", description: "Final trek back to Lukla where the adventure began.", distance: "19km", elevationGain: "-600m", time: "7-8 hrs", altitude: 2860 },
            { day: 12, title: "Fly to Kathmandu", description: "Short flight back to the capital. Afternoon at leisure.", distance: "0km", elevationGain: "0m", time: "35 min", altitude: 1400 },
        ]
    },
    "gokyo-lakes": {
        region: "Everest",
        regionSlug: "everest-region",
        duration: "11 Days",
        maxAltitude: "5,483m",
        difficulty: "Difficult",
        rating: 4.8,
        reviews: 95,
        description: "The Gokyo Lakes Trek is a stunning alternative to the classic Everest Base Camp route, offering breathtaking views of the world's highest peaks from the summit of Gokyo Ri. This 11-day journey wanders through the quiet Dudh Koshi valley to the turquoise glacial lakes of Gokyo, tucked beside the massive Ngozumpa Glacier. Highlights include crossing the high Renjo La Pass and experiencing the authentic Sherpa culture in remote villages, all while being supported by our dedicated safety protocols and expert local guides.",
        mapImage: "/Users/sarojsapkota/.gemini/antigravity/brain/6c9edd68-5573-4e14-b028-5e1e3b752c03/gokyo_lakes_map_graphic_1773380552872.png",
        faqs: [
            { question: "Gokyo Lakes vs EBC: Which is better?", answer: "Gokyo is often considered more scenic and less crowded. While EBC is more famous, many prefer Gokyo for the turquoise lakes and the superior panorama from Gokyo Ri." },
            { question: "How difficult is the Renjo La Pass?", answer: "It is one of the trek's highlights but challenging. The ascent is steep and requires good stamina. However, the views of Everest and the lakes from the top make it entirely worth the effort." },
            { question: "Are the lakes swimmable?", answer: "No. The Gokyo Lakes are sacred and extremely cold glacial lakes. Swimming is strictly prohibited to respect local culture and for your own safety." },
            { question: "What is the highest point of the trek?", answer: "The highest point is Gokyo Ri at 5,483m, providing an unparalleled 360-degree view of four 8,000m peaks: Everest, Lhotse, Makalu, and Cho Oyu." }
        ],
        days: [
            { day: 1, title: "Fly to Lukla and Trek to Phakding", description: "Begin your adventure with an early morning scenic mountain flight from Kathmandu or Ramechhap to Lukla (2,843 m), the gateway to the Everest region. Upon arrival, meet your trekking guide and porter team before starting your trek. The trail descends gradually through pine forests and charming Sherpa villages such as Chheplung and Ghat, following the beautiful Dudh Koshi River. After an easy walk of about 3–4 hours, reach the peaceful riverside village of Phakding.", distance: "8km", elevationGain: "-200m", time: "3-4 hrs", altitude: 2640 },
            { day: 2, title: "Trek to Namche Bazaar", description: "Today's trek follows the Dudh Koshi River upstream, crossing several suspension bridges including the famous Hillary Bridge. Passing through Monjo, you will enter Sagarmatha National Park, where trekking permits are checked. After Jorsalle, the trail becomes steeper as it climbs through forested switchbacks to Namche Bazaar — the vibrant Sherpa trading town of the Khumbu region, offering the first glimpses of Everest.", distance: "11km", elevationGain: "+830m", time: "6-7 hrs", altitude: 3440 },
            { day: 3, title: "Acclimatization Day in Namche Bazaar", description: "To help your body adjust to the altitude, today is reserved for acclimatization. A popular hike leads to Everest View Hotel (3,880 m), one of the best viewpoints in the region. From here, enjoy breathtaking views of Everest, Lhotse, Ama Dablam, and Thamserku. On the way back, you may visit Khumjung village, the Hillary School, or explore the Sherpa Museum to learn more about local culture and mountaineering history.", distance: "4km", elevationGain: "+440m", time: "3 hrs", altitude: 3440, isRestDay: true, guideTip: "A slow pace today up to the Everest View Hotel is crucial for your body to adapt. Drink at least 3 liters of water." },
            { day: 4, title: "Trek to Dole", description: "Leaving Namche, follow the higher trail via Mong La and Phortse Tenga. This route offers magnificent views of Ama Dablam and surrounding Himalayan peaks. After descending to the Dudh Koshi River, the trail climbs steadily through rhododendron and birch forests until reaching the quiet village of Dole.", distance: "12km", elevationGain: "+760m", time: "5-6 hrs", altitude: 4200 },
            { day: 5, title: "Trek to Machhermo", description: "Continue your ascent through alpine landscapes, yak pastures, and small seasonal settlements. Along the trail, enjoy impressive views of Cho Oyu and surrounding peaks. Passing villages such as Luza and Lhabarma, you will eventually arrive at the beautiful settlement of Machhermo.", distance: "7km", elevationGain: "+270m", time: "4-5 hrs", altitude: 4470, flexNote: "If anyone is feeling the altitude, staying an extra night in Dole or Machhermo is easily arranged with your guide." },
            { day: 6, title: "Trek to Gokyo", description: "Today’s trek leads you toward the spectacular Gokyo Valley. Walking alongside the massive Ngozumpa Glacier, you will pass the first and second Gokyo Lakes before reaching the brilliant turquoise waters of the third lake, beside which lies the village of Gokyo.", distance: "7km", elevationGain: "+280m", time: "4-5 hrs", altitude: 4750 },
            { day: 7, title: "Climb Gokyo Ri and Visit the Fifth Lakes", description: "Start early in the morning to hike up Gokyo Ri, one of the finest viewpoints in the Everest region. From the summit, enjoy panoramic views of Everest, Lhotse, Makalu, Cho Oyu, and the vast Ngozumpa Glacier. Later in the afternoon, take a scenic walk toward the remote Fifth Gokyo Lakes for extended views of the surrounding Himalayan giants.", distance: "8km", elevationGain: "+733m", time: "6-7 hrs", altitude: 5483, isRestDay: true, guideTip: "Start the Gokyo Ri hike by 4 AM to catch the sunrise over Everest. It's steep, but the panoramic views are arguably better than Kala Patthar." },
            { day: 8, title: "Trek to Lungden via Renjo La Pass", description: "Today is one of the most challenging and rewarding days of the trek. Begin early to ascend the steep stone trail leading to Renjo La Pass. From the top, enjoy breathtaking views of Everest, the Gokyo Lakes, and the Rolwaling mountain range. After spending time at the pass, descend carefully into the Bhote Koshi Valley to reach the quiet village of Lungden (4,380 m).", distance: "11km", elevationGain: "-1100m", time: "7-8 hrs", altitude: 4380 },
            { day: 9, title: "Trek to Namche Bazaar", description: "Descend through traditional Sherpa villages such as Marlung and Thame, where Tibetan Buddhist culture remains strong. Following the Bhote Koshi River, the trail gradually returns to the bustling town of Namche Bazaar.", distance: "18km", elevationGain: "-940m", time: "6-7 hrs", altitude: 3440 },
            { day: 10, title: "Trek to Lukla", description: "Your final trekking day retraces the trail down the Dudh Koshi Valley. Passing through villages such as Monjo, Benkar, and Phakding, enjoy the last moments of trekking in the Everest region. From Phakding, it is a final gentle ascent to Lukla. In the evening, celebrate the completion of your trek with your guide and porter team.", distance: "19km", elevationGain: "-600m", time: "6-7 hrs", altitude: 2843 },
            { day: 11, title: "Fly Back to Kathmandu or Ramechhap", description: "Take an early morning flight from Lukla back to Kathmandu or Ramechhap, depending on flight schedules and weather conditions. Upon arrival, transfer to your hotel and enjoy the rest of the day at leisure.", distance: "0km", elevationGain: "0m", time: "35 min", altitude: 1400 },
        ]
    },
    "annapurna-circuit": {
        region: "Annapurna",
        regionSlug: "annapurna-region",
        duration: "14 Days",
        maxAltitude: "5,416m",
        difficulty: "Strenuous",
        rating: 4.8,
        reviews: 214,
        description: "The Annapurna Circuit is one of the world's most spectacular trekking routes, offering an unparalleled diversity of landscapes and cultures. This 14-day journey takes you from the lush, subtropical farming villages of the Marsyangdi River valley up into the dry, high-altitude Tibetan-like plateau of Manang. The ultimate challenge is crossing the formidable Thorong La Pass at 5,416 meters, right beneath the towering peaks of Annapurna and Gangapurna. The route finishes with a descent into the dramatic Kali Gandaki Gorge—the deepest gorge in the world—and a rejuvenating soak in the hot springs at Tatopani.",
        faqs: [
            { question: "Has the new road ruined the Annapurna Circuit?", answer: "While a jeep road has been constructed along parts of the traditional route, our itinerary utilizes the 'NATT' (New Annapurna Trekking Trail) system. These alternative trails avoid the road as much as possible, keeping you immersed in nature and traditional villages." },
            { question: "How difficult is Thorong La Pass?", answer: "At 5,416m (17,769 ft), crossing Thorong La is a serious physical challenge due to the high altitude and thin air. You'll need an early start (often 3 or 4 AM) and excellent stamina, but there is no technical climbing required." },
            { question: "What is the best time to do this trek?", answer: "The optimum times are Autumn (September to November) for crystal clear skies, and Spring (March to May) for blooming rhododendrons. Unlike Everest, the upper parts of the Annapurna Circuit lie in a rain shadow, making it possible to trek in late Spring." },
            { question: "Is altitude sickness a big risk?", answer: "Like any high-altitude trek, AMS is a risk. Our 14-day itinerary includes a vital acclimatization day in Manang to help your body adapt before ascending higher towards the pass." }
        ],
        days: [
            { day: 1, title: "Drive from Kathmandu to Jagat", description: "Leave the bustling capital for a long, scenic drive along the Trishuli River to Besisahar, then hop into a local jeep to reach Jagat. The terraced farmlands and lush scenery mark the beginning of your mountain journey.", distance: "205km", elevationGain: "0m", time: "8-9 hrs", altitude: 1300 },
            { day: 2, title: "Trek to Dharapani", description: "Your first day of walking begins. The trail climbs through subtropical forests alongside the raging Marsyangdi River. You'll pass through several Gurung and Tamang villages before arriving at Dharapani, where the Annapurna and Manaslu circuits merge.", distance: "15km", elevationGain: "+560m", time: "6 hrs", altitude: 1860 },
            { day: 3, title: "Trek to Chame", description: "As you continue up the valley, the vegetation transforms into dense pine and oak forests. The trail opens up dramatically, offering your first clear views of Lamjung Himal and Annapurna II as you approach Chame, the administrative headquarters of the Manang district.", distance: "15km", elevationGain: "+810m", time: "6 hrs", altitude: 2670 },
            { day: 4, title: "Trek to Pisang", description: "Today the trail crosses the river and enters the drier U-shaped valley of Manang. You'll traverse through apple orchards and dense forests before arriving at the fascinating village of Pisang, where the impressive peak of Pisang Peak looms overhead.", distance: "14km", elevationGain: "+530m", time: "5 hrs", altitude: 3200 },
            { day: 5, title: "Trek to Manang (via Upper Route)", description: "For the best views and extra acclimatization, take the high route via Ghyaru and Ngawal. This challenging detour offers spectacular panoramic vistas of Annapurna II, III, IV, Gangapurna, and Tilicho Peak before a gentle descent into the large, arid town of Manang.", distance: "17km", elevationGain: "+340m", time: "7 hrs", altitude: 3540, guideTip: "Taking the upper route is harder but vastly superior for acclimatization and views. Your guide will assess your fitness the night before." },
            { day: 6, title: "Acclimatization Day in Manang", description: "A vital day to allow your body to adjust to the thinner air. Instead of resting entirely, join your guide for a short hike up to the Chongakor viewpoint or the Praken Gompa to sleep lower and climb higher. Enjoy a movie or organic coffee at one of the local bakeries in the afternoon.", distance: "4km", elevationGain: "+400m", time: "3 hrs", altitude: 3540, isRestDay: true },
            { day: 7, title: "Trek to Yak Kharka", description: "Leaving Manang, the trail climbs steadily toward the Thorong La pass. The landscape becomes stark, alpine, and dry—resembling the Tibetan plateau. Keep an eye out for blue sheep grazing on the steep rocky slopes.", distance: "10km", elevationGain: "+470m", time: "4 hrs", altitude: 4010 },
            { day: 8, title: "Trek to Thorong Phedi", description: "A relatively short but demanding day due to the altitude. The trail winds along the scree slopes to Thorong Phedi, nestled in a steep, rocky bowl. This is your final staging point; get plenty of rest for tomorrow's early start.", distance: "7km", elevationGain: "+440m", time: "3-4 hrs", altitude: 4450 },
            { day: 9, title: "Cross Thorong La Pass (5,416m) to Muktinath", description: "Start before dawn with headlamps under the stars. The ascent is long, freezing, and breathless, but standing atop the prayer flag-draped Thorong La at sunrise is unforgettable. Afterward, embark on a brutal but beautiful 1,600m descent into the sacred pilgrimage town of Muktinath.", distance: "16km", elevationGain: "+960m", time: "9-10 hrs", altitude: 3800 },
            { day: 10, title: "Drive from Muktinath to Tatopani", description: "Trade your hiking boots for wheels today. Take a local jeep down the deepest gorge in the world, the Kali Gandaki Valley. Pass through Jomsom, Marpha (famous for its apple brandy), and drop significantly in elevation to the warm, relaxing natural hot springs of Tatopani.", distance: "75km", elevationGain: "-2600m", time: "6 hrs", altitude: 1200 },
            { day: 11, title: "Trek to Ghorepani", description: "After resting your legs in the hot springs, begin the final major climb of the trek. The trail ascends steeply through dense, ancient rhododendron forests, climbing over 1,600m to reach the popular ridge-top village of Ghorepani.", distance: "17km", elevationGain: "+1660m", time: "7-8 hrs", altitude: 2860 },
            { day: 12, title: "Poon Hill Sunrise, Trek to Nayapul & Drive to Pokhara", description: "Wake up at 4 AM to hike up Poon Hill (3,210m) for one of the most famous sunrise views in the Himalayas. Descend back for breakfast, then begin a long downhill march past Ulleri all the way to Nayapul. A private transfer will take you back to Pokhara.", distance: "18km", elevationGain: "-1800m", time: "7 hrs", altitude: 1400 },
            { day: 13, title: "Fly back to Kathmandu", description: "Take a beautiful 25-minute scenic flight from Pokhara back to Kathmandu, enjoying views of the Manaslu and Annapurna ranges from the air. Spend the afternoon exploring Thamel or visiting heritage sites like Boudhanath.", distance: "0km", elevationGain: "0m", time: "25 min", altitude: 1400 },
            { day: 14, title: "Final Departure", description: "Your Himalayan circuit concludes. Depending on your flight time, do some last-minute souvenir shopping before transferring to the airport for your journey home.", distance: "0km", elevationGain: "0m", time: "-", altitude: 1400 }
        ]
    },
    "abc-trek": {
        region: "Annapurna",
        regionSlug: "annapurna-region",
        duration: "10 Days",
        maxAltitude: "4,130m",
        difficulty: "Moderate",
        rating: 4.8,
        reviews: 156,
        description: "The Annapurna Base Camp (ABC) Trek is a journey into the heart of the Annapurna massif. This 10-day expedition takes you through lush rhododendron forests, charming Gurung villages, and eventually into the 'Annapurna Sanctuary'—a high-altitude glacial basin surrounded by a ring of eleven giant peaks. From the base camp, you'll have a 360-degree view of Annapurna I, Annapurna South, Machhapuchhre, and Hiunchuli. The trek also includes a visit to the famous Poon Hill for sunrise and a relaxing soak in the natural hot springs of Jhinu Danda.",
        faqs: [
            { question: "How difficult is the ABC trek compared to EBC?", answer: "ABC is shorter and reaches a lower maximum altitude (4,130m vs 5,545m), making it slightly easier in terms of altitude. However, it involves many steep stone steps, which can be taxing on the knees." },
            { question: "What permits do I need for the Annapurna Sanctuary?", answer: "You need the ACAP (Annapurna Conservation Area Permit) and the TIMS (Trekkers' Information Management System) card. These are mandatory for all trekkers." },
            { question: "Are there hot springs on the route?", answer: "Yes! On the way back from the base camp, you'll stop at Jhinu Danda, which is famous for its natural riverside hot springs—perfect for soothing tired muscles." }
        ],
        days: [
            { day: 1, title: "Arrival in Kathmandu", description: "Arrive at Tribhuvan International Airport and transfer to your hotel. Briefing with your guide about the upcoming trek and equipment check.", distance: "0km", elevationGain: "0m", time: "-", altitude: 1400 },
            { day: 2, title: "Drive to Pokhara & Drive to Ulleri", description: "A scenic morning drive to Pokhara, followed by a private jeep ride to Ulleri. The adventure begins among the terraced fields of the lower Annapurnas.", distance: "210km", elevationGain: "+650m", time: "8-9 hrs", altitude: 2050 },
            { day: 3, title: "Trek to Ghorepani", description: "Trek through ancient rhododendron and oak forests. As you climb, the air becomes crisper and the views of the Dhaulagiri range begin to open up.", distance: "11km", elevationGain: "+810m", time: "5-6 hrs", altitude: 2860 },
            { day: 4, title: "Poon Hill Sunrise & Trek to Tadapani", description: "Pre-dawn hike to Poon Hill (3,210m) for a spectacular sunrise over the Dhaulagiri and Annapurna ranges. After breakfast, trek to Tadapani through deep forests.", distance: "12km", elevationGain: "+350m", time: "6-7 hrs", altitude: 2630, guideTip: "Wear layers! It's freezing at Poon Hill before sunrise, but you'll warm up quickly on the walk down." },
            { day: 5, title: "Trek to Chhomrong", description: "Descend to the Kimrong Khola and سپس climb steeply to Chhomrong, the largest Gurung village in the sanctuary and a gateway to the high peaks.", distance: "10km", elevationGain: "-460m", time: "5-6 hrs", altitude: 2170 },
            { day: 6, title: "Trek to Dovan", description: "Descend the stone steps of Chhomrong and climb through bamboo and rhododendron forests towards the narrow gorge of the Modi Khola.", distance: "11km", elevationGain: "+430m", time: "6 hrs", altitude: 2600 },
            { day: 7, title: "Trek to Machhapuchhre Base Camp (MBC)", description: "The trail climbs steadily through the gorge. As you approach MBC, the vegetation thins and the iconic Fishtail mountain towers directly above you.", distance: "10km", elevationGain: "+1100m", time: "6-7 hrs", altitude: 3700 },
            { day: 8, title: "Annapurna Base Camp & descend to Bamboo", description: "A gentle climb into the Sanctuary to reach ABC (4,130m). Enjoy 360-degree views of the massive peaks before beginning your descent to Bamboo.", distance: "15km", elevationGain: "+430m", time: "7-8 hrs", altitude: 4130, guideTip: "Spend at least an hour at ABC just soaking in the silence. It's a spiritual experience." },
            { day: 9, title: "Trek to Jhinu Danda (Hot Springs)", description: "Retrace your steps back through the forests to Jhinu Danda. In the afternoon, descend to the riverside for a soak in the natural hot springs.", distance: "12km", elevationGain: "-530m", time: "5-6 hrs", altitude: 1780 },
            { day: 10, title: "Trek to Siwai & Drive to Pokhara", description: "A final short trek to the road head at Siwai, followed by a scenic drive back to the lakeside city of Pokhara to celebrate your journey.", distance: "8km", elevationGain: "-380m", time: "4-5 hrs", altitude: 900 }
        ]
    },
    "mardi-himal": {
        region: "Annapurna",
        regionSlug: "annapurna-region",
        duration: "7 Days",
        maxAltitude: "4,500m",
        difficulty: "Moderate",
        rating: 4.9,
        reviews: 84,
        description: "The Mardi Himal Trek is a recently opened 'hidden gem' of the Annapurna region. This 7-day trek follows a high ridge line, offering constant and breathtakingly close-up views of the iconic Machhapuchhre (Fishtail) and the Annapurna range. Unlike the more established trails, Mardi Himal offers a quieter, more intimate experience with nature, as you walk through ancient forests and emerge onto high alpine pastures. The final push to the base camp at 4,500m provides an unparalleled perspective of the Himalayan giants.",
        faqs: [
            { question: "Is the Mardi Himal trek suitable for beginners?", answer: "Yes, it is one of the more accessible treks in Nepal. While there are some steep sections near the High Camp and Base Camp, the overall duration and altitude make it a great choice for first-time trekkers." },
            { question: "How are the tea houses on this route?", answer: "As a newer route, the tea houses are slightly more basic than the main ABC or EBC trails, but they are comfortable, clean, and provide excellent local meals." },
            { question: "Can I see Mount Everest from Mardi Himal?", answer: "No, Mardi Himal is in the Annapurna region, west of Everest. However, the views of Annapurna South, Hiunchuli, and Machhapuchhre are arguably some of the best in Nepal." }
        ],
        days: [
            { day: 1, title: "Drive from Pokhara to Kande, Trek to Deurali", description: "A short drive to Kande followed by a hike up through Australian Camp and Pothana. You'll settle in Deurali, perched on a ridge with views of both Annapurna and Dhaulagiri.", distance: "7km", elevationGain: "+400m", time: "4-5 hrs", altitude: 2100 },
            { day: 2, title: "Trek to Forest Camp", description: "Enter deep, enchanted forests of rhododendron, oak, and birch. This is a quiet day of walking through the 'jungle' path where you might spot local wildlife.", distance: "9km", elevationGain: "+500m", time: "5-6 hrs", altitude: 2600 },
            { day: 3, title: "Trek to Low Camp", description: "The trail climbs steadily. As the trees become shorter, the views of Machhapuchhre (Fishtail) become more revealing and dramatic.", distance: "6km", elevationGain: "+370m", time: "4 hrs", altitude: 2970 },
            { day: 4, title: "Trek to High Camp", description: "Emerge from the forest onto a grassy ridge. This spectacular walk offers an unbroken panorama of the Annapurna South, Hiunchuli, and the deep valleys below.", distance: "5km", elevationGain: "+610m", time: "4-5 hrs", altitude: 3580 },
            { day: 5, title: "Mardi Himal Base Camp & Return to High Camp", description: "An early start for the rugged hike along the ridge to the Base Camp. At 4,500m, you are standing directly beneath the south face of Mardi Himal and Machhapuchhre.", distance: "10km", elevationGain: "+920m", time: "7-8 hrs", altitude: 4500, guideTip: "The trail to the upper viewpoint is narrow and rocky. Watch your step and use trekking poles for better balance." },
            { day: 6, title: "Trek to Siding Village", description: "A steep and long descent through the forest, taking a different route down to the traditional Gurung settlement of Siding.", distance: "12km", elevationGain: "-1800m", time: "6-7 hrs", altitude: 1750 },
            { day: 7, title: "Trek to Lumre and Drive to Pokhara", description: "A final easy walk through the fields to Lumre, where a vehicle awaits to take you back to the comforts of Pokhara.", distance: "5km", elevationGain: "-350m", time: "3 hrs", altitude: 900 }
        ]
    },
    "poon-hill": {
        region: "Annapurna",
        regionSlug: "annapurna-region",
        duration: "5 Days",
        maxAltitude: "3,210m",
        difficulty: "Easy/Moderate",
        rating: 4.7,
        reviews: 320,
        description: "The Ghorepani Poon Hill Trek is perhaps the most famous short trek in Nepal. Over 5 days, you'll wander through the largest rhododendron forests in the world and climb the legendary stone stairs to the mountain village of Ghorepani. The highlight is a pre-dawn hike to the summit of Poon Hill (3,210m) to witness one of the most spectacular sunrises on Earth, with the Dhaulagiri and Annapurna ranges glowing in the morning light. It's the perfect introduction to Himalayan trekking, manageable for families and those with limited time.",
        faqs: [
            { question: "Is Poon Hill too easy for experienced trekkers?", answer: "While not a high-altitude expedition, the beauty of the Ghorepani region and the scale of the sunrise views from Poon Hill make it worthwhile even for seasoned hikers. It's often used as a warm-up for longer treks." },
            { question: "When do the rhododendrons bloom?", answer: "The best time to see the forests in full bloom is during the Spring (March and April). The hillsides turn vibrant shades of red, pink, and white." },
            { question: "How many stairs are there really?", answer: "The climb from Tikhedhunga to Ulleri famously involves over 3,000 stone steps. It's a challenge, but your guide will ensure you take a steady pace." }
        ],
        days: [
            { day: 1, title: "Drive from Pokhara to Nayapul and Trek to Tikhedhunga", description: "A 2-hour drive to Nayapul followed by a gentle walk along the Modi Khola river. You'll pass through several small settlements and lush farmland before reaching Tikhedhunga.", distance: "9km", elevationGain: "+450m", time: "4-5 hrs", altitude: 1540 },
            { day: 2, title: "Trek to Ghorepani", description: "Start the day with the legendary climb up the 3,000 stone steps to Ulleri. From there, the trail winds through magnificent rhododendron forests to the bustling village of Ghorepani.", distance: "12km", elevationGain: "+130m", time: "6-7 hrs", altitude: 2860, guideTip: "Don't count the steps! Just keep a slow, 'bistari' (slowly) pace and enjoy the shade of the forest." },
            { day: 3, title: "Poon Hill Sunrise and Trek to Tadapani", description: "Wake up early for the 45-minute hike to the summit of Poon Hill (3,210m). After witnessing the spectacular sunrise over Dhaulagiri and Annapurna, return for breakfast and trek onwards to Tadapani.", distance: "11km", elevationGain: "+350m", time: "6-7 hrs", altitude: 2630 },
            { day: 4, title: "Trek to Ghandruk", description: "A delightful descent through dense, mossy forests. You'll arrive in Ghandruk, a large and beautiful Gurung village with some of the best close-up views of Annapurna South and Machhapuchhre.", distance: "6km", elevationGain: "-690m", time: "3-4 hrs", altitude: 1940 },
            { day: 5, title: "Trek to Nayapul and Drive to Pokhara", description: "A final downhill walk through terraced fields and small villages to Nayapul, where your vehicle waits to whisk you back to the lakeside city of Pokhara.", distance: "9km", elevationGain: "-890m", time: "4 hrs", altitude: 900 }
        ]
    },
    "manaslu-circuit": {
        region: "Manaslu",
        regionSlug: "manaslu-region",
        duration: "14 Days",
        maxAltitude: "5,106m",
        difficulty: "Difficult",
        rating: 4.9,
        reviews: 64,
        description: "The Manaslu Circuit Trek is a stunning 14-day journey around the world's eighth-highest peak, Mt. Manaslu (8,163m). Often described as the 'New Annapurna Circuit,' it offers a more pristine and culturally authentic experience compared to its more famous neighbors. The trek takes you from the lush sub-tropical forests of the Budhi Gandaki river valley through remote Tibetan-influenced villages like Samagaon and Samdo, culminating in the dramatic crossing of the high Larke La Pass (5,106m). Due to its restricted status, you'll experience a raw, untouched side of the Himalayas with minimal crowds and deep cultural immersion.",
        faqs: [
            { question: "Is a guide mandatory for the Manaslu Circuit?", answer: "Yes. By Nepal government law, the Manaslu region is a Restricted Area. All trekkers must have at least two people in their group and be accompanied by a licensed Nepali guide." },
            { question: "What permits do I need for Manaslu?", answer: "You need three main permits: the Restricted Area Permit (RAP), the Manaslu Conservation Area Project (MCAP) permit, and the Annapurna Conservation Area Project (ACAP) permit, as the trail ends in the Annapurna region." },
            { question: "How difficult is the Larke La Pass?", answer: "At 5,106m, Larke La is a serious high-altitude challenge. While it doesn't require technical climbing, the long day and thin air make it strenuous. Proper acclimatization in Samagaon is essential." },
            { question: "Can I do this trek solo?", answer: "Strictly speaking, no. You must be at least two trekkers plus a guide. However, if you are a solo traveler, we can help you find a partner or arrange the 'ghost' permit required by the authorities." }
        ],
        days: [
            { day: 1, title: "Drive Kathmandu to Machha Khola", description: "A long but scenic drive through the Nepalese countryside, following the Budhi Gandaki River upstream to the start of the trail.", distance: "160km", elevationGain: "0m", time: "8-9 hrs", altitude: 900 },
            { day: 2, title: "Trek to Jagat", description: "Walk through lush landscapes and across the first of many suspension bridges. Enter the restricted area at the beautiful stone-paved village of Jagat.", distance: "13km", elevationGain: "+400m", time: "6 hrs", altitude: 1340 },
            { day: 3, title: "Trek to Deng", description: "The trail climbs through deep gorges and narrow valleys. Cross the Budhi Gandaki several times as the culture starts shifting from Hindu to Buddhist.", distance: "15km", elevationGain: "+500m", time: "7 hrs", altitude: 1860 },
            { day: 4, title: "Trek to Namrung", description: "A steady climb into the upper Budhi Gandaki valley. You'll pass through bamboo forests and catch your first glimpses of Sringi Himal.", distance: "14km", elevationGain: "+800m", time: "6 hrs", altitude: 2660 },
            { day: 5, title: "Trek to Lho", description: "Enter the Nubri region where Tibetan culture is vibrant. Lho offers spectacular views of Mt. Manaslu and houses the impressive Ribung Gompa.", distance: "12km", elevationGain: "+500m", time: "5 hrs", altitude: 3180, guideTip: "Visit the monastery at sunset for an incredible view of Manaslu's twin peaks." },
            { day: 6, title: "Trek to Samagaon", description: "A short trek to the largest village in the region. Pass through fields of barley and mani walls to reach the base of Mt. Manaslu.", distance: "10km", elevationGain: "+350m", time: "4 hrs", altitude: 3530 },
            { day: 7, title: "Acclimatization in Samagaon", description: "A vital day for rest. Options include a hike to Birendra Tal (glacial lake) or a longer trek toward Manaslu Base Camp.", distance: "5km", elevationGain: "+400m", time: "4 hrs", altitude: 3530, isRestDay: true },
            { day: 8, title: "Trek to Samdo", description: "Follow the Budhi Gandaki as it thins. Samdo is a remote settlement near the Tibetan border, known for its yak herding traditions.", distance: "8km", elevationGain: "+300m", time: "4 hrs", altitude: 3860 },
            { day: 9, title: "Trek to Dharamsala (Larkye Phedi)", description: "Climb past the Larkya Glacier moraine to the high altitude base camp. This is your final night before the big pass crossing.", distance: "7km", elevationGain: "+600m", time: "4-5 hrs", altitude: 4460 },
            { day: 10, title: "Cross Larkye La Pass (5,106m) to Bimthang", description: "The ultimate challenge. Cross the high pass at dawn for breathtaking panoramas, then descend steeply into the beautiful valley of Bimthang.", distance: "16km", elevationGain: "+650m", time: "9-10 hrs", altitude: 5106, guideTip: "Micro-spikes are often useful on the descent if there is lingering ice or snow." },
            { day: 11, title: "Trek to Tilije", description: "A long descent through rhododendron and pine forests. You'll pass through the village of Gho before reaching Tilije.", distance: "16km", elevationGain: "-1400m", time: "6-7 hrs", altitude: 2300 },
            { day: 12, title: "Trek to Tal", description: "Follow the Dudh Khola down to its confluence with the Marsyangdi River. Tal is a beautiful village set next to a massive waterfall.", distance: "11km", elevationGain: "-600m", time: "5 hrs", altitude: 1700 },
            { day: 13, title: "Trek to Syange", description: "Final walking day. Descend through the lower valleys to Syange where you'll catch a jeep for the final leg of the journey.", distance: "12km", elevationGain: "-600m", time: "5 hrs", altitude: 1100 },
            { day: 14, title: "Drive to Kathmandu", description: "A long drive back to the capital, tracing the Marsyangdi and Trishuli river valleys.", distance: "190km", elevationGain: "0m", time: "8-9 hrs", altitude: 1400 },
        ]
    },
    "larke-pass-trek": {
        region: "Manaslu",
        regionSlug: "manaslu-region",
        duration: "14 Days",
        maxAltitude: "5,106m",
        difficulty: "Difficult",
        rating: 4.8,
        reviews: 42,
        description: "The Larke Pass Trek is an adventurous journey centered around crossing the formidable Larke La (5,106m). While it follows the same path as the Manaslu Circuit, this itinerary specifically highlights the technical and physical preparation needed for the high-altitude pass. This trek offers a perfect blend of natural beauty—from sub-tropical forests to massive glaciers—and cultural richness, as you traverse the remote landscapes of the Nubri and Tsum valleys.",
        faqs: [
            { question: "How does the Larke Pass Trek differ from the Manaslu Circuit?", answer: "They follow the same core route. However, 'Larke Pass Trek' often refers to itineraries that prioritize the crossing of the pass itself, sometimes skipping larger detours to Tsum Valley to focus on the high-altitude challenge." },
            { question: "Is Larke La harder than Everest's Cho La?", answer: "Larke La is physically demanding due to its length and altitude, but it is generally less technical than Cho La, which involves crossing a steeper, more crevassed glacier. However, weather on Larke La can be more unpredictable." },
            { question: "What kind of footwear do I need?", answer: "Sturdy, waterproof trekking boots with good ankle support are essential. We also recommend carrying micro-spikes for the icy sections on either side of the pass." }
        ],
        days: [
            { day: 1, title: "Drive from Kathmandu to Machha Khola", description: "A scenic all-day drive along the Budhi Gandaki river through lush hillsides.", distance: "160km", elevationGain: "0m", time: "8-9 hrs", altitude: 900 },
            { day: 2, title: "Trek to Jagat", description: "Passing magnificent waterfalls and crossing suspension bridges to enter the Manaslu restricted area.", distance: "13km", elevationGain: "+400m", time: "6 hrs", altitude: 1340 },
            { day: 3, title: "Trek to Deng", description: "The valley narrows and steepens as you continue along the river into Buddhist territory.", distance: "15km", elevationGain: "+500m", time: "7 hrs", altitude: 1860 },
            { day: 4, title: "Trek to Namrung", description: "A beautiful climb through forests, rewarding you with your first views of Sringi Himal.", distance: "14km", elevationGain: "+800m", time: "6 hrs", altitude: 2660 },
            { day: 5, title: "Trek to Lho", description: "Enjoying the incredible panoramas of Mount Manaslu from the Ribung Gompa.", distance: "12km", elevationGain: "+500m", time: "5 hrs", altitude: 3180 },
            { day: 6, title: "Trek to Samagaon", description: "A relatively short day to the principal village of the Nubri people, settling in the shadow of Manaslu.", distance: "10km", elevationGain: "+350m", time: "4 hrs", altitude: 3530 },
            { day: 7, title: "Acclimatization Day at Samagaon", description: "A vital day for high altitude adjustment. Hike up towards Pungyen Gompa or Manaslu Base Camp.", distance: "5km", elevationGain: "+400m", time: "4-5 hrs", altitude: 3530, isRestDay: true },
            { day: 8, title: "Trek to Samdo", description: "Following the Birendra Tal and climbing higher towards the Tibetan border into alpine terrain.", distance: "8km", elevationGain: "+300m", time: "4 hrs", altitude: 3860 },
            { day: 9, title: "Trek to Dharamsala / Larkya Phedi", description: "A barren but spectacular climb up the Larkya Glacier moraine to the high camp base location.", distance: "7km", elevationGain: "+600m", time: "4-5 hrs", altitude: 4460 },
            { day: 10, title: "Cross Larke Pass (5,106m) to Bimthang", description: "An early start to summit the formidable Larke Pass for stunning dawn views of Cheo Himal and Himlung Himal, followed by a huge descent.", distance: "16km", elevationGain: "+650m", time: "9-10 hrs", altitude: 5106, guideTip: "Eat a high-calorie breakfast before leaving Dharamsala; you'll need the fuel for the 9-hour push." },
            { day: 11, title: "Trek to Tilije", description: "A long, knee-jarring descent through beautiful enchanted rhododendron and pine forests.", distance: "16km", elevationGain: "-1400m", time: "6-7 hrs", altitude: 2300 },
            { day: 12, title: "Trek to Tal", description: "Dropping into the main Marsyangdi valley and joining the lower sections of the Annapurna Circuit.", distance: "11km", elevationGain: "-600m", time: "5 hrs", altitude: 1700 },
            { day: 13, title: "Trek to Syange", description: "Your final day navigating the trail alongside the river before catching a transport vehicle.", distance: "12km", elevationGain: "-600m", time: "5 hrs", altitude: 1100 },
            { day: 14, title: "Drive back to Kathmandu", description: "A long road journey tracing back the Marsyangdi and Trishuli river valleys to Kathmandu.", distance: "190km", elevationGain: "0m", time: "8-9 hrs", altitude: 1400 }
        ]
    },
    "three-passes": {
        region: "Everest",
        regionSlug: "everest-region",
        duration: "20 Days",
        maxAltitude: "5,535m",
        difficulty: "Strenuous",
        rating: 4.9,
        reviews: 85,
        description: "The Everest Three Passes Trek is the ultimate Himalayan circuit for serious adventurers. Rather than just hiking up and down the main EBC trail, this strenuous 20-day loop crosses three formidable 5,000m+ passes: Renjo La, Cho La, and Kongma La. The route perfectly integrates the turquoise Gokyo Lakes, Kala Patthar, and Everest Base Camp into one epic, uncrowded journey. Because of its demanding nature, traversing these high-altitude passes with an experienced, independent guide provides crucial safety and necessary itinerary flexibility.",
        mapImage: "/Users/sarojsapkota/.gemini/antigravity/brain/6c9edd68-5573-4e14-b028-5e1e3b752c03/gokyo_lakes_map_graphic_1773380552872.png", // Will need a specific one later if available
        faqs: [
            { question: "How difficult are the Three Passes compared to standard EBC?", answer: "The Three Passes is significantly more strenuous. It involves multiple days over 5,000m, steep rocky ascents, and glacier crossings (Cho La pass). It requires excellent physical fitness and prior high-altitude experience." },
            { question: "Do I need crampons for the passes?", answer: "Micro-spikes or light crampons are highly recommended, specifically for the Cho La Pass which involves crossing a glacier that can be very icy. Your guide will advise you based on current conditions." },
            { question: "Should we trek clockwise or anti-clockwise?", answer: "Anti-clockwise (starting toward Kongma La) is the standard and safest route for acclimatization. Trekking clockwise forces a rapid, unsafe ascent to the Renjo La pass." },
            { question: "What if the passes are blocked by snow?", answer: "This is why booking a flexible independent guide is vital. If a pass is impassable, your guide will reroute you via the lower valleys (e.g., dropping to Pheriche instead of crossing Kongma La) without financial penalty." }
        ],
        days: [
            { day: 1, title: "Fly to Lukla and Trek to Phakding", description: "Your epic journey begins with a thrilling flight to the Tenzing-Hillary Airport in Lukla. Meet your guide and start the gentle descent to the Dudh Koshi river, reaching the green village of Phakding.", distance: "8km", elevationGain: "-200m", time: "3 hrs", altitude: 2610 },
            { day: 2, title: "Trek to Namche Bazaar", description: "Cross high suspension bridges draped in prayer flags before tackling the steep, pine-forested switchbacks up to Namche Bazaar, the historical Sherpa trading hub.", distance: "11km", elevationGain: "+830m", time: "6 hrs", altitude: 3440 },
            { day: 3, title: "Acclimatization Day in Namche", description: "A crucial rest day. Hike high to the Everest View Hotel for your first clear look at Everest, Lhotse, and Ama Dablam, then drop back down to Namche to sleep low.", distance: "4km", elevationGain: "+440m", time: "3-4 hrs", altitude: 3440, isRestDay: true, guideTip: "Don't just sit in the bakery! The 'climb high, sleep low' rule is critical today to prepare for the massive passes ahead." },
            { day: 4, title: "Trek to Tengboche", description: "Follow the spectacular contour trail high above the river, then climb through rhododendron forests to the famous Tengboche Monastery, framed perfectly by Ama Dablam.", distance: "10km", elevationGain: "+600m", time: "5-6 hrs", altitude: 3860 },
            { day: 5, title: "Trek to Dingboche", description: "The landscape changes dramatically today as you leave the tree line behind. Cross the Imja Khola and enter the arid, alpine terrain of the upper Khumbu, arriving in Dingboche.", distance: "11km", elevationGain: "+550m", time: "5-6 hrs", altitude: 4410 },
            { day: 6, title: "Acclimatization Day in Dingboche", description: "Your second scheduled acclimatization day. Hike up Nangkartshang Peak (5,083m) for outstanding views of Makalu and Island Peak, preparing your lungs for Kongma La.", distance: "5km", elevationGain: "+670m", time: "4-5 hrs", altitude: 4410, isRestDay: true },
            { day: 7, title: "Trek to Chhukung", description: "A short but beautiful walk up the Imja Valley toward the base of Island Peak. Rest up in Chhukung, as tomorrow is your first major pass.", distance: "5km", elevationGain: "+320m", time: "3 hrs", altitude: 4730, flexNote: "A short day purposefully designed by our guides to ensure you are 100% rested before tackling Kongma La." },
            { day: 8, title: "Kongma La Pass (5,535m) to Lobuche", description: "The highest and often toughest of the three passes. A steep, rocky ascent leads to the prayer-flag-draped summit. Descend carefully and cross the raw ice of the Khumbu Glacier to reach Lobuche.", distance: "10km", elevationGain: "+800m", time: "8-9 hrs", altitude: 4910 },
            { day: 9, title: "Gorak Shep & Everest Base Camp", description: "Hike alongside the Khumbu Glacier to Gorak Shep, drop your bags, and push on to the legendary Everest Base Camp. Stand among the ice seracs before returning to Gorak Shep.", distance: "15km", elevationGain: "+450m", time: "8 hrs", altitude: 5140 },
            { day: 10, title: "Kala Patthar & Trek to Dzongla", description: "Start before dawn to summit Kala Patthar (5,550m) for the definitive sunrise view of Everest. Descend to Lobuche and branch off the main trail into the quiet valley toward Dzongla.", distance: "15km", elevationGain: "+410m", time: "7-8 hrs", altitude: 4830, guideTip: "It will be bitterly cold ascending Kala Patthar in the dark. Bring spare camera batteries and keep them warm inside your jacket." },
            { day: 11, title: "Cho La Pass (5,420m) to Thangnak", description: "The second pass. Climb steep scree to the snowy saddle of Cho La. You'll likely need micro-spikes to safely traverse the glacier section before a steep, rocky descent to the isolated hamlet of Thangnak.", distance: "8km", elevationGain: "+600m", time: "7-8 hrs", altitude: 4700 },
            { day: 12, title: "Trek to Gokyo", description: "A short, awe-inspiring day crossing the massive, rubble-covered Ngozumpa Glacier—the longest glacier in the Himalayas. Arrive at the breathtaking turquoise waters of the third Gokyo Lake.", distance: "5km", elevationGain: "+90m", time: "3-4 hrs", altitude: 4790 },
            { day: 13, title: "Rest & Explore Gokyo (Gokyo Ri/Fifth Lake)", description: "Depending on your energy, either hike early up Gokyo Ri (5,357m) for a panorama arguably better than Kala Patthar, or take a long, flat walk to the remote 4th and 5th glacier lakes.", distance: "8km", elevationGain: "+560m", time: "5 hrs", altitude: 4790, isRestDay: true, flexNote: "This day is totally flexible. Discuss with your guide whether you want to tackle another peak (Gokyo Ri) or do a flatter acclimatization walk." },
            { day: 14, title: "Renjo La Pass (5,360m) to Lungden", description: "The final pass. Ascend steeply from Gokyo Lake to the Renjo La. The view looking back over the lakes toward Everest and Makalu is the best of the entire trek. Descend into the remote, pristine Bhote Koshi valley.", distance: "11km", elevationGain: "+570m", time: "7-8 hrs", altitude: 4380 },
            { day: 15, title: "Trek to Thame", description: "A beautiful, mostly downhill walk through an ancient Tibetan trading route. Arrive in Thame, a historic Sherpa village largely untouched by modern tourism, and visit its cliffside monastery.", distance: "10km", elevationGain: "-580m", time: "4-5 hrs", altitude: 3800 },
            { day: 16, title: "Trek to Namche Bazaar", description: "Continue descending through rhododendron and pine pine forests, completing the massive Three Passes loop as you arrive back in the bustling comforts of Namche Bazaar.", distance: "10km", elevationGain: "-360m", time: "5 hrs", altitude: 3440 },
            { day: 17, title: "Trek to Lukla", description: "Your final day on the trails. Retrace your steps back down via Phakding to Lukla. Celebrate the completion of one of the world's most challenging treks with your guide team.", distance: "19km", elevationGain: "-600m", time: "7-8 hrs", altitude: 2860 },
            { day: 18, title: "Fly to Kathmandu", description: "Take the thrilling morning flight out of Lukla back to the Kathmandu valley. Transfer to your hotel for a long, well-deserved hot shower.", distance: "0km", elevationGain: "0m", time: "35 min", altitude: 1400 },
            { day: 19, title: "Contingency / Rest Day in Kathmandu", description: "A buffer day in case of flight delays out of Lukla (which are common). If on time, use this day to explore Durbar Square, Swayambhunath, or do some souvenir shopping in Thamel.", distance: "0km", elevationGain: "0m", time: "-", altitude: 1400, isRestDay: true },
            { day: 20, title: "Final Departure", description: "Your epic adventure comes to an end. Transfer to Tribhuvan International Airport for your flight home.", distance: "0km", elevationGain: "0m", time: "-", altitude: 1400 }
        ]
    },
    "langtang-valley-trek": {
        region: "Langtang",
        regionSlug: "langtang-region",
        duration: "8 Days",
        maxAltitude: "4,984m",
        difficulty: "Moderate",
        rating: 4.8,
        reviews: 92,
        description: "The Langtang Valley Trek, also known as the 'Valley of Glaciers,' is a short yet incredibly scenic journey into the heart of the Langtang National Park. This 8-day trek is perfect for those seeking dramatic mountain vistas and rich Tamang culture without the long travel times of Everest or Annapurna. The trail winds through lush rhododendron and bamboo forests—home to the rare red panda—before opening up into a high-altitude glacial valley surrounded by the towering Langtang Lirung (7,227m). Highlights include visiting the Kyanjin Gompa and climbing Kyanjin Ri or Tserko Ri for breathtaking 360-degree panoramas.",
        faqs: [
            { question: "How long is the drive to the start of the Langtang trek?", answer: "The drive from Kathmandu to Syabrubesi takes about 7–8 hours. While the distance isn't huge, the winding mountain roads make for a slow but scenic journey." },
            { question: "What is the highest point on the Langtang trek?", answer: "The highest point is either Kyanjin Ri (4,773m) or Tserko Ri (4,984m), depending on which peak you choose to climb from Kyanjin Gompa." },
            { question: "Is the Langtang region safe after the 2015 earthquake?", answer: "Yes, the region has been fully rebuilt. The new teahouses are safe and comfortable, and by trekking here, you are directly contributing to the local community's continued recovery." },
            { question: "What permits do I need for Langtang?", answer: "You need the Langtang National Park entry permit and the TIMS card. Both can be arranged easily by your guide." }
        ],
        days: [
            { day: 1, title: "Drive from Kathmandu to Syabrubesi", description: "Leave the city behind for a scenic drive north. The road winds through hills and small towns, offering glimpses of the Ganesh Himal range.", distance: "122km", elevationGain: "0m", time: "7-8 hrs", altitude: 1550 },
            { day: 2, title: "Trek to Lama Hotel", description: "The trek begins! Follow the Langtang Khola river through dense forests of oak and maple. Keep an eye out for monkeys and birds in the canopy.", distance: "11km", elevationGain: "+950m", time: "6 hrs", altitude: 2470 },
            { day: 3, title: "Trek to Langtang Village", description: "Ascend steadily as the valley opens up. You'll pass through Ghodatabela and see your first close-up views of the Langtang massif before reaching the rebuilt Langtang Village.", distance: "12km", elevationGain: "+900m", time: "6 hrs", altitude: 3430 },
            { day: 4, title: "Trek to Kyanjin Gompa", description: "A shorter but beautiful climb to the final settlement in the valley. Visit the famous local cheese factory and the ancient monastery.", distance: "7km", elevationGain: "+400m", time: "3-4 hrs", altitude: 3830 },
            { day: 5, title: "Acclimatization & Hike to Tserko Ri", description: "A challenging but rewarding climb to the highest point of the trek. From the summit of Tserko Ri (4,984m), enjoy a staggering view of Langtang Lirung and Yala Peak.", distance: "8km", elevationGain: "+1150m", time: "6-7 hrs", altitude: 4984, isRestDay: true, guideTip: "Start early! The clouds often roll in by midday, obscuring the best views." },
            { day: 6, title: "Descend to Lama Hotel", description: "Begin your journey back down the valley. It's a long but easy descent, retracing your steps through the beautiful forest.", distance: "18km", elevationGain: "-1300m", time: "7 hrs", altitude: 2470 },
            { day: 7, title: "Trek to Syabrubesi", description: "Final day of walking. Follow the river back to the road head at Syabrubesi and celebrate the completion of your trek with your team.", distance: "11km", elevationGain: "-950m", time: "5 hrs", altitude: 1550 },
            { day: 8, title: "Drive back to Kathmandu", description: "A final road journey back to the capital for a well-earned hot shower and rest.", distance: "122km", elevationGain: "0m", time: "7-8 hrs", altitude: 1400 }
        ]
    },
    "gosainkunda-trek": {
        region: "Langtang",
        regionSlug: "langtang-region",
        duration: "6 Days",
        maxAltitude: "4,380m",
        difficulty: "Moderate",
        rating: 4.9,
        reviews: 58,
        description: "The Gosainkunda Trek is a sacred and spectacular journey to a cluster of high-altitude alpine lakes at 4,380 meters. Revered by both Hindus and Buddhists, the lakes are believed to have been created by Lord Shiva. This 6-day trek offers some of the most dramatic ridge-line walking in Nepal, with panoramic views of the Langtang, Ganesh Himal, and even the Annapurna range on clear days. It's a steep but fast ascent into the alpine zone, providing a profound sense of peace and spiritual connection at the shimmering turquoise lakes.",
        faqs: [
            { question: "When is the best time for the Gosainkunda trek?", answer: "The best times are Spring (March–May) and Autumn (September–November). For those seeking the sacred Janai Purnima festival, the trek is busiest in August." },
            { question: "Is altitude sickness common on this route?", answer: "Because the ascent from Dhunche is quite rapid, AMS is a risk. We recommend taking a slow pace and drinking plenty of water." },
            { question: "Can I combine Gosainkunda with the Langtang Valley?", answer: "Absolutely. Many trekkers add 4-5 days to cross the Lauribina Pass and connect the two regions for a more comprehensive experience." }
        ],
        days: [
            { day: 1, title: "Drive from Kathmandu to Dhunche", description: "Drive north along the winding roads to the district headquarters of Rasuwa. Dhunche is the gateway to the sacred lakes.", distance: "117km", elevationGain: "0m", time: "6-7 hrs", altitude: 1960 },
            { day: 2, title: "Trek to Sing Gompa", description: "A steep, forested climb through oak and rhododendron. Visit the famous yak cheese factory at Sing Gompa and witness the sunset over the Ganesh Himal range.", distance: "12km", elevationGain: "+1370m", time: "6-7 hrs", altitude: 3330 },
            { day: 3, title: "Trek to Gosainkunda", description: "Follow the ridge line past Lauribinayak. The vegetation thins as you enter the alpine zone. Your first glimpse of the lakes is truly magical.", distance: "10km", elevationGain: "+1050m", time: "6-7 hrs", altitude: 4380, guideTip: "Lauribinayak is a great place to stop for a break and soak in the 360-degree views before the final push." },
            { day: 4, title: "Explore Lakes and Descend to Sing Gompa", description: "Spend the morning reflecting by the sacred lakes. After lunch, begin the long descent back down the ridge to the comforts of Sing Gompa.", distance: "10km", elevationGain: "-1050m", time: "5-6 hrs", altitude: 3330 },
            { day: 5, title: "Trek back to Dhunche", description: "A massive descent through the forest. Your knees will feel it, but the lush scenery and birdsong make it a pleasant final walk.", distance: "12km", elevationGain: "-1370m", time: "5-6 hrs", altitude: 1960 },
            { day: 6, title: "Drive back to Kathmandu", description: "A final scenic drive back to the city to celebrate your pilgrimage.", distance: "117km", elevationGain: "0m", time: "6-7 hrs", altitude: 1400 }
        ]
    },
    "upper-mustang": {
        duration: "14 Days",
        maxAltitude: "3,820m",
        difficulty: "Moderate",
        days: [
            { day: 1, title: "Pokhara to Jomsom & Kagbeni", description: "Fly to Jomsom and trek to the 'gateway' of Upper Mustang.", distance: "11km", elevationGain: "+100m", time: "4 hrs", altitude: 2810 },
            { day: 2, title: "Trek to Chele", description: "Enter the restricted area. Crossing the Kali Gandaki river.", distance: "15km", elevationGain: "+300m", time: "6 hrs", altitude: 3050 },
            { day: 3, title: "Trek to Syangboche", description: "Passing through deep canyons and unique cave dwellings.", distance: "14km", elevationGain: "+450m", time: "7 hrs", altitude: 3500 },
            { day: 4, title: "Trek to Tsarang", description: "Walk across the Ghami La pass to the historical village of Tsarang.", distance: "16km", elevationGain: "+300m", time: "7 hrs", altitude: 3560 },
            { day: 5, title: "Trek to Lo Manthang", description: "Arrival at the walled capital of the forbidden kingdom.", distance: "11km", elevationGain: "+250m", time: "5 hrs", altitude: 3810 },
            { day: 6, title: "Explore Lo Manthang", description: "Visit ancient monasteries and the Royal Palace.", distance: "4km", elevationGain: "0m", time: "3 hrs", altitude: 3810 },
            { day: 7, title: "Chhoser Caves Hike", description: "Explore the multi-story cave complexes carved into cliffs.", distance: "12km", elevationGain: "+100m", time: "6 hrs", altitude: 3900 },
        ]
    }
};

export default async function ItineraryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const title = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    const trekData = ITINERARIES[slug] || ITINERARIES["ebc-trek"]; // Safety fallback
    const itinerary = trekData.days;

    return (
        <main className="min-h-screen bg-slate-950 text-white pb-24">
            <div className="relative h-[60vh] w-full bg-slate-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                <div className="absolute top-28 left-0 w-full z-20">
                    <div className="max-w-7xl mx-auto px-8 md:px-16">
                        <Link href={`/destinations/${trekData.regionSlug || 'everest-region'}`} className="inline-flex items-center text-white/60 hover:text-white transition-colors group">
                            <MoveLeft className="w-4 h-4 mr-3 transition-transform group-hover:-translate-x-1" />
                            <span className="text-xs font-bold tracking-widest uppercase">Back to {trekData.region || 'Region'}</span>
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto">
                    <span className="text-nepal-orange font-bold tracking-widest uppercase mb-4 block text-sm">{trekData.duration.toUpperCase()} EXPEDITION</span>
                    <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight">{title}</h1>

                    <div className="flex flex-wrap gap-8 text-white/70">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-nepal-orange" />
                            <span className="text-sm font-medium tracking-wide">{trekData.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mountain className="w-5 h-5 text-nepal-orange" />
                            <span className="text-sm font-medium tracking-wide">Max {trekData.maxAltitude}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-nepal-orange" />
                            <span className="text-sm font-medium tracking-wide">{trekData.difficulty}</span>
                        </div>
                        {trekData.rating && (
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-bold">{trekData.rating}</span>
                                <span className="text-xs text-white/60 font-medium">({trekData.reviews} verified reviews)</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {['ebc-trek', 'gokyo-lakes', 'three-passes', 'annapurna-circuit', 'abc-trek', 'mardi-himal', 'poon-hill', 'manaslu-circuit', 'larke-pass-trek', 'langtang-valley-trek', 'gosainkunda-trek'].includes(slug || '') && <TrustStrip />}

            <div className="max-w-7xl mx-auto px-4 md:px-16 mt-12">
                <ItineraryView
                    data={itinerary}
                    description={trekData.description}
                    faqs={trekData.faqs}
                    mapImage={trekData.mapImage}
                    slug={slug}
                />
            </div>

            {['ebc-trek', 'gokyo-lakes', 'three-passes', 'annapurna-circuit', 'abc-trek', 'mardi-himal', 'poon-hill', 'manaslu-circuit', 'larke-pass-trek', 'langtang-valley-trek', 'gosainkunda-trek'].includes(slug || '') && <FinalCtaStrip trekName={title} />}
        </main>
    );
}
