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


// SSC History Questions (Chapters 1 to 9)
const sscHistCh1: QuestionItem[] = [
  { q: "What is historiography, and why is it important in the study of history?", a: "" },
  { q: "Explain the contribution of Herodotus to the development of historiography.", a: "" },
  { q: "Why is Thucydides regarded as the father of scientific historiography?", a: "" },
  { q: "What are the main differences between the approaches of Herodotus and Thucydides in writing history?", a: "" },
  { q: "Explain the historical method proposed by Leopold von Ranke.", a: "" },
  { q: "How did the ideas of the Renaissance influence the writing of history?", a: "" },
  { q: "Describe the impact of the Age of Enlightenment on the development of modern historiography.", a: "" },
  { q: "Explain the contribution of Voltaire to historiography.", a: "" },
  { q: "What is meant by scientific historiography, and what are its key characteristics?", a: "" },
  { q: "Why is the critical examination of historical sources essential for writing authentic history?", a: "" },
  { q: "How did the development of archaeology and other auxiliary sciences improve historical research?", a: "" },
  { q: "Compare ancient historiography with modern scientific historiography.", a: "" },
  { q: "Analyse how the evolution of historiography has improved the accuracy, objectivity, and reliability of historical writing.", a: "" }
];

const sscHistCh2: QuestionItem[] = [
  { q: "What is meant by Indian historiography?", a: "" },
  { q: "Explain the main characteristics of colonial historiography.", a: "" },
  { q: "Why did Orientalist historians show special interest in ancient Indian culture and Sanskrit literature?", a: "" },
  { q: "State the contributions of Sir William Jones to the study of Indian history.", a: "" },
  { q: "Explain the contribution of Friedrich Max Müller to Indian historiography.", a: "" },
  { q: "What are the main features of nationalistic historiography in India?", a: "" },
  { q: "Explain the contribution of Vishwanath Kashinath Rajwade to historical research in India.", a: "" },
  { q: "What are the main principles of Marxist historiography?", a: "" },
  { q: "Explain the concept of subaltern history and discuss its significance.", a: "" },
  { q: "How did Mahatma Jyotirao Phule and B. R. Ambedkar contribute to subaltern historiography?", a: "" },
  { q: "What is feminist historiography, and why did it emerge?", a: "" },
  { q: "Compare colonial, nationalistic, and Marxist historiography.", a: "" },
  { q: "Analyse how different ideological frameworks have influenced the writing and interpretation of Indian history.", a: "" }
];

const sscHistCh3: QuestionItem[] = [
  { q: "What is meant by Applied History?", a: "" },
  { q: "Why is Applied History also known as Public History?", a: "" },
  { q: "Explain the importance of Applied History in solving contemporary social issues.", a: "" },
  { q: "How is the method of history useful in the research of science and technology?", a: "" },
  { q: "Describe the role of history in management studies and industrial development.", a: "" },
  { q: "Differentiate between tangible and intangible cultural heritage with suitable examples.", a: "" },
  { q: "What is natural heritage? Explain its major components.", a: "" },
  { q: "What is the role of UNESCO in the conservation of cultural and natural heritage?", a: "" },
  { q: "Explain the importance of preserving cultural and natural heritage for future generations.", a: "" },
  { q: "What are the objectives and functions of archives and museums in preserving historical sources?", a: "" },
  { q: "Discuss the role of local people and experts in the conservation and management of heritage sites.", a: "" },
  { q: "What are the major professional fields associated with Applied History?", a: "" },
  { q: "Analyse how Applied History contributes to heritage conservation, public awareness, research, and sustainable development.", a: "" }
];

const sscHistCh4: QuestionItem[] = [
  { q: "What is meant by art, and what are the essential elements of artistic creation?", a: "" },
  { q: "Differentiate between visual arts and performing arts with suitable examples.", a: "" },
  { q: "Distinguish between folk art and classical art.", a: "" },
  { q: "Explain the characteristics and historical importance of the Maratha style of painting.", a: "" },
  { q: "Describe the significance of the Ajanta paintings and Bhimbetka rock paintings in the history of Indian art.", a: "" },
  { q: "What are the six aspects (Shadanga) of classical Indian painting? Explain briefly.", a: "" },
  { q: "Explain the development of Indian sculptural art from the Harappan period to the Gupta period.", a: "" },
  { q: "What is Indian iconography? Discuss the contributions of the Gandhara and Mathura schools of art.", a: "" },
  { q: "Compare the Nagara, Dravida, and Vesara styles of Indian temple architecture.", a: "" },
  { q: "Explain the major features of Indo-Islamic architecture with suitable examples.", a: "" },
  { q: "Describe the main traditions of Indian performing arts, including classical music, dance, and folk arts.", a: "" },
  { q: "Explain how Indian art provides valuable information about the social, cultural, and religious life of different historical periods.", a: "" },
  { q: "Analyse how India's visual arts, performing arts, sculpture, and architecture reflect the country's rich cultural heritage and historical development.", a: "" }
];

const sscHistCh5: QuestionItem[] = [
  { q: "What is meant by mass media?", a: "" },
  { q: "Explain the importance of mass media in preserving and promoting history.", a: "" },
  { q: "What are the different types of mass media? Give suitable examples.", a: "" },
  { q: "How do newspapers and magazines serve as valuable sources of historical information?", a: "" },
  { q: "Explain the role of radio and television in creating historical awareness among people.", a: "" },
  { q: "How has the internet changed the collection, preservation, and dissemination of historical information?", a: "" },
  { q: "What are the advantages and limitations of electronic media as a source of history?", a: "" },
  { q: "Why is it necessary to critically evaluate information obtained through mass media?", a: "" },
  { q: "Explain the contribution of documentaries and news reports to the understanding of historical events.", a: "" },
  { q: "How do advertisements, photographs, and films help historians study society and culture?", a: "" },
  { q: "Discuss the role of archives and digital media in preserving historical records.", a: "" },
  { q: "Explain how mass media influences public opinion about historical events and personalities.", a: "" },
  { q: "Analyse the role of mass media in preserving historical heritage, educating society, and promoting awareness of the past.", a: "" }
];

const sscHistCh6: QuestionItem[] = [
  { q: "What is meant by entertainment, and how has it changed over time?", a: "" },
  { q: "Explain the relationship between history and the various forms of entertainment.", a: "" },
  { q: "What are the different sources that help us understand the history of entertainment?", a: "" },
  { q: "Describe the development of theatre as a form of entertainment in India.", a: "" },
  { q: "Explain the contribution of Indian cinema to the preservation and promotion of history.", a: "" },
  { q: "How do historical films and television serials help people understand historical events and personalities?", a: "" },
  { q: "What role do folk arts and traditional performances play in preserving cultural heritage?", a: "" },
  { q: "Explain the significance of music, dance, and drama in reflecting the social and cultural history of India.", a: "" },
  { q: "How have technological advancements influenced the entertainment industry?", a: "" },
  { q: "Why is it important to maintain historical accuracy while producing historical films and serials?", a: "" },
  { q: "Explain the educational value of museums, exhibitions, and cultural festivals as sources of entertainment.", a: "" },
  { q: "Discuss the positive and negative effects of entertainment media on people's understanding of history.", a: "" },
  { q: "Analyse how entertainment has evolved from traditional folk performances to modern digital media while continuing to preserve and communicate historical and cultural heritage.", a: "" }
];

const sscHistCh7: QuestionItem[] = [
  { q: "What is the relationship between sports and history?", a: "" },
  { q: "Explain how sports reflect the social and cultural development of a society.", a: "" },
  { q: "What are the major sources used to study the history of sports?", a: "" },
  { q: "Describe the origin and historical development of the Olympic Games.", a: "" },
  { q: "Explain the contribution of International Olympic Committee in promoting international sports.", a: "" },
  { q: "What is the significance of traditional Indian sports in preserving cultural heritage?", a: "" },
  { q: "How have sports contributed to national integration and international goodwill?", a: "" },
  { q: "Explain the role of sports museums, records, and archives in preserving the history of sports.", a: "" },
  { q: "How has technology influenced the development and management of modern sports?", a: "" },
  { q: "Discuss the importance of sports biographies and autobiographies as historical sources.", a: "" },
  { q: "Explain the achievements of Indian sportspersons in international competitions and their contribution to India's sporting history.", a: "" },
  { q: "Why is it important to preserve the history and heritage of sports for future generations?", a: "" },
  { q: "Analyse how sports have evolved over time and contributed to cultural exchange, national identity, and international cooperation.", a: "" }
];

const sscHistCh8: QuestionItem[] = [
  { q: "What is meant by tourism, and how is it related to history?", a: "" },
  { q: "Explain the importance of historical tourism in understanding the cultural heritage of a country.", a: "" },
  { q: "What are the different types of tourism mentioned in the chapter?", a: "" },
  { q: "How do historical monuments, forts, caves, and museums promote tourism?", a: "" },
  { q: "Explain the role of tourism in preserving cultural and historical heritage.", a: "" },
  { q: "How does tourism contribute to the economic development of a country?", a: "" },
  { q: "Why is it necessary to conserve and protect historical monuments and heritage sites?", a: "" },
  { q: "Explain the role of the government and local communities in promoting sustainable tourism.", a: "" },
  { q: "What is the importance of museums, archives, and heritage sites for tourists and researchers?", a: "" },
  { q: "Discuss the impact of tourism on local culture, traditions, and employment opportunities.", a: "" },
  { q: "What precautions should tourists take while visiting historical and heritage sites?", a: "" },
  { q: "Explain how tourism creates awareness about the history and culture of different regions.", a: "" },
  { q: "Analyse how responsible tourism helps preserve historical heritage while promoting cultural understanding and sustainable development.", a: "" }
];

const sscHistCh9: QuestionItem[] = [
  { q: "What is meant by heritage management?", a: "" },
  { q: "Differentiate between cultural heritage and natural heritage with suitable examples.", a: "" },
  { q: "Explain the importance of conserving and preserving heritage for future generations.", a: "" },
  { q: "What is the role of UNESCO in protecting World Heritage Sites?", a: "" },
  { q: "Explain the functions of the Archaeological Survey of India in the conservation of historical monuments.", a: "" },
  { q: "What is the role of Indian National Trust for Art and Cultural Heritage in heritage conservation?", a: "" },
  { q: "Why is public participation important in the management and preservation of heritage sites?", a: "" },
  { q: "Explain the contribution of museums, archives, and libraries in preserving historical heritage.", a: "" },
  { q: "What are the major challenges faced in the conservation of historical monuments and heritage sites?", a: "" },
  { q: "Discuss the importance of documentation, research, and scientific methods in heritage management.", a: "" },
  { q: "Explain how tourism and heritage management are interconnected.", a: "" },
  { q: "Suggest suitable measures for the effective conservation and protection of India's cultural and natural heritage.", a: "" },
  { q: "Analyse how heritage management helps preserve national identity, promotes sustainable tourism, creates employment opportunities, and safeguards historical resources for future generations.", a: "" }
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

// Mathematics Questions (Chapters 1 to 14)
const mathCh1: QuestionItem[] = [
  { q: "What are the two important properties of positive integers discussed at the beginning of this chapter?", a: "" },
  { q: "State the Fundamental Theorem of Arithmetic.", a: "" },
  { q: "Who gave the first correct proof of the Fundamental Theorem of Arithmetic?", a: "" },
  { q: "Express the number 140 as a product of its prime factors.", a: "" },
  { q: "Write the mathematical relationship between the HCF and LCM of two positive integers a and b.", a: "" },
  { q: "If the HCF of 306 and 657 is 9, what is their LCM?", a: "" },
  { q: "Why cannot the number 4^n end with the digit zero for any natural number n?", a: "" },
  { q: "What is the definition of an irrational number?", a: "" },
  { q: "Let p be a prime number. If p divides a^2, what can you say about p and a?", a: "" },
  { q: "Name the technique of proof used to show that √2 is irrational.", a: "" },
  { q: "Is the sum of a rational number and an irrational number rational or irrational?", a: "" },
  { q: "If a and b are two numbers that have no common factors other than 1, what are they called?", a: "" },
  { q: "Write the formula for finding the LCM of three positive integers p, q, and r using their HCF values.", a: "" }
];

const mathCh2: QuestionItem[] = [
  { q: "What is meant by the degree of a polynomial p(x)?", a: "" },
  { q: "Define a linear polynomial and give one example.", a: "" },
  { q: "What is a polynomial of degree 2 called?", a: "" },
  { q: "From which word is the term 'quadratic' derived, and what does it mean?", a: "" },
  { q: "Define a zero of a polynomial p(x) in terms of a real number k.", a: "" },
  { q: "What is the general form of a cubic polynomial?", a: "" },
  { q: "Geometrically, what does a zero of a linear polynomial represent on a graph?", a: "" },
  { q: "What is the geometric shape of the graph of a quadratic polynomial called?", a: "" },
  { q: "What is the maximum number of zeroes that a polynomial of degree n can have?", a: "" },
  { q: "Write the formula for the sum of the zeroes of a quadratic polynomial ax^2 + bx + c.", a: "" },
  { q: "Write the formula for the product of the zeroes of a quadratic polynomial ax^2 + bx + c.", a: "" },
  { q: "If the sum of the zeroes of a quadratic polynomial is -3 and the product is 2, write the polynomial.", a: "" },
  { q: "State the relationship for the product of the zeroes (αβγ) of a cubic polynomial ax^3 + bx^2 + cx + d.", a: "" }
];

const mathCh3: QuestionItem[] = [
  { q: "What is a pair of linear equations called if it has no solution?", a: "" },
  { q: "What is a consistent pair of linear equations?", a: "" },
  { q: "What are the three possible behaviors of two lines representing a pair of linear equations on a graph?", a: "" },
  { q: "Under what condition involving ratios of coefficients do two lines intersect at a single point?", a: "" },
  { q: "Write the condition for the coefficients of a pair of linear equations to have infinitely many solutions.", a: "" },
  { q: "If a1/a2 = b1/b2 ≠ c1/c2, what type of lines are represented by the equations?", a: "" },
  { q: "Name two algebraic methods discussed in this chapter for solving a pair of linear equations.", a: "" },
  { q: "Why is the substitution method named so?", a: "" },
  { q: "If an algebraic method leads to a false statement involving no variable, what does it signify about the system of equations?", a: "" },
  { q: "What type of statement is obtained during substitution or elimination if a pair of equations has infinitely many solutions?", a: "" },
  { q: "Express the first step required in the elimination method to eliminate a variable.", a: "" },
  { q: "If the lines representing a pair of equations are parallel, what is the number of solutions?", a: "" },
  { q: "If two lines coincide, what is the nature of the consistency of the pair of linear equations?", a: "" }
];

const mathCh4: QuestionItem[] = [
  { q: "What is the standard form of a quadratic equation?", a: "" },
  { q: "Who was credited with giving an explicit formula to solve a quadratic equation of the form ax^2 + bx = c?", a: "" },
  { q: "Define a root of a quadratic equation ax^2 + bx + c = 0.", a: "" },
  { q: "What is the maximum number of roots a quadratic equation can have?", a: "" },
  { q: "State the quadratic formula used to find the roots of ax^2 + bx + c = 0.", a: "" },
  { q: "What is the term b^2 - 4ac called in a quadratic equation?", a: "" },
  { q: "What is the nature of the roots if the discriminant of a quadratic equation is greater than zero?", a: "" },
  { q: "Under what condition does a quadratic equation have two equal real roots?", a: "" },
  { q: "What can you conclude about the roots of a quadratic equation if b^2 - 4ac < 0?", a: "" },
  { q: "Find the discriminant of the quadratic equation 2x^2 - 4x + 3 = 0.", a: "" },
  { q: "If a real number satisfies a quadratic equation, what is that number called in relation to the equation?", a: "" },
  { q: "Apart from factorisation and the quadratic formula, what other method of solving is mentioned historically as used by Sridharacharya?", a: "" },
  { q: "If a quadratic equation has a discriminant equal to 0, what is the formula for both its roots?", a: "" }
];

const mathCh5: QuestionItem[] = [
  { q: "Define an Arithmetic Progression (AP).", a: "" },
  { q: "What is each number in a list of an arithmetic progression called?", a: "" },
  { q: "What is the fixed number added to a preceding term to get the next term in an AP called?", a: "" },
  { q: "Can the common difference of an AP be negative or zero?", a: "" },
  { q: "Write the general form of an Arithmetic Progression.", a: "" },
  { q: "What is the main difference between a finite AP and an infinite AP?", a: "" },
  { q: "Find the common difference d for the AP: 3/2, 1/2, -1/2, -3/2, ...", a: "" },
  { q: "Write the first four terms of an AP where the first term a = 10 and the common difference d = 10.", a: "" },
  { q: "For the list of numbers 1, 1, 2, 3, 5, ..., explain briefly why it is not an AP.", a: "" },
  { q: "Write the formula to find the common difference d using the kth and (k+1)th terms.", a: "" },
  { q: "Find the next two terms of the AP: 4, 10, 16, 22, ...", a: "" },
  { q: "What minimum information do you need to completely list or know an AP?", a: "" },
  { q: "If you subtract a term from its succeeding term and the differences are not the same, what does it tell you about the list?", a: "" }
];

const mathCh6: QuestionItem[] = [
  { q: "What is the main structural feature that distinguishes congruent figures from similar figures?", a: "" },
  { q: "Are all equilateral triangles similar?", a: "" },
  { q: "State the basic criterion for two polygons of the same number of sides to be similar.", a: "" },
  { q: "What is the name of the theorem which states that if a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio?", a: "" },
  { q: "Write the mathematical criterion for the Side-Angle-Side (SAS) similarity of two triangles.", a: "" },
  { q: "If the corresponding angles of two triangles are equal, what are these triangles called?", a: "" },
  { q: "State the Triple-A (AAA) similarity criterion for two triangles.", a: "" },
  { q: "If a line divides any two sides of a triangle in the same ratio, what is the geometric relationship of that line to the third side?", a: "" },
  { q: "What type of similarity criterion is satisfied if the corresponding sides of two triangles are proportional?", a: "" },
  { q: "In a trapezium ABCD where AB || DC, at what point do the diagonals AC and BD intersect each other?", a: "" },
  { q: "If ΔABC ~ ΔPQR and AB/PQ = 2/3, what will be the ratio of their corresponding medians?", a: "" },
  { q: "Can two triangles be similar if two angles of one triangle are respectively equal to two angles of the other triangle?", a: "" },
  { q: "If ΔODC ~ ΔOBA and ∠BOC = 125°, find the value of ∠DOC.", a: "" }
];

const mathCh7: QuestionItem[] = [
  { q: "Write the formula to find the distance between any two points P(x_1, y_1) and Q(x_2, y_2).", a: "" },
  { q: "What is the distance formula of a point P(x, y) from the origin (0,0)?", a: "" },
  { q: "What is the horizontal distance parameter x of a coordinate point called?", a: "" },
  { q: "What is the vertical distance parameter y of a coordinate point called?", a: "" },
  { q: "State the section formula for finding the coordinates of a point dividing the line segment joining (x_1, y_1) and (x_2, y_2) internally in the ratio m_1 : m_2.", a: "" },
  { q: "Write the coordinates of the midpoint of a line segment joining the points P(x_1, y_1) and Q(x_2, y_2).", a: "" },
  { q: "In what standard ratio does a midpoint divide a given line segment?", a: "" },
  { q: "If three points are collinear, what will be the area of the triangle formed by them?", a: "" },
  { q: "Find the distance between the points (2, 3) and (4, 1).", a: "" },
  { q: "What is the coordinate geometry test used to verify if a given quadrilateral is a square?", a: "" },
  { q: "If the distance between (x, 0) and (0, 3) is 5 units, find a positive value for x.", a: "" },
  { q: "Name the point where the x-axis and y-axis intersect each other.", a: "" },
  { q: "If a point lies on the y-axis, what is its x-coordinate equal to?", a: "" }
];

const mathCh8: QuestionItem[] = [
  { q: "Define the trigonometric ratio sin A in terms of the sides of a right-angled triangle.", a: "" },
  { q: "What is the reciprocal of the trigonometric ratio tan A?", a: "" },
  { q: "Express sec A as a ratio of the sides of a right-angled triangle.", a: "" },
  { q: "What is the maximum value that sin θ can take for an acute angle θ?", a: "" },
  { q: "What is the value of cos 60°?", a: "" },
  { q: "Find the value of tan 45°.", a: "" },
  { q: "Write the fundamental trigonometric identity involving sin^2 A and cos^2 A.", a: "" },
  { q: "Express the identity that links sec^2 A and tan^2 A.", a: "" },
  { q: "What is the value of csc 30°?", a: "" },
  { q: "If sin A = 3/4, calculate the value of csc A.", a: "" },
  { q: "Which trigonometric ratio is defined as the ratio of the side adjacent to angle A to the hypotenuse?", a: "" },
  { q: "For which specific standard acute angle are the values of sin θ and cos θ equal?", a: "" },
  { q: "Simplify the trigonometric expression: 9sec^2 A - 9tan^2 A.", a: "" }
];

const mathCh9: QuestionItem[] = [
  { q: "What is the line called that is drawn from the eye of an observer to the point in the object viewed?", a: "" },
  { q: "Define the angle of elevation of an object viewed.", a: "" },
  { q: "Define the angle of depression of an object viewed.", a: "" },
  { q: "Which instrument is historically or commonly used to measure the angles of elevation or depression?", a: "" },
  { q: "If a pole throws a shadow of equal length to its height, what is the angle of elevation of the sun?", a: "" },
  { q: "When an observer moves closer to the base of a tower, does the angle of elevation of its top increase or decrease?", a: "" },
  { q: "In a right triangle representing a height and distance problem, which trigonometric ratio is most commonly used when dealing with height and base?", a: "" },
  { q: "A ladder leaning against a wall makes an angle of 60° with the ground. If the foot of the ladder is 2 m away from the wall, find the length of the ladder.", a: "" },
  { q: "If the angle of depression of an object from a tower is 30°, what is the corresponding alternate angle of elevation from the object to the top of the tower?", a: "" },
  { q: "What geometric shape is fundamentally formed and analyzed in solving all heights and distances problems?", a: "" },
  { q: "A vertical pole stands on the ground. From a point 15 m away from the foot of the pole, the angle of elevation of the top is 45°. What is the height of the pole?", a: "" },
  { q: "If the height of a tower is multiplied by √3 and its shadow stays the same, how does the tangent of the angle of elevation change?", a: "" },
  { q: "Is the angle of depression measured relative to the vertical line or the horizontal line drawn through the eye of the observer?", a: "" }
];

const mathCh10: QuestionItem[] = [
  { q: "What is a line called that intersects a circle in two distinct points?", a: "" },
  { q: "Define a tangent to a circle.", a: "" },
  { q: "At how many points can a tangent touch a circle?", a: "" },
  { q: "State the geometric relationship between a tangent at any point of a circle and the radius through the point of contact.", a: "" },
  { q: "What is the common point of a tangent and the circle called?", a: "" },
  { q: "How many tangents can be drawn to a circle from a point residing inside the circle?", a: "" },
  { q: "How many tangents can be drawn to a circle from a point residing outside the circle?", a: "" },
  { q: "State the theorem regarding the lengths of tangents drawn from an external point to a circle.", a: "" },
  { q: "If two tangents PA and PB are drawn from an external point P to a circle with centre O, what type of quadrilateral is OAPB?", a: "" },
  { q: "If the angle between two tangents from an external point is 70°, what is the angle formed between the radii at the centre?", a: "" },
  { q: "How many parallel tangents can a circle have at most at any one time?", a: "" },
  { q: "If the radius of a circle is 5 cm and a tangent is drawn from an external point 12 cm away from the point of contact, find the distance from the external point to the centre.", a: "" },
  { q: "What is the angle between a radius and a tangent at the point of contact?", a: "" }
];

const mathCh11: QuestionItem[] = [
  { q: "Write the standard formula to find the area of a circle with radius r.", a: "" },
  { q: "Write the formula to find the circumference of a circle.", a: "" },
  { q: "What is the region bounded by an arc and two radii of a circle called?", a: "" },
  { q: "Define a segment of a circle.", a: "" },
  { q: "Write the formula for the length of an arc of a sector of a circle with radius r and angle θ.", a: "" },
  { q: "Write the formula for the area of a sector of a circle with radius r and angle θ.", a: "" },
  { q: "How do you find the area of a minor segment using the area of the corresponding sector and the area of the corresponding triangle?", a: "" },
  { q: "What is the angle of a sector that represents a complete semicircle?", a: "" },
  { q: "If the radius of a circle is doubled, how many times does its area increase?", a: "" },
  { q: "Find the area of a sector of a circle with radius 6 cm if the angle of the sector is 60°.", a: "" },
  { q: "What is a sector with an angle greater than 180° called?", a: "" },
  { q: "If the perimeter and the area of a circle are numerically equal, what is the radius of the circle?", a: "" },
  { q: "What fraction of the total area of a circle is represented by a quadrant sector?", a: "" }
];

const mathCh12: QuestionItem[] = [
  { q: "Write the formula for the total surface area of a solid hemisphere of radius r.", a: "" },
  { q: "What is the formula for the volume of a sphere of radius r?", a: "" },
  { q: "Write the formula for the curved surface area of a right circular cone with radius r and slant height l.", a: "" },
  { q: "How is the slant height l of a cone calculated using its height h and radius r?", a: "" },
  { q: "Write the formula for the volume of a right circular cylinder of radius r and height h.", a: "" },
  { q: "If a solid shape is melted and recast into another solid shape, what physical quantity remains constant?", a: "" },
  { q: "Write the formula for the total surface area of a cylinder open at both ends.", a: "" },
  { q: "What is the volume formula for a cone of radius r and height h?", a: "" },
  { q: "If three cubes of side 2 cm are joined end to end, what new solid shape is formed?", a: "" },
  { q: "Write the formula for the total surface area of a cube of side a.", a: "" },
  { q: "Express the total volume of a solid combination consisting of a cylinder surmounted by a cone.", a: "" },
  { q: "What is the ratio of the volume of a cylinder to the volume of a cone having the same radius and height?", a: "" },
  { q: "Write the formula for the curved surface area of a hemisphere.", a: "" }
];

const mathCh13: QuestionItem[] = [
  { q: "Name the three central measures of tendency studied in this chapter.", a: "" },
  { q: "Write the formula to calculate the class mark of a class interval.", a: "" },
  { q: "State the direct method formula used to find the mean of grouped data.", a: "" },
  { q: "What is the formula for finding the mean using the Assumed Mean Method?", a: "" },
  { q: "Write the formula for calculating the deviation d_i in the Assumed Mean Method.", a: "" },
  { q: "Write the formula for finding the mode of grouped data.", a: "" },
  { q: "What is the class called which has the maximum frequency in a grouped data distribution?", a: "" },
  { q: "Write the formula used to find the median of grouped data.", a: "" },
  { q: "Define the term cumulative frequency.", a: "" },
  { q: "What are the two types of cumulative frequency distributions that can be formed?", a: "" },
  { q: "Write the empirical relationship formula that connects Mean, Median, and Mode.", a: "" },
  { q: "In the formula for mode, what does the symbol f_1 represent?", a: "" },
  { q: "If the lower limit of a median class is l, the class size is h, total frequency is n, cumulative frequency of the preceding class is cf, and frequency of median class is f, write the term added to l to find the median.", a: "" }
];

const mathCh14: QuestionItem[] = [
  { q: "Write the classical (theoretical) formula to calculate the probability of an event E, denoted as P(E).", a: "" },
  { q: "What is the probability of a sure or certain event?", a: "" },
  { q: "What is the probability of an impossible event?", a: "" },
  { q: "Write the inequality that defines the range of values a probability P(E) can take.", a: "" },
  { q: "What is an event called if it has only one outcome of the experiment?", a: "" },
  { q: "What is the sum of the probabilities of all the elementary events of an experiment?", a: "" },
  { q: "Write the formula connecting the probability of an event E and its complementary event Ē.", a: "" },
  { q: "What name is given to events when each outcome has the same chance of occurring?", a: "" },
  { q: "A coin is tossed once. What is the probability of getting a head?", a: "" },
  { q: "A single unbiased die is thrown. What is the probability of getting a number greater than 6?", a: "" },
  { q: "If P(E) = 0.05, what is the probability of 'not E'?", a: "" },
  { q: "How many face cards are there in a standard deck of 52 playing cards?", a: "" },
  { q: "As the number of trials in an experiment increases, what happens to the difference between experimental and theoretical probabilities?", a: "" }
];


// Civics Questions (Chapters 1 to 8)
const civCh1: QuestionItem[] = [
  { q: "Name the two democratic countries whose stories are discussed in this chapter to show how they handle demands for power sharing.", a: "" },
  { q: "What are the three organs of the state among which power should be intelligently shared in a democracy?", a: "" },
  { q: "Which two languages are majorly spoken by the population in Belgium?", a: "" },
  { q: "What was the main reason for tension between the Dutch-speaking and French-speaking communities in Belgium during the 1950s and 1960s?", a: "" },
  { q: "What is the definition of an 'ethnic' group?", a: "" },
  { q: "Which social group constitutes the absolute majority of the population in Sri Lanka?", a: "" },
  { q: "What is meant by 'Majoritarianism'?", a: "" },
  { q: "Name the official language recognized by the Act passed in Sri Lanka in 1956.", a: "" },
  { q: "What type of violent internal conflict broke out in Sri Lanka as a result of majoritarian policies?", a: "" },
  { q: "How many times did Belgium amend its constitution between 1970 and 1993 to accommodate cultural diversity?", a: "" },
  { q: "Which unique third level of government was introduced in Belgium to handle cultural, educational, and language issues?", a: "" },
  { q: "Explain what 'prudential' reasons for power sharing are based on.", a: "" },
  { q: "What is the horizontal distribution of power (system of checks and balances) in a democracy?", a: "" }
];

const civCh2: QuestionItem[] = [
  { q: "Define federalism as a system of government.", a: "" },
  { q: "How does a federal system differ fundamentally from a unitary system of government?", a: "" },
  { q: "State any two key features of federalism.", a: "" },
  { q: "What do we call the area or subjects over which someone has legal authority?", a: "" },
  { q: "Give two examples of 'coming together' federations.", a: "" },
  { q: "Give two examples of 'holding together' federations.", a: "" },
  { q: "Name the three lists through which the Indian Constitution distributes legislative powers between the Union and State governments.", a: "" },
  { q: "Which level of government has the power to legislate on 'residuary' subjects like computer software in India?", a: "" },
  { q: "What are territories like Chandigarh, Lakshadweep, or Delhi called because they are too small to be independent states?", a: "" },
  { q: "What role does the judiciary play when there is a dispute regarding the division of powers between different levels of government in India?", a: "" },
  { q: "On what primary basis were many new states in India created in 1947?", a: "" },
  { q: "What is a 'coalition government'?", a: "" },
  { q: "What is decentralisation of power?", a: "" }
];

const civCh3: QuestionItem[] = [
  { q: "Explain the origins of social differences as discussed in the chapter.", a: "" },
  { q: "How do social divisions affect politics? Give two examples.", a: "" },
  { q: "What were the three determinants of the outcomes of social divisions on politics?", a: "" }
];

const civCh4: QuestionItem[] = [
  { q: "What is the sexual division of labour?", a: "" },
  { q: "Who is a feminist?", a: "" },
  { q: "What is a patriarchal society?", a: "" },
  { q: "What law provides that equal wages should be paid for equal work in India?", a: "" },
  { q: "How much representation is currently reserved for women in rural and urban local government bodies in India?", a: "" },
  { q: "Name the types of laws that deal with family-related matters like marriage, divorce, and inheritance.", a: "" },
  { q: "What is communal politics?", a: "" },
  { q: "State any two constitutional provisions that make India a secular state.", a: "" },
  { q: "Mention any two social reformers who worked to establish a society in India free from caste inequalities.", a: "" },
  { q: "Define the term 'caste hierarchy'.", a: "" },
  { q: "What two social groups are explicitly counted and listed in the official Schedule of the Census of India?", a: "" },
  { q: "What does it usually mean when political analysts say a specific caste is a 'vote bank' for a political party?", a: "" },
  { q: "Mention one positive and one negative outcome of caste playing a role in democratic politics.", a: "" }
];

const civCh5: QuestionItem[] = [
  { q: "Differentiate between sectional interest groups and public interest groups with examples.", a: "" },
  { q: "Describe Nepal's movement for democracy in April 2006.", a: "" },
  { q: "What was Bolivia's Water War? Explain the role of FEDECOR.", a: "" },
  { q: "How do pressure groups and movements exert influence on politics?", a: "" }
];

const civCh6: QuestionItem[] = [
  { q: "What is a political party?", a: "" },
  { q: "Mention the three main components of a political party.", a: "" },
  { q: "Define the term 'partisan'.", a: "" },
  { q: "What role do losing parties play in a democracy?", a: "" },
  { q: "Approximately how many political parties are registered with the Election Commission of India?", a: "" },
  { q: "Give an example of a country that follows a one-party system.", a: "" },
  { q: "Name two countries that have a two-party system.", a: "" },
  { q: "What type of party system does India have?", a: "" },
  { q: "In what year was the Indian National Congress (INC) founded?", a: "" },
  { q: "Which political party was founded in 1980 by reviving the erstwhile Bharatiya Jana Sangh?", a: "" },
  { q: "Who was the founder of the Bahujan Samaj Party (BSP)?", a: "" },
  { q: "Define the term 'defection' in democratic politics.", a: "" },
  { q: "What is an affidavit?", a: "" }
];

const civCh7: QuestionItem[] = [
  { q: "State any two reasons why democracy is considered a better form of government than alternatives.", a: "" },
  { q: "What do we call a government that is answerable and responsible to its citizens?", a: "" },
  { q: "Define transparency in the context of democratic decision-making.", a: "" },
  { q: "Why is a democratic government regarded as a legitimate government?", a: "" },
  { q: "Which type of regime had a slightly higher rate of economic growth between 1950 and 2000?", a: "" },
  { q: "Name two democratic countries that show a very high degree of income inequality.", a: "" },
  { q: "Name two democratic countries that have a better record in reducing income inequalities.", a: "" },
  { q: "Mention one country where more than half of the population lives in poverty.", a: "" },
  { q: "On what principle are democracies based regarding the political rights of individuals.", a: "" },
  { q: "What two conditions must a democracy fulfill to accommodate social diversity effectively?", a: "" },
  { q: "What are the dual bases of democracy that promote human dignity?", a: "" },
  { q: "How has democracy in India strengthened the claims of historically disadvantaged castes?", a: "" },
  { q: "What does a public expression of dissatisfaction with democracy signify?", a: "" }
];

const civCh8: QuestionItem[] = [
  { q: "What are the three broad categories of challenges faced by democracies across the world?", a: "" },
  { q: "Explain the foundational challenge, challenge of expansion, and challenge of deepening of democracy.", a: "" },
  { q: "How can political reforms be carried out to overcome the challenges to democracy?", a: "" }
];

// Economics Questions (Chapters 1 to 5)
const ecoCh1: QuestionItem[] = [
  { q: "What is the main criterion used by the World Bank in classifying different countries as rich or low-income?", a: "" },
  { q: "Why is the total income of a country not considered a very useful measure for comparing development between nations?", a: "" },
  { q: "Define Infant Mortality Rate (IMR), Literacy Rate, and Net Attendance Ratio as development indicators.", a: "" },
  { q: "What is Human Development Index (HDI)? Which organization publishes the annual Human Development Report?", a: "" },
  { q: "Explain why sustainable development is crucial, and give examples of resource overuse in India.", a: "" }
];

const ecoCh2: QuestionItem[] = [
  { q: "Name the three sectors of economic activities and provide two examples of jobs/activities in each sector.", a: "" },
  { q: "What is Gross Domestic Product (GDP) and how is it calculated in India?", a: "" },
  { q: "Differentiate between the organized and unorganized sectors of the economy.", a: "" },
  { q: "Explain the difference between open unemployment and disguised unemployment, commonly seen in rural agricultural fields.", a: "" },
  { q: "Why is the tertiary sector becoming so important in India? Give three reasons.", a: "" }
];

const ecoCh3: QuestionItem[] = [
  { q: "What is the 'double coincidence of wants' and how does the introduction of money solve this problem?", a: "" },
  { q: "Define 'collateral'. Why do formal lenders ask for collateral before approving a loan?", a: "" },
  { q: "Differentiate between formal and informal sources of credit in India.", a: "" },
  { q: "What are Self-Help Groups (SHGs)? Mention their main objectives and how they help rural women.", a: "" },
  { q: "What role does credit play in development? Discuss both its positive and negative (debt trap) aspects.", a: "" }
];

const ecoCh4: QuestionItem[] = [
  { q: "What is a Multinational Corporation (MNC)? Explain how MNCs control or spread their production across countries.", a: "" },
  { q: "Define foreign investment and foreign trade, and describe how foreign trade integrates global markets.", a: "" },
  { q: "What is Globalisation? Name the key factors (e.g. technology, liberalisation) that have enabled it.", a: "" },
  { q: "What is the role of the World Trade Organization (WTO), and what are the criticisms against its practices?", a: "" },
  { q: "Discuss the impact of globalisation in India - who are the gainers and who has been hurt?", a: "" }
];

const ecoCh5: QuestionItem[] = [
  { q: "Why are rules and regulations required in the marketplace for consumer protection? Give examples of exploitation.", a: "" },
  { q: "Name three key rights of a consumer guaranteed under the COPRA Act.", a: "" },
  { q: "What is COPRA? In which year was it enacted by the Government of India?", a: "" },
  { q: "Describe the three-tier quasi-judicial machinery set up under COPRA for the redressal of consumer disputes.", a: "" },
  { q: "What is the significance of safety standards and certification marks like ISI, Agmark, or Hallmark?", a: "" }
];


const sscCivCh1: QuestionItem[] = [
  { q: "What are the three major areas reviewed in the chapter \"Working of the Constitution\"?", a: "" },
  { q: "What is meant by political maturity in a democracy?", a: "" },
  { q: "How did the reduction of the voting age from 21 to 18 strengthen Indian democracy?", a: "" },
  { q: "Why is decentralisation considered essential for democratic governance?", a: "" },
  { q: "What was the significance of the 73rd and 74th Constitutional Amendments?", a: "" },
  { q: "How has the Right to Information (RTI) Act, 2005 strengthened democracy in India?", a: "" },
  { q: "What is meant by the rights-based approach to development?", a: "" },
  { q: "Why is the policy of reservation considered important for achieving social justice?", a: "" },
  { q: "Explain the importance of the Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act.", a: "" },
  { q: "What constitutional provisions have been made for the protection and empowerment of women?", a: "" },
  { q: "How has the judiciary contributed to strengthening democracy and protecting citizens' rights?", a: "" },
  { q: "What is meant by the basic structure of the Constitution? Why cannot Parliament alter it?", a: "" },
  { q: "Explain the characteristics of good governance required for a successful democracy.", a: "" }
];

const sscCivCh2: QuestionItem[] = [
  { q: "Why are elections considered essential in a representative democracy?", a: "" },
  { q: "Describe the composition of the Election Commission of India.", a: "" },
  { q: "Why is the independence of the Election Commission important?", a: "" },
  { q: "What are the major functions of the Election Commission?", a: "" },
  { q: "Why is the preparation of an accurate voters' list necessary?", a: "" },
  { q: "Explain the process of scrutiny of nomination forms by the Election Commission.", a: "" },
  { q: "What is the purpose of granting recognition to political parties?", a: "" },
  { q: "What is the Model Code of Conduct? Why is it important during elections?", a: "" },
  { q: "Explain the role of the Delimitation Commission in the electoral process.", a: "" },
  { q: "What challenges does the Election Commission face while conducting free and fair elections?", a: "" },
  { q: "What electoral reforms have been suggested to improve democracy in India?", a: "" },
  { q: "Explain the advantages of Electronic Voting Machines (EVMs) and VVPAT.", a: "" },
  { q: "Differentiate between general elections, mid-term elections, and by-elections.", a: "" }
];

const sscCivCh3: QuestionItem[] = [
  { q: "What is a political party?", a: "" },
  { q: "Why is acquiring political power the main objective of political parties?", a: "" },
  { q: "What is meant by the ideology of a political party?", a: "" },
  { q: "How do political parties act as a link between the government and the people?", a: "" },
  { q: "Explain the changing nature of the political party system in India after Independence.", a: "" },
  { q: "Differentiate between one-party, two-party, and multi-party systems.", a: "" },
  { q: "What conditions must a political party satisfy to be recognised as a national party?", a: "" },
  { q: "What conditions are required for recognition as a regional party?", a: "" },
  { q: "Explain the objectives and ideology of the Indian National Congress.", a: "" },
  { q: "Describe the ideology and objectives of the Bharatiya Janata Party (BJP).", a: "" },
  { q: "What is the significance of coalition governments in Indian democracy?", a: "" },
  { q: "Explain the role and importance of regional political parties in India.", a: "" },
  { q: "Analyse how regional parties have evolved from separatist demands to participation in national politics.", a: "" }
];

const sscCivCh4: QuestionItem[] = [
  { q: "What is meant by a social or political movement?", a: "" },
  { q: "Why are movements considered important in a democracy?", a: "" },
  { q: "What are the essential characteristics of a movement?", a: "" },
  { q: "How do movements influence government policies and public opinion?", a: "" },
  { q: "Explain the objectives of the tribal movement in India.", a: "" },
  { q: "What are the major demands of the farmers' movement?", a: "" },
  { q: "Describe the origin and development of the labour movement in India.", a: "" },
  { q: "Explain the contribution of the women's movement in achieving gender equality.", a: "" },
  { q: "What are the major objectives of environmental movements in India?", a: "" },
  { q: "Why did the consumer movement emerge after the Consumer Protection Act, 1986?", a: "" },
  { q: "What is meant by neo-social movements?", a: "" },
  { q: "How can cooperation among different social movements make them more effective?", a: "" },
  { q: "Analyse the role of social movements in strengthening democratic values and citizen participation.", a: "" }
];

const sscCivCh5: QuestionItem[] = [
  { q: "Why is democracy described as a continuous living process?", a: "" },
  { q: "What are the major global challenges faced by democratic nations?", a: "" },
  { q: "Why is deepening democracy considered an important challenge?", a: "" },
  { q: "Explain how communalism and terrorism affect democracy in India.", a: "" },
  { q: "How has the nature of the Naxalite movement changed over time?", a: "" },
  { q: "What are the harmful effects of corruption on democratic governance?", a: "" },
  { q: "Explain the problem of criminalisation of politics.", a: "" },
  { q: "Why is family monopoly in politics considered harmful for democracy?", a: "" },
  { q: "What social challenges affect the success of Indian democracy?", a: "" },
  { q: "Why should the interests of minorities be protected in a democratic system?", a: "" },
  { q: "What role has the judiciary played in bringing transparency to the political process?", a: "" },
  { q: "Explain how citizens can contribute to making Indian democracy more successful.", a: "" },
  { q: "Analyse the measures required to strengthen democracy and increase public participation in India.", a: "" }
];


const sscGeoCh1: QuestionItem[] = [
  { q: "What is meant by a field visit in Geography, and why is it important?", a: "" },
  { q: "What essential items should students carry during a geographical field visit?", a: "" },
  { q: "Which geographical features should be observed and recorded during a field visit?", a: "" },
  { q: "How did the relief, vegetation, and settlement patterns change as the students travelled from Naldurg to Solapur?", a: "" },
  { q: "Why did the cropping pattern change from pulses to sugarcane during the journey?", a: "" },
  { q: "Explain the importance and uses of the Ujani Dam as observed during the field visit.", a: "" },
  { q: "How did the physiography and vegetation change as the students moved from the Deccan Plateau to the Western Ghats?", a: "" },
  { q: "Compare the geographical features and strategic importance of Naldurg Fort, Sinhagad Fort, and Kolaba Fort.", a: "" },
  { q: "What characteristics of the Western Ghats were observed at Rajmachi Point and the Bhor (Khandala) Ghat?", a: "" },
  { q: "How do rainfall and proximity to the sea influence the climate, vegetation, and agriculture of the Konkan coastal region?", a: "" },
  { q: "What geographical landforms created by sea waves can be observed along the Alibag coast?", a: "" },
  { q: "Why are fishing, horticulture, agriculture, and tourism the major occupations in the Alibag coastal region?", a: "" },
  { q: "Explain the educational importance of a field visit and describe how observations, questionnaires, maps, photographs, and reports help in understanding geographical concepts.", a: "" }
];

const sscGeoCh2: QuestionItem[] = [
  { q: "State the latitudinal and longitudinal extent of India.", a: "" },
  { q: "State the latitudinal and longitudinal extent of Brazil.", a: "" },
  { q: "Compare the location of India and Brazil with respect to the hemispheres in which they are situated.", a: "" },
  { q: "Name the neighbouring countries and major water bodies surrounding India.", a: "" },
  { q: "Name the neighbouring countries and oceans surrounding Brazil.", a: "" },
  { q: "Why is India's location considered strategically important in Asia?", a: "" },
  { q: "Explain the historical background of India after independence.", a: "" },
  { q: "Describe the historical background of Brazil after its independence.", a: "" },
  { q: "Compare the political systems of India and Brazil.", a: "" },
  { q: "How do the latitudinal extents of India and Brazil influence their geographical characteristics?", a: "" },
  { q: "Compare the size, location, and boundaries of India and Brazil.", a: "" },
  { q: "How does the location of Brazil differ from that of India in relation to their respective continents?", a: "" },
  { q: "Analyse how the geographical location of a country influences its climate, trade, and development with reference to India and Brazil.", a: "" }
];

const sscGeoCh3: QuestionItem[] = [
  { q: "Name the five major physiographic divisions of India.", a: "" },
  { q: "Describe the main physiographic divisions of Brazil.", a: "" },
  { q: "Explain the characteristics of the Himalayan Mountain system.", a: "" },
  { q: "Compare the Western Ghats and the Eastern Ghats.", a: "" },
  { q: "Why are the Western Ghats known as the water divide of Peninsular India?", a: "" },
  { q: "Distinguish between the western coastal plain and the eastern coastal plain of India.", a: "" },
  { q: "Describe the major physiographic features of the Brazilian Highlands and the Great Escarpment.", a: "" },
  { q: "Explain the characteristics and importance of the Amazon Basin.", a: "" },
  { q: "Compare the drainage systems of India and Brazil.", a: "" },
  { q: "Differentiate between the Himalayan rivers and the Peninsular rivers of India.", a: "" },
  { q: "Explain the origin, course, and significance of the Ganga River system.", a: "" },
  { q: "Describe the major river basins of Brazil and explain their characteristics.", a: "" },
  { q: "Analyse how physiography influences the drainage pattern, climate, agriculture, and human activities in India and Brazil.", a: "" }
];

const sscGeoCh4: QuestionItem[] = [
  { q: "What are the major factors affecting the climate of India and Brazil?", a: "" },
  { q: "Explain why Brazil experiences different climatic conditions in different regions.", a: "" },
  { q: "Why is the climate of India known as a monsoon type of climate?", a: "" },
  { q: "Describe the role of the Himalayas in influencing the climate of India.", a: "" },
  { q: "How do the Western Ghats influence the distribution of rainfall in India?", a: "" },
  { q: "Explain the formation of the rain-shadow region in Brazil.", a: "" },
  { q: "Differentiate between the climatic conditions of the Amazon Basin and the Brazilian Highlands.", a: "" },
  { q: "Name and explain the four seasons recognized by the Indian Meteorological Department.", a: "" },
  { q: "Compare the rainfall patterns of India and Brazil.", a: "" },
  { q: "Explain the causes of heavy rainfall along the western coast of India.", a: "" },
  { q: "Why do tropical cyclones rarely affect the coast of Brazil?", a: "" },
  { q: "How does latitude influence the temperature distribution in India and Brazil?", a: "" },
  { q: "Analyse the relationship between relief, winds, and rainfall in determining the climate of India and Brazil.", a: "" }
];

const sscGeoCh5: QuestionItem[] = [
  { q: "What factors influence the distribution of natural vegetation in India and Brazil?", a: "" },
  { q: "Explain the characteristics of evergreen forests found in India and Brazil.", a: "" },
  { q: "Describe the features of deciduous forests.", a: "" },
  { q: "Why are thorny shrubs and bushes found in semi-arid regions?", a: "" },
  { q: "What are mangrove forests, and where are they found in India?", a: "" },
  { q: "Why are the Amazon forests called the \"Lungs of the World\"?", a: "" },
  { q: "Describe the major types of wildlife found in Brazil.", a: "" },
  { q: "Explain the diversity of wildlife found in India.", a: "" },
  { q: "What are the main causes of depletion of forests and wildlife in India and Brazil?", a: "" },
  { q: "How do national parks and wildlife sanctuaries help in wildlife conservation?", a: "" },
  { q: "Compare the vegetation of India and Brazil.", a: "" },
  { q: "Explain the relationship between climate, vegetation, and wildlife.", a: "" },
  { q: "Analyse the importance of conserving biodiversity for sustainable development.", a: "" }
];

const sscGeoCh6: QuestionItem[] = [
  { q: "What factors influence the distribution of population in India and Brazil?", a: "" },
  { q: "Compare the population density of India and Brazil.", a: "" },
  { q: "Explain the reasons for uneven population distribution in both countries.", a: "" },
  { q: "What is meant by population density?", a: "" },
  { q: "How do physical factors affect population distribution?", a: "" },
  { q: "Explain the role of climate in determining population distribution.", a: "" },
  { q: "Why are coastal areas generally more densely populated?", a: "" },
  { q: "Describe the characteristics of densely populated regions in India.", a: "" },
  { q: "Explain the characteristics of sparsely populated regions in Brazil.", a: "" },
  { q: "Compare the urban population of India and Brazil.", a: "" },
  { q: "What are the major problems associated with rapid population growth?", a: "" },
  { q: "Explain the impact of migration on population distribution.", a: "" },
  { q: "Analyse how population distribution affects economic development.", a: "" }
];

const sscGeoCh7: QuestionItem[] = [
  { q: "What are human occupations?", a: "" },
  { q: "Differentiate between primary, secondary, tertiary, and quaternary occupations.", a: "" },
  { q: "Explain the factors influencing occupations in India and Brazil.", a: "" },
  { q: "Why is agriculture considered a primary occupation?", a: "" },
  { q: "Describe the major agricultural crops of India.", a: "" },
  { q: "Explain the importance of coffee cultivation in Brazil.", a: "" },
  { q: "Compare the agricultural practices of India and Brazil.", a: "" },
  { q: "What is commercial farming? Give suitable examples.", a: "" },
  { q: "Explain the importance of industries in the economic development of a country.", a: "" },
  { q: "How do transport and communication support human occupations?", a: "" },
  { q: "Describe the importance of the service sector in modern economies.", a: "" },
  { q: "Explain how natural resources influence occupations.", a: "" },
  { q: "Analyse the relationship between physical geography and human occupations.", a: "" }
];

const sscGeoCh8: QuestionItem[] = [
  { q: "What is tourism, and why is it important?", a: "" },
  { q: "Explain the different types of tourism.", a: "" },
  { q: "What are the major tourist attractions in India?", a: "" },
  { q: "Describe the important tourist destinations in Brazil.", a: "" },
  { q: "Explain the economic importance of tourism.", a: "" },
  { q: "How does tourism generate employment opportunities?", a: "" },
  { q: "What is eco-tourism?", a: "" },
  { q: "Explain the importance of conserving heritage sites for tourism.", a: "" },
  { q: "Describe the impact of tourism on the environment.", a: "" },
  { q: "What measures can be taken to promote sustainable tourism?", a: "" },
  { q: "Compare tourism in India and Brazil.", a: "" },
  { q: "Explain the role of transport in the development of tourism.", a: "" },
  { q: "Analyse the positive and negative impacts of tourism on society and the environment.", a: "" }
];

const sscGeoCh9: QuestionItem[] = [
  { q: "What is environmental management?", a: "" },
  { q: "Explain the importance of conserving natural resources.", a: "" },
  { q: "What are renewable and non-renewable resources?", a: "" },
  { q: "Describe the major environmental problems faced by India and Brazil.", a: "" },
  { q: "Explain the causes and effects of deforestation.", a: "" },
  { q: "What measures can be taken to control environmental degradation?", a: "" },
  { q: "Explain the importance of water conservation.", a: "" },
  { q: "What is sustainable development?", a: "" },
  { q: "Describe the role of afforestation in environmental conservation.", a: "" },
  { q: "Explain the importance of public participation in environmental management.", a: "" },
  { q: "Compare the environmental challenges faced by India and Brazil.", a: "" },
  { q: "How do human activities affect the environment?", a: "" },
  { q: "Analyse the need for sustainable resource management for future generations.", a: "" }
];


// Comprehensive mapping of cbseQuestionsDb
export const cbseQuestionsDb: Record<string, Record<string, QuestionItem[]>> = {
  "Science": {
    "Chemical Reactions and Equations": scCh1,
    "Acids, Bases and Salts": scCh2,
    "Metals and Non-metals": scCh3,
    "Carbon and its Compounds": scCh4,
    "Carbon and Its Compounds": scCh4,
    "Life Processes": scCh6,
    "Control and Coordination": scCh7,
    "How do Organisms Reproduce?": scCh8,
    "How Do Organisms Reproduce?": scCh8,
    "Heredity": scCh9,
    "Heredity and Evolution": scCh9,
    "Light - Reflection and Refraction": scCh10,
    "Light – Reflection and Refraction": scCh10,
    "The Human Eye and the Colourful World": scCh11,
    "Electricity": scCh12,
    "Magnetic Effects of Electric Current": scCh13,
    "Our Environment": scCh15
  },
  "Science 1": {
    "Gravitation": scCh1,
    "Periodic Classification of Elements": scCh5,
    "Chemical Reactions and Equations": scCh1,
    "Effects of Electric Current": scCh13,
    "Heat": scCh2,
    "Refraction of Light": scCh10,
    "Lenses": scCh10,
    "Metallurgy": scCh3,
    "Carbon Compounds": scCh4,
    "Space Missions": scCh15
  },
  "Science 2": {
    "Heredity and Evolution": scCh9,
    "Life Processes in Living Organisms - Part I": scCh6,
    "Life Processes in Living Organisms - Part II": scCh6,
    "Environmental Management": scCh15,
    "Towards Green Energy": scCh15,
    "Animal Classification": scCh8,
    "Introduction to Microbiology": scCh2,
    "Cell Biology and Biotechnology": scCh9,
    "Social Health": scCh7,
    "Disaster Management": scCh15
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
    "Areas Related to Circles": mathCh11,
    "Area Related to Circles": mathCh11,
    "Surface Areas and Volumes": mathCh12,
    "Statistics": mathCh13,
    "Probability": mathCh14
  },
  "Math 1 (Algebra)": {
    "Linear Equations in Two Variables": mathCh3,
    "Quadratic Equations": mathCh4,
    "Arithmetic Progression": mathCh5,
    "Financial Planning": mathCh11,
    "Probability": mathCh14,
    "Statistics": mathCh13
  },
  "Math 2 (Geometry)": {
    "Similarity": mathCh6,
    "Pythagoras Theorem": mathCh6,
    "Circle": mathCh10,
    "Geometric Constructions": mathCh6,
    "Coordinate Geometry": mathCh7,
    "Trigonometry": mathCh8,
    "Mensuration": mathCh12
  },
  "Social Studies": {
    // History Chapters
    "The Rise of Nationalism in Europe": histCh1,
    "Nationalism in India": histCh2,
    "The Making of a Global World": histCh3,
    "The Age of Industrialisation": histCh4,
    "Print Culture and the Modern World": histCh5,
    "Historiography: Development in the West": sscHistCh1,
    "Historiography: Indian Tradition": sscHistCh2,
    "Applied History": sscHistCh3,
    "History of Indian Arts": sscHistCh4,
    "Mass Media and History": sscHistCh5,
    "Entertainment and History": sscHistCh6,
    "Sports and History": sscHistCh7,
    "Tourism and History": sscHistCh8,
    "Heritage Management": sscHistCh9,

    // Geography Chapters
    "Resources and Development": geoCh1,
    "Forest and Wildlife Resources": geoCh2,
    "Water Resources": geoCh3,
    "Agriculture": geoCh4,
    "Minerals and Energy Resources": geoCh5,
    "Manufacturing Industries": geoCh6,
    "Lifelines of National Economy": geoCh7,
    "Field Visit": sscGeoCh1,
    "Location and Extent": sscGeoCh2,
    "Physiography and Drainage": sscGeoCh3,
    "Climate": sscGeoCh4,
    "Natural Vegetation and Wildlife": sscGeoCh5,
    "Population": sscGeoCh6,
    "Human Settlements": sscGeoCh7,
    "Human Occupations": sscGeoCh7,
    "Economy and Occupations": sscGeoCh7,
    "Transport and Communication": sscGeoCh7,
    "Tourism, Transport and Communication": sscGeoCh7,
    "Tourism": sscGeoCh8,
    "Environmental Management": sscGeoCh9,

    // Civics Chapters
    "Power Sharing": civCh1,
    "Federalism": civCh2,
    "Gender, Religion and Caste": civCh4,
    "Political Parties": sscCivCh3,
    "Outcomes of Democracy": civCh7,

    // SSC Civics/Political Science Chapters
    "Working of the Constitution": sscCivCh1,
    "The Electoral Process": sscCivCh2,
    "Social and Political Movements": sscCivCh4,
    "Challenges Faced by Indian Democracy": sscCivCh5,

    // Economics Chapters
    "Development": ecoCh1,
    "Sectors of the Indian Economy": ecoCh2,
    "Money and Credit": ecoCh3,
    "Globalisation and the Indian Economy": ecoCh4,
    "Consumer Rights": ecoCh5
  }
};

