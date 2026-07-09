export interface QuestionItem {
  q: string;
  a: string;
}

// Science Questions (Chapters 1 to 16)
const scCh1: QuestionItem[] = [
  { q: "What is a chemical reaction?", a: "" },
  { q: "What observations indicate that a chemical reaction has taken place?", a: "" },
  { q: "What is a chemical equation?", a: "" },
  { q: "Why should a chemical equation be balanced?", a: "" },
  { q: "State the law of conservation of mass.", a: "" },
  { q: "What is a combination reaction? Give one example from the chapter.", a: "" },
  { q: "What is a decomposition reaction? Name its three types.", a: "" },
  { q: "What is a displacement reaction?", a: "" },
  { q: "What is a double displacement reaction?", a: "" },
  { q: "What is oxidation? Give one example.", a: "" },
  { q: "What is reduction? Give one example.", a: "" },
  { q: "Why do iron objects rust? Mention any two methods to prevent rusting.", a: "" },
  { q: "What is rancidity? How can it be prevented?", a: "" }
];

const scCh2: QuestionItem[] = [
  { q: "What are acids and bases?", a: "" },
  { q: "What changes are observed when acids and bases are tested with litmus paper?", a: "" },
  { q: "What is an indicator? Name any two natural indicators.", a: "" },
  { q: "Why do acids conduct electricity in aqueous solutions?", a: "" },
  { q: "What is the pH scale?", a: "" },
  { q: "What is the effect of pH on the digestive system?", a: "" },
  { q: "Define neutralization reaction with one example.", a: "" },
  { q: "What are antacids? Why are they used?", a: "" },
  { q: "How is baking soda prepared? Mention one of its uses.", a: "" },
  { q: "What is washing soda? State any two uses of washing soda.", a: "" },
  { q: "What is bleaching powder? Mention one use of it.", a: "" },
  { q: "How is Plaster of Paris prepared? State one use of it.", a: "" },
  { q: "Differentiate between strong acids and weak acids.", a: "" }
];

const scCh3: QuestionItem[] = [
  { q: "State any four physical properties of metals.", a: "" },
  { q: "State any four physical properties of non-metals.", a: "" },
  { q: "Why are metals generally good conductors of heat and electricity?", a: "" },
  { q: "What happens when metals react with oxygen?", a: "" },
  { q: "How do metals react with water?", a: "" },
  { q: "What is the reactivity series of metals?", a: "" },
  { q: "Why is sodium stored in kerosene oil?", a: "" },
  { q: "Explain the process of ionic bond formation using sodium chloride as an example.", a: "" },
  { q: "What is corrosion? Give one example.", a: "" },
  { q: "What is alloying? Why is it done?", a: "" },
  { q: "Differentiate between roasting and calcination.", a: "" },
  { q: "What is the thermite reaction? Mention one application.", a: "" },
  { q: "Why are noble metals found in the free state?", a: "" }
];

const scCh4: QuestionItem[] = [
  { q: "Why does carbon form a large number of compounds?", a: "" },
  { q: "What is catenation?", a: "" },
  { q: "Explain the tetravalency of carbon.", a: "" },
  { q: "What are covalent bonds?", a: "" },
  { q: "What is an alkane? Give one example.", a: "" },
  { q: "What is an alkene? Give one example.", a: "" },
  { q: "What is an alkyne? Give one example.", a: "" },
  { q: "What are homologous series? State any two characteristics.", a: "" },
  { q: "What is the functional group of alcohols?", a: "" },
  { q: "What is the functional group of carboxylic acids?", a: "" },
  { q: "What is ethanol? Mention any two uses.", a: "" },
  { q: "What is saponification? Why is soap more effective than detergents in soft water?", a: "" },
  { q: "Why do soaps form scum in hard water?", a: "" }
];

const scCh5: QuestionItem[] = [
  { q: "Why was there a need to classify elements?", a: "" },
  { q: "State any two limitations of Dobereiner's Triads.", a: "" },
  { q: "What was Newlands' Law of Octaves?", a: "" },
  { q: "Mention one limitation of Newlands' Law of Octaves.", a: "" },
  { q: "What was the basis of Mendeleev's Periodic Table?", a: "" },
  { q: "State any two achievements of Mendeleev's Periodic Table.", a: "" },
  { q: "Why was Mendeleev's Periodic Table not completely satisfactory?", a: "" },
  { q: "What is the basis of the Modern Periodic Table?", a: "" },
  { q: "What are periods and groups in the Modern Periodic Table?", a: "" },
  { q: "How does atomic size vary across a period?", a: "" },
  { q: "How does metallic character change down a group?", a: "" },
  { q: "Why are noble gases placed in Group 18?", a: "" },
  { q: "State the trends in valency across a period.", a: "" }
];

const scCh6: QuestionItem[] = [
  { q: "What are life processes?", a: "" },
  { q: "Why is nutrition essential for living organisms?", a: "" },
  { q: "Differentiate between autotrophic and heterotrophic nutrition.", a: "" },
  { q: "What is the role of chlorophyll in photosynthesis?", a: "" },
  { q: "Write the balanced chemical equation for photosynthesis.", a: "" },
  { q: "What is the function of hydrochloric acid in the stomach?", a: "" },
  { q: "What is the role of villi in the small intestine?", a: "" },
  { q: "Differentiate between aerobic and anaerobic respiration.", a: "" },
  { q: "What is the function of haemoglobin in human beings?", a: "" },
  { q: "Name the four chambers of the human heart.", a: "" },
  { q: "What is double circulation?", a: "" },
  { q: "What is transpiration? State one advantage of transpiration.", a: "" },
  { q: "What is excretion? Name the functional unit of the human kidney.", a: "" }
];

const scCh7: QuestionItem[] = [
  { q: "What is coordination in living organisms?", a: "" },
  { q: "What is the function of neurons?", a: "" },
  { q: "Differentiate between receptors and effectors.", a: "" },
  { q: "What is a reflex action?", a: "" },
  { q: "What is a reflex arc?", a: "" },
  { q: "Name the three major parts of the human brain.", a: "" },
  { q: "State one function of the cerebellum.", a: "" },
  { q: "What is the role of the spinal cord in reflex actions?", a: "" },
  { q: "What are plant hormones?", a: "" },
  { q: "Name any four plant hormones.", a: "" },
  { q: "What is phototropism?", a: "" },
  { q: "What is geotropism?", a: "" },
  { q: "Differentiate between the nervous system and the endocrine system.", a: "" }
];

const scCh8: QuestionItem[] = [
  { q: "Why is reproduction important for living organisms?", a: "" },
  { q: "Differentiate between asexual and sexual reproduction.", a: "" },
  { q: "What is binary fission? Give one example.", a: "" },
  { q: "What is budding? Name one organism that reproduces by budding.", a: "" },
  { q: "What is spore formation? Give one example.", a: "" },
  { q: "What is vegetative propagation? Mention one advantage.", a: "" },
  { q: "What is regeneration?", a: "" },
  { q: "What is fertilisation?", a: "" },
  { q: "Differentiate between self-pollination and cross-pollination.", a: "" },
  { q: "What is the function of the placenta during pregnancy?", a: "" },
  { q: "Name the male and female reproductive organs in humans.", a: "" },
  { q: "What is the role of DNA copying in reproduction?", a: "" },
  { q: "Why is reproductive health education important?", a: "" }
];

const scCh9: QuestionItem[] = [
  { q: "What is heredity?", a: "" },
  { q: "What is variation? Why is it important?", a: "" },
  { q: "Differentiate between inherited traits and acquired traits.", a: "" },
  { q: "What is a gene?", a: "" },
  { q: "What is the role of chromosomes in heredity?", a: "" },
  { q: "State Mendel's law of dominance.", a: "" },
  { q: "What is a dominant trait? Give one example.", a: "" },
  { q: "What is a recessive trait? Give one example.", a: "" },
  { q: "Why do variations occur during reproduction?", a: "" },
  { q: "What is evolution?", a: "" },
  { q: "What are fossils? Why are they important in studying evolution?", a: "" },
  { q: "How does natural selection contribute to evolution?", a: "" },
  { q: "Differentiate between homologous organs and analogous organs with one example each.", a: "" }
];

const scCh10: QuestionItem[] = [
  { q: "State the laws of reflection of light.", a: "" },
  { q: "Define the principal focus of a spherical mirror.", a: "" },
  { q: "Differentiate between a concave mirror and a convex mirror.", a: "" },
  { q: "What is the radius of curvature of a spherical mirror?", a: "" },
  { q: "State the mirror formula.", a: "" },
  { q: "What is magnification? Write its formula for mirrors.", a: "" },
  { q: "What is refraction of light?", a: "" },
  { q: "State Snell's law of refraction.", a: "" },
  { q: "Define the refractive index of a medium.", a: "" },
  { q: "Differentiate between a convex lens and a concave lens.", a: "" },
  { q: "State the lens formula.", a: "" },
  { q: "Write the formula for magnification produced by a lens.", a: "" },
  { q: "Mention one use each of a concave mirror and a convex lens.", a: "" }
];

const scCh11: QuestionItem[] = [
  { q: "Name the main parts of the human eye.", a: "" },
  { q: "What is the function of the iris?", a: "" },
  { q: "What is accommodation of the eye?", a: "" },
  { q: "What is the least distance of distinct vision for a normal eye?", a: "" },
  { q: "Define the persistence of vision.", a: "" },
  { q: "What is myopia? Which lens is used to correct it?", a: "" },
  { q: "What is hypermetropia? Which lens is used to correct it?", a: "" },
  { q: "What is presbyopia? Why does it occur?", a: "" },
  { q: "Why is the sky blue during the day?", a: "" },
  { q: "Why does the Sun appear reddish at sunrise and sunset?", a: "" },
  { q: "What is atmospheric refraction?", a: "" },
  { q: "What is scattering of light?", a: "" },
  { q: "What causes the twinkling of stars?", a: "" }
];

const scCh12: QuestionItem[] = [
  { q: "What is electric current?", a: "" },
  { q: "State the SI unit of electric current.", a: "" },
  { q: "What is electric potential difference?", a: "" },
  { q: "What is the SI unit of potential difference?", a: "" },
  { q: "State Ohm's law.", a: "" },
  { q: "Define electrical resistance.", a: "" },
  { q: "State the factors affecting the resistance of a conductor.", a: "" },
  { q: "Differentiate between series and parallel combinations of resistors.", a: "" },
  { q: "State the formula for equivalent resistance in a series combination.", a: "" },
  { q: "State the formula for equivalent resistance in a parallel combination.", a: "" },
  { q: "What is electric power? Write its SI unit.", a: "" },
  { q: "State the relation between electrical power, voltage, and current.", a: "" },
  { q: "What is the commercial unit of electrical energy?", a: "" }
];

const scCh13: QuestionItem[] = [
  { q: "What is the magnetic effect of electric current?", a: "" },
  { q: "Who discovered the magnetic effect of electric current?", a: "" },
  { q: "What is the direction of the magnetic field around a straight current-carrying conductor?", a: "" },
  { q: "State the Right-Hand Thumb Rule.", a: "" },
  { q: "How does the magnetic field around a circular current-carrying conductor differ from that around a straight conductor?", a: "" },
  { q: "What is a solenoid?", a: "" },
  { q: "Why does a current-carrying solenoid behave like a bar magnet?", a: "" },
  { q: "What is an electromagnet? Mention one application.", a: "" },
  { q: "State Fleming's Left-Hand Rule.", a: "" },
  { q: "What is an electric motor?", a: "" },
  { q: "What is the function of the split-ring commutator in a DC motor?", a: "" },
  { q: "What is electromagnetic induction?", a: "" },
  { q: "State Fleming's Right-Hand Rule.", a: "" }
];

const scCh14: QuestionItem[] = [
  { q: "What is a source of energy?", a: "" },
  { q: "What are the characteristics of an ideal source of energy?", a: "" },
  { q: "Differentiate between renewable and non-renewable sources of energy.", a: "" },
  { q: "Why are fossil fuels called exhaustible resources?", a: "" },
  { q: "State one advantage and one disadvantage of thermal power plants.", a: "" },
  { q: "How is hydroelectric power generated?", a: "" },
  { q: "What is biomass? Give one example.", a: "" },
  { q: "What is biogas? Mention one use of it.", a: "" },
  { q: "How is solar energy harnessed using solar cells?", a: "" },
  { q: "What is wind energy? State one advantage of using it.", a: "" },
  { q: "What is nuclear energy? Name one fuel used in nuclear reactors.", a: "" },
  { q: "Why is energy conservation important?", a: "" },
  { q: "Mention any two environmental problems caused by conventional sources of energy.", a: "" }
];

const scCh15: QuestionItem[] = [
  { q: "What is an ecosystem?", a: "" },
  { q: "Name the two main components of an ecosystem.", a: "" },
  { q: "What are producers in an ecosystem?", a: "" },
  { q: "What are consumers? Name the different types of consumers.", a: "" },
  { q: "What are decomposers? State their role in nature.", a: "" },
  { q: "What is a food chain?", a: "" },
  { q: "What is a food web?", a: "" },
  { q: "What is the 10% law of energy transfer?", a: "" },
  { q: "What is biological magnification (biomagnification)?", a: "" },
  { q: "Why are biodegradable substances considered environmentally friendly?", a: "" },
  { q: "Differentiate between biodegradable and non-biodegradable substances.", a: "" },
  { q: "Why should excessive use of plastics be avoided?", a: "" },
  { q: "State any two methods of managing waste effectively.", a: "" }
];

const scCh16: QuestionItem[] = [
  { q: "What is sustainable development?", a: "" },
  { q: "Why is conservation of natural resources necessary?", a: "" },
  { q: "What is the objective of the Chipko Movement?", a: "" },
  { q: "What was the main aim of the three 'R's (Reduce, Reuse, Recycle)?", a: "" },
  { q: "What is rainwater harvesting?", a: "" },
  { q: "State any two advantages of rainwater harvesting.", a: "" },
  { q: "What is watershed management?", a: "" },
  { q: "Why are forests considered renewable resources?", a: "" },
  { q: "State any two functions of forests in maintaining ecological balance.", a: "" },
  { q: "What are the major causes of depletion of wildlife?", a: "" },
  { q: "Why is stakeholder participation important in resource management?", a: "" },
  { q: "What is the role of the Central Pollution Control Board (CPCB) in environmental protection?", a: "" },
  { q: "Mention any two measures for the sustainable management of natural resources.", a: "" }
];


// History Questions (Chapters 1 to 5)
const histCh1: QuestionItem[] = [
  { q: "Who prepared a series of four prints visualizing a world of 'democratic and social Republics' in 1848?", a: "" },
  { q: "What does the term *Absolutist* literally mean?", a: "" },
  { q: "What is a *Utopian* vision?", a: "" },
  { q: "Define the term *Plebiscite*.", a: "" },
  { q: "In which year did the French Revolution occur, marking the first clear expression of nationalism?", a: "" },
  { q: "What did the ideas of *la patrie* and *le citoyen* emphasize?", a: "" },
  { q: "Which standard civil code established equality before the law and secured the right to property in 1804?", a: "" },
  { q: "What was the *Zollverein*, formed in 1834 at the initiative of Prussia?", a: "" },
  { q: "Who hosted the Congress of Vienna in 1815?", a: "" },
  { q: "Name the secret societies founded by the Italian revolutionary Giuseppe Mazzini in Marseilles and Berne.", a: "" },
  { q: "Which treaty recognized Greece as an independent nation in 1832?", a: "" },
  { q: "Who was the chief minister of Prussia and the main architect of German unification?", a: "" },
  { q: "Who was proclaimed the king of united Italy in 1861?", a: "" }
];

const histCh2: QuestionItem[] = [
  { q: "In which month and year did Mahatma Gandhi return to India from South Africa?", a: "" },
  { q: "What basic idea did Mahatma Gandhi's concept of *Satyagraha* emphasize?", a: "" },
  { q: "Name the three places where Gandhiji successfully organized satyagraha movements between 1916 and 1918.", a: "" },
  { q: "What did the Rowlatt Act of 1919 empower the colonial government to do?", a: "" },
  { q: "On what date did the infamous Jallianwalla Bagh incident take place in Amritsar?", a: "" },
  { q: "Who was the British military commander responsible for the Jallianwalla Bagh firing?", a: "" },
  { q: "Who wrote the famous book *Hind Swaraj* in 1909?", a: "" },
  { q: "At which Congress session in December 1920 was the Non-Cooperation programme finally adopted?", a: "" },
  { q: "Who led the peasant movement in Awadh against talukdars and landlords during the Non-Cooperation era?", a: "" },
  { q: "Who was the leader of the militant guerrilla movement in the Gudem Hills of Andhra Pradesh?", a: "" },
  { q: "Which violent incident in 1922 led Mahatma Gandhi to abruptly call off the Non-Cooperation Movement?", a: "" },
  { q: "Under whose presidency did the Lahore Congress formalize the demand for 'Purna Swaraj' in December 1929?", a: "" },
  { q: "From which ashram to which coastal town did Mahatma Gandhi lead his famous 240-mile Salt March?", a: "" }
];

const histCh3: QuestionItem[] = [
  { q: "Which ancient coastal trade link existed as early as 3000 BCE?", a: "" },
  { q: "What items found in the Maldives were used as an early form of currency?", a: "" },
  { q: "Which country's west-bound export cargo gave the \"silk routes\" their name?", a: "" },
  { q: "Name two major common foods introduced to Europe and Asia after Christopher Columbus reached the Americas.", a: "" },
  { q: "Which European country's poor peasants became fatally dependent on potatoes in the mid-1840s?", a: "" },
  { q: "What biological weapon did Spanish conquerors inadvertently use to decimate America's original inhabitants?", a: "" },
  { q: "What were the \"Corn Laws\" in nineteenth-century Britain?", a: "" },
  { q: "Which new technology enabled the long-distance transport of perishable foods like meat as frozen cargo?", a: "" },
  { q: "In which European city did the big powers meet in 1885 to carve up the continent of Africa?", a: "" },
  { q: "What was rinderpest, which arrived in Africa in the late 1880s?", a: "" },
  { q: "Define the term \"indentured labour\" as used in the nineteenth century.", a: "" },
  { q: "Which two financial institutions are famously known as the \"Bretton Woods twins\"?", a: "" },
  { q: "Why did multinational corporations (MNCs) begin shifting their production operations to Asian countries like China from the late 1970s?", a: "" }
];

const histCh4: QuestionItem[] = [
  { q: "What did the cover page of E.T. Paull’s music book in 1900 announce?", a: "" },
  { q: "What does the winged wheel symbolize in the illustration 'Dawn of the Century'?", a: "" },
  { q: "Which two figures are shown in the \"Two Magicians\" picture to represent the East and the West?", a: "" },
  { q: "What is the meaning of the term \"Orient\"?", a: "" },
  { q: "What do historians mean by the term \"proto-industrialisation\"?", a: "" },
  { q: "Why was it difficult for new merchants to set up business in European towns during the 17th and 18th centuries?", a: "" },
  { q: "Name the city that became known as a \"finishing centre\" for cloth before the international market.", a: "" },
  { q: "Which machine or system did Richard Arkwright create to bring production under one roof?", a: "" },
  { q: "Which two industries were the most dynamic sectors in Britain during the first phase of industrialisation?", a: "" },
  { q: "Who improved the steam engine produced by Newcomen and patented it in 1781?", a: "" },
  { q: "Why were traditional upper classes in Victorian Britain fonder of handmade products?", a: "" },
  { q: "Why did women workers in the woollen industry attack the Spinning Jenny when it was introduced?", a: "" },
  { q: "Who was a *gomastha* in the context of the East India Company's rule in India?", a: "" }
];

const histCh5: QuestionItem[] = [
  { q: "Where was the earliest kind of print technology using hand printing developed?", a: "" },
  { q: "What is an \"accordion book\" in traditional Chinese printing?", a: "" },
  { q: "Name the oldest Japanese book printed in AD 868 that contains woodcut illustrations.", a: "" },
  { q: "Who brought the knowledge of woodblock printing from China back to Italy in 1295?", a: "" },
  { q: "Who developed the first-known mechanical printing press in Strasbourg, Germany, in the 1430s?", a: "" },
  { q: "What was the first book printed by Johann Gutenberg on his new press?", a: "" },
  { q: "Define the print-related term *galley*.", a: "" },
  { q: "Which religious reformer wrote the *Ninety Five Theses* in 1517, leading to the Protestant Reformation?", a: "" },
  { q: "Why did the Roman Catholic Church begin maintaining an *Index of Prohibited Books* from 1558?", a: "" },
  { q: "What were *penny chapbooks* and who sold them in England?", a: "" },
  { q: "Which French novelist declared that \"the printing press is the most powerful engine of progress\"?", a: "" },
  { q: "Name two prominent Enlightenment thinkers whose widely printed books prepared the ground for the French Revolution.", a: "" },
  { q: "Who started editing the weekly magazine *Bengal Gazette* in India from 1780?", a: "" }
];


// Geography Questions (Chapters 1 to 7)
const geoCh1: QuestionItem[] = [
  { q: "What is the definition of a 'Resource' as per the textbook?", a: "" },
  { q: "What three components are involved in the process of transforming materials into resources?", a: "" },
  { q: "On what four bases are resources classified in the text?", a: "" },
  { q: "What are the two types of natural resources based on exhaustibility?", a: "" },
  { q: "What are the three major problems caused by the indiscriminate use of resources?", a: "" },
  { q: "What does the term 'Sustainable Development' mean?", a: "" },
  { q: "In which year and place was the first International Earth Summit held?", a: "" },
  { q: "What is the main objective of 'Agenda 21'?", a: "" },
  { q: "Why is resource planning essential in a country like India?", a: "" },
  { q: "What are the three steps involved in the process of resource planning in India?", a: "" },
  { q: "How much of India's total land area is accounted for by plains?", a: "" },
  { q: "What is the definition of 'Net Sown Area'?", a: "" },
  { q: "What is the main cause of land degradation in the states of Punjab and Haryana?", a: "" }
];

const geoCh2: QuestionItem[] = [
  { q: "What is the definition of 'Biodiversity' provided in the text?", a: "" },
  { q: "In which year was the Indian Wildlife (Protection) Act implemented?", a: "" },
  { q: "Name two animals that were specifically targeted for protection under Indian government projects.", a: "" },
  { q: "In which year was 'Project Tiger' launched?", a: "" },
  { q: "Name one tiger reserve located in the state of West Bengal.", a: "" },
  { q: "Into which three categories are forest resources classified in India?", a: "" },
  { q: "Which state has the largest area under permanent forests in India?", a: "" },
  { q: "What is the primary characteristic of 'Reserved Forests'?", a: "" },
  { q: "What is the main goal of the 'Joint Forest Management' (JFM) programme?", a: "" },
  { q: "What are 'Sacred Groves' in the context of forest conservation?", a: "" },
  { q: "Name one tribe from the Chota Nagpur region that worships Mahua and Kadamba trees.", a: "" },
  { q: "What was the main aim of the 'Chipko movement'?", a: "" },
  { q: "What is the practice of 'Rat hole' mining, as mentioned in the text?", a: "" }
];

const geoCh3: QuestionItem[] = [
  { q: "What proportion of the earth's surface is covered with water?", a: "" },
  { q: "What is the primary source of freshwater that is continually renewed?", a: "" },
  { q: "What are the main causes of water scarcity in regions with sufficient rainfall?", a: "" },
  { q: "Which sector is the largest consumer of water in India?", a: "" },
  { q: "What is the goal of the 'Jal Jeevan Mission' (JJM)?", a: "" },
  { q: "What are 'multi-purpose river projects' and why are they built?", a: "" },
  { q: "Who proclaimed dams as the 'temples of modern India'?", a: "" },
  { q: "Name the river on which the Sardar Sarovar Dam is built.", a: "" },
  { q: "What are 'guls' or 'kuls' in the context of water harvesting?", a: "" },
  { q: "What is 'palar pani' in the context of rainwater harvesting in Rajasthan?", a: "" },
  { q: "Which Indian state was the first to make rooftop rainwater harvesting compulsory?", a: "" },
  { q: "In which state is the 200-year-old 'Bamboo Drip Irrigation System' used?", a: "" },
  { q: "Why is Shillong, despite being near the wettest places on earth, facing water shortages?", a: "" }
];

const geoCh4: QuestionItem[] = [
  { q: "What percentage of India's population is engaged in agricultural activities?", a: "" },
  { q: "What is 'slash and burn' agriculture also known as?", a: "" },
  { q: "What is the local name for shifting agriculture in the north-eastern states of India?", a: "" },
  { q: "What are the main characteristics of 'Commercial Farming'?", a: "" },
  { q: "Name three important plantation crops grown in India.", a: "" },
  { q: "What are the three cropping seasons in India?", a: "" },
  { q: "Name two crops that are grown during the 'Rabi' season.", a: "" },
  { q: "Name two crops that are grown during the 'Kharif' season.", a: "" },
  { q: "What is the staple food crop of a majority of the people in India?", a: "" },
  { q: "Which crop is known as the 'golden fibre'?", a: "" },
  { q: "What is 'sericulture'?", a: "" },
  { q: "What was the 'Bhoodan-Gramdan' movement also known as?", a: "" },
  { q: "What is the 'Minimum Support Price' (MSP) used for by the government?", a: "" }
];

const geoCh5: QuestionItem[] = [
  { q: "How do geologists define a 'mineral'?", a: "" },
  { q: "What is the difference between a 'vein' and a 'lode'?", a: "" },
  { q: "What is the name of the residual mass formed by the decomposition of surface rocks?", a: "" },
  { q: "What are 'placer deposits'?", a: "" },
  { q: "Which iron ore is considered the finest with up to 70% iron content?", a: "" },
  { q: "Which state is the largest producer of manganese in India, according to the chart?", a: "" },
  { q: "Why is copper critically important for modern industries?", a: "" },
  { q: "Name a leading state for copper production in India.", a: "" },
  { q: "From which mineral is aluminium primarily derived?", a: "" },
  { q: "What is the sparkle in some toothpastes caused by?", a: "" },
  { q: "Which mineral is used to reduce cavities in toothpaste?", a: "" },
  { q: "Where are most of the petroleum deposits found in India?", a: "" },
  { q: "What mineral is primarily used for the manufacturing of steel and ferro-manganese alloy?", a: "" }
];

const geoCh6: QuestionItem[] = [
  { q: "What is the definition of 'Manufacturing' as provided in the text?", a: "" },
  { q: "Why is manufacturing considered the 'backbone' of economic development?", a: "" },
  { q: "What are the four classifications of industries based on the source of raw materials?", a: "" },
  { q: "Distinguish between 'Public Sector' and 'Joint Sector' industries with examples for each.", a: "" },
  { q: "What are 'Consumer Industries' and how do they differ from 'Key' or 'Basic' industries?", a: "" },
  { q: "Where was the first successful textile mill established in India in 1854?", a: "" },
  { q: "What major challenges does the cotton textile industry face in India?", a: "" },
  { q: "Why is the jute industry primarily concentrated along the banks of the Hugli River?", a: "" },
  { q: "Which country is the largest producer of raw jute and jute goods in the world?", a: "" },
  { q: "What are the primary uses of limestone in the cement industry?", a: "" },
  { q: "Which city is known as the 'Electronic Capital of India'?", a: "" },
  { q: "What is the impact of industrial pollution on the environment?", a: "" },
  { q: "What measures can be taken to control environmental degradation caused by industries?", a: "" }
];

const geoCh7: QuestionItem[] = [
  { q: "Why are the means of transportation and communication called the 'lifelines' of a nation?", a: "" },
  { q: "What are the three modes of transportation mentioned in the text?", a: "" },
  { q: "What is the significance of the 'Golden Quadrilateral Super Highways'?", a: "" },
  { q: "Define 'National Highways' and mention which authority maintains them.", a: "" },
  { q: "What is the importance of 'Border Roads' for a country's defense and development?", a: "" },
  { q: "What is the primary role of the Indian Railways in the national economy?", a: "" },
  { q: "What are the challenges faced by the Indian railway network?", a: "" },
  { q: "Which is the longest national waterway in India, and which river does it cover?", a: "" },
  { q: "Why are 'Major Sea Ports' vital for India's foreign trade?", a: "" },
  { q: "Name the first port developed soon after independence to ease the volume of trade on the Mumbai port.", a: "" },
  { q: "How does the 'Pipeline Transport' network contribute to energy distribution?", a: "" },
  { q: "What distinguishes 'Mass Communication' from 'Personal Communication'?", a: "" },
  { q: "How has international trade influenced India's economic growth and status in the global market?", a: "" }
];

// Mathematics Questions (Chapters 1 to 15)
const mathCh1: QuestionItem[] = [
  { q: "What is the Fundamental Theorem of Arithmetic?", a: "" },
  { q: "Prove that √5 is an irrational number.", a: "" },
  { q: "Explain Euclid's Division Lemma.", a: "" },
  { q: "If two positive integers a and b are written as a = x³y² and b = xy³, where x, y are prime numbers, find HCF(a, b) and LCM(a, b).", a: "" }
];

const mathCh2: QuestionItem[] = [
  { q: "What is the relation between the zeroes and coefficients of a quadratic polynomial ax² + bx + c?", a: "" },
  { q: "Find a quadratic polynomial, the sum and product of whose zeroes are -3 and 2 respectively.", a: "" },
  { q: "Explain the division algorithm for polynomials.", a: "" },
  { q: "How many zeroes can a cubic polynomial have at most?", a: "" }
];

const mathCh3: QuestionItem[] = [
  { q: "What are the conditions for a pair of linear equations to be consistent or inconsistent?", a: "" },
  { q: "Explain the algebraic methods of solving a pair of linear equations: substitution and elimination.", a: "" },
  { q: "For which value of k will the equations 3x + y = 1 and (2k-1)x + (k-1)y = 2k+1 have no solution?", a: "" }
];

const mathCh4: QuestionItem[] = [
  { q: "State the quadratic formula to find the roots of ax² + bx + c = 0.", a: "" },
  { q: "Explain the nature of roots of a quadratic equation based on its discriminant D.", a: "" },
  { q: "Find the roots of the quadratic equation 2x² - 7x + 3 = 0 using factorization.", a: "" }
];

const mathCh5: QuestionItem[] = [
  { q: "What is the formula to find the n-th term (a_n) of an Arithmetic Progression?", a: "" },
  { q: "Write the formula for the sum of the first n terms (S_n) of an AP.", a: "" },
  { q: "Find the 11th term of the AP: -3, -1/2, 2, ...", a: "" }
];

const mathCh6: QuestionItem[] = [
  { q: "State and prove the Basic Proportionality Theorem (Thales Theorem).", a: "" },
  { q: "State the SSS, SAS, and AA similarity criteria for triangles.", a: "" },
  { q: "Prove that if in two triangles, corresponding angles are equal, then their corresponding sides are in the same ratio.", a: "" }
];

const mathCh7: QuestionItem[] = [
  { q: "State the distance formula to find the distance between points P(x₁, y₁) and Q(x₂, y₂).", a: "" },
  { q: "What is the section formula for internal division of a line segment?", a: "" },
  { q: "Find the coordinates of the point which divides the line segment joining (4, -3) and (8, 5) in the ratio 3:1 internally.", a: "" }
];

const mathCh8: QuestionItem[] = [
  { q: "Define the six trigonometric ratios with respect to an acute angle in a right-angled triangle.", a: "" },
  { q: "State the three fundamental trigonometric identities.", a: "" },
  { q: "If sin A = 3/4, calculate cos A and tan A.", a: "" },
  { q: "Evaluate: (2 tan 30°) / (1 + tan² 30°).", a: "" }
];

const mathCh9: QuestionItem[] = [
  { q: "Define the term 'angle of elevation' and 'angle of depression'.", a: "" },
  { q: "A tower stands vertically on the ground. From a point on the ground, 15m away from the foot of the tower, the angle of elevation of the top of the tower is 60°. Find the height of the tower.", a: "" }
];

const mathCh10: QuestionItem[] = [
  { q: "Prove that the tangent at any point of a circle is perpendicular to the radius through the point of contact.", a: "" },
  { q: "Prove that the lengths of tangents drawn from an external point to a circle are equal.", a: "" },
  { q: "How many tangents can a circle have at most from a point inside the circle?", a: "" }
];

const mathCh11: QuestionItem[] = [
  { q: "How do you divide a line segment internally in a given ratio m:n?", a: "" },
  { q: "Describe the steps of construction to draw a pair of tangents to a circle from an external point.", a: "" }
];

const mathCh12: QuestionItem[] = [
  { q: "State the formula for the area of a sector of a circle of radius r with sector angle θ.", a: "" },
  { q: "What is the formula to find the area of a segment of a circle?", a: "" },
  { q: "Find the area of a sector of a circle with radius 6 cm if angle of the sector is 60°.", a: "" }
];

const mathCh13: QuestionItem[] = [
  { q: "Write the formulas for the curved surface area, total surface area, and volume of a cylinder.", a: "" },
  { q: "State the formulas for the surface area and volume of a sphere.", a: "" },
  { q: "A solid is in the shape of a cone standing on a hemisphere with both their radii being equal to 1 cm and the height of the cone is equal to its radius. Find the volume of the solid in terms of π.", a: "" }
];

const mathCh14: QuestionItem[] = [
  { q: "Define Mean, Median, and Mode of grouped data and state the empirical relationship between them.", a: "" },
  { q: "Explain the direct method, assumed mean method, and step deviation method to find the mean.", a: "" },
  { q: "How is the mode of grouped data calculated? State the formula.", a: "" }
];

const mathCh15: QuestionItem[] = [
  { q: "What is the classical definition of the probability of an event E?", a: "" },
  { q: "What are the range of values that the probability of any event can take?", a: "" },
  { q: "A card is drawn from a well-shuffled deck of 52 cards. Find the probability of getting a king of red colour.", a: "" },
  { q: "Two coins are tossed simultaneously. Find the probability of getting at least one head.", a: "" }
];


// Civics Questions (Chapters 1 to 8)
const civCh1: QuestionItem[] = [
  { q: "What is power sharing? Why is it desirable in a democracy?", a: "" },
  { q: "Describe the ethnic composition of Belgium as mentioned in the chapter.", a: "" },
  { q: "What is Majoritarianism? How did it lead to civil war in Sri Lanka?", a: "" },
  { q: "Explain the four major forms of power sharing in modern democracies with examples.", a: "" }
];

const civCh2: QuestionItem[] = [
  { q: "Define Federalism. State its key features.", a: "" },
  { q: "Differentiate between 'Coming Together' and 'Holding Together' federations with examples.", a: "" },
  { q: "What makes India a federal country? Explain the three-fold distribution of legislative powers.", a: "" },
  { q: "What is decentralisation? Explain the major steps taken towards decentralisation in India in 1992.", a: "" }
];

const civCh3: QuestionItem[] = [
  { q: "Explain the origins of social differences as discussed in the chapter.", a: "" },
  { q: "How do social divisions affect politics? Give two examples.", a: "" },
  { q: "What were the three determinants of the outcomes of social divisions on politics?", a: "" }
];

const civCh4: QuestionItem[] = [
  { q: "How does gender division express itself in politics?", a: "" },
  { q: "What is Communalism? How does it pose a threat to Indian democracy?", a: "" },
  { q: "What are the features of a secular state in India?", a: "" },
  { q: "How does caste influence politics, and how does politics influence caste?", a: "" }
];

const civCh5: QuestionItem[] = [
  { q: "Differentiate between sectional interest groups and public interest groups with examples.", a: "" },
  { q: "Describe Nepal's movement for democracy in April 2006.", a: "" },
  { q: "What was Bolivia's Water War? Explain the role of FEDECOR.", a: "" },
  { q: "How do pressure groups and movements exert influence on politics?", a: "" }
];

const civCh6: QuestionItem[] = [
  { q: "What is a political party? State its three components.", a: "" },
  { q: "Describe the major functions performed by political parties in a democracy.", a: "" },
  { q: "What are the challenges faced by political parties in India?", a: "" },
  { q: "Suggest some reforms to strengthen political parties and improve their internal working.", a: "" }
];

const civCh7: QuestionItem[] = [
  { q: "How does democracy produce an accountable, responsive, and legitimate government?", a: "" },
  { q: "Is democracy superior to any other form of government in reducing economic inequalities and poverty?", a: "" },
  { q: "What are the major outcomes of democracy regarding dignity and freedom of citizens?", a: "" }
];

const civCh8: QuestionItem[] = [
  { q: "What are the three broad categories of challenges faced by democracies across the world?", a: "" },
  { q: "Explain the foundational challenge, challenge of expansion, and challenge of deepening of democracy.", a: "" },
  { q: "How can political reforms be carried out to overcome the challenges to democracy?", a: "" }
];


// Comprehensive mapping of cbseQuestionsDb
export const cbseQuestionsDb: Record<string, Record<string, QuestionItem[]>> = {
  "Science": {
    "Chemical Reactions and Equations": scCh1,
    "Acids, Bases and Salts": scCh2,
    "Metals and Non-metals": scCh3,
    "Carbon and its Compounds": scCh4,
    "Carbon and Its Compounds": scCh4,
    "Periodic Classification of Elements": scCh5,
    "Life Processes": scCh6,
    "Control and Coordination": scCh7,
    "How do Organisms Reproduce?": scCh8,
    "How Do Organisms Reproduce?": scCh8,
    "Heredity and Evolution": scCh9,
    "Light - Reflection and Refraction": scCh10,
    "Light – Reflection and Refraction": scCh10,
    "The Human Eye and the Colourful World": scCh11,
    "Electricity": scCh12,
    "Magnetic Effects of Electric Current": scCh13,
    "Sources of Energy": scCh14,
    "Our Environment": scCh15,
    "Sustainable Management of Natural Resources": scCh16,
    "Management of Natural Resources": scCh16
  },
  "Mathematics": {
    "Real Numbers": mathCh1,
    "Polynomials": mathCh2,
    "Pair of Linear Equations in Two Variables": mathCh3,
    "Quadratic Equations": mathCh4,
    "Arithmetic Progressions": mathCh5,
    "Triangles": mathCh6,
    "Coordinate Geometry": mathCh7,
    "Introduction to Trigonometry": mathCh8,
    "Some Applications of Trigonometry": mathCh9,
    "Circles": mathCh10,
    "Constructions": mathCh11,
    "Areas Related to Circles": mathCh12,
    "Surface Areas and Volumes": mathCh13,
    "Statistics": mathCh14,
    "Probability": mathCh15
  },
  "Social Studies": {
    // History Chapters
    "The Rise of Nationalism in Europe": histCh1,
    "Nationalism in India": histCh2,
    "The Making of a Global World": histCh3,
    "The Age of Industrialisation": histCh4,
    "Print Culture and the Modern World": histCh5,

    // Geography Chapters
    "Resources and Development": geoCh1,
    "Forest and Wildlife Resources": geoCh2,
    "Water Resources": geoCh3,
    "Agriculture": geoCh4,
    "Minerals and Energy Resources": geoCh5,
    "Manufacturing Industries": geoCh6,
    "Lifelines of National Economy": geoCh7,

    // Civics Chapters
    "Power Sharing": civCh1,
    "Federalism": civCh2,
    "Democracy and Diversity": civCh3,
    "Gender, Religion and Caste": civCh4,
    "Popular Struggles and Movements": civCh5,
    "Political Parties": civCh6,
    "Outcomes of Democracy": civCh7,
    "Challenges to Democracy": civCh8
  }
};

