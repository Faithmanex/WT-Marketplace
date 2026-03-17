import fs from 'fs';

let content = fs.readFileSync('./src/data/products.ts', 'utf8');
content = content.replace(/section: 'market'/g, "section: 'marketplace'");
content = content.replace(/section: 'consulting'/g, "section: 'services'");
content = content.replace(/section: 'institutional'/g, "section: 'services'");
content = content.replace(/category: 'courses',\n    section: 'academy'/g, "category: 'courses',\n    section: 'marketplace'");
content = content.replace(/category: 'membership',\n    section: 'academy'/g, "category: 'membership',\n    section: 'membership'");

fs.writeFileSync('./src/data/products.ts', content);
