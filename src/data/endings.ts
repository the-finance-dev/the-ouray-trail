// ── Endings ─────────────────────────────────────────────────
// How it ends. There are four ways, and three of them are bad.

// ── Death Messages ──────────────────────────────────────────
// Triggered when health or hydration hits 0.

export const deathMessages: string[] = [
  'You died of low vert.',
  'You trusted the weather forecast.',
  'You tried to race a Hardrocker downhill.',
  'Your feet filed a formal grievance. Then seceded.',
  'You achieved maximum dehydration.',
  'You ate the gas station burrito. It ate you back.',
  'You stopped to \'rest your eyes.\' That was 2024.',
  'The mountain accepted your resignation.',
  'You bonked so hard your watch auto-uploaded a DNF to Strava.',
  'You took ibuprofen on an empty stomach. The stomach won.',
  'A volunteer found you arguing with a tree.',
  'You mistook a cliff for a switchback. In your defense, it was dark.',
  'You began bargaining with the mountain. The mountain declined.',
  'Your pacer finished without you.',
  'You were rescued by a 14er day-hiker in cotton.',
  'You fell asleep in the aid station soup.',
  'You attempted a river crossing. The river was not negotiating.',
  'Your body held a vote. The motion to continue failed unanimously.',
  'You entered the death zone. The name was not metaphorical.',
]

// ── DNF Messages ────────────────────────────────────────────
// Triggered when morale, feet, or stomach hits 0.

export const dnfMessages: string[] = [
  'You sat down at the aid station. This was unwise.',
  'You stopped for \'just a minute.\' The minute has relatives.',
  'Your crew talked you out of continuing. They were correct.',
  'You looked at the next climb profile and chose peace.',
  'You texted your crew \'coming in\' and got in their car.',
  'You decided 62 miles was enough story for dinner parties.',
  'Your stomach voted no. Your feet seconded. Motion carried.',
  'You DNF\'d with dignity. Or at least without crying publicly.',
  'You handed your bib to a volunteer. They\'d seen that look before.',
  'You called it a \'strategic withdrawal.\' Your legs called it quits.',
]

// ── Cutoff Messages ─────────────────────────────────────────
// Triggered when time exceeds the cutoff.

export const cutoffMessages: string[] = [
  'You missed the cutoff by 4 minutes. The math was never going to work.',
  'You check the cutoff math again. It is somehow worse now.',
  'The volunteers have started packing the aid station. This is a sign.',
  'Time\'s up. The course won.',
  'You were on pace until you weren\'t.',
  'The cutoff passed you while you were in the port-a-potty.',
  'The sweeper caught you. They were very kind about it.',
  'You arrived at the aid station to find it gone. Temporally and physically.',
]

// ── Finish Messages ─────────────────────────────────────────
// Triggered when you actually complete all stages. Against all odds.

export const finishMessages: string[] = [
  'You have reached the finish line. You are holding soup and staring into space.',
  'You finished. Technically alive.',
  'You crossed the line and immediately forgot why you were upset.',
  'You finished and hugged a stranger. They understood.',
  'You are now an ultramarathoner. This explains nothing to your family.',
  'You finished. Your watch says 99.7 miles. The RD says it counts.',
  'You reached the finish and sat down. Standing is a tomorrow problem.',
  'You finished the Ouray 100. You will sign up again within 48 hours.',
  'You crossed the finish line. Your buckle is heavier than your will to stand.',
  'You finished. Your crew is crying. You are eating a quesadilla.',
]
