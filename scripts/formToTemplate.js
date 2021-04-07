/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');
const ActivityTemplateModel = require('../activity-templates/ActivityTemplateModel');

function processTemplate(fileName, template) {
  const filePath = path.resolve(__dirname, '../activity-templates/templates/', fileName);
  const fileContent = template.serialize();
  fs.writeFile(filePath, fileContent, error => {
    if (error) {
      console.log('There was an error writing: ', fileName);
    } else {
      console.log('Wrote file: ', fileName);
    }
  });
}

const main = async () => {
  const templates = {};
  const directoryPath = path.resolve(__dirname, '../activity-templates/original');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log(`Unable to scan directory: ${err}`);
    }
    files.forEach(module => {
      const templatePath = path.join(directoryPath, module);
      templates[module] = require(templatePath); // eslint-disable-line import/no-dynamic-require, global-require
      console.log('Processing :', module);
      const template = new ActivityTemplateModel(templates[module], module);
      const templateFile = `${template.slug}.json`;

      processTemplate(templateFile, template);
    });
  });
};

main();
