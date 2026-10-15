/* ═══════════════════════════════════════════════════════════════════
   TUȘE — per-service page content

   Before this file, the 19 service pages shared almost all of their
   text: only the label, three "reasons" and the price changed. Google
   treats pages like that as near-duplicates, which is the usual reason
   it discovers a page and then declines to index it.

   Everything here is general, practical trade knowledge for a Nigerian
   home — what drives the price, how to prepare, what good work looks
   like. None of it is a new claim about Tuse: prices still come only
   from the SERVICES array in index.html, coverage only from help.html.

   Keys match SERVICES[].t exactly. generate-services.js refuses to run
   if any service is missing an entry.

   Fields:
     title    – the trade as people search for it, used in <title>
     plural   – used in the H1 and description ("Verified plumbers…")
     singular – used in running copy ("before the plumber arrives")
     intro    – unique opening paragraph
     costFactors, prepare, goodJob – lists
     faqs     – trade-specific questions, shown before the generic five
   ═══════════════════════════════════════════════════════════════════ */
'use strict';

module.exports = {
  'AC repair': {
    title: 'AC Repair',
    plural: 'AC technicians',
    singular: 'AC technician',
    intro: 'Air conditioners in Nigeria work hard. Long hot seasons, harmattan dust and an unstable power supply all take a toll on split and window units. Most AC problems come down to a short list: a clogged filter, a dirty coil, low gas from a leak, or an electrical part such as the capacitor failing after a voltage surge. A verified AC technician can service the unit, find the fault, and tell you whether it is a quick fix or a part replacement before any work starts.',
    costFactors: [
      'Whether it is a routine service, cleaning the filters and coils, or a fault repair',
      'A gas top-up or leak repair. The leak should be found and fixed, not just refilled',
      'Parts such as a capacitor, fan motor, thermostat or control board',
      'Unit size and access, for example an outdoor unit mounted high on a wall',
    ],
    prepare: [
      'Note the brand and capacity, such as 1HP, 1.5HP or 2HP, from the sticker on the unit',
      'Write down what you have noticed: warm air, dripping water, noise, or the unit not coming on',
      'Clear the space under the indoor unit and make sure the outdoor unit can be reached safely',
      'Have power available so the technician can test the unit running',
    ],
    goodJob: [
      'The technician tells you what they found before replacing anything',
      'Filters, coils and the drain line are cleaned, not just the front panel',
      'The unit is tested running and blowing cold air before they leave',
    ],
    faqs: [
      { q: 'How often should an AC be serviced in Nigeria?', a: 'Many technicians recommend a service every three to six months, and more often during harmattan or if the unit runs all day. Regular cleaning keeps the airflow up and helps catch gas leaks and electrical wear early.' },
      { q: 'Does my AC need gas every year?', a: 'No. Refrigerant runs in a sealed loop and does not get used up. If an AC needs gas, there is usually a leak, and it should be found and repaired. Otherwise the new gas will escape too.' },
    ],
  },

  'Plumbing': {
    title: 'Plumber',
    plural: 'plumbers',
    singular: 'plumber',
    intro: 'Most homes in Nigeria run on a mix of borehole or public supply, a pumping machine and an overhead tank, so plumbing problems are not only leaking taps. Low pressure, an overflowing tank, a blocked drain line or a toilet that will not stop running are everyday jobs. A verified plumber can trace leaks, clear blockages, replace worn fittings, and install new taps, sinks, toilets and water heaters.',
    costFactors: [
      'Whether the pipe or fitting is exposed, or runs inside a wall or under tiles',
      'Materials, such as PPR or PVC pipe, valves, taps, cisterns and fittings',
      'Clearing a simple blockage versus a deeper drain or soakaway problem',
      'Installation work, such as a new water heater, sink or toilet',
    ],
    prepare: [
      'Find your main stopcock or tank outlet valve, so the water can be turned off',
      'Clear the area under the sink, around the toilet, or wherever the problem is',
      'Take a photo of the leak or the fitting. It helps the plumber bring the right parts',
      'For low pressure or no water, check first whether the overhead tank has water in it',
    ],
    goodJob: [
      'Joints are tested with the water back on, and checked for drips before the plumber leaves',
      'The plumber explains whether the cause was a worn washer, a failed joint or a blockage',
      'Old parts and debris are cleared away',
    ],
    faqs: [
      { q: 'Can a plumber fix a leak inside the wall?', a: 'Usually, yes. The plumber first confirms where the leak is, often from damp patches, the water meter, or by isolating sections of pipe, then opens only as much of the wall or tiling as needed. Expect the price to include making good the opening.' },
      { q: 'Why does my toilet keep running?', a: 'A running toilet is usually a worn flapper or seal, or a float valve set too high, so water spills into the overflow. Both are quick, inexpensive fixes for a plumber.' },
    ],
  },

  'Barbing': {
    title: 'Barber',
    plural: 'barbers',
    singular: 'barber',
    intro: 'A good barber is someone you go back to every fortnight, which is why finding one has always depended on word of mouth. You can book a verified barber to come to you at a time you choose, instead of waiting in a shop queue, or book a slot at their shop. Low cuts, fades, tapers, beard shaping and line-ups are all covered, and you see the price before the barber arrives.',
    costFactors: [
      'The cut itself: a simple low cut, a fade, or a detailed design',
      'Extras such as beard shaping, a line-up, dye or a hot towel',
      'A home visit versus a visit to the barber\'s shop',
      'More than one person in the same booking, for example a father and his sons',
    ],
    prepare: [
      'Have a photo of the cut you want, especially for a particular fade or design',
      'Pick a well-lit spot with a chair, ideally near a socket or with backup power for the clippers',
      'Wash and dry your hair beforehand, unless a wash is part of the service',
    ],
    goodJob: [
      'Clippers and combs are clean and sanitised, with a fresh blade for any razor work',
      'The fade is even with no harsh lines, and the line-up is sharp and symmetrical',
      'Cut hair is cleared away and the area is left tidy',
    ],
    faqs: [
      { q: 'Can a barber come to my house?', a: 'Yes. Barbing on Tuse covers home cuts as well as shop visits. You choose the time when you book, and the barber brings their own clippers and tools.' },
      { q: 'How do I know the clippers are clean?', a: 'Ask. A professional barber sanitises clippers and combs between clients and uses a new blade for any razor work. If you prefer, you can provide your own clippers.' },
    ],
  },

  'Cleaning': {
    title: 'Cleaning Services',
    plural: 'cleaners',
    singular: 'cleaner',
    intro: 'Regular cleaning keeps a home manageable, but finding someone you trust enough to let into your house is the hard part. Cleaners are identity-checked before they can be booked, and every job is rated by the customer who paid for it. Book a one-off clean for a flat, regular housekeeping on a schedule, or a move-in or move-out clean when you change homes.',
    costFactors: [
      'Size of the property: the number of bedrooms, bathrooms and living areas',
      'How long it has been since the last proper clean',
      'Extra tasks, such as inside the fridge and oven, windows, or laundry and ironing',
      'Whether you supply the cleaning products and equipment, or the cleaner does',
    ],
    prepare: [
      'Agree which rooms and tasks are included before the cleaner starts',
      'Put away valuables, documents and anything fragile',
      'Point out surfaces that need special care, such as marble, wood or delicate fittings',
      'Make sure there is running water and power',
    ],
    goodJob: [
      'Kitchens and bathrooms are cleaned and disinfected, not just tidied',
      'Floors are swept and mopped, including under furniture that can be moved',
      'The cleaner walks through the finished job with you',
    ],
    faqs: [
      { q: 'What is the difference between regular cleaning and deep cleaning?', a: 'Regular cleaning keeps a home tidy: dusting, sweeping, mopping, kitchens and bathrooms. Deep cleaning goes much further, into built-up grime, behind appliances, tile grout, and inside cupboards and fittings. If a place has not been cleaned properly in months, or you are moving in, book a deep clean first.' },
      { q: 'Do I need to be at home during the clean?', a: 'Not necessarily, but for a first booking many people prefer to be there to agree the tasks. The cleaner\'s identity has been verified, and you can see who is coming in the app before they arrive.' },
    ],
  },

  'Deep cleaning': {
    title: 'Deep Cleaning Services',
    plural: 'deep cleaners',
    singular: 'deep cleaner',
    intro: 'A deep clean is a top-to-bottom reset for a property: the grease behind the cooker, the limescale in the shower, the dust on top of wardrobes and ceiling fans, the grime in the grout between tiles. It is what you book before moving into a new place, after renovation or construction, or when a house has gone too long between proper cleans. The scope and price are agreed before the work begins.',
    costFactors: [
      'Size of the property, and the number of bathrooms and kitchens',
      'Condition. Post-construction dust, paint splashes and cement residue take longer',
      'Specialist tasks such as upholstery, carpets, mattresses or high windows',
      'Whether the property is empty or furnished',
    ],
    prepare: [
      'If you are moving in, book the deep clean before your furniture arrives',
      'Make sure water and power are on, as deep cleaning uses a lot of both',
      'Point out problem areas, such as mould, stains or paint splashes, at the start',
      'Remove or secure valuables and fragile items',
    ],
    goodJob: [
      'Inside cupboards, drawers and appliances are cleaned, not only the surfaces',
      'Bathrooms are descaled and the grout is scrubbed, not just wiped',
      'Construction dust is cleared from walls, windows, frames and fittings',
    ],
    faqs: [
      { q: 'How long does a deep clean take?', a: 'It depends on the size and condition of the property. A small flat might take most of a day, while a large house after construction can take a team more than one day. The scope is agreed in the app before the job starts.' },
      { q: 'Is post-construction cleaning a deep clean?', a: 'Yes. Clearing cement residue, paint splashes, sawdust and fine construction dust from every surface is deep cleaning work, and it usually takes longer than a standard deep clean.' },
    ],
  },

  'Hairdressing': {
    title: 'Hairdresser',
    plural: 'hairdressers',
    singular: 'hairdresser',
    intro: 'Getting braids done can take most of a day, and it is easier when the stylist comes to you. You can book a verified hairdresser for knotless braids, cornrows, weaves and wig installs, natural hair care and styling, or a wash and treatment. You agree the style and the price in the app before the stylist starts, and the payment is released only when the work is done.',
    costFactors: [
      'The style: knotless braids, cornrows, a weave, a wig install or natural styling',
      'Length and size. Long, small braids take far longer than short, chunky ones',
      'Whether you supply the attachment hair, or the stylist does',
      'Extras such as washing, a treatment, or taking down an old style',
    ],
    prepare: [
      'Have a photo of the style you want, including the length and size',
      'If you are supplying attachment hair, buy it in advance and check the quantity with the stylist',
      'Wash, detangle and dry your hair beforehand, unless washing is included',
      'Set aside enough time. Long braids can take many hours',
    ],
    goodJob: [
      'Braids are even in size, and not pulled so tight that they hurt or cause bumps',
      'Parts are clean and neat',
      'The stylist tells you how to care for the style and how long to keep it in',
    ],
    faqs: [
      { q: 'Can a hairdresser come to my house for braids?', a: 'Yes. Hairdressing on Tuse includes home appointments. Agree the style, the length and whether hair is included when you book, so the stylist brings the right materials.' },
      { q: 'How tight should braids be?', a: 'Braids should feel secure, not painful. Very tight braiding can cause bumps, headaches and, over time, hair loss around the edges. Tell your stylist straight away if it hurts.' },
    ],
  },

  'Nail technician': {
    title: 'Nail Technician',
    plural: 'nail technicians',
    singular: 'nail technician',
    intro: 'Nail technicians do manicures and pedicures, gel polish, acrylic and gel extensions, and nail art, on your schedule rather than a salon\'s. Every technician is identity-checked before they can be booked, and you agree the set and the price in the app before they start.',
    costFactors: [
      'The service: a basic manicure or pedicure, gel polish, or a full acrylic or gel extension set',
      'Length, shape, and any nail art or embellishments',
      'Removing an existing gel or acrylic set first',
      'Booking hands and feet together',
    ],
    prepare: [
      'Have a picture of the shape, length and colour you want',
      'Remove old polish if you can, or tell the technician you need a removal',
      'Choose a table with good light, near a socket for the UV or LED lamp',
      'Mention any allergies or sensitive skin',
    ],
    goodJob: [
      'Tools are sanitised, and files and buffers are new or disinfected',
      'Cuticles are pushed back gently, not cut aggressively',
      'Polish or gel is smooth and even, and does not flood onto the skin',
    ],
    faqs: [
      { q: 'How long do gel nails last?', a: 'Gel polish typically lasts around two to three weeks before it starts to lift or grow out. Acrylic and gel extensions need a refill or a new set every two to three weeks.' },
      { q: 'Can I remove gel or acrylic nails myself?', a: 'Peeling or prising them off damages the natural nail. They should be soaked off or filed down properly, which is why it is worth booking a removal with your next set.' },
    ],
  },

  'Makeup': {
    title: 'Makeup Artist',
    plural: 'makeup artists',
    singular: 'makeup artist',
    intro: 'From a bride\'s first look before dawn to party glam on a Friday night, a makeup artist sets the tone for the day. You can book a verified makeup artist for bridal and traditional wedding looks, events, photoshoots and everyday makeup. You see the price before booking and can track the artist on their way, so you are not left wondering whether they will arrive on time.',
    costFactors: [
      'The occasion: bridal, traditional wedding, an event, a photoshoot or everyday makeup',
      'The number of people, such as a bride with bridesmaids or family',
      'Extras such as lashes, gele tying, or staying for touch-ups during the event',
      'Very early start times and travel to the venue',
    ],
    prepare: [
      'Book early for weddings and busy seasons, and consider a trial for bridal makeup',
      'Share photos of looks you like and of what you will be wearing',
      'Start with a clean, moisturised face and no makeup',
      'Have a seat by a window or a bright light, and a mirror',
    ],
    goodJob: [
      'Foundation matches your skin tone in natural light, not just indoors',
      'Makeup is set to last through heat and a long day',
      'Brushes and products are clean, with disposable applicators for eyes and lips',
    ],
    faqs: [
      { q: 'How early should I book a bridal makeup artist?', a: 'As early as you can, especially for weekends in the wedding season. Many brides book a trial session first to settle the look before the day.' },
      { q: 'Will my makeup last in the heat?', a: 'A good artist preps the skin, uses long-wear products and sets the makeup for humid weather. Tell them how long the event runs so they can plan for it, or ask about touch-ups.' },
    ],
  },

  'Chef and cooking': {
    title: 'Private Chef',
    plural: 'private chefs',
    singular: 'chef',
    intro: 'Hosting a birthday, a small reception or a family gathering is easier when someone else is cooking. You can book a verified private chef for parties and events, regular meal prep for the week, or catering for a particular occasion. Agree the menu, the number of guests and the price in the app first.',
    costFactors: [
      'The number of guests or portions',
      'The menu: Nigerian, continental or a mix, and how many courses',
      'Whether you buy the ingredients, or the chef shops for them',
      'Serving and clean-up during the event',
    ],
    prepare: [
      'Agree the menu and guest numbers in advance, including any allergies or dietary needs',
      'Check that your kitchen has enough pots, gas or power, and fridge space',
      'Decide who is buying the ingredients, and agree a budget for them',
      'Plan when guests will eat, so the chef can time the cooking',
    ],
    goodJob: [
      'Food is cooked and kept at safe temperatures, with raw and cooked food kept apart',
      'The kitchen is left clean',
      'Portions match the number of guests agreed',
    ],
    faqs: [
      { q: 'Does a private chef bring the ingredients?', a: 'It depends on what you agree. Some customers buy the ingredients themselves, while others give the chef a budget to shop. Agree this before booking so the price is clear.' },
      { q: 'Can I book a chef for weekly meal prep?', a: 'Yes. Meal prep is one of the most common reasons people book a chef: several days of meals cooked in one session, portioned and ready to refrigerate.' },
    ],
  },

  'Electrical work': {
    title: 'Electrician',
    plural: 'electricians',
    singular: 'electrician',
    intro: 'Voltage surges, frequent power cuts and switching between grid supply, generator and inverter put real strain on household wiring in Nigeria. Sockets stop working, breakers keep tripping, lights flicker and changeover switches wear out. A verified electrician can trace faults safely, repair or replace sockets, switches and fittings, fix wiring, and install new points, lights and fans.',
    costFactors: [
      'Fault finding. Tracing a hidden fault takes longer than replacing a visible part',
      'Parts such as sockets, switches, breakers, cable or a changeover switch',
      'Whether new cable has to be run through walls or ceilings',
      'The number of points, lights or fittings being installed',
    ],
    prepare: [
      'Note which sockets, lights or rooms are affected, and when it started',
      'Show the electrician where your distribution board and changeover switch are',
      'Mention anything unusual: a burning smell, sparks, or sockets that feel warm',
      'Clear access to the board and to the area being worked on',
    ],
    goodJob: [
      'Power is switched off and tested dead before work starts',
      'Connections are tight, insulated and inside proper boxes, with no loose or taped joints',
      'Everything is tested working before the electrician leaves',
    ],
    faqs: [
      { q: 'Why does my breaker keep tripping?', a: 'A breaker trips to protect the circuit. Common causes are an overloaded circuit, a faulty appliance, or a wiring fault such as a short circuit or earth leakage. Resetting it again and again without finding the cause is unsafe.' },
      { q: 'Do I need an electrician to install a changeover switch?', a: 'Yes. A changeover switch sits between the grid supply, your generator and the house wiring. Installed wrongly, it can damage appliances or send power back into the supply line, which is dangerous for anyone working on it.' },
    ],
  },

  'Appliance repair': {
    title: 'Appliance Repair',
    plural: 'appliance repair technicians',
    singular: 'technician',
    intro: 'Fridges, freezers, washing machines, TVs and microwaves take a beating from power surges and frequent outages. Often the fault is a single part that can be replaced, such as a thermostat, pump, capacitor or control board, rather than the whole appliance. A verified technician diagnoses the fault, tells you whether it is worth repairing, and gives you the price before fixing it.',
    costFactors: [
      'The appliance and the brand. Spare parts for some brands are harder to find',
      'The fault. A drain pump or door seal costs less than a compressor or main board',
      'Whether the repair can be done on site, or the appliance has to go to a workshop',
      'A gas recharge for fridges and freezers after a leak repair',
    ],
    prepare: [
      'Note the brand and model number, usually on a sticker inside the door or at the back',
      'Describe the fault: noises, error codes, leaks, or when it stopped working',
      'Clear space around the appliance so it can be moved and opened',
      'For a washing machine, drain the water first if you can do it safely',
    ],
    goodJob: [
      'The technician explains the fault and the price before ordering parts',
      'Replaced parts are shown to you',
      'The appliance is tested through a full cycle, or a full cooling period',
    ],
    faqs: [
      { q: 'Is it worth repairing an old fridge?', a: 'Often, yes. Thermostats, fans, door seals and starter relays are relatively cheap to replace. A failed compressor is the expensive repair, and on an older fridge a technician may advise that replacing it makes more sense.' },
      { q: 'Can power surges damage appliances?', a: 'Yes. Surges, especially when power is restored after an outage, can damage control boards, compressors and motors. A stabiliser or surge protector helps protect fridges, freezers and TVs.' },
    ],
  },

  'Generator repair': {
    title: 'Generator Repair',
    plural: 'generator technicians',
    singular: 'technician',
    intro: 'For many homes and businesses in Nigeria the generator is not a backup but a daily source of power, so regular servicing and quick repairs matter. Generator technicians service and repair petrol and diesel sets of every size: oil and filter changes, carburettor cleaning, starting problems, a set that starts then dies, no power output, and AVR replacement.',
    costFactors: [
      'Size and type: a small petrol set versus a large diesel generator',
      'Routine servicing versus a fault repair',
      'Parts such as spark plugs, filters, the carburettor, AVR, starter or coil',
      'Whether the set can be repaired on site or needs a workshop',
    ],
    prepare: [
      'Note the brand, model and size of the generator in kVA',
      'Describe what happens: it will not start, starts then dies, gives no power, smokes or is noisy',
      'Say when it was last serviced and what oil you use',
      'Make sure the generator is somewhere the technician can reach and work on safely',
    ],
    goodJob: [
      'The oil, air filter and spark plug are checked or replaced during a service',
      'The generator is tested running under load, not just started',
      'The technician tells you when the next service is due',
    ],
    faqs: [
      { q: 'How often should a generator be serviced?', a: 'Follow the manufacturer\'s schedule. Small petrol generators often need an oil change every 50 to 100 running hours, and larger diesel sets less often. A generator that runs every day may need servicing every few weeks.' },
      { q: 'Why does my generator start and then go off?', a: 'Common causes include stale or contaminated fuel, a dirty carburettor, low oil triggering the protection switch, overloading, or overheating. Our guide on a generator that starts then dies covers the safe checks.' },
    ],
  },

  'Carpentry': {
    title: 'Carpenter',
    plural: 'carpenters',
    singular: 'carpenter',
    intro: 'Doors that will not close after the rains, wardrobe doors hanging off their hinges, broken drawers, loose kitchen cabinets and furniture that needs fixing are all carpentry jobs. A verified carpenter can repair and adjust doors, frames and locks, fix or build wardrobes, shelves and cabinets, and repair or assemble furniture.',
    costFactors: [
      'Repairing something versus building something new',
      'Materials: hardwood, plywood, MDF or board, and fittings like hinges and handles',
      'Size and complexity, for example a full built-in wardrobe',
      'Finishing work such as polishing, painting or varnishing',
    ],
    prepare: [
      'Take measurements and photos of the item or the space',
      'Show reference pictures if you want something built',
      'Clear the area, and empty any wardrobes or cabinets being worked on',
      'Decide whether you will buy the materials, or the carpenter will',
    ],
    goodJob: [
      'Doors open and close smoothly and line up with their frames',
      'Joints are tight, and screws are not stripped or sticking out',
      'Sawdust and offcuts are cleaned up',
    ],
    faqs: [
      { q: 'Why won\'t my door close properly?', a: 'Wooden doors and frames swell with humidity, especially in the rainy season, and hinges loosen and sag over time. A carpenter can tighten or reposition the hinges, plane the door, and adjust the strike plate.' },
      { q: 'Can a carpenter build a wardrobe?', a: 'Yes. Built-in and free-standing wardrobes are common carpentry jobs. Expect the carpenter to measure first and agree the design, materials and price before starting.' },
    ],
  },

  'Painting': {
    title: 'Painter',
    plural: 'painters',
    singular: 'painter',
    intro: 'A fresh coat of paint changes how a home feels, but a good finish depends on preparation: filling cracks, scraping off flaking paint, dealing with damp, and choosing the right paint for the surface. Painters handle interior walls and ceilings, exterior walls, touch-ups and full repaints before you move in. You agree the scope and price before the work starts.',
    costFactors: [
      'The area to be painted: the number of rooms, ceilings and exterior walls',
      'Surface condition. Cracks, flaking paint or damp need preparation first',
      'The type of paint, such as emulsion, satin or textured, and whether screeding is included',
      'Whether you supply the paint, or the painter does',
      'Height and access, for exterior walls or high ceilings',
    ],
    prepare: [
      'Choose your colours and finish in advance, and test a small patch if you can',
      'Move furniture away from the walls and cover what cannot be moved',
      'Point out cracks, stains or damp patches',
      'If there is damp, fix the source first, often a leak, before painting over it',
    ],
    goodJob: [
      'Walls are prepared, filled and sanded before painting',
      'Edges are clean, with no paint on switches, sockets, floors or frames',
      'Two coats where needed, with even colour and no patchiness',
    ],
    faqs: [
      { q: 'Why is the paint peeling off my wall?', a: 'Peeling usually means moisture or poor preparation: damp coming through the wall, paint applied over dust or old flaking paint, or emulsion applied over gloss. The fix is to find the cause, scrape back, prime and repaint.' },
      { q: 'How soon can I use a freshly painted room?', a: 'Water-based emulsion usually dries to the touch within a few hours. Keep the room well ventilated, and give it a day before pushing furniture back against the walls.' },
    ],
  },

  'Welding': {
    title: 'Welder',
    plural: 'welders',
    singular: 'welder',
    intro: 'Gates, burglary-proof bars, railings, window protectors and metal doors are standard in Nigerian homes, and they all need fabrication, repair or adjustment at some point. A verified welder can fabricate and install gates and burglary proofing, repair broken hinges and joints, fix a gate that sags or drags, and handle general iron and steel work around the property.',
    costFactors: [
      'Repairing something versus fabricating something new',
      'The size and design of the gate, door or burglary proofing',
      'The type and thickness of the iron or steel',
      'Painting or anti-rust treatment after welding',
      'Whether there is power on site, or the welder needs to bring a generator',
    ],
    prepare: [
      'Take measurements and photos, and show a reference design if you want something made',
      'Make sure there is power for the welding machine, or tell the welder there is none',
      'Move vehicles and anything flammable away from the work area',
      'Agree whether painting is included',
    ],
    goodJob: [
      'Welds are continuous and solid, not just a few tack welds',
      'Gates swing and close properly without dragging on the ground',
      'Welded areas are ground smooth and painted with an anti-rust primer',
    ],
    faqs: [
      { q: 'Why is my gate dragging on the ground?', a: 'Usually the hinges have worn or the gate has sagged under its own weight. A welder can replace or reposition the hinges, add bracing, or fit a wheel to support the gate.' },
      { q: 'Should new burglary proofing be painted?', a: 'Yes. Bare iron rusts quickly, especially in the rainy season. An anti-rust primer followed by paint protects the metal and keeps it looking good.' },
    ],
  },

  'Fumigation': {
    title: 'Fumigation Services',
    plural: 'fumigation professionals',
    singular: 'fumigation professional',
    intro: 'Fumigation treats a whole property at once, which is why it is often booked before moving into a new house, after a bad infestation, or on a schedule to keep pests from returning. Fumigation professionals treat homes and business premises for cockroaches, ants, bedbugs, mosquitoes and other pests, and tell you how to prepare and how long to stay out.',
    costFactors: [
      'The size of the property and the number of rooms',
      'The pest being treated. Bedbugs and termites need different treatment from cockroaches',
      'How severe the infestation is, and whether a follow-up treatment is needed',
      'Outdoor areas, such as the compound, gutters and drains',
    ],
    prepare: [
      'Cover or put away food, plates, cutlery and cooking utensils',
      'Move children, pets and anyone with asthma out of the property during treatment',
      'Clear the edges of rooms and open cupboards, so the treatment reaches hiding places',
      'Ask how long to stay out, and plan to air the property out when you return',
    ],
    goodJob: [
      'The professional asks about the pest problem and explains which chemicals they are using',
      'Treatment covers kitchens, bathrooms, drains, cracks and other hiding places, not just open floors',
      'You are told how long to stay out, how to clean up, and when to expect results',
    ],
    faqs: [
      { q: 'How long should I stay out after fumigation?', a: 'It depends on the chemical used, so ask the professional. It is commonly a few hours, after which you should open the windows and air the property out before going back in. Follow the instructions you are given.' },
      { q: 'What is the difference between fumigation and pest control?', a: 'Fumigation treats a whole property at once, often as prevention or before moving in. Pest control targets a specific pest, such as rodents, termites or bedbugs, with methods chosen for that pest, often over more than one visit.' },
    ],
  },

  'Pest control': {
    title: 'Pest Control',
    plural: 'pest control professionals',
    singular: 'pest control professional',
    intro: 'Cockroaches in the kitchen, rats in the ceiling, termites in the door frames and bedbugs in the mattress each need a different approach. Pest control professionals identify what you are dealing with, treat it with methods suited to that pest, and tell you how to stop it coming back, whether that means sealing entry points, baiting, or a follow-up treatment.',
    costFactors: [
      'The pest. Cockroaches, ants, rodents, termites and bedbugs are treated differently',
      'How severe and widespread the infestation is',
      'The number of treatments needed. Bedbugs and termites often need follow-ups',
      'Proofing work, such as sealing the gaps and holes rodents use to get in',
    ],
    prepare: [
      'Note where you see the pests, at what time of day, and how many',
      'Store food in sealed containers, and clear clutter where pests can hide',
      'For bedbugs, wash bedding and clothes on a hot cycle and keep them sealed in bags',
      'Keep children and pets away from treated areas, as advised',
    ],
    goodJob: [
      'The pest is identified before treatment, and the method suits it',
      'Entry points and hiding places are found and treated or sealed',
      'You are told what to expect after treatment, and whether a follow-up is needed',
    ],
    faqs: [
      { q: 'How do I get rid of rats in the ceiling?', a: 'Rats need a combination of trapping or baiting and sealing the gaps they use to get in. Removing food sources and clutter helps. Poison alone can leave dead rats in the ceiling, so a professional usually combines methods.' },
      { q: 'Can bedbugs be removed in one treatment?', a: 'Rarely. Bedbug eggs often survive the first treatment, so a follow-up a couple of weeks later is usually needed. Washing bedding on a hot cycle and vacuuming mattresses helps between treatments.' },
    ],
  },

  'Tailoring': {
    title: 'Tailor',
    plural: 'tailors',
    singular: 'tailor',
    intro: 'Whether it is an outfit for a wedding, native wear that has to fit perfectly, or trousers that need taking in, a good tailor is worth keeping. You can book a verified tailor for alterations and adjustments, for native wear and other outfits sewn from your fabric, and for repairs to clothes you already own.',
    costFactors: [
      'An alteration or repair versus sewing a new outfit',
      'The style: a simple kaftan versus an agbada or a detailed, fitted gown',
      'The fabric, lining, embellishments and stones',
      'How soon you need it, especially before weddings and the festive season',
    ],
    prepare: [
      'Bring the fabric, and check with the tailor that you have enough yards for the style',
      'Have photos of the style you want',
      'Be available for measurements and at least one fitting',
      'Leave enough time before the event, especially in December and the wedding season',
    ],
    goodJob: [
      'Measurements are taken carefully and written down',
      'Seams are straight and neatly finished on the inside, not just the outside',
      'There is a fitting before the final finish, so adjustments can be made',
    ],
    faqs: [
      { q: 'How long does a tailor take to sew native wear?', a: 'It depends on the style and how busy the tailor is. A simple outfit can take a few days. Detailed styles, or anything in the run-up to December or a big wedding, can take longer. Agree the delivery date when you book.' },
      { q: 'How many yards of fabric do I need?', a: 'It depends on the style and your size. Ask the tailor before you buy, because some styles, such as an agbada or a flowing gown, need much more fabric than a fitted top.' },
    ],
  },

  'Auto care': {
    title: 'Mechanic & Car Care',
    plural: 'mechanics',
    singular: 'mechanic',
    intro: 'From a car that will not start in the morning to a tyre that keeps losing pressure, car trouble rarely comes at a good time. Auto care covers mechanics for diagnostics, servicing and repairs, car wash and cleaning, and vulcanizers for tyre repairs and replacement, with the price agreed in the app before work begins.',
    costFactors: [
      'Diagnosis. A computer scan or fault tracing comes before the repair',
      'Parts, and whether they are new, fairly used (tokunbo) or original',
      'Labour, which depends on how much of the car has to be taken apart',
      'Whether the job can be done where the car is parked, or needs a workshop',
    ],
    prepare: [
      'Note what is happening: warning lights, noises, smells, and when it started',
      'Have the car\'s make, model and year ready',
      'Park somewhere safe where the mechanic can reach and work on the car',
      'Keep any service records or receipts for recent repairs',
    ],
    goodJob: [
      'The mechanic explains the fault and shows you the old parts',
      'You approve the price of parts before they are bought',
      'The car is test-driven or tested after the repair',
    ],
    faqs: [
      { q: 'Why does my car battery keep dying?', a: 'A battery that keeps going flat is usually old, has corroded terminals, is not being charged by a faulty alternator, or is being drained by something while the car is off. A mechanic can test the battery and charging system to find out which.' },
      { q: 'Can a mechanic come to where my car is?', a: 'Many jobs, such as battery replacement, diagnostics and minor repairs, can be done where the car is parked. Larger repairs may need a workshop. Describe the problem in the app and the mechanic will tell you which applies.' },
    ],
  },
};
