document.addEventListener('DOMContentLoaded', () => {
	
	// --- START: Interactive Dock Text Code ---

// Ensure this runs after the DOM is loaded.
// If you ALREADY have a 'DOMContentLoaded' listener in your script.js,
// put the code INSIDE that existing listener.
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the elements needed for this feature
    const overlayTitle = document.getElementById('overlay-title');
    const overlayTagline = document.getElementById('overlay-tagline');
    const dock = document.querySelector('.macos-dock'); // Find the dock container

    // --- Error Checking ---
    // Check if the necessary elements exist before proceeding
    if (!overlayTitle || !overlayTagline || !dock) {
        console.error("Interactive text elements (overlay title/tagline or dock) not found. Feature disabled.");
        return; // Stop this specific feature if elements are missing
    }

    const dockLinks = dock.querySelectorAll('a'); // Select all links *within* the dock

    if (dockLinks.length === 0) {
        console.warn("No links found within the dock for interactive text. Feature disabled.");
        return; // Stop if no links to attach listeners to
    }

    // Store default text (make sure these elements exist first)
    const defaultTitle = overlayTitle.textContent;
    const defaultTagline = overlayTagline.textContent;
    // console.log("Default text stored:", defaultTitle, defaultTagline); // Debug log

    // Add hover listeners to each link in the dock
    dockLinks.forEach(link => {
        link.addEventListener('mouseover', (event) => {
            // console.log("Hovering over:", link.getAttribute('data-title')); // Debug log
            const title = link.getAttribute('data-title');
            const tagline = link.getAttribute('data-tagline');

            // Update text only if the attribute exists
            if (title !== null) {
                overlayTitle.textContent = title;
            }
            if (tagline !== null) {
                overlayTagline.textContent = tagline;
            } else {
                 overlayTagline.textContent = ''; // Clear tagline if attribute is missing
            }
        });
    });

    // Add listener to the dock container to reset text when mouse leaves
    // Using 'mouseleave' is generally better than 'mouseout' here
    dock.addEventListener('mouseleave', () => {
        // console.log("Mouse left dock, resetting text."); // Debug log
        // Only reset if the elements were found initially
        if (overlayTitle) {
             overlayTitle.textContent = defaultTitle;
        }
       if (overlayTagline) {
            overlayTagline.textContent = defaultTagline;
       }
    });

    // Optional: Log success for this specific feature
    console.log("Interactive dock text feature initialized.");

}); // End of the DOMContentLoaded listener

// --- END: Interactive Dock Text Code ---

    // Expand/Collapse Functionality
    const allToggles = document.querySelectorAll('.expand-toggle'); // Define allToggles

    // Make sure allToggles were actually found before trying to loop through them
    if (allToggles.length > 0) {
        allToggles.forEach(toggle => { // Use allToggles
            toggle.addEventListener('click', () => {
                const content = toggle.nextElementSibling;
                // Check if the content element exists and has the expand-content class
                if (content && content.classList.contains('expand-content')) {
                    const isExpanded = content.classList.contains('expanded');

                    if (isExpanded) {
                        // --- Collapse ---
                        // Remove class to trigger CSS transition closing
                        content.classList.remove('expanded');
                        toggle.setAttribute('aria-expanded', 'false');
                        if (toggle.textContent.includes('[-]')) {
                            toggle.textContent = toggle.textContent.replace('[-]', '[+]');
                        }
                        // Optional: Add hidden back AFTER animation completes if needed,
                        // but relying on CSS max-height:0 is usually sufficient.
                        // Example using setTimeout:
                        // setTimeout(() => {
                        //    if (!content.classList.contains('expanded')) { // Check state again in case user clicked fast
                        //        content.setAttribute('hidden', '');
                        //    }
                        // }, 1000); // Match CSS transition duration (1s = 1000ms)

                    } else {
                        // --- Expand ---
                        // 1. Remove 'hidden' attribute FIRST
                        content.removeAttribute('hidden');

                        // 2. Use requestAnimationFrame to add 'expanded' class slightly AFTER 'hidden' is removed
                        requestAnimationFrame(() => {
                            content.classList.add('expanded');
                        });

                        // 3. Update aria and text immediately
                        toggle.setAttribute('aria-expanded', 'true');
                        if (toggle.textContent.includes('[+]')) {
                            toggle.textContent = toggle.textContent.replace('[+]', '[-]');
                        }
                    }
                } else {
                    // This log helps if the HTML structure is wrong
                    console.error("Could not find the .expand-content element immediately following the toggle button:", toggle);
                }
            });
        });
    } else {
        // This log helps if the buttons themselves aren't found
        console.warn("No elements found with the class '.expand-toggle'. Expand/collapse will not work.");
    }

    // Glossary Link Functionality (Placeholder)
    const glossaryLinks = document.querySelectorAll('.glossary-link');
    if (glossaryLinks.length > 0) {
        glossaryLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const term = link.getAttribute('data-term');
            });
        });
    }

    // Toggle Commentary Placeholder
    const commentaryToggle = document.getElementById('toggle-commentary');
    if (commentaryToggle) {
        commentaryToggle.addEventListener('change', () => {
            if (commentaryToggle.checked) {
                console.log("Show commentary - Implement logic");
                document.body.classList.add('show-commentary');
            } else {
                console.log("Hide commentary - Implement logic");
                document.body.classList.remove('show-commentary');
            }
        });
    }

     // Glossary Button Placeholder
     const glossaryButton = document.getElementById('glossary-button');
     if (glossaryButton) {
         glossaryButton.addEventListener('click', () => {
             alert('Glossary button clicked. Implement glossary display logic here.');
         });
     }

/* ----- Glossary Popup Functionality (Corrected String Formatting) ----- */

// Object to store glossary definitions (Term Key : Definition)
// Using template literals (backticks `` ` ``) for definitions to better handle special characters.
const glossaryDefs = {
    'living-wisdom': `Knowledge that evolves through lived experience, not static doctrine. It adapts with context, embodiment, and relational feedback, often emerging from direct contact with the sacred.`,
    'embodiment': `The process of integrating insight into action, where truth is no longer conceptual but expressed through presence, behavior, and being.`,
    'dogmas': `Fixed beliefs presented as absolute truths, often maintained to preserve identity or control, rather than to serve clarity or transformation.`,
    'thought-experiment': `A hypothetical scenario used to test ideas, uncover assumptions, or simulate metaphysical conditions without requiring physical enactment.`,
    'infinite': `Without boundary or end. Often refers to the essence of Source, which cannot be fully grasped or limited by finite constructs or perception.`,
    'Unity': `A state where all distinctions dissolve into a single field of interconnected presence. Not sameness, but harmony across differentiation.`,
    'Compassion': `The act of being with suffering without flinching, infused with care, wisdom, and the willingness to serve the liberation of all beings.`,
    'virtuous': `Aligned with higher-order integrity—actions or qualities that resonate with the upliftment, coherence, and sacredness of life.`,
    'shameful': `Not inherently bad, but indicating a dissonance between one’s behavior and their deeper values or truth. In the treatise, it's not moralized but contextualized.`,
    'systems-of-control': `Structures—internal or external—that suppress freedom, distort truth, or prevent natural evolution. Can be societal, energetic, or psychological.`,
    'binaries': `Rigid dualities (e.g., good/bad, self/other) that oversimplify complexity. Useful as tools, but limiting when mistaken for reality itself.`,
    'energetic-field': `The subtle vibratory space in which consciousness, emotion, and intention interact. The field holds patterns and can be attuned, distorted, or harmonized.`,
    'adaptive-intelligence': `A form of intelligence that dynamically adjusts to circumstances while staying aligned with deeper coherence. Often non-linear, relational, and intuitive.`,
    'discernment': `The ability to perceive subtle distinctions, especially between resonance and distortion, or truth and projection. A skill cultivated through presence and self-honesty.`,
    'Right-use': `Using energy, power, or knowledge in a way that supports alignment, growth, and wholeness. Not just effectiveness—but ethical resonance.`,
    'alignment': `Being congruent across layers of being—mind, body, emotion, and spirit—so that intention, action, and truth move as one.`,
    'dharmic-intelligence': `Innate awareness of one’s true path, role, or timing within the greater unfolding. It is not learned but remembered or revealed through presence.`,
    'coherent': `Vibrationally stable and consistent with the truth of a system or being. Coherence often reflects spiritual maturity and inner clarity.`,
    'resonance': `A vibrational match between two frequencies—inner and outer, soul and system, self and moment—where truth is felt, not just understood.`,
    'relational-strategy': `The intentional way one navigates interpersonal or collective fields, shaped by karma, consciousness, and archetypal role.`,
    'karmically-expensive': `A choice or pattern that, while possible, carries a high energetic or evolutionary cost. It drains more than it builds.`,
    'relational-coherence': `When connection between beings flows with clarity, safety, and mutual growth—free from distortions, projections, or hidden contracts.`,
    'energetic-literacy': `The capacity to read, interpret, and respond to subtle energy in oneself and others with skill and respect.`,
    'Expression': `The outward manifestation of inner truth, shaped through voice, art, presence, or action. Authentic expression is a form of sacred offering.`,
    'Source': `The origin of all being and becoming. Infinite, unconditioned, and indivisible. Often accessed through silence, surrender, or radical presence.`,
    'Collective-Consciousness': `The shared field of awareness generated by all sentient beings—shaped by memory, belief, trauma, and possibility. It is both a container and a feedback loop.`,
    'Mind-of-Creation': `The intelligent patterning principle underlying all manifest form. Not personal mind, but the cosmic architect that shapes becoming through vibration and intention.`,
    'vibrational': `Relating to frequency, tone, or subtle movement. In this context, all matter and consciousness are understood as vibratory phenomena with specific resonant qualities.`,
    'interconnected': `Nothing exists in isolation. All phenomena are linked through energy, pattern, or causality—even when the connection is not perceptible.`,
    'patterned': `Emergent behaviors or forms that repeat across scales—personal, archetypal, or cosmic. Patterns are the grammar of the universe.`,
    'transcendence': `The act or state of going beyond form, identity, or limitation—often associated with the formless, the infinite, or the detached witness.`,
    'immanence': `The sacred fully present within form and finitude. To call something “immanent” is to recognize its divine reality embedded in the here and now.`,
    'Field-of-Participation': `The energetic or relational space where an individual engages with life consciously, shaping and being shaped by what arises. A field is not passive—it responds to presence.`,
    'non-duality': `The recognition that apparent opposites—self/other, form/emptiness—are not ultimately separate. A realization beyond conceptual unity.`,
    'architects-of-reality': `Beings or intelligences—human or cosmic—who shape the structures of experience through will, resonance, or design. Some are conscious creators, others unconscious carriers.`,
    'Holographic-Reality': `A model of existence where each part contains the whole. Every node reflects the larger pattern, and perception shifts based on angle or scale.`,
    'immanent': `The sacred fully present within form and finitude. To call something “immanent” is to recognize its divine reality embedded in the here and now.`, // Duplicate key - definition included
    'fractal': `A structure that repeats at different scales with self-similar complexity. In this treatise, fractals imply that consciousness and form mirror themselves in layered ways.`,
    'karmic-loop': `A repeating cycle of behavior, experience, or relational entanglement driven by unresolved energy or unconscious momentum. Breaking the loop requires awareness and new choice.`,
    'yantra': `A geometric diagram used as a tool for meditation, focusing consciousness on divine patterns. In broader terms, it’s a symbolic map of the cosmos and self.`,
    'Awareness': `The capacity to notice without distortion. Pre-thought, pre-identity—awareness is the clear, silent witness behind all phenomena.`,
    'Consciousness': `That which experiences. It has levels—reflexive, relational, cosmic—and modes, such as fragmented, coherent, or awakened. Consciousness is both content and container.`,
    'Identity': `A constructed pattern of traits, memories, and narratives used to navigate reality. Identity can be a useful vessel or a prison, depending on its flexibility and truthfulness.`,
    'Neural-Pathway': `A pattern of brain connectivity formed by repeated thoughts or behaviors. In the treatise, neural pathways are also seen as energetic grooves that shape perception and habit.`,
    'Pratyahara': `Withdrawal of the senses from external objects, leading to inner stillness. It is the fifth limb of Patanjali’s yoga, a bridge between outer discipline and inner absorption.`,
    'Breath-of-Form': `The natural breath that animates the body and reflects physical embodiment. It grounds awareness in the tangible and is often the starting point for deeper breath practices.`,
    'Sama-Vritti': `“Equal fluctuation” in Sanskrit. A yogic breathing practice where inhalation and exhalation are matched in duration, cultivating balance and calm.`,
    'Breath-of-Prana': `A subtler breath than air—linked to the life-force itself. It moves through the nadis and fuels the energy body. This breath is felt, not just inhaled.`,
    'prana': `Life-force or vital energy permeating all living things. It is the animating current behind breath, thought, and movement.`,
    'Spinal-breathing': `A meditative technique that moves awareness and prana up and down the spine, often used to awaken the subtle body and refine energetic circulation.`,
    'Breath-of-No-Breath': `The stillness between breaths. A gateway to the unmanifest. This is not the absence of life, but the presence of pure being without movement.`,
    'Kevala-Kumbhaka': `The spontaneous cessation of breath without strain—natural suspension of inhalation and exhalation—indicating profound meditative absorption and energetic stillness.`,
    'Equanimous-Witnessing': `The capacity to observe all inner and outer phenomena without grasping or aversion. A grounded neutrality that allows truth to arise without distortion.`,
    'Subtle-Energetic-Stability': `A refined state in which one’s energy body is calm, balanced, and coherent—allowing higher frequencies or spiritual insights to integrate without overwhelm or distortion.`,
    'Inner-Spaciousness': `The felt sense of openness within—psychologically, emotionally, and energetically. Not emptiness in the negative sense, but room for presence and new becoming.`,
    'Absence-of-Striving': `A deep release of the egoic impulse to grasp, fix, or improve. This state does not mean passivity, but alignment with the natural unfolding of the moment.`,
    'Kumbhaka': `Breath retention—either after inhalation or exhalation—used in yogic practice to regulate energy and stabilize consciousness.`,
    'Samadhi': `Absorption into pure awareness or non-dual being. It comes in stages, from focused concentration (savikalpa) to formless unity (nirvikalpa), often marking a spiritual threshold.`,
    'Qi': `In Chinese philosophy and medicine, the vital energy that flows through the body’s meridians. Similar to prana, but understood through a distinct cosmological and elemental system.`,
    'bigu': `A Daoist practice of fasting or energetic nourishment, where food becomes secondary to pranic or cosmic sustenance. It’s both a physical and spiritual discipline.`,
    'Pneuma': `Greek term for breath or spirit—refers to the animating force of life, often linked to soul, consciousness, or divine inspiration in Hellenic metaphysics.`,
    'dhikr': `An Islamic mystical practice of “remembrance,” repeating sacred names or phrases to attune the self to divine presence and dissolve egoic separation.`,
    'Tummo': `A Tibetan Buddhist practice that ignites inner heat through breath, visualization, and energy channeling—often used for transformation and transcendence of physical limitation.`,
    'Dzogchen': `“The Great Perfection.” A direct path within Tibetan Buddhism that recognizes the innate, luminous awareness beyond all effort or conceptual elaboration.`,
    'Phowa': `The conscious transference of consciousness at the time of death to a pure realm. Practiced in Tibetan Buddhism to ensure liberation or a favorable rebirth.`,
    'Brahman': `The ultimate, unchanging reality in Vedanta—formless, eternal, and beyond duality. All manifest phenomena are seen as expressions of Brahman.`,
    'Ain': `In Kabbalistic mysticism, Ain (or Ayin) is the Nothingness before creation—pure potential, absolute negation, beyond comprehension or form.`,
    'Tao': `The Way. The underlying order of the universe in Daoism—spontaneous, ungraspable, flowing through all things. To align with Tao is to move in harmony with reality itself.`,
    'OM': `A sacred sound and symbol representing the primal vibration of creation. Often broken into A-U-M to signify creation, maintenance, and dissolution.`,
    'AUM': `A transliterated form of OM, emphasizing its threefold vibrational structure. In esoteric traditions, each syllable maps to a state of consciousness or cosmic principle.`,
    'HU': `A sacred name of God in Sufi and esoteric traditions, intoned as a pure vibration of divine remembrance, unity, and presence.`,
    'Karma': `The law of cause and effect across time and lifetimes. More than moral accounting, karma in this system refers to energetic patterns that seek integration or resolution.`,
    'Jiva': `The individualized soul, temporarily bound in form and karma. It experiences the journey of incarnation, forgetting, and remembering.`,
    'Atman': `The true Self, undivided and eternal. In some schools, it is identical to Brahman; in others, it is the unique soul spark nested within Source.`,
    'Karana-Sharira': `The “causal body,” the subtle blueprint that holds karmic imprints and soul memory across lifetimes. It is the seed-form from which more dense bodies emerge.`,
    'samskara': `Mental and energetic impressions left by past actions, thoughts, or traumas. They condition behavior and perception until consciously released or transformed.`,
    'Lila': `The divine play of existence—life as sacred drama, neither rigidly serious nor meaningless. Creation seen as spontaneous, expressive, and participatory.`,
    'Incarnation-Cycle': `The recurring pattern of birth, death, and rebirth through which the soul evolves, integrates karma, and deepens awareness.`,
    'Veil-of-forgetting': `The obscuration of soul memory during incarnation, enabling free will and immersive learning. It ensures the game of life feels real, not scripted.`,
    'After-Death-States': `The transitional stages of consciousness post-mortem, where karmic review, integration, or preparation for future incarnation takes place.`,
    'Survival-Consciousness': `A fear-based mode of being oriented around safety, scarcity, and control. It prioritizes preservation over presence or participation.`,
    'Relational-Consciousness': `A level of awareness that perceives identity and growth through relationships—interactions become mirrors, fields, and initiations.`,
    'Individuated-Consciousness': `Self-aware identity that recognizes its distinct trajectory and karmic role. Not egoic separation, but clarity of uniqueness within unity.`,
    'Integral-Consciousness': `A matured synthesis of self, other, and whole—where multiple perspectives, stages, and systems are harmonized without collapsing into sameness.`,
    'Unity-Consciousness': `The realization that all beings, phenomena, and experiences arise from and return to a single source—lived as love, not theory.`,
    'Jivanmukti': `Liberation while still embodied. A being who has awakened from illusion yet chooses to remain in the world for service or play.`,
    'Samskaras': `Mental and energetic impressions left by past actions, thoughts, or traumas. They condition behavior and perception until consciously released or transformed.`,
    'Vasanas': `Deep-rooted tendencies or karmic residues that subtly drive behavior. More enduring than thoughts—they operate as soul-level grooves.`,
    'Grace': `Unearned divine assistance—often arriving through surrender, readiness, or higher orchestration. It bends karma, not bypasses it.`,
    'Soul-Contracts': `Pre-incarnational agreements between souls to catalyze growth, resolve karma, or activate gifts. They often appear as intense relationships or trials.`,
    'Spirit-Guides': `Non-physical allies who assist, nudge, or protect across lifetimes. Some are ancestral, others are appointed from higher realms.`,
    'Avatars': `Incarnations of divine intelligence who embody specific archetypes or cosmic functions. Their presence transmits alignment and disruption.`,
    'disruptive-coherence': `A paradoxical force that breaks apart illusions to restore truth. It disturbs surface harmony in service of deeper alignment.`,
    'Dissolution-Framework': `The four-layered process of spiritual disintegration: Physical, Energetic, Mental, and Spiritual. Each phase returns the self to Source.`,
    'Physical-Dissolution': `The breakdown of bodily attachment—sickness, aging, death, or surrender of identification with form.`,
    'Energetic-Dissolution': `The collapse or reconfiguration of subtle energy patterns, often felt as emotional upheaval, chakra cleansing, or field reorientation.`,
    'Mental-Dissolution': `The crumbling of fixed beliefs, identities, or narratives. Often triggered by contradiction, paradox, or trauma-transcendence.`,
    'Spiritual-Dissolution': `The final surrender of separateness into unity with the Infinite. It often marks the death of the seeker or the dissolution of will.`,
    'Creative-Cycle': `The rhythmic unfolding of inspiration, gestation, expression, and integration—mirrored in art, seasons, and spiritual evolution.`,
    'Void-Presence': `The silent, fertile field that exists prior to creation. Not empty, but potential-laden stillness from which all arises.`,
    'Conscious-Dying': `The art of dying with presence, awareness, and completion—often seen as the final initiation or a portal to liberation.`,
    'Collective-Dissolution': `A mass phase of breakdown—social, ecological, or mythic—marking a civilization’s turning point or rebirth through collapse.`,
    'Four-Modes-of-Participation': `Mirror, Resonator, Prism, and Sword: four archetypal ways of engaging with reality. Each reflects a style of being, teaching, and transforming.`,
    'Mirror-Mode': `Absorbs and reflects what is. This mode reveals the truth of others by holding presence without intervention.`,
    'Resonator-Mode': `Amplifies energies in the field to awaken or harmonize. This mode uses vibration, voice, or energy to co-create coherence.`,
    'Prism-Mode': `Refines and splits energy into its components, helping others discern, clarify, and integrate through layered perspective.`,
    'Sword-Mode': `Cuts through illusion with precision. This mode challenges distortion, initiates rupture, and defends truth without compromise.`,
    'Navigational-Consciousness': `The subtle inner compass that feels timing, direction, and alignment across lifetimes. It blends intuition, memory, and karmic signal.`,
    'Path-of-Immanence': `A way of being that seeks no escape—only full participation. It honors the divine in form, mess, and mystery alike.`,
    'Immanent-Buddha': `A fully awakened being who does not withdraw, but remains immersed in life, radiating wisdom through their engaged presence.`,
    'bodhisattva': `One who delays personal liberation to assist others in awakening. A sacred vow rooted in compassion, service, and infinite patience.`,
    'nirvana': `Cessation of craving, identification, and suffering. Not extinction, but a luminous stillness beyond becoming and bondage.`,
    'Divine-Connection': `A living link between soul and Source—accessible through silence, ritual, prayer, or direct experience.`,
    'Divine-Threading': `The weaving of sacred intention through one’s actions, relationships, and creations. A subtle architecture of purpose and grace.`,
    'Divine-Embodiment': `Living as a vessel of higher intelligence. Not superiority, but availability—where the sacred expresses through the ordinary.`,
    'Foundation-Stage': `The first phase of spiritual integration: stability, self-regulation, energetic hygiene, and safety in being.`,
    'Fluidity-Stage': `The second phase: adaptability, emotional depth, relational intelligence, and capacity to navigate paradox.`,
    'Freedom-Stage': `The final phase: creative sovereignty, mastery, and full participation without distortion or contraction.`,
    'Ecological-Awareness': `The recognition that inner and outer environments are mirrors. A reverence for the web of life as a sacred expression of balance.`,
    'biomimicry': `Designing systems that mirror the intelligence of nature—used metaphorically here for spiritual systems that emulate living coherence.`,
    'Crisis-as-Initiation': `The framing of breakdown as sacred passage. Crisis becomes a portal when met with awareness, humility, and right support.`,
    'Practice-Ecology': `The ecosystem of rituals, disciplines, and rhythms that support sustainable spiritual development. Practices are living organisms, not static routines.`,
    'Social-Memory-Complex': `A term from the Law of One denoting a collective consciousness that has unified sufficiently to operate as a singular being.`,
    'Council-formats': `A method of collective governance or reflection where all voices are honored. Often used in spiritual communities to invoke shared wisdom.`,
    'Shadow': `Aspects of the self denied, repressed, or unloved. Shadow work integrates these parts through witnessing, honesty, and compassionate confrontation.`,
    'Field-Coherence': `A collective energetic harmony that arises when individuals are aligned internally and relationally. Coherence is both cause and effect.`,
    'Nodes-Hubs': `Energetic or social convergence points within a larger system. Nodes attract, organize, and transmit meaning.`,
    'Source-Community': `A spiritually resonant group aligned not through dogma, but shared frequency and deeper purpose—each member a fractal of the whole.`,
    'Law-of-Attraction': `The principle that like energy attracts like energy. Oversimplified in pop-spirituality, but rooted in real vibrational dynamics and karmic momentum.`,
    'Field-of-Possibility': `An open energetic space where futures can emerge. This field responds to intention, resonance, and readiness—not just desire.`,
    'Resonant-Coherence': `When inner truth, outer environment, and timing align—creating a flow state or field of easeful power.`,
    'Path-of-Least-Resistance': `Not laziness, but flow-informed movement. Following the channels of energy that are already open while staying in integrity.`,
    'Resonant-Timing': `The moment when action and readiness meet. Timing that aligns with deeper cycles—not forced, but felt.`, // Corrected based on source text
    'Karmic-Alignment': `When actions, desires, and relationships support the resolution of one’s unique karmic trajectory. Not always pleasant, but evolutionarily precise.`,
    'Vision-Board': `A visual tool used to externalize intention and energetic focus. Can work when charged with presence, not just projection.`,
    'Affirmation': `A statement of intention or truth repeated to entrain the mind and field. Most powerful when aligned with belief and embodiment.`,
    'Visualization': `Using imagination to shape inner reality, which in turn influences energetic, psychological, and sometimes material outcomes.`,
    'Resonant-Web': `The invisible matrix of energetic and relational links that connects individuals, ideas, and archetypes across space and time.`,
    'Chakras': `Subtle energy centers along the spine, each representing aspects of consciousness and embodiment. Their balance affects physical, emotional, and spiritual health.`,
    'Nadis': `Energy channels through which prana flows. Analogous to meridians in Chinese medicine. Blockages here affect clarity and vitality.`,
    'Auras': `The energetic field that surrounds living beings. Contains layers of emotional, mental, and spiritual information.`,
    'Chronos': `Linear, sequential time. Useful for coordination, but limited in capturing depth, timing, or sacred unfolding.`,
    'Kairos': `Sacred, opportune time. The moment of rightness or invitation—unpredictable but potent.`,
    'Subject': `The perceiver, experiencer, or agent. In many spiritual systems, the subject dissolves upon awakening.`,
    'Object': `That which is perceived or experienced. The illusion of objecthood collapses in non-dual realization.`,
    'Maya': `The veil of illusion that makes the transient appear permanent. Not evil, but a test of discernment and awakening.`,
    'Emptiness': `In Buddhist terms, the lack of inherent self in all phenomena. In mystical terms, it is the fertile void where form arises and returns.`,
    'Manifestation': `The process by which inner intention or frequency crystallizes into outer form. Requires alignment, not just desire.`,
    'Will': `The conscious force of directed intention. It bridges spirit and matter, and can be distorted by ego or aligned with Source.`,
    'Probability': `The likelihood of an event or outcome based on energetic pattern, karma, and choice. Futures are not fixed—but not random.`,
    'Causality': `The web of cause and effect across planes. In metaphysical systems, causality includes intention, vibration, and soul contracts—not just physical sequences.`,
    'Morphic-Resonance': `Rupert Sheldrake’s theory that memory and behavior are inherited non-genetically through a shared field. In this system, it points to shared soul patterns and collective grooves.`,
    'Dharma': `The soul’s true function, role, or alignment within the larger whole. Dharma is not obligation—it is essence in motion.`,
    'Logos': `The divine principle of order, language, and intelligibility. In Hermetic and Christian terms, it is the Word that organizes reality.`,
    'Divine-Names': `Names that carry vibrational or archetypal power—used to invoke, align, or dissolve. Not labels, but portals.`,
    'Rigpa': `In Dzogchen, the direct knowledge of pure awareness—luminous, self-knowing, unshakable.`,
    'Ain-Soph': `In Kabbalah, the Infinite beyond all concept, form, or attribute. It precedes even divine emanation.`,
    'Turiya': `The “fourth” state of consciousness beyond waking, dreaming, and deep sleep. Pure awareness, timeless and contentless.`,
    'God-beyond-God': `A mystical recognition that even the image of God must be surrendered. The divine that lies beyond all names, stories, and forms.`,
    'Dharmakaya': `In Mahayana Buddhism, the formless body of truth. The absolute reality in which Buddhas abide—pure being without separation.`
};

// Ensure all necessary functions for popup logic are included.
// Function to close any open popups
function closeGlossaryPopup() {
    const existingPopup = document.getElementById('glossary-popup-active');
    if (existingPopup) {
        existingPopup.classList.remove('visible');
        // Remove after transition
        setTimeout(() => {
            // Check if node still exists and has a parent before removing
            if (existingPopup && existingPopup.parentNode) { 
                existingPopup.parentNode.removeChild(existingPopup);
            }
        }, 200); // Match CSS transition duration
    }
}

// Function to show the popup
function showGlossaryPopup(event) {
    event.preventDefault(); // Stop link navigation
    event.stopPropagation(); // Stop click from immediately closing via document listener

    closeGlossaryPopup(); // Close any previously open popup

    const linkElement = event.target.closest('.glossary-link');
    if (!linkElement) return;

    const termKey = linkElement.dataset.term;
    // Handle potential case mismatches if needed, though data-terms seem consistent
    const definition = glossaryDefs[termKey] || glossaryDefs[termKey.toLowerCase()] || 'Definition not found.';
    const termText = linkElement.textContent;

    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'glossary-popup';
    popup.id = 'glossary-popup-active'; // ID to easily find and remove it
    
    // Clean up definition text: remove tags if they accidentally got included
    const cleanDefinition = definition.replace(/\[source: \d+\]/g, '').trim(); 
    
    // Add content and close button
    popup.innerHTML = `
        <button class="close-popup" aria-label="Close glossary popup">&times;</button>
        <strong>${termText}:</strong> ${cleanDefinition}
    `;

    document.body.appendChild(popup);

    // Add listener to close button inside popup
    const closeButton = popup.querySelector('.close-popup');
    if(closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from bubbling to document listener
            closeGlossaryPopup();
        });
    }
    
    // Prevent clicks inside the popup from closing it immediately
    popup.addEventListener('click', (e) => {
       e.stopPropagation();
    });

    // Calculate position (improved logic)
    const linkRect = linkElement.getBoundingClientRect();
    
    // Temporarily make it visible off-screen to measure actual dimensions
    popup.style.visibility = 'hidden';
    popup.style.display = 'block'; 
    const popupRect = popup.getBoundingClientRect();
    popup.style.visibility = ''; // Reset visibility
    popup.style.display = 'none'; // Hide again before positioning
    
    const popupWidth = popupRect.width;
    const popupHeight = popupRect.height;
    const spaceAbove = linkRect.top;
    const spaceBelow = window.innerHeight - linkRect.bottom;
    const gap = 15; // Gap + arrow height

    let top, left;

    // Prefer position above if enough space, otherwise below
    if (spaceAbove > popupHeight + gap) {
        // Position above
        top = window.scrollY + linkRect.top - popupHeight - gap;
        // Adjust arrow style via class or direct style if needed (complex)
        // popup.classList.add('arrow-down'); 
    } else if (spaceBelow > popupHeight + gap) {
        // Position below
        top = window.scrollY + linkRect.bottom + gap;
        // popup.classList.add('arrow-up'); 
    } else {
        // Default to above if neither fits well (might overflow)
         top = window.scrollY + linkRect.top - popupHeight - gap;
         // popup.classList.add('arrow-down'); 
    }

    // Center horizontally relative to the link
    left = window.scrollX + linkRect.left + (linkRect.width / 2) - (popupWidth / 2);

    // Adjust if too close to left/right edges
    if (left < window.scrollX + 10) {
        left = window.scrollX + 10;
    } else if (left + popupWidth > window.innerWidth - 10) {
        left = window.innerWidth - popupWidth - 10;
    }

    popup.style.top = `${top}px`;
    popup.style.left = `${left}px`;

    // Make visible with slight delay for transition
    // Ensure display is set before adding class for transition
    popup.style.display = 'block'; 
    setTimeout(() => {
        if (document.getElementById('glossary-popup-active') === popup) { // Check if it wasn't closed already
           popup.classList.add('visible');
        }
    }, 10); 
}

// --- Setup Event Listeners ---
// Use function expression for better compatibility/clarity
const setupGlossary = function() {
    const glossaryLinks = document.querySelectorAll('a.glossary-link');
    glossaryLinks.forEach(link => {
        // Remove previous listener if any (safer if script runs multiple times)
        link.removeEventListener('click', showGlossaryPopup); 
        // Add the listener
        link.addEventListener('click', showGlossaryPopup);
    });

    // Close popup when clicking outside (listener added once)
    // Use capturing phase to potentially catch clicks earlier if needed
    document.removeEventListener('click', closePopupOnOutsideClick, true); // Remove potential old listener
    document.addEventListener('click', closePopupOnOutsideClick, true); // Add listener

    // Also close on Escape key (listener added once)
    document.removeEventListener('keydown', closePopupOnEscape); // Remove potential old listener
    document.addEventListener('keydown', closePopupOnEscape); // Add listener
};

// Helper function for the outside click listener
const closePopupOnOutsideClick = function(event) {
    const activePopup = document.getElementById('glossary-popup-active');
    // Check if the click was outside the popup and not on a glossary link
    if (activePopup && !activePopup.contains(event.target) && !event.target.closest('.glossary-link')) {
        closeGlossaryPopup();
    }
};

// Helper function for the Escape key listener
const closePopupOnEscape = function(event) {
   if (event.key === 'Escape') {
       closeGlossaryPopup();
   }
};

// Initialize glossary when the DOM is ready
// Check if DOM is already loaded (for scripts placed at end of body)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGlossary);
} else {
    // DOMContentLoaded has already fired
    setupGlossary();
}

// --- Other existing script code for expandable sections etc. should remain ---
// Make sure this glossary code doesn't interfere with variables/functions
// used by the script for the expandable sections (e.g., avoid redeclaring functions).

/* ----- End Glossary Popup Functionality ----- */

}); // End of DOMContentLoaded