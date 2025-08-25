import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all .js and .jsx files
function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git')) {
      findJsFiles(filePath, fileList);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to convert file extension
function convertFileExtension(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const name = path.basename(filePath, ext);
  
  let newExt = '.ts';
  if (ext === '.jsx') {
    newExt = '.tsx';
  }
  
  const newPath = path.join(dir, name + newExt);
  
  try {
    fs.renameSync(filePath, newPath);
    console.log(`✅ Converted: ${filePath} → ${newPath}`);
  } catch (error) {
    console.error(`❌ Error converting ${filePath}:`, error.message);
  }
}

// Main conversion function
function convertToTypeScript() {
  console.log('🚀 Starting TypeScript conversion...\n');
  
  const srcDir = path.join(__dirname, 'src');
  const jsFiles = findJsFiles(srcDir);
  
  console.log(`Found ${jsFiles.length} JavaScript files to convert:\n`);
  
  jsFiles.forEach(file => {
    console.log(`- ${file}`);
  });
  
  console.log('\nStarting conversion...\n');
  
  jsFiles.forEach(convertFileExtension);
  
  console.log('\n🎉 TypeScript conversion completed!');
  console.log('\nNext steps:');
  console.log('1. Review the converted files for any type errors');
  console.log('2. Add proper TypeScript types and interfaces');
  console.log('3. Update imports to use .ts/.tsx extensions');
  console.log('4. Run "npm run build" to check for compilation errors');
}

// Run the conversion
convertToTypeScript(); 