import type { GameEvent } from '@/engine/types'

// ── Events ──────────────────────────────────────────────────
// The game. The suffering. The dry humor.
// 55+ events across 10 categories. The writing IS the product.

export const events: GameEvent[] = [
  // ════════════════════════════════════════════════════════════
  // WEATHER EVENTS
  // ════════════════════════════════════════════════════════════

  {
    id: 'weather-thunder-treeline',
    text: 'Thunder rolls above treeline. You are the tallest object. Lightning has noticed.',
    category: 'weather',
    stages: [2, 3, 4],
    weight: 1,
    choices: [
      {
        text: 'Drop below treeline and shelter.',
        resultText: 'You lose time but keep your pulse. A reasonable trade.',
        effects: { time: 1.5, morale: -3 },
      },
      {
        text: 'Keep moving. You\'re faster than lightning. Probably.',
        resultText: 'You are not faster than lightning. But it misses. This time.',
        effects: { health: -8, morale: -5 },
      },
      {
        text: 'Crouch in lightning position and wait.',
        resultText: 'You crouch for 40 minutes feeling ridiculous. The storm passes. Your quads do not forgive you.',
        effects: { time: 0.75, feet: -4 },
      },
    ],
  },
  {
    id: 'weather-monsoon',
    text: 'The afternoon monsoon arrives on schedule. You are instantly soaked to a degree that seems physically impossible.',
    category: 'weather',
    stages: [3, 4, 5],
    weight: 1.5,
    autoEffect: { morale: -5, feet: -6, health: -3 },
    autoResultText: 'Your shoes now weigh twice what they did. Your socks have become an aquatic habitat.',
  },
  {
    id: 'weather-hail',
    text: 'Hail. Marble-sized. The sky has chosen violence.',
    category: 'weather',
    stages: [2, 3, 4],
    weight: 0.8,
    choices: [
      {
        text: 'Cover your head and push through.',
        resultText: 'You emerge bruised but moving. The hail was personal but brief.',
        effects: { health: -6, morale: -4 },
      },
      {
        text: 'Find shelter under a rock overhang.',
        resultText: 'You wait it out. The hail sounds like applause. It is not applause.',
        effects: { time: 1.0, morale: -2 },
      },
    ],
  },
  {
    id: 'weather-perfect',
    text: 'The weather is perfect. 65 degrees, light breeze, golden light. This is suspicious.',
    category: 'weather',
    stages: [0, 1, 2],
    weight: 0.5,
    autoEffect: { morale: 8 },
    autoResultText: 'You enjoy it while it lasts. It will not last.',
  },
  {
    id: 'weather-temp-drop',
    text: 'The temperature drops 30 degrees in 20 minutes. Your sweat-soaked shirt becomes a refrigeration unit.',
    category: 'weather',
    stages: [3, 4, 5, 7],
    weight: 1,
    choices: [
      {
        text: 'Put on every layer you have.',
        resultText: 'You resemble a trail-running burrito. Warmer, but running is now an interpretive dance.',
        effects: { health: -2, morale: -3, time: 0.5 },
      },
      {
        text: 'Run faster to generate heat.',
        resultText: 'Bold strategy. Your muscles generate warmth. Your lungs file a complaint.',
        effects: { health: -5, hydration: -4 },
      },
    ],
  },
  {
    id: 'weather-wind',
    text: 'The wind above the pass is trying to relocate you to an adjacent county.',
    category: 'weather',
    stages: [2, 3],
    weight: 1,
    autoEffect: { health: -4, morale: -5, hydration: -3 },
    autoResultText: 'You lean into it at 45 degrees. Forward progress is theoretical.',
  },
  {
    id: 'weather-sun-aggressive',
    text: 'The sun above 12,000 feet is not the same sun you trained under. This sun has intent.',
    category: 'weather',
    stages: [1, 2, 3],
    weight: 1,
    autoEffect: { hydration: -7, health: -3, morale: -2 },
    autoResultText: 'You apply sunscreen. It evaporates on contact. The sun is winning.',
  },
  {
    id: 'weather-fog',
    text: 'Fog. Visibility: approximately one arm length. The trail is theoretical.',
    category: 'weather',
    stages: [2, 3, 7, 8],
    weight: 0.8,
    choices: [
      {
        text: 'Follow your GPS. Trust technology.',
        resultText: 'Your GPS says you are in a lake. You are not in a lake. Probably.',
        effects: { time: 0.75, morale: -4 },
      },
      {
        text: 'Follow the cairns. Trust rocks.',
        resultText: 'The cairns lead you approximately correctly. Close enough for government work.',
        effects: { time: 0.5, morale: -2 },
      },
      {
        text: 'Follow the runner ahead of you.',
        resultText: 'They are also lost. Now you are lost together. This is marginally better.',
        effects: { time: 1.0, morale: -1 },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // TERRAIN EVENTS
  // ════════════════════════════════════════════════════════════

  {
    id: 'terrain-scree',
    text: 'A scree field. Every step slides back half a step. This is not running. This is negotiations with gravity.',
    category: 'terrain',
    stages: [2, 3, 4],
    weight: 1.5,
    autoEffect: { feet: -7, health: -4, morale: -3 },
    autoResultText: 'You cross it. Your ankles have developed trust issues.',
  },
  {
    id: 'terrain-mud-shoe',
    text: 'A mud hole that has been waiting for you specifically. It swallows your left shoe with a sound like satisfaction.',
    category: 'terrain',
    stages: [1, 4, 5],
    weight: 0.8,
    choices: [
      {
        text: 'Retrieve the shoe. Sacrifice dignity.',
        resultText: 'You retrieve the shoe. The mud takes a sock as a processing fee.',
        effects: { feet: -5, time: 0.5, morale: -3 },
      },
      {
        text: 'Abandon the shoe. Run with one.',
        resultText: 'This is a terrible idea. You know this. You do it anyway.',
        effects: { feet: -12, morale: -2 },
      },
    ],
  },
  {
    id: 'terrain-stream-crossing',
    text: 'A stream crossing. The bridge is three logs of varying commitment to remaining in place.',
    category: 'terrain',
    stages: [1, 2, 4, 5],
    weight: 1,
    choices: [
      {
        text: 'Use the logs. Channel your inner gymnast.',
        resultText: 'You cross with the grace of a newborn giraffe. But you cross.',
        effects: { morale: 2 },
      },
      {
        text: 'Wade through. Your feet are already wet.',
        resultText: 'Correct. Your feet are now wetter. A new personal record for wetness.',
        effects: { feet: -4, hydration: 2 },
      },
      {
        text: 'Search for a better crossing upstream.',
        resultText: 'There is no better crossing. You wade through anyway, 200 yards upstream.',
        effects: { feet: -4, time: 0.5 },
      },
    ],
  },
  {
    id: 'terrain-false-summit',
    text: 'You crest the ridge. There is another ridge. Behind it, if you look closely, is another ridge.',
    category: 'terrain',
    stages: [1, 2, 3, 8, 9],
    weight: 1.5,
    autoEffect: { morale: -8, feet: -3 },
    autoResultText: 'The mountain has a sense of humor. It is the only one laughing.',
  },
  {
    id: 'terrain-quad-descent',
    text: 'A descent so steep your quads begin composing their resignation letter.',
    category: 'terrain',
    stages: [3, 4, 7, 9],
    weight: 1,
    autoEffect: { feet: -6, health: -4 },
    autoResultText: 'You descend sideways, backwards, and at one point sitting. Dignity is a lowland concept.',
  },
  {
    id: 'terrain-technical-rock',
    text: 'A technical rock section that requires both hands and a prayer. Running is no longer the verb.',
    category: 'terrain',
    stages: [2, 3, 7],
    weight: 1,
    choices: [
      {
        text: 'Scramble carefully. Three points of contact.',
        resultText: 'Slow but alive. Your hands now look like you lost a fight with a cheese grater.',
        effects: { health: -3, time: 0.75, feet: -2 },
      },
      {
        text: 'Move fast. Momentum is your friend.',
        resultText: 'Momentum is not your friend. Momentum is chaotic neutral.',
        effects: { health: -7, feet: -5 },
      },
    ],
  },
  {
    id: 'terrain-snow-july',
    text: 'A snow patch. In July. At altitude, the calendar is a suggestion.',
    category: 'terrain',
    stages: [2, 3],
    weight: 0.7,
    autoEffect: { feet: -5, morale: -4, health: -3 },
    autoResultText: 'You posthole through knee-deep snow. Summer is a concept that does not apply here.',
  },
  {
    id: 'terrain-trail-split',
    text: 'The trail splits. Neither option has a marker. Both look equally wrong.',
    category: 'terrain',
    stages: [1, 4, 5, 7],
    weight: 1,
    choices: [
      {
        text: 'Go left. Left feels right.',
        resultText: 'Left was correct. Sometimes feelings are data.',
        effects: { morale: 3 },
      },
      {
        text: 'Go right. The right path is always right.',
        resultText: 'Right was wrong. You backtrack half a mile. Wordplay has failed you.',
        effects: { time: 0.75, morale: -4 },
      },
      {
        text: 'Wait for another runner to go first.',
        resultText: 'No one comes. You pick a direction. It is acceptable.',
        effects: { time: 0.5, morale: -2 },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // AID STATION EVENTS
  // ════════════════════════════════════════════════════════════

  {
    id: 'aid-chair-trap',
    text: 'You sit down at the aid station. The chair is comfortable. Dangerously comfortable.',
    category: 'aidStation',
    stages: [0, 2, 4, 5, 6, 8],
    weight: 1.5,
    choices: [
      {
        text: 'Get up immediately. Chairs are the enemy.',
        resultText: 'You stand before the chair can claim you. Wise.',
        effects: { morale: -3 },
      },
      {
        text: 'Five more minutes. Just five.',
        resultText: 'It has been 25 minutes. The volunteers are looking at you with concern.',
        effects: { time: 1.5, morale: 5, health: 3 },
      },
      {
        text: 'Lie down. Just for a second.',
        resultText: 'You wake up 40 minutes later under a space blanket you don\'t remember accepting.',
        effects: { time: 2.0, morale: 4, health: 5 },
      },
    ],
  },
  {
    id: 'aid-you-look-strong',
    text: 'A volunteer looks at you and says, "You look strong." This is either encouragement or perjury.',
    category: 'aidStation',
    stages: [0, 2, 4, 5, 6, 8],
    weight: 1,
    autoEffect: { morale: 5 },
    autoResultText: 'You choose to believe them. This is what faith looks like at mile 50.',
  },
  {
    id: 'aid-ramen-broth',
    text: 'Ramen or broth? The biggest decision you will make today. Possibly ever.',
    category: 'aidStation',
    stages: [4, 5, 6, 8],
    weight: 1,
    choices: [
      {
        text: 'Ramen. You need the noodles.',
        resultText: 'The ramen is transcendent. For 90 seconds, suffering does not exist.',
        effects: { stomach: 8, morale: 6 },
      },
      {
        text: 'Broth. Keep it simple.',
        resultText: 'The broth is warm and salty. Your body accepts it like a peace offering.',
        effects: { stomach: 5, hydration: 4, morale: 3 },
      },
      {
        text: 'Both. This is no time for restraint.',
        resultText: 'You consume both. Your stomach will have opinions about this in 3 miles.',
        effects: { stomach: 4, morale: 8, time: 0.5 },
      },
    ],
  },
  {
    id: 'aid-watch-dnf',
    text: 'A runner at the aid station pulls their bib off. They are done. The volunteers are kind. You look away.',
    category: 'aidStation',
    stages: [4, 5, 6, 8],
    weight: 0.8,
    choices: [
      {
        text: 'Keep moving. Don\'t look.',
        resultText: 'You leave quickly. The image stays.',
        effects: { morale: -5 },
      },
      {
        text: 'Say something encouraging as you pass.',
        resultText: '"Good effort." They nod. You both know the weight of those words.',
        effects: { morale: -2 },
      },
    ],
  },
  {
    id: 'aid-music',
    text: 'The aid station is playing music. It is a song you associate with a good memory. Your eyes are suddenly wet.',
    category: 'aidStation',
    stages: [2, 4, 5, 6, 8],
    weight: 0.7,
    autoEffect: { morale: 7 },
    autoResultText: 'You blame the altitude. Everyone knows you are lying. No one says anything.',
  },
  {
    id: 'aid-drop-bag-missing',
    text: 'You can\'t find your drop bag. You check twice. Three times. It is in a dimension adjacent to this one.',
    category: 'aidStation',
    stages: [2, 4, 5, 6, 8],
    weight: 0.6,
    choices: [
      {
        text: 'Ask a volunteer to help look.',
        resultText: 'They find it. It was labeled with someone else\'s number. Chaos is the default state.',
        effects: { time: 0.5, morale: -3 },
      },
      {
        text: 'Improvise with what the aid station has.',
        resultText: 'You leave with generic supplies and a grudge against logistics.',
        effects: { morale: -5, stomach: 3 },
      },
    ],
  },
  {
    id: 'aid-quesadilla',
    text: 'A volunteer hands you a quesadilla. It is the single greatest thing you have ever eaten.',
    category: 'aidStation',
    stages: [4, 5, 6, 8],
    weight: 0.8,
    autoEffect: { stomach: 10, morale: 8 },
    autoResultText: 'You eat it standing. Cheese has never tasted like this. Nothing will ever taste like this again.',
  },

  // ════════════════════════════════════════════════════════════
  // FUELING EVENTS
  // ════════════════════════════════════════════════════════════

  {
    id: 'fuel-gel-objection',
    text: 'You eat a gel. Your stomach files a formal objection and requests arbitration.',
    category: 'fueling',
    weight: 1.5,
    autoEffect: { stomach: -5, morale: -2 },
    autoResultText: 'The gel sits in your stomach like a small, caffeinated protest.',
  },
  {
    id: 'fuel-forgot-to-eat',
    text: 'You realize you haven\'t eaten in 3 hours. The bonk is not coming. The bonk is here.',
    category: 'fueling',
    weight: 1,
    autoEffect: { health: -6, morale: -5, stomach: -4 },
    autoResultText: 'Your body switches to burning delusion for energy. The conversion rate is poor.',
  },
  {
    id: 'fuel-pickle-juice',
    text: 'A stranger offers you pickle juice from a flask. This is either salvation or a trap.',
    category: 'fueling',
    weight: 0.8,
    choices: [
      {
        text: 'Accept the pickle juice. What\'s the worst that could happen?',
        resultText: 'It is disgusting and exactly what your body needed. The line between medicine and suffering is thin.',
        effects: { hydration: 8, stomach: 3, morale: 2 },
      },
      {
        text: 'Decline politely. Trust nothing.',
        resultText: 'You decline. Three miles later you regret this with your entire being.',
        effects: { morale: -3 },
      },
    ],
  },
  {
    id: 'fuel-calorie-math',
    text: 'You attempt calorie math. Calories in: 1,200. Calories out: approximately 8,000. The math has diverged.',
    category: 'fueling',
    weight: 1,
    autoEffect: { stomach: -3, morale: -4 },
    autoResultText: 'You stop doing math. This is the correct decision.',
  },
  {
    id: 'fuel-tailwind-regret',
    text: 'Your Tailwind mix has been sitting in the sun for 6 hours. It now tastes like warm regret with electrolytes.',
    category: 'fueling',
    stages: [3, 4, 5, 6],
    weight: 1,
    choices: [
      {
        text: 'Drink it anyway. Hydration is hydration.',
        resultText: 'You drink warm, slightly chemical liquid. Your standards have never been lower.',
        effects: { hydration: 5, stomach: -3, morale: -2 },
      },
      {
        text: 'Dump it. Fill with water at the next source.',
        resultText: 'The next water source is 4 miles away. You think about this the entire time.',
        effects: { hydration: -5 },
      },
    ],
  },
  {
    id: 'fuel-real-food',
    text: 'You eat real food for the first time in hours. A potato with salt. It is transcendent.',
    category: 'fueling',
    stages: [2, 4, 5, 6, 8],
    weight: 0.8,
    autoEffect: { stomach: 8, morale: 6, health: 3 },
    autoResultText: 'A boiled potato with salt. You would write a sonnet about this potato if you could hold a pen.',
  },
  {
    id: 'fuel-burrito-reckoning',
    text: 'The gas station burrito from mile 30 has arrived at its destination. Your stomach is the destination.',
    category: 'fueling',
    stages: [4, 5, 6, 7],
    weight: 0.7,
    autoEffect: { stomach: -10, health: -3, morale: -4, time: 0.5 },
    autoResultText: 'You spend quality time in a port-a-potty at 11,000 feet. The view from the vent is actually quite nice.',
  },

  // ════════════════════════════════════════════════════════════
  // MENTAL / MORALE EVENTS
  // ════════════════════════════════════════════════════════════

  {
    id: 'mental-why',
    text: '"Why am I doing this?" You ask the question aloud. The mountain does not answer. A marmot stares.',
    category: 'mental',
    weight: 2,
    autoEffect: { morale: -5 },
    autoResultText: 'The marmot offers no insight. You continue for reasons that predate language.',
  },
  {
    id: 'mental-climb-profile',
    text: 'You look at the next climb profile on your watch. It appears to be a vertical line. This seems like a data error. It is not.',
    category: 'mental',
    stages: [1, 2, 4, 7, 8],
    weight: 1,
    autoEffect: { morale: -7 },
    autoResultText: 'You zoom out on the elevation profile. This makes it worse.',
  },
  {
    id: 'mental-counting-steps',
    text: 'You begin counting steps to pass the time. You lose count at 347. Or was it 743.',
    category: 'mental',
    weight: 0.8,
    autoEffect: { morale: -2 },
    autoResultText: 'You start over. You lose count again. Numbers have become unreliable.',
  },
  {
    id: 'mental-effortless-runner',
    text: 'A runner passes you looking effortless. Their form is perfect. They smell like fresh laundry.',
    category: 'mental',
    stages: [1, 2, 3, 4, 5],
    weight: 1,
    autoEffect: { morale: -8, health: -2 },
    autoResultText: 'You question every training decision you have ever made. All of them.',
  },
  {
    id: 'mental-hallucinate-finish',
    text: 'You see the finish line ahead. Lights, banners, cheering. It is a parking lot. The finish is 22 miles away.',
    category: 'mental',
    stages: [5, 6, 7],
    weight: 0.7,
    autoEffect: { morale: -10 },
    autoResultText: 'The parking lot does not care about your feelings.',
  },
  {
    id: 'mental-cutoff-math',
    text: 'You do math on the cutoffs. Miles remaining divided by pace equals... no. You do it again. Same answer.',
    category: 'mental',
    stages: [4, 5, 6, 7, 8],
    weight: 1,
    choices: [
      {
        text: 'Push the pace. You can make it.',
        resultText: 'You accelerate. The math improves slightly. Your body objects loudly.',
        effects: { morale: 3, health: -5, feet: -4 },
      },
      {
        text: 'Accept the math. Run your race.',
        resultText: 'You accept the math. The math is unkind but honest.',
        effects: { morale: -5 },
      },
    ],
  },
  {
    id: 'mental-paid-money',
    text: 'You remember you paid $350 to do this. The registration fee included a t-shirt. The t-shirt seems insufficient.',
    category: 'mental',
    weight: 1,
    autoEffect: { morale: -4 },
    autoResultText: 'The cost-per-mile math is unflattering. The cost-per-smile math is catastrophic.',
  },
  {
    id: 'mental-almost-there',
    text: 'A volunteer says "you\'re almost there." The next aid station is 8 miles away.',
    category: 'mental',
    stages: [3, 5, 7, 8, 9],
    weight: 1,
    autoEffect: { morale: -6 },
    autoResultText: '"Almost" is doing a lot of work in that sentence.',
  },
  {
    id: 'mental-see-remaining-course',
    text: 'You crest the ridge and see the entire remaining course laid out before you. Every climb. Every valley. All of it.',
    category: 'mental',
    stages: [2, 3, 5],
    weight: 0.7,
    autoEffect: { morale: -9 },
    autoResultText: 'Knowledge is power. This knowledge is powerlessness.',
  },
  {
    id: 'mental-mantra',
    text: 'You develop a mantra. "Relentless forward progress." You repeat it until the words lose all meaning.',
    category: 'mental',
    weight: 0.8,
    choices: [
      {
        text: 'Keep repeating. Mantras work. Probably.',
        resultText: 'The mantra becomes white noise. Your legs continue regardless. Maybe that was the point.',
        effects: { morale: 3 },
      },
      {
        text: 'Switch to counting. Numbers are more honest.',
        resultText: 'Numbers are honest. Honestly depressing.',
        effects: { morale: -2 },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // GEAR EVENTS
  // ════════════════════════════════════════════════════════════

  {
    id: 'gear-headlamp-flicker',
    text: 'Your headlamp flickers twice, dims, then continues at a brightness best described as "theoretical."',
    category: 'gear',
    stages: [7, 8, 9],
    weight: 1,
    choices: [
      {
        text: 'Switch batteries now.',
        resultText: 'You change batteries in the dark. This takes four times longer than it should.',
        effects: { time: 0.5, morale: 3 },
      },
      {
        text: 'It\'ll hold. Denial is free.',
        resultText: 'It holds for exactly 2 more miles, then dies completely. Denial was not, in fact, free.',
        effects: { morale: -8, health: -4 },
      },
    ],
  },
  {
    id: 'gear-blister-government',
    text: 'The blister on your right foot has formed a government. It has demands.',
    category: 'gear',
    weight: 1.5,
    choices: [
      {
        text: 'Stop and tape it properly.',
        resultText: 'You perform trailside surgery with Leukotape and determination. It holds.',
        effects: { time: 0.5, feet: 4 },
      },
      {
        text: 'Ignore it. Pain is information. Ignore the information.',
        resultText: 'The blister establishes a second settlement on the adjacent toe. Manifest destiny.',
        effects: { feet: -8, morale: -3 },
      },
    ],
  },
  {
    id: 'gear-pole-collapse',
    text: 'Your trekking pole collapses mid-climb. The locking mechanism has chosen this moment to express its feelings about planned obsolescence.',
    category: 'gear',
    stages: [2, 3, 4, 8, 9],
    weight: 0.8,
    autoEffect: { feet: -4, morale: -5, health: -3 },
    autoResultText: 'You are now a tripod. The remaining pole does its best.',
  },
  {
    id: 'gear-shoe-untied',
    text: 'Your shoe is untied. Bending over at mile 60 is an act of ambition.',
    category: 'gear',
    stages: [5, 6, 7, 8, 9],
    weight: 1,
    choices: [
      {
        text: 'Stop and tie it. Like a responsible adult.',
        resultText: 'You bend over. Your back makes a sound. But the shoe is tied.',
        effects: { time: 0.25, health: -2 },
      },
      {
        text: 'Run with it untied. What could happen?',
        resultText: 'You trip on the lace 800 meters later. The ground is unforgiving at this altitude.',
        effects: { health: -6, feet: -4, morale: -3 },
      },
    ],
  },
  {
    id: 'gear-chafing',
    text: 'Something is chafing. You cannot identify what. The pain has become omnidirectional.',
    category: 'gear',
    weight: 1.5,
    autoEffect: { health: -3, morale: -5 },
    autoResultText: 'You apply Body Glide to your general vicinity. Some of it helps. You\'re not sure which part.',
  },
  {
    id: 'gear-watch-dies',
    text: 'Your GPS watch dies. You no longer know your pace, heart rate, or identity.',
    category: 'gear',
    stages: [4, 5, 6, 7],
    weight: 0.6,
    autoEffect: { morale: -6 },
    autoResultText: 'Running without data. You feel naked. Also, you might actually be lost.',
  },

  // ════════════════════════════════════════════════════════════
  // SOCIAL EVENTS
  // ════════════════════════════════════════════════════════════

  {
    id: 'social-pacer-chatty',
    text: 'Your pacer arrives at mile 62. They are fresh. They are chatty. They want to discuss your nutrition strategy.',
    category: 'social',
    stages: [6, 7, 8],
    weight: 1,
    choices: [
      {
        text: 'Engage. Human connection is fuel.',
        resultText: 'You discuss nutrition for 20 minutes. Your pacer is delightful. You feel less alone.',
        effects: { morale: 8, health: 2 },
      },
      {
        text: '"No talking." Enforce silence.',
        resultText: 'Your pacer nods. They understand. You run in blessed silence. Occasionally they hand you food.',
        effects: { morale: 4 },
      },
      {
        text: 'Grunt occasionally. The minimum viable conversation.',
        resultText: 'Your pacer adapts. Communication is reduced to grunts and pointing. It works.',
        effects: { morale: 5 },
      },
    ],
  },
  {
    id: 'social-runner-crying',
    text: 'Another runner is crying at the side of the trail. Not injured. Just... processing.',
    category: 'social',
    stages: [3, 4, 5, 7],
    weight: 0.8,
    choices: [
      {
        text: 'Stop and check on them.',
        resultText: '"I\'m fine," they say, clearly not fine. You offer a gel. They take it. You both continue.',
        effects: { morale: 3, time: 0.25 },
      },
      {
        text: 'Keep moving. They understand.',
        resultText: 'You pass with a nod. They nod back. The social contract of ultrarunning.',
        effects: { morale: -2 },
      },
    ],
  },
  {
    id: 'social-day-hiker',
    text: 'A day-hiker with a 60-liter pack asks, "Are you running a marathon?" You weigh your response.',
    category: 'social',
    stages: [1, 2, 3],
    weight: 0.8,
    choices: [
      {
        text: '"Sort of."',
        resultText: 'They look impressed. You feel nothing. This interaction cost you energy you cannot spare.',
        effects: { morale: -1 },
      },
      {
        text: 'Explain the full distance and elevation.',
        resultText: 'Their face transitions through disbelief, concern, and pity. They offer you a granola bar.',
        effects: { morale: 2, stomach: 3, time: 0.25 },
      },
    ],
  },
  {
    id: 'social-hardrock-qualifier',
    text: 'A Hardrock qualifier passes you at a pace that suggests they are warming up. They wave.',
    category: 'social',
    stages: [2, 3, 4, 5],
    weight: 0.7,
    autoEffect: { morale: -6 },
    autoResultText: 'They disappear up the climb like the mountain is a personal friend. You watch them go.',
  },
  {
    id: 'social-crew-sign',
    text: 'Your crew has a sign. It says something motivational. You cannot read it because your eyes have stopped cooperating.',
    category: 'social',
    stages: [4, 5, 6, 8],
    weight: 0.7,
    autoEffect: { morale: 6 },
    autoResultText: 'You wave. They cheer. The sign probably says something nice. It is enough.',
  },
  {
    id: 'social-sandal-runner',
    text: 'A local trail runner casually jogs past in sandals. They are not in the race. They are just commuting.',
    category: 'social',
    stages: [0, 1, 2, 6],
    weight: 0.5,
    autoEffect: { morale: -7 },
    autoResultText: 'You stare at their sandals. They stare at your $200 trail shoes. No words are exchanged. None are needed.',
  },
  {
    id: 'social-runner-bond',
    text: 'You fall into pace with another runner. You don\'t speak for 3 miles. It is the deepest friendship of your life.',
    category: 'social',
    stages: [3, 4, 5, 6, 7],
    weight: 0.8,
    autoEffect: { morale: 7, health: 2 },
    autoResultText: 'They eventually turn off at an aid station. You feel the loss immediately.',
  },

  // ════════════════════════════════════════════════════════════
  // HALLUCINATION EVENTS
  // ════════════════════════════════════════════════════════════

  {
    id: 'halluc-building-rock',
    text: 'You see a building ahead. Lights, a roof, possibly a door. It is a rock. The rock is four feet tall.',
    category: 'hallucination',
    stages: [7, 8, 9],
    weight: 1,
    autoEffect: { morale: -5, health: -2 },
    autoResultText: 'You walk to the rock. You stand next to the rock. It is definitely a rock.',
  },
  {
    id: 'halluc-trail-breathing',
    text: 'The trail is breathing. A slow, rhythmic undulation. This seems wrong, but you cannot identify why.',
    category: 'hallucination',
    stages: [7, 8, 9],
    weight: 0.7,
    autoEffect: { morale: -6, health: -3 },
    autoResultText: 'You watch the trail breathe for a while. It\'s oddly calming. This should concern you more than it does.',
  },
  {
    id: 'halluc-conversation',
    text: 'You have been having a pleasant conversation for 20 minutes. You turn to respond. No one is there. No one has been there.',
    category: 'hallucination',
    stages: [7, 8, 9],
    weight: 0.6,
    autoEffect: { morale: -4, health: -4 },
    autoResultText: 'The conversation was good, though. Whoever wasn\'t there had excellent points.',
  },
  {
    id: 'halluc-bear-stump',
    text: 'You see a bear. Your adrenaline spikes. It is a stump. You laugh. The next stump is a bear.',
    category: 'hallucination',
    stages: [7, 8, 9],
    weight: 0.5,
    choices: [
      {
        text: 'Make noise and back away slowly.',
        resultText: 'It was actually a bear. It is uninterested in you. You are not food-adjacent enough to matter.',
        effects: { morale: -5, time: 0.5 },
      },
      {
        text: 'It\'s another stump. Keep going.',
        resultText: 'It was a stump. Or a bear that looked like a stump. At this point, the distinction is philosophical.',
        effects: { morale: -3 },
      },
    ],
  },
  {
    id: 'halluc-colors',
    text: 'The darkness has developed colors. They are not colors that exist in nature. Your brain is freelancing.',
    category: 'hallucination',
    stages: [7, 8],
    weight: 0.5,
    autoEffect: { morale: -3, health: -2 },
    autoResultText: 'You observe the colors with clinical detachment. This is what 30 hours without sleep looks like in HD.',
  },

  // ════════════════════════════════════════════════════════════
  // CUTOFF EVENTS
  // ════════════════════════════════════════════════════════════

  {
    id: 'cutoff-volunteer-watch',
    text: 'An aid station volunteer checks their watch while looking at you. Then checks it again. Their face is diplomatic.',
    category: 'cutoff',
    stages: [4, 5, 6, 8],
    weight: 1,
    autoEffect: { morale: -8 },
    autoResultText: 'You don\'t ask what time it is. You know what time it is. The question is what time it needs to be.',
  },
  {
    id: 'cutoff-math-twice',
    text: 'You do the cutoff math. Distance divided by pace equals... you do it again, hoping for different results.',
    category: 'cutoff',
    stages: [5, 6, 7, 8],
    weight: 1,
    choices: [
      {
        text: 'Pick up the pace. The math can change.',
        resultText: 'You push harder. The math shifts from impossible to improbable. This feels like progress.',
        effects: { health: -5, feet: -4, morale: 2, hydration: -3 },
      },
      {
        text: 'Run your own race. The math will do what it does.',
        resultText: 'You accept reality. Reality is indifferent to your acceptance.',
        effects: { morale: -4 },
      },
    ],
  },
  {
    id: 'cutoff-45-minutes',
    text: 'The cutoff is in 45 minutes. The next aid station is 6 miles away. You are not a 6-miles-in-45-minutes person today.',
    category: 'cutoff',
    stages: [5, 6, 7, 8],
    weight: 0.7,
    autoEffect: { morale: -10, health: -3 },
    autoResultText: 'You run anyway. Because what else is there to do.',
  },
  {
    id: 'cutoff-last-runner',
    text: 'You are the last runner on the course. The sweeper is visible behind you. They are patient. This patience is terrifying.',
    category: 'cutoff',
    stages: [6, 7, 8, 9],
    weight: 0.5,
    autoEffect: { morale: -7, health: -2 },
    autoResultText: 'You and the sweeper develop a relationship. It is not the kind you wanted.',
  },

  // ════════════════════════════════════════════════════════════
  // ALTITUDE EVENTS
  // ════════════════════════════════════════════════════════════

  {
    id: 'altitude-13k',
    text: 'You are above 13,000 feet. The air contains approximately 40% less oxygen than you would prefer.',
    category: 'altitude',
    stages: [3],
    weight: 1.5,
    autoEffect: { health: -6, hydration: -5, morale: -3 },
    autoResultText: 'Each breath is an act of negotiation with the atmosphere. The atmosphere is winning.',
  },
  {
    id: 'altitude-thin-thoughts',
    text: 'The air is thin. Your thoughts are thinner. You try to remember your race plan and produce only static.',
    category: 'altitude',
    stages: [2, 3],
    weight: 1,
    autoEffect: { health: -4, morale: -5 },
    autoResultText: 'Your brain is operating on reduced power mode. Essential functions only. Running is, apparently, not essential.',
  },
  {
    id: 'altitude-headache',
    text: 'Altitude headache. The mountain is squeezing your brain like a stress ball.',
    category: 'altitude',
    stages: [2, 3, 4],
    weight: 1,
    choices: [
      {
        text: 'Take ibuprofen and push through.',
        resultText: 'The ibuprofen negotiates a ceasefire. Your brain and the mountain reach a temporary accord.',
        effects: { health: 4, stomach: -3 },
      },
      {
        text: 'Slow down and breathe deeply.',
        resultText: 'You slow to a walk. The headache dims from screaming to muttering. Progress.',
        effects: { health: 2, time: 0.75, morale: -2 },
      },
    ],
  },
  {
    id: 'altitude-nausea',
    text: 'The altitude has reached your stomach. The feeling is best described as "your body disagreeing with your decisions."',
    category: 'altitude',
    stages: [2, 3, 4],
    weight: 0.8,
    autoEffect: { stomach: -7, health: -3, morale: -4 },
    autoResultText: 'You walk slowly and breathe through your nose. The trail does not care about your discomfort.',
  },

  // ════════════════════════════════════════════════════════════
  // WILDLIFE EVENTS
  // ════════════════════════════════════════════════════════════

  {
    id: 'wildlife-marmot',
    text: 'A marmot sits on a rock, watching you struggle up the climb. It is well-fed. It is judgmental.',
    category: 'wildlife',
    stages: [2, 3, 4],
    weight: 0.8,
    autoEffect: { morale: 3 },
    autoResultText: 'The marmot whistles. You choose to interpret this as encouragement.',
  },
  {
    id: 'wildlife-elk',
    text: 'An elk stands in the trail. It is larger than you remember elk being. It does not intend to move.',
    category: 'wildlife',
    stages: [1, 4, 5, 7],
    weight: 0.5,
    choices: [
      {
        text: 'Go around it. Wide berth.',
        resultText: 'You bushwhack through dense undergrowth for 100 yards. The elk watches with total indifference.',
        effects: { time: 0.5, feet: -3 },
      },
      {
        text: 'Wait. The elk has seniority.',
        resultText: 'The elk eventually wanders off. It took 15 minutes. The elk does not acknowledge this delay.',
        effects: { time: 0.5, morale: -2 },
      },
    ],
  },
  {
    id: 'wildlife-pika',
    text: 'A pika squeaks at you from a rock pile. It is tiny. It is angry. It lives here and you do not.',
    category: 'wildlife',
    stages: [2, 3],
    weight: 0.5,
    autoEffect: { morale: 4 },
    autoResultText: 'You appreciate the pika. The pika does not appreciate you. This is fair.',
  },
]
