import Discord from 'discord.js';

import * as Helpers from './helpers.js';

// Function for creating combo message
export function createComboMessage(combos: string, name: string) {
  return Helpers.TemplatedMessageEmbed()
    .setTitle(`**${name} combo information**`)
    .addField('Combos', combos);
}

type CombosObject = {
  [key: string]: {
    status: any;
  }
};

// Function for extracting combo information from query response
export function pluckQueryResponse(response: string): { name: string, combos: CombosObject } {
  // Extract data
  const queryResults = JSON.parse(response);
  console.log("queryResults", JSON.stringify(queryResults));
  const name = queryResults.data[0].pretty_name;
  const combos = queryResults.data[0].combos;

  // Return object with needed data
  return { name, combos };
}

// Function for creating combo string for embed
export function generateEmbedComboString(combosObject: CombosObject) {
  console.log("combosObject", JSON.stringify(combosObject));
  const comboArr = [];

  // Loop through the combos object and push the formatted combo to the comboArr
  for (const combo in combosObject) {
    if (combosObject.hasOwnProperty(combo)) {
      const element = combosObject[combo];
      const substanceCombo = `${combo.toUpperCase()}: ${element.status}`;

      comboArr.push(substanceCombo);
    }
  }
  // Sort and return it
  return comboArr.sort().join('\n');
}
