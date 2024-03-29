import React, {useMemo} from "react";
import TinderCard from "react-tinder-card";
import {type SVGProps, useState} from "react";


type Criteria = {
  title: string;
  selenium: number | "NA";
  cypress: number | "NA";
  playwright: number | "NA";
};
type TinderCardWrapperProps = {
  criteria: Criteria[];
};


const directionToWeight = (direction: string) => {
  switch (direction) {
    case "left":
      return 0;
    case "right":
      return 1;
    default:
      return 0.5;
  }
}


const getFirstPlace = (results: {selenium: number | "NA", cypress: number | "NA", playwright: number | "NA"}) => {
  // Convert "NA" to 0 and keep the number as is
  const seleniumScore = results.selenium === "NA" ? 0 : results.selenium;
  const cypressScore = results.cypress === "NA" ? 0 : results.cypress;
  const playwrightScore = results.playwright === "NA" ? 0 : results.playwright;

  // Create an array of objects, each object containing the tool name and its score
  const scores = [
    { tool: 'selenium', score: seleniumScore },
    { tool: 'cypress', score: cypressScore },
    { tool: 'playwright', score: playwrightScore },
  ];

  // Sort the array in descending order of scores
  scores.sort((a, b) => b.score - a.score);


  // Check if the first and second tools have the same score
  if (scores.every((score) => score.score === scores[0].score)) {
    // If they do, return both tools as the first place
    return `${scores[0].tool}, ${scores[1].tool} et ${scores[2].tool}`;
  }

  // Check if the first and second tools have the same score
  if (scores[0].score === scores[1].score) {
    // If they do, return both tools as the first place
    return `${scores[0].tool} et ${scores[1].tool}`;
  }

  // Otherwise, return the tool with the highest score
  return scores[0].tool;
}


export default function TinderCardWrapper(props: TinderCardWrapperProps) {

  const [swipedCards, setSwipedCards] = useState<
  (Criteria & {direction: string})[]
  >([]);

  const [displayTutorial, setDisplayTutorial] = useState(true);

  // compute results
  const results = useMemo(() => {
    let results = {
      selenium: 0,
      cypress: 0,
      playwright: 0,
    };

    swipedCards.forEach((card) => {
      results.selenium += (card.selenium === "NA" ? 0 : card.selenium) * directionToWeight(card.direction);
      results.cypress += (card.cypress === "NA" ? 0 : card.cypress) * directionToWeight(card.direction);
      results.playwright += (card.playwright === "NA" ? 0 : card.playwright) * directionToWeight(card.direction);
    });
    return results;
  } , [swipedCards]);


  const
    placeResult
      = useMemo(() => {
      let firstPlace = "";
      let secondPlace = "";
      let thirdPlace = "";




      if (results.selenium > results.cypress && results.selenium > results.playwright) {
        firstPlace = "Selenium";
        if (results.cypress > results.playwright) {
          secondPlace = "Cypress";
          thirdPlace = "Playwright";
        } else {
          secondPlace = "Playwright";
          thirdPlace = "Cypress";
        }
      } else if (results.cypress > results.selenium && results.cypress > results.playwright) {
        firstPlace = "Cypress";
        if (results.selenium > results.playwright) {
          secondPlace = "Selenium";
          thirdPlace = "Playwright";
        } else {
          secondPlace = "Playwright";
          thirdPlace = "Selenium";
        }
      } else {
        firstPlace = "Playwright";
        if (results.selenium > results.cypress) {
          secondPlace = "Selenium";
          thirdPlace = "Cypress";
        } else {
          secondPlace = "Cypress";
          thirdPlace = "Selenium";
        }
      }

      return {
        firstPlace,
        secondPlace,
        thirdPlace,
      };
    }, [results.selenium, results.cypress, results.playwright]);



  const handleSwipe = (direction: string, criteria: Criteria) => {
    setSwipedCards([...swipedCards, { ...criteria, direction }]);
  }


  if (swipedCards.length === props.criteria.length) {


    return (
      <div className="w-full h-full flex flex-col p-12 gap-12 overflow-x-hidden">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-yellow-400 h-2.5 rounded-full" style={
            {width: `${(swipedCards.length / props.criteria.length) * 100}%`}
          }></div>
        </div>


        <div className="flex flex-col items-center justify-center gap-12">
          <h1 className="text-3xl font-bold">Mes résultats</h1>
          <Podium
            firstPlace={placeResult.firstPlace}
            secondPlace={placeResult.secondPlace}
            thirdPlace={placeResult.thirdPlace}
            ></Podium>
        </div>


        <section className="space-y-4 pb-20">
        <h2 className="font-bold text-xl text-center">Tous les résultats</h2>
        <div className="space-y-2">
          {swipedCards.map((card) => (
            <div className="w-full p-4 bg-gray-300 rounded-xl flex justify-between">
              <div className="flex items-center gap-2">
                <div>
                  {card.direction === "left" && ( <IonHeartDislike className="h-6 fill-red-500"/> )}
                  {card.direction === "right" && ( <MaterialSymbolsFavorite className="h-6 fill-purple-500"/> )}
                  {card.direction === "up" && ( <ZondiconsMoodNeutralSolid className="h-6 fill-gray-500"/> )}
                </div>
                <div>{card.title}</div>
              </div>
              <div className="text-sm uppercase font-bold">
                #1 {getFirstPlace(card)}
              </div>
            </div>
          ))}
        </div>
        </section>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col p-12 gap-12 overflow-hidden">
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-yellow-400 h-2.5 rounded-full" style={
          {width: `${(swipedCards.length / props.criteria.length) * 100}%`}
        }></div>
      </div>



      <div className="relative grow">

        {displayTutorial && (
          <div
            className="absolute w-full h-full top-0 right-0 z-10 bg-white/50 rounded-3xl overflow-hidden backdrop-blur-xl">
            <div className="h-1/2 border-b-8 border-gray-500 border-dotted flex items-center justify-center flex-col">
              <IcBaselineKeyboardDoubleArrowUp
                className="h-12 fill-gray-700 animate-pulse"></IcBaselineKeyboardDoubleArrowUp>
              <div className="text-3xl font-bold text-gray-700">Neutre</div>
            </div>
            <div className="grid grid-cols-2 h-1/2">
              <div className="border-r-8 border-r-gray-500 border-dotted flex items-center justify-center flex-col">
                <IcBaselineKeyboardDoubleArrowUp
                  className="h-12 fill-gray-700 -rotate-90 animate-pulse"></IcBaselineKeyboardDoubleArrowUp>
                <div className="text-3xl font-bold text-gray-700">Pas important</div>
              </div>
              <div className="flex items-center justify-center flex-col text-gray-700">
                <IcBaselineKeyboardDoubleArrowUp
                  className="h-12 rotate-90 animate-pulse fill-current"></IcBaselineKeyboardDoubleArrowUp>
                <div className="text-3xl font-bold">Très important</div>
              </div>
            </div>

            <div className="absolute w-full h-full flex items-center justify-center top-0 right-0">
              <button
                onClick={() => setDisplayTutorial(false)}
                className="bg-green-500 p-4 rounded-full shadow-2xl hover:scale-105 transition-all text-white">
                <MaterialSymbolsNotStarted className="h-24"></MaterialSymbolsNotStarted>
              </button>
            </div>
          </div>
        )}


        {props.criteria.map((criteria) => (
          <TinderCard
            onSwipeRequirementUnfulfilled={() => {
              console.log("onSwipeRequirementUnfulfilled");
            }}
            onSwipe={(dir) => handleSwipe(dir, criteria)}
            className="absolute bg-yellow-400 h-full w-full cursor-grab rounded-3xl" key={criteria.title}>
            <div className="absolute h-full w-full flex flex-col justify-end top-0 right-0 p-12 select-none">
              <img draggable={false} className="select-none h-full object-cover overflow-hidden" src={`https://doodleipsum.com/700/abstract?n=${criteria.title}`} alt=""/>
              <h2 className="font-bold text-5xl">{criteria.title}</h2>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}


function Podium(props: {
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
}) {
  return (
    <div className="flex gap-12 w-full h-52 items-end">
      <div className="h-3/4 w-full space-y-2 flex flex-col">
        <div className="text-center">{props.secondPlace}</div>
        <div className="bg-yellow-400 w-full grow rounded-t-2xl flex items-center justify-center">
          <div className="bg-white rounded-full h-12 aspect-square flex items-center justify-center">#2</div>
        </div>
      </div>

      <div className="h-full w-full space-y-2 flex flex-col">
        <div className="text-center">{props.firstPlace}</div>
        <div className="bg-green-400 w-full grow rounded-t-2xl flex items-center justify-center">
          <div className="bg-white rounded-full h-12 aspect-square flex items-center justify-center">#1</div>
        </div>
      </div>

      <div className="h-1/2 w-full space-y-2 flex flex-col">
        <div className="text-center">{props.thirdPlace}</div>
        <div className="bg-red-400 w-full grow rounded-t-2xl flex items-center justify-center">
          <div className="bg-white rounded-full h-12 aspect-square flex items-center justify-center">#3</div>
        </div>
      </div>
    </div>
  );
}


export function MaterialSymbolsFavorite(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412q-.975 1.313-2.625 2.963T13.45 19.7z"></path></svg>
  )
}



export function IonHeartDislike(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}><path d="M417.84 448a16 16 0 0 1-11.35-4.72l-365.84-368a16 16 0 1 1 22.7-22.56l365.83 368A16 16 0 0 1 417.84 448M364.92 80c-44.09 0-74.61 24.82-92.39 45.5a6 6 0 0 1-9.06 0C245.69 104.82 215.16 80 171.08 80a107.71 107.71 0 0 0-31 4.54l269.13 270.7c3-3.44 5.7-6.64 8.14-9.6c40-48.75 59.15-98.79 58.61-153C475.37 130.53 425.54 80 364.92 80M69 149.15a115.06 115.06 0 0 0-9 43.49c-.54 54.21 18.63 104.25 58.61 153c18.77 22.87 52.8 59.45 131.39 112.8a31.88 31.88 0 0 0 36 0c20.35-13.82 37.7-26.5 52.58-38.12Z"></path></svg>
  )
}


export function ZondiconsMoodNeutralSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}><path d="M10 20a10 10 0 1 1 0-20a10 10 0 0 1 0 20M6.5 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m7 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M7 13a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"></path></svg>
  )
}


export function IcBaselineKeyboardDoubleArrowUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path d="M6 17.59L7.41 19L12 14.42L16.59 19L18 17.59l-6-6z"></path><path d="m6 11l1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"></path></svg>
  )
}



export function MaterialSymbolsNotStarted(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M8 16h2V8H8zm4 0l6-4l-6-4zm0 6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"></path></svg>
  )
}
