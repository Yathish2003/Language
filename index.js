const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

let language_dict = {};

// Load language files
const languageFiles = ['en.json', 'de.json','ka.json']; 
languageFiles.forEach(file => {
    const lang = path.basename(file, '.json');
    const filePath = path.join(__dirname, 'language', file);

    
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        language_dict[lang] = JSON.parse(data);
    } else {
        console.error(`File not found: ${filePath}`);
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:lang', (req, res) => {
    const lang = req.params.lang;

  
    console.log('Requested language:', lang);
    console.log('Available languages:', Object.keys(language_dict));

    if (!language_dict[lang]) {
        return res.status(404).send('Language not found');
    }

    let translation = '';
    for (var key of Object.keys(language_dict[lang])) {
        translation += `${key}: ${language_dict[lang][key]}\n`;
    }

    res.send(`<pre>${translation}</pre>`);
});

app.listen(port, (req,res) => {
    console.log(`Server running at http://localhost:${port}/`);
 

});
