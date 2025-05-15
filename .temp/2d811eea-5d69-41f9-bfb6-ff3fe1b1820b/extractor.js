
    const fs = require('fs');
    const path = require('path');
    try {
      // Try to load the data
      const fileData = require('./registry-data.js');
      const key = Object.keys(fileData).find(k => k !== 'default' && Array.isArray(fileData[k]));
      const data = key ? fileData[key] : (fileData.default || []);
      
      // Write the data to a JSON file
      fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Error loading registry data:', err);
      fs.writeFileSync(path.join(__dirname, 'output.json'), '[]');
    }
    