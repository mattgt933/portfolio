const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const pixiesetURL = 'https://matthewthomas.pixieset.com/bestphotos/';

async function scrapePixiesetImages() {
    try {
        const { data } = await axios.get(pixiesetURL);
        const $ = cheerio.load(data);
        const imageUrls = [];

        $('img').each((index, element) => {
            const src = $(element).attr('src');
            if (src) imageUrls.push(src);
        });

        fs.writeFileSync('imageLinks.json', JSON.stringify(imageUrls, null, 2));
        console.log('Image URLs saved to imageLinks.json');
    } catch (error) {
        console.error('Error scraping Pixieset images:', error);
    }
}

scrapePixiesetImages();
