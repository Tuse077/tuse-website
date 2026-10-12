/* ═══════════════════════════════════════════════════════════════════
   TUȘE — extra depth for the original 25 problem guides

   The first 25 guides had 130–310 words of their own text each; the
   rest of every page was shared template. This file adds, per guide:

     explain      – "Why this happens": how the system works and why it
                    fails in a Nigerian home (power, dust, tanks, heat)
     costFactors  – "What affects the repair cost"
     faqs         – appended after the guide's existing FAQs
     addCauses    – optional, appended to the guide's causes list
     title / h1 / description – optional overrides, used only where
                    Search Console showed the original missing real queries

   "{price}" in any string is replaced at generate time with the live
   starting price from the SERVICES array, so prices cannot drift.
   Merged in guides-data.js; every original guide must have an entry.
   ═══════════════════════════════════════════════════════════════════ */
'use strict';

module.exports = {
  'ac-blowing-warm-air': {
    explain: [
      'An AC does not make cold air. It moves heat out of the room: refrigerant absorbs heat at the indoor coil and releases it through the outdoor unit. Anything that interrupts that loop leaves the fan blowing room-temperature air: too little airflow across the coils, too little refrigerant, or an outdoor unit that cannot shed heat.',
      'In Nigerian homes the most common culprits are dust and power. Harmattan dust clogs filters and coils within weeks, and voltage surges or low voltage can damage the capacitor that starts the outdoor compressor. If the indoor fan runs but the outdoor unit stays silent, a failed capacitor is high on the list.',
    ],
    costFactors: [
      'A filter and coil clean is the cheapest outcome',
      'Replacing a capacitor or fan motor is a mid-range repair',
      'Finding and fixing a refrigerant leak, then recharging, costs more',
      'A failed compressor is the most expensive repair, and on an old unit replacement may make more sense',
    ],
    faqs: [
      { q: 'Why does my AC blow cold at night but warm in the afternoon?', a: 'In the hottest part of the day the unit is working hardest. If it is low on gas, too small for the room, or the outdoor unit sits in direct sun with poor airflow, it may not keep up. A technician can check the gas pressure and airflow.' },
      { q: 'Can low voltage stop my AC from cooling?', a: 'Yes. When voltage drops, the compressor may struggle to start or cut out while the fan keeps running, so the air feels warm. A stabiliser helps protect the unit, and repeated low-voltage starts can damage the compressor over time.' },
    ],
  },

  'ac-not-cooling': {
    explain: [
      'When an AC runs but the room never gets cold, the unit is usually working against a restriction: dirt on the filters and coils, a refrigerant charge that has slowly leaked away, or an outdoor condenser choked with dust. Each one reduces how much heat the system can move, so it runs for hours with little effect.',
      'Sometimes nothing is broken and the unit is simply too small for the space. A 1HP split unit struggles in a large sitting room with big windows, a kitchen nearby or lots of people. A technician can tell you whether the issue is a fault, maintenance, or capacity.',
    ],
    costFactors: [
      'Servicing dirty filters, coils and condenser fins',
      'Leak detection and a refrigerant recharge',
      'Replacing a faulty thermostat or room sensor',
      'Advice on a larger unit if the room is beyond the AC\'s capacity',
    ],
    faqs: [
      { q: 'What size AC do I need for my room?', a: 'It depends on the room size, sun exposure and how many people use it. As a rough guide, 1HP suits a small bedroom, 1.5HP a large bedroom or small sitting room, and 2HP or more a large living area. A technician can advise for your space.' },
      { q: 'How long should an AC take to cool a room?', a: 'A correctly sized, well-maintained unit should noticeably cool a closed room within 15 to 30 minutes. If it takes hours, or never gets there, it needs servicing or checking.' },
    ],
  },

  'ac-leaking-water': {
    explain: [
      'An AC removes moisture from the air as well as heat. That water collects in a tray under the indoor coil and drains outside through a small hose. In humid weather a split unit can produce a lot of water in a day, so any blockage along that path quickly ends up on your wall or floor.',
      'The drain line can be blocked by dust, slime or insects, the hose can be kinked or come loose, or the unit may have been mounted tilting the wrong way. A very dirty filter can also make the coil freeze, then drip heavily as the ice melts.',
    ],
    costFactors: [
      'Clearing a blocked drain line during a service',
      'Re-routing or replacing the drain hose',
      'Re-levelling an indoor unit mounted at the wrong angle',
      'Cleaning the coil and filter if icing is the cause',
    ],
    faqs: [
      { q: 'Why does my AC leak water only sometimes?', a: 'Intermittent leaks usually point to a partly blocked drain that copes on dry days but overflows when humidity is high, or a coil that ices up and melts. Both are cleared during a proper service.' },
      { q: 'Can water from my AC damage the wall?', a: 'Yes. Water running down a wall again and again can stain the paint, cause damp patches and, near sockets, create an electrical risk. Switch the unit off and have the drain cleared rather than leaving it.' },
    ],
  },

  'ac-not-turning-on': {
    explain: [
      'When an AC will not respond at all, start with the simple things: the remote batteries, the wall switch or isolator, and the breaker. A surprising number of call-outs end there. Power cuts and changeovers between grid and generator can also trip the breaker, or leave the unit\'s supply switched off.',
      'If power is reaching the unit and it still will not start, or it beeps, blinks a light and shuts down, the cause is often a failed capacitor, a faulty control board, or the unit\'s own protection locking it out after a fault. Those need a technician with a meter.',
    ],
    costFactors: [
      'Nothing at all if it turns out to be the remote, isolator or breaker',
      'Replacing a capacitor or relay',
      'Replacing a control board, which varies by brand',
      'Fixing the underlying fault if the unit locked itself out',
    ],
    faqs: [
      { q: 'My AC indicator light is blinking. What does it mean?', a: 'A blinking light is usually an error code. The pattern differs by brand and points to a specific fault, such as a sensor or communication error. Note the pattern and the brand, and tell the technician.' },
      { q: 'Can a power surge stop my AC from working?', a: 'Yes. Surges when power is restored can damage the control board or capacitor. Switch the AC off during outages and turn it back on once the supply is stable, or use a stabiliser.' },
    ],
  },

  'ac-making-noise': {
    explain: [
      'Most AC noises have a mechanical cause you can narrow down by the sound. Rattling usually means a loose panel, screw or mounting bracket. Clicking or ticking can be debris touching the fan. Grinding or squealing points to worn motor bearings. A steady hiss can mean refrigerant escaping.',
      'A loud bang, or a compressor that labours and cuts out, is more serious and should be checked quickly. Running a unit with a failing motor or compressor can turn a modest repair into a replacement.',
    ],
    costFactors: [
      'Tightening loose panels, screws or brackets',
      'Cleaning or straightening a fan that is hitting something',
      'Replacing a fan motor with worn bearings',
      'Leak repair and recharge, or compressor work',
    ],
    faqs: [
      { q: 'Why does my AC click when it starts?', a: 'A single click at start-up is often a relay switching on, which is normal. Repeated clicking, or clicking with no cooling, can mean the compressor is trying and failing to start, which often points to a weak capacitor.' },
      { q: 'Is a gurgling sound from my AC normal?', a: 'A soft gurgle is usually water moving through the drain line or refrigerant flowing, and is normal. Loud gurgling together with leaks or poor cooling should be checked.' },
    ],
  },

  'pipe-leaking': {
    explain: [
      'Leaks in Nigerian homes often start at joints rather than in the middle of a pipe. Pumping machines and overhead tanks can create pressure surges, older galvanised pipes corrode from the inside, and PPR or PVC joints can fail if they were not fused or glued properly. Pipes inside walls also get damaged by nails and drilling.',
      'Even a slow leak matters. Water lost from the tank means the pump runs more often, and a hidden leak in a wall or under tiles can cause damp, peeling paint and weakened plaster long before you see a drip.',
    ],
    costFactors: [
      'Replacing a short section or a fitting on an exposed pipe',
      'Opening and making good a wall or floor for a hidden leak',
      'The pipe material: PPR, PVC or old galvanised steel',
      'Replacing several corroded sections at once on an older system',
    ],
    faqs: [
      { q: 'How do I know if a pipe is leaking inside the wall?', a: 'Signs include damp patches or bubbling paint, a musty smell, the pump running when no taps are open, or the tank emptying faster than usual. A plumber can isolate sections of pipe to find the leak.' },
      { q: 'Should I switch off the pumping machine if a pipe is leaking?', a: 'Yes. Switch off the pump and close the tank outlet valve or main stopcock. This stops the leak getting worse and saves the water in your tank.' },
    ],
  },

  'leaking-tap': {
    explain: [
      'Taps seal the water with either a rubber washer, on older screw-down taps, or a ceramic cartridge, on most modern quarter-turn and mixer taps. Over time washers harden and crack, and cartridges get scored by grit and sediment. Hard water and high pressure from a pump wear them out faster.',
      'A drip feels minor, but a tap dripping steadily wastes a lot of water over a month, which drains your overhead tank and makes the pump run more often. It is usually a quick, inexpensive repair.',
    ],
    costFactors: [
      'Replacing a washer or O-ring on the existing tap',
      'Replacing a ceramic cartridge, which varies by tap brand',
      'Replacing the whole tap if parts are not available',
      'Fixing a leak from the pipe connection under the basin',
    ],
    faqs: [
      { q: 'Can I fix a dripping tap myself?', a: 'If you are comfortable turning off the water and taking the tap apart, a washer is a simple replacement. Cartridges vary by brand, though, and forcing a stuck tap can crack the fitting. A plumber can bring the right part.' },
      { q: 'Why is my tap leaking from the handle?', a: 'Water around the handle or spout usually means a worn O-ring or a loose packing nut, rather than the main washer. It is a quick fix for a plumber.' },
    ],
  },

  'blocked-sink': {
    explain: [
      'Kitchen sinks block mainly from grease. Palm oil and cooking fat go down as a liquid, then cool and harden in the trap and pipe, catching food scraps. Bathroom basins block from hair and soap. Most blockages sit in the trap, the curved pipe under the sink, which is designed to be opened and cleaned.',
      'If the sink drains slowly and gurgles, the blockage is partial. If several fittings back up together, or water rises in another sink or shower, the blockage is further down the waste line and needs a plumber.',
    ],
    costFactors: [
      'Clearing a blocked trap under the sink',
      'Rodding the waste pipe beyond the trap',
      'Replacing a cracked or worn trap',
      'Clearing a blockage in the outside drain or soakaway line',
    ],
    faqs: [
      { q: 'Is it safe to use caustic soda to unblock a sink?', a: 'Caustic chemicals can burn skin and eyes, damage some pipes, and are dangerous if the plumber then has to open the trap. Try hot water and a plunger first, and tell the plumber if you have used chemicals.' },
      { q: 'How do I stop my kitchen sink from blocking?', a: 'Scrape plates into the bin, never pour oil or fat down the sink, and use a strainer to catch food scraps. Pouring hot water down the drain regularly helps keep it clear.' },
    ],
  },

  'blocked-drain': {
    explain: [
      'Outside drains carry everything from the kitchen, bathrooms and toilets to the septic tank, soakaway or public sewer. They block from grease, silt, wipes and sanitary products, and sometimes from roots or pipes that have cracked or sunk. In the rainy season, silt and debris washing into open drains make things worse.',
      'Signs include water backing up into a floor drain or shower, slow drainage across the house, gurgling, and bad smells near manholes. A blocked line that is ignored can overflow into the compound or back into the house.',
    ],
    costFactors: [
      'Rodding a blockage from a manhole',
      'Clearing a blocked inspection chamber',
      'Repairing a cracked or collapsed section of pipe',
      'A full septic tank or soakaway, which may need evacuating',
    ],
    faqs: [
      { q: 'Why does my drain smell bad?', a: 'A smell often means a dry trap, a partial blockage holding waste, or a problem at the septic tank or soakaway. Run water into rarely used drains to refill their traps. If the smell persists, have the line checked.' },
      { q: 'Can heavy rain cause a blocked drain?', a: 'Yes. Heavy rain washes silt, leaves and rubbish into drains, and a soakaway that is already struggling can stop draining. A plumber can clear the line and check whether the soakaway needs attention.' },
    ],
  },

  'toilet-not-flushing': {
    explain: [
      'A good flush depends on a full cistern releasing a large volume of water quickly. If the cistern does not fill properly, the flush valve does not lift all the way, or the trap or pipe is partly blocked, the flush is weak and waste does not clear.',
      'In homes on tank supply, low water pressure can stop the cistern filling, so check that taps elsewhere are flowing well. A toilet that gurgles, or where the water rises before slowly draining, usually has a blockage in the trap or further down.',
    ],
    costFactors: [
      'Adjusting or replacing the fill valve so the cistern fills properly',
      'Replacing a worn flush valve, flapper or push-button mechanism',
      'Clearing a blockage in the toilet trap',
      'Clearing the soil pipe further down the line',
    ],
    faqs: [
      { q: 'Why does my toilet cistern take so long to fill?', a: 'Low pressure from the tank, a partly closed isolation valve, or a worn or blocked fill valve can all slow filling. A plumber can clean or replace the fill valve.' },
      { q: 'Is it okay to flush the toilet with a bucket?', a: 'Yes, as a temporary measure. Pouring a bucket of water quickly into the bowl will flush it. It does not fix the cause, so book a plumber if the cistern is not working.' },
    ],
  },

  'low-water-pressure': {
    explain: [
      'In most Nigerian homes the pressure depends on the overhead tank and the pumping machine. Water from a tank flows by gravity, so the pressure depends on how high the tank sits above the tap and how full it is. Upstairs bathrooms close to the tank\'s level often get weak flow.',
      'If the pressure drops suddenly, look for a nearly empty tank, a closed or half-open valve, a clogged aerator or shower head, or a leak somewhere in the system. Where the supply comes from a pressure pump, the pump or its pressure switch may be failing.',
    ],
    costFactors: [
      'Cleaning aerators, shower heads and valves',
      'Finding and fixing a leak that is losing pressure',
      'Installing a booster pump for upstairs bathrooms',
      'Repairing or replacing a pressure pump or its switch',
    ],
    faqs: [
      { q: 'Why is the water pressure low only upstairs?', a: 'Gravity-fed water loses pressure the closer the tap is to the tank\'s level. If the tank is not much higher than your upstairs bathroom, the flow will be weak. A booster pump is the usual fix.' },
      { q: 'Can a dirty overhead tank cause low pressure?', a: 'Yes. Sediment in the tank can settle into the outlet pipe and clog valves and aerators. Washing the tank regularly helps both water quality and flow.' },
    ],
  },

  'generator-wont-start': {
    explain: [
      'A petrol generator needs three things to start: fuel reaching the engine, air, and a spark at the right moment. Most no-start problems come from one of them failing: stale or dirty fuel, a blocked carburettor jet, a fouled spark plug, or a clogged air filter. Many sets also have a low-oil sensor that stops the engine starting when the oil is low.',
      'Fuel quality is a common culprit. Petrol left in a tank for weeks goes stale and leaves a gummy residue in the carburettor, and contaminated fuel causes the same problem. Electric-start sets also fail to crank when the battery is flat or the terminals are corroded.',
    ],
    costFactors: [
      'Replacing a spark plug or air filter',
      'Cleaning or replacing the carburettor',
      'Draining contaminated fuel and cleaning the tank',
      'Replacing a battery, starter or ignition coil',
    ],
    faqs: [
      { q: 'How do I start a generator that has been sitting for a long time?', a: 'Check the oil, replace old fuel with fresh petrol, and make sure the fuel tap is on and the choke is set for a cold start. If it still will not start after a few pulls, the carburettor probably needs cleaning.' },
      { q: 'Can bad fuel stop a generator starting?', a: 'Yes. Stale or contaminated petrol is one of the most common reasons a generator will not start. Drain it, refill with fresh fuel from a reliable station, and have the carburettor cleaned if needed.' },
    ],
  },

  'generator-starts-then-stops': {
    // Search Console: "generator dies" had 53 impressions and 0 clicks.
    title: 'Generator Starts Then Dies? Causes and Fixes | TUȘE',
    h1: 'Generator Starts Then Dies or Keeps Going Off? What It Means',
    description: 'Generator dies seconds or minutes after starting, or keeps going off when you add load? The usual causes, safe checks, and when to call a technician. Repair {price}.',
    addCauses: ['A blocked vent in the fuel cap creating a vacuum in the tank'],
    explain: [
      'When a generator starts and then dies, it is usually being starved of something it needs to keep running, or a protection system is shutting it down. Fuel is the most common cause: a partly blocked fuel filter, a gummed-up carburettor or a blocked tank vent lets in enough petrol to start, but not enough to keep going.',
      'The timing is a clue. If it dies within seconds, suspect fuel or the low-oil sensor. If it runs for a few minutes and then goes off, overheating, a clogged air filter or a blocked fuel-cap vent is more likely. If it dies only when you switch appliances on, it is probably overloaded, or the engine is too weak to carry the load.',
    ],
    costFactors: [
      'Cleaning the carburettor and fuel filter',
      'Topping up or changing the oil, or replacing a faulty oil sensor',
      'Replacing the AVR if the set fails under load',
      'Engine work if overheating has caused damage',
    ],
    faqs: [
      { q: 'Why does my generator go off when I switch on the AC or pumping machine?', a: 'Motors in ACs, pumps and fridges draw a large current when they start. If that surge is more than the generator can supply, the engine bogs down and stops, or its breaker trips. Start heavy appliances one at a time, and check the set\'s rating.' },
      { q: 'Why does my generator die after running for a few minutes?', a: 'Running for a few minutes then dying often points to overheating, a blocked fuel-cap vent creating a vacuum, or a fuel filter clogging as the fuel flows. Let it cool, loosen the fuel cap slightly, and if it keeps happening, book a technician.' },
    ],
  },

  'generator-no-power': {
    explain: [
      'If the engine runs smoothly but nothing in the house comes on, the problem lies between the generator\'s alternator and your sockets. Start with the generator\'s own output breaker, then the changeover switch, which must be set to generator, then the main breakers in the house.',
      'If all of those are on and there is still no power, the alternator may not be producing voltage. The automatic voltage regulator, or AVR, is a common failure point, especially after a surge or overload. A generator that has sat unused for a long time can also lose the magnetism it needs to start producing power.',
    ],
    costFactors: [
      'Resetting or replacing the output breaker or socket',
      'Repairing or replacing the changeover switch',
      'Replacing the AVR',
      'Alternator repair, such as brushes or windings',
    ],
    faqs: [
      { q: 'What is an AVR on a generator?', a: 'The automatic voltage regulator keeps the generator\'s output voltage steady as the load changes. When it fails, the generator may run but give no power, or give unstable voltage that makes lights flicker and can damage appliances.' },
      { q: 'Can a bad changeover switch cause no power from the generator?', a: 'Yes. A worn or burnt changeover may not connect the generator to the house, even when it is switched across. An electrician or generator technician can test and replace it.' },
    ],
  },

  'socket-not-working': {
    explain: [
      'When one socket stops working, the cause is usually local: a loose wire behind it, a worn socket that no longer grips plugs, or a burnt contact from a high-power appliance. If a group of sockets has gone dead, the problem is further back, at a breaker, a junction or a cable feeding that circuit.',
      'Burn marks, a melted look around the socket, a burning smell or a socket that feels warm are signs of overheating at a loose connection. Stop using it straight away. This is one of the most common causes of electrical fires.',
    ],
    costFactors: [
      'Replacing a single socket',
      'Fixing a loose or burnt connection at the socket or a junction box',
      'Tracing a fault that affects a whole circuit',
      'Running new cable if the old cable is damaged',
    ],
    faqs: [
      { q: 'Why does my socket have burn marks?', a: 'Burn marks usually come from a loose connection or a worn socket overheating under load, often from irons, heaters, kettles or ACs. Stop using it, have it replaced, and have the wiring behind it checked.' },
      { q: 'Can I use an extension box from another socket instead?', a: 'Only as a short-term fix, if the other socket is in good condition and you do not overload it. Do not plug high-power appliances such as ACs, heaters or irons into extension boxes, and get the faulty socket repaired.' },
    ],
  },

  'breaker-keeps-tripping': {
    explain: [
      'A breaker is a safety device. It trips when the current on a circuit is too high, from an overload or a short circuit, or, in the case of an earth-leakage breaker, when current is leaking to earth. A tripping breaker is telling you something is wrong, and replacing it with a bigger one only hides the problem.',
      'Notice when it trips. If it happens when a particular appliance comes on, that appliance may be faulty or the circuit may be overloaded. If it trips at random or after rain, damp in a socket, an outdoor light or a damaged cable is often to blame.',
    ],
    costFactors: [
      'Identifying an overloaded circuit and spreading the load',
      'Finding and fixing a short circuit in a cable or fitting',
      'Tracing earth leakage from damp or damaged insulation',
      'Replacing a weak or faulty breaker',
    ],
    faqs: [
      { q: 'Why does my breaker trip when it rains?', a: 'Rain can get into outdoor lights, sockets or damaged cable, letting current leak to earth. An earth-leakage breaker detects this and trips. An electrician can find the wet fitting and seal or replace it.' },
      { q: 'Should I replace my breaker with a bigger one?', a: 'No. A breaker is sized to protect the cable on that circuit. A bigger breaker lets the cable overheat before it trips, which is a fire risk. Find the cause instead.' },
    ],
  },

  'lights-flickering': {
    explain: [
      'A single flickering bulb is usually the bulb or its holder. Flickering across several lights, or the whole house, points to the supply: voltage fluctuations from the grid, a generator with a weak AVR, or a loose connection in the main wiring. Flicker that starts when the power switches between sources is common.',
      'Flickering together with buzzing, a burning smell or warm switches is not just annoying. It can mean a loose connection is arcing, and that needs an electrician urgently.',
    ],
    costFactors: [
      'Replacing bulbs or an LED driver',
      'Fixing a loose connection in a fitting or switch',
      'Tracing a loose neutral or a fault at the main connection',
      'Generator AVR repair, if the flicker happens only on generator',
    ],
    faqs: [
      { q: 'Why do my lights flicker only when the generator is on?', a: 'The generator\'s output may be unstable, often from a failing AVR, an engine that is not holding its speed, or overloading. Have the generator checked, because unstable voltage can also damage appliances.' },
      { q: 'Can flickering lights damage my appliances?', a: 'Flicker caused by voltage swings can stress sensitive electronics such as TVs, fridges and computers. A stabiliser helps, and an electrician can check whether the cause is the supply or the wiring.' },
    ],
  },

  'no-power-in-one-room': {
    explain: [
      'Homes are wired in circuits, and one room\'s lights and sockets are often on the same breaker. If one room loses power while the rest of the house is fine, that circuit has tripped or a connection on it has failed. Check the distribution board first for a breaker that is off or halfway.',
      'If the breaker will not reset, or trips again straight away, there is a fault on the circuit, often an overloaded socket, a damaged cable or a faulty appliance. Recent work such as drilling, fitting curtain rails or installing an AC can also damage hidden cables.',
    ],
    costFactors: [
      'Resetting a breaker and checking the load',
      'Repairing a faulty switch or junction box',
      'Finding and repairing a damaged cable',
      'Adding a dedicated circuit for a heavy appliance like an AC',
    ],
    faqs: [
      { q: 'Why did one room lose power after an AC was installed?', a: 'An AC draws a lot of current. If it was connected to a circuit already serving lights and sockets, it can overload it and trip the breaker. Many ACs need their own circuit.' },
      { q: 'Is it safe to reset a breaker myself?', a: 'Yes, once. Unplug the appliances in that room first, then reset it. If it trips again immediately, leave it off and call an electrician.' },
    ],
  },

  'fridge-not-cooling': {
    explain: [
      'A fridge cools by pumping refrigerant through a compressor and releasing heat through the coils at the back or underneath. If those coils are clogged with dust, the door seal leaks, or the vents inside are blocked by food, it has to work harder and may never reach temperature.',
      'Frequent power cuts and voltage surges are hard on fridges. The compressor and starter relay take a hit each time power returns, and a surge can damage the thermostat or control board. If you hear clicking but the compressor never runs, a failed relay or compressor is likely.',
    ],
    costFactors: [
      'Cleaning coils, adjusting the thermostat or replacing a door seal',
      'Replacing a thermostat, fan or starter relay',
      'Leak repair and a gas recharge',
      'Compressor replacement, the most expensive repair',
    ],
    faqs: [
      { q: 'Why is my freezer cold but the fridge warm?', a: 'In many frost-free fridges, a fan blows cold air from the freezer into the fridge. If the fan has failed or the vent is blocked by ice or food, the freezer stays cold but the fridge warms up.' },
      { q: 'Should I switch my fridge off during power cuts?', a: 'Switching it off at the socket during an outage, then back on a few minutes after power returns, protects it from the surge. A stabiliser or surge protector does this automatically.' },
    ],
  },

  'washing-machine-not-draining': {
    explain: [
      'A washing machine drains through a filter and a pump, usually behind a small panel at the bottom front of the machine. Coins, hair clips, buttons and lint collect in that filter and eventually block it. If the pump cannot push the water out, the machine stops mid-cycle or will not spin.',
      'If the filter is clear and the hose is not kinked, the drain pump itself may have failed: you might hear a hum with no water moving. A machine that drains but stops with an error code may have a control or sensor fault.',
    ],
    costFactors: [
      'Clearing a blocked filter or hose',
      'Replacing a failed drain pump',
      'Fixing a control board or pressure sensor fault',
      'Clearing a blockage in the house drain the machine empties into',
    ],
    faqs: [
      { q: 'How do I drain a washing machine full of water?', a: 'Switch it off and unplug it. Put towels and a shallow tray in front, then open the small filter panel at the bottom front. Many machines have a short drain hose behind it. Let the water out slowly before removing the filter.' },
      { q: 'Why does my washing machine smell?', a: 'Standing water in a blocked filter or hose, and detergent residue in the drum and door seal, cause smells. Clean the filter, wipe the seal, and run an empty hot wash.' },
    ],
  },

  'washing-machine-not-spinning': {
    explain: [
      'A washing machine will not spin if it has not drained, if the door lock has not engaged, or if the load is badly unbalanced. Most machines refuse to spin when one side is too heavy, to avoid damage, which is common with a single heavy item like a duvet or a pair of jeans.',
      'If none of those apply, the fault is mechanical or electrical: a worn drive belt, worn motor brushes, a failed motor, or a control fault. A machine that hums while the drum does not turn usually needs a technician.',
    ],
    costFactors: [
      'Rebalancing the load or clearing a drain blockage',
      'Replacing a door lock',
      'Replacing a drive belt or motor brushes',
      'Motor or control board repair',
    ],
    faqs: [
      { q: 'Why does my washing machine shake so much on spin?', a: 'Usually the load is unbalanced or the machine is not level. Adjust the feet so it sits firmly, and on a new machine make sure the transit bolts were removed. Worn shock absorbers also cause heavy shaking.' },
      { q: 'Can I run a spin-only cycle?', a: 'Most machines have a spin-only or drain-and-spin programme. If it will not run even that, the machine probably has a drain, door lock or motor fault.' },
    ],
  },

  'cockroaches-in-house': {
    explain: [
      'Cockroaches need food, water and somewhere to hide. Kitchens and bathrooms supply all three: crumbs, grease behind the cooker, leaking pipes, damp cupboards, and gaps around pipes and drains. In flats and estates they also move between units through shared drains and walls.',
      'Sprays kill the cockroaches you can see, but most of the population hides in cracks and lays eggs that sprays do not reach. Baits and gels that cockroaches carry back to their hiding places, combined with cleaning and sealing gaps, work far better.',
    ],
    costFactors: [
      'The size of the property and how many rooms are affected',
      'How severe the infestation is',
      'A follow-up treatment to catch hatching eggs',
      'Treating drains and shared areas as well as the kitchen',
    ],
    faqs: [
      { q: 'Why do I see cockroaches even though my house is clean?', a: 'They come in from drains, neighbouring flats and gaps around pipes, and they hide inside appliances and cracks. Sealing entry points and treating drains matters as much as cleaning.' },
      { q: 'How long does cockroach treatment take to work?', a: 'Bait treatments can take one to two weeks as cockroaches carry the bait back to their nests. You may see more at first as they are driven out. A follow-up treatment catches newly hatched ones.' },
    ],
  },

  'car-wont-start': {
    explain: [
      'Listen when you turn the key. Rapid clicking usually means a weak or flat battery, or corroded terminals. A single click with no cranking points to the starter motor or its solenoid. If the engine cranks normally but does not fire, the problem is fuel or ignition rather than the battery.',
      'Heat, short trips and cars left parked for days all drain batteries faster. Contaminated fuel, a failed fuel pump and a faulty immobiliser key can also stop a car starting. A mechanic can test the battery and charging system before replacing anything.',
    ],
    costFactors: [
      'Jump-starting or charging a flat battery',
      'Replacing the battery, or cleaning corroded terminals',
      'Repairing or replacing the starter motor',
      'Diagnosing a fuel pump, ignition or immobiliser fault',
    ],
    faqs: [
      { q: 'How do I know if it is the battery or the starter?', a: 'If the dashboard lights are dim or the car clicks rapidly, it is usually the battery. If the lights are bright but you hear a single click and no cranking, the starter is more likely. A mechanic can test both.' },
      { q: 'How long does a car battery last in Nigeria?', a: 'Commonly two to three years, sometimes less. Heat, short journeys and long periods parked shorten its life. A battery that struggles in the morning is often near the end.' },
    ],
  },

  'door-wont-close': {
    explain: [
      'Wooden doors swell in the rainy season as they absorb moisture, then shrink again in the dry season, so a door that was fine in February can stick in July. Hinges also loosen as the screws wear their holes, letting the door drop so it rubs at the top or catches at the bottom.',
      'Before planing a door, check the hinges. Tightening or replacing loose screws often fixes it. Planing removes wood for good, so it is best done when the door is at its most swollen, and the bare edge should be sealed or painted afterwards.',
    ],
    costFactors: [
      'Tightening or replacing hinge screws',
      'Replacing worn hinges',
      'Planing and sealing the door edge',
      'Realigning or replacing the strike plate or lock',
    ],
    faqs: [
      { q: 'Why does my door stick in the rainy season?', a: 'Wood absorbs moisture from humid air and swells, so the door rubs against the frame. Sealing or painting every edge of the door, including the top and bottom, reduces how much it swells.' },
      { q: 'Why won\'t my door lock line up?', a: 'If the door has dropped or the frame has moved, the latch no longer meets the strike plate. Tightening the hinges or moving the strike plate usually fixes it.' },
    ],
  },

  'gate-needs-welding': {
    explain: [
      'Gates take a lot of punishment: their own weight on the hinges, daily opening and closing, rain and rust, and the occasional knock from a vehicle. Over time welds crack, hinges wear, and posts rust or shift, so the gate sags, drags or will not latch.',
      'Rust is the main enemy. Where paint has chipped, water gets in and weakens the metal, especially at joints and at the base of posts. Repairs last longer when the welder grinds back the rust, reinforces the weak points, and finishes with an anti-rust primer and paint.',
    ],
    costFactors: [
      'Re-welding a broken joint or hinge',
      'Replacing hinges or adding a support wheel',
      'Replacing rusted sections or posts',
      'Sanding, priming and painting after the repair',
    ],
    faqs: [
      { q: 'Why does my gate keep breaking at the hinges?', a: 'Hinges carry the full weight of the gate. If they are undersized or the gate has no bracing, the welds fatigue and crack. A welder can fit heavier hinges, add diagonal bracing, or add a wheel.' },
      { q: 'Can rusted gate posts be repaired?', a: 'Often, by cutting out the rusted section and welding in new metal, or by reinforcing the base. If a post has rusted through at ground level, replacing it is usually better.' },
    ],
  },
};
